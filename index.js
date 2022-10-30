import express from 'express';
import bodyParser from 'body-parser';
import {router} from './routes/storePollingRoutes.js'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const app = express();
const PORT = 5000;


app.use(bodyParser.json());
app.use('/storePolling', router)
app.use(express.static('./screenshot-manager/screenshots'))


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Play Store Tracking API",
            version: "0.0.1",
            description:
                "This is the Swagger Documentation for the Play Store tracking API",
        },
        servers: [
            {
                url: `http://localhost:${PORT}/storePolling`,
            },
        ],
    },
    apis: ["./routes/storePollingRoutes.js"],
};

const specs = swaggerJsdoc(options);
app.use(
    "/swagger",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})