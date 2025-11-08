// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Meditation App API Documentation',
            version: '1.0.0',
            description: 'REST API documentation for the Meditation App (Admin + User + Profile + Enquiry)',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'Local Server',
            },
        ],
    },
    apis: ['./routes/*.js'], // 👈 Scan all route files
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('✅ Swagger Docs available at http://localhost:3000/api-docs');
};

module.exports = { swaggerDocs };
