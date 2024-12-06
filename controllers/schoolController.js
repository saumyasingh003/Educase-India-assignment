const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Joi = require('joi');
const logger = require('winston').createLogger({
    level: 'info',
    transports: [
        new (require('winston').transports.Console)(),
        new (require('winston').transports.File)({ filename: 'error.log', level: 'error' })
    ],
});
const { calculateDistance } = require('../utils/geoUtils');


const schoolSchema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    address: Joi.string().min(3).max(255).required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required()
});


exports.addSchool = async (req, res) => {
    const { error } = schoolSchema.validate(req.body);

    if (error) {
        logger.error('Add School Validation Error: ', error.details);
        return res.status(400).json({ error: error.details[0].message });
    }

    const { name, address, latitude, longitude } = req.body;

    try {
        const school = await prisma.school.create({
            data: { name, address, latitude, longitude },
        });
        res.status(201).json(school);
    } catch (err) {
        logger.error('Database Error on Add School: ', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.listSchools = async (req, res) => {
    const { userLatitude, userLongitude } = req.query;

  
    if (!userLatitude || !userLongitude) {
        return res.status(400).json({ error: 'User latitude and longitude are required.' });
    }

    if (isNaN(userLatitude) || isNaN(userLongitude)) {
        return res.status(400).json({ error: 'Invalid latitude or longitude.' });
    }

    try {
        const schools = await prisma.school.findMany();

        const schoolsWithDistance = schools.map((school) => {
            const distance = calculateDistance(
                parseFloat(userLatitude),
                parseFloat(userLongitude),
                school.latitude,
                school.longitude
            );
            return { ...school, distance };
        });

        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.status(200).json(schoolsWithDistance);
    } catch (err) {
        logger.error('Database Error on List Schools: ', err);
        res.status(500).json({ error: 'Error fetching schools' });
    }
};
