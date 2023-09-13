const express = require('express');
const sequelize = require('./config/database');
const morgan = require('morgan');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('dev'));

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: 'Chiqko API',
      version: '1.0.0',
    },
    servers: [
      {
        url: "https://chiqko.pp.ua",
      },
    ],
  },
  apis: [
    './routes/*.js', // Glob pattern to include route files in Swagger
    './models/*.js', // Include your model files for API documentation
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});

// Serve Swagger documentation
app.use('/api/v1', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/health", (req, res) => {
  res.status(200).send("Healthy");
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});
