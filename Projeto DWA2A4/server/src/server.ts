import express from 'express'
import { prisma } from './prisma';

const app = express();

app.use(express.json());

app.post('/feedbacks', async (request, response) => {
    const {type, comment, screenshot, userName, userMail} = request.body;

    const feedback = await prisma.feedback.create({
        data: {
            type: type,
            comment: comment,
            screenshot: screenshot,
            userName: userName,
            userMail: userMail

        }
    })

    return response.status(201).json({data: feedback});
})

app.listen(3333, () => {
    console.log('HTTP server running!');
})