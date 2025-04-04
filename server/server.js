require('dotenv').config();
const swagger = require('./swagger');
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
// Routers
const authRouter = require('./router/auth_router');
const AgencyRouter = require('./router/agency_router');
const connectDB = require('./utils/db');
const errorMiddleware = require('./middleware/error_middleware');

// Middleware
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
swagger(app);


// API Routes
app.use("/api/agencies", AgencyRouter); 
app.use("/api/auth", authRouter);


app.use(errorMiddleware);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const Port = process.env.PORT || 3001;
connectDB().then(() => {
  app.listen(Port, () => {
    console.log(`Server running on port ${Port}`);
    console.log(`Frontend accessible at http://localhost:${Port}`);
  });
});