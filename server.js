const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const winston = require('winston');
const schoolRoutes = require('./routes/schoolRoutes');
const prisma = new PrismaClient()
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
async function connectToDatabase() {
    try {
        await prisma.$connect();  
        logger.info('Database connected successfully!');
    } catch (err) {
        logger.error('Error connecting to the database:', err);
    }
}
const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({ filename: 'error.log', level: 'error' })
    ],
});


app.use((req, res, next) => {
    logger.info(`Request: ${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api', schoolRoutes);

// Start the server
app.listen(port,async () => {
    await connectToDatabase();
    logger.info(`Server running on http://localhost:${port}`);
});
