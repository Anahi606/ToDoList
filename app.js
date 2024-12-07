const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'ToDoList API',
            version: '1.0.0',
            description: 'API para manejar tareas pendientes - Grupo 6',
        },
    },
    apis: ['./app.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

let tasks = [];

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         createdAt:
 *           type: string
 *         status:
 *           type: string
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Listar todas las tareas
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crear una tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tarea creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    const task = {
        id: Date.now().toString(),
        title,
        description,
        createdAt: new Date().toISOString(),
        status: 'pending',
    };
    tasks.push(task);
    res.status(201).json(task);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
