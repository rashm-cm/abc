import { sequelize, User, Service, Plan, CustomerService } from './models'; // Adjust the path to your models
 
describe('Sequelize Models Test', () => {
  beforeAll(async () => {
    // Ensure the database connection is established
    try {
      await sequelize.authenticate();
      console.log('Database connection established.');
 
      // Force sync the database - this drops and recreates all tables
      await sequelize.sync({ force: true });
      console.log('Database tables created.');
 
      // Insert hardcoded data
      await insertTestData();
    } catch (error) {
      console.error('Error setting up the database:', error);
    }
  });
 
  const insertTestData = async () => {
    try {
      // Create a test user
      const user = await User.create({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashed_password', // In real-world, this would be a bcrypt hash
        role: 'customer',
      });
 
      // Create a test service
      const service = await Service.create({
        service_name: 'Premium Service',
      });
 
      // Create a test plan associated with the service
      await Plan.create({
        service_id: service.id,
        plan_name: 'Basic Plan',
        features: 'Feature 1, Feature 2', // Hardcoded features
      });
 
      // Create a relationship between user and service in CustomerService table
      await CustomerService.create({
        customer_id: user.id,
        service_id: service.id,
      });
    } catch (error) {
      console.error('Error inserting test data:', error);
    }
  };
 
  it('should fetch a user by name', async () => {
    try {
      const user = await User.findOne({ where: { name: 'John Doe' } });
      expect(user).not.toBeNull();
      expect(user.email).toBe('john@example.com');
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  });
 
  it('should fetch a service by name and its associated plan', async () => {
    try {
      const service = await Service.findOne({
        where: { service_name: 'Premium Service' },
        include: [Plan], // Include associated plans
      });
      expect(service).not.toBeNull();
      expect(service.Plans.length).toBe(1);
      expect(service.Plans[0].plan_name).toBe('Basic Plan');
    } catch (error) {
      console.error('Error fetching service and plan:', error);
    }
  });
 
  it('should fetch a user\'s associated services', async () => {
    try {
      const user = await User.findOne({
        where: { name: 'John Doe' },
        include: [Service], // Include associated services
      });
      expect(user).not.toBeNull();
      expect(user.Services.length).toBe(1);
      expect(user.Services[0].service_name).toBe('Premium Service');
    } catch (error) {
      console.error('Error fetching user services:', error);
    }
  });
 
  it('should have a valid many-to-many relationship between User and Service', async () => {
    try {
      const user = await User.findOne({
        where: { name: 'John Doe' },
        include: [Service], // Include associated services
      });
      expect(user).not.toBeNull();
      const services = user.Services.map(service => service.service_name);
      expect(services).toContain('Premium Service');
    } catch (error) {
      console.error('Error verifying many-to-many relationship:', error);
    }
  });
 
  afterAll(async () => {
    try {
      await sequelize.close();
      console.log('Database connection closed.');
    } catch (error) {
      console.error('Error closing the database connection:', error);
    }
  });
});