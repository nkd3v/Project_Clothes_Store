const express = require('express');
const sequelize = require('./config/database');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Your API Title',
      description: 'Your API Description',
      version: '1.0.0',
    },
  },
  apis: [
    './routes/*.js', // Glob pattern to include route files in Swagger
    './models/*.js', // Include your model files for API documentation
  ],
};

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/users', userRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});
