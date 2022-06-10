import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbacksRepository } from "../Feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbacksRepository{
    async create({type, comment, screenshot, userName, userMail}:FeedbackCreateData) {
        await prisma.feedback.create({
            data: {
                type: type,
                comment: comment,
                screenshot: screenshot,
                userName: userName,
                userMail: userMail,
    
            }
        });
    }
}