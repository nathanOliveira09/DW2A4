import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/Feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
    userName: string;
    userMail: string;
}

export class SubmitFeedbackUseCase {
    constructor (
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter,
    ){}

    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot, userName, userMail } = request;

        if (!userName){
            throw new Error("User name is required");
        }

        if(!userMail){
            throw new Error("User Email is required");
        }

        if(!type){
            throw new Error("Type is required"); 
        }

        if(!comment){
            throw new Error("Comment is required"); 
        }

        if (screenshot && !screenshot.startsWith('data:image/png;base64')){
            throw new Error("Invalid screenshot format.");
            
        }


        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
            userName,
            userMail,
        })

        const feedback = await this.mailAdapter.sendMail({
            userName: `${userName}`,
            userMail: `${userMail}`,
            subject: 'Novo feedback',
            body:
            [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                `</div>`
        
            ].join('\n'),
        })
        return feedback;
    }
}
