const express = require('express');
const path = require('path');
const sequelize = require('./config/database');
const morgan = require('morgan');
const cors = require('cors'); // Import the cors package

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // Allow credentials to be sent
}));

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
        url: "/",
      },
    ],
    components: {
      securitySchemes: {
        auth_token: {
          type: 'apiKey',
          in: 'cookie',
          name: 'auth_token', // Specify the cookie name
        },
      },
    },
  },
  apis: [
    './routes/*.js', // Glob pattern to include route files in Swagger
    './models/*.js', // Include your model files for API documentation
  ],
};

let swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api/v1/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/carts', cartRoutes);
app.use('/api/v1/categories', categoryRoutes);

sequelize.sync({ force: true }).then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');

    const createSampleData = require('./db/sampleData');
    createSampleData();
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
