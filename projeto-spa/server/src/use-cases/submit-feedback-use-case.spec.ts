import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy},
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback',()=> {
        expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example content',
            screenshot: 'data:image/png;base64,ergrergegreg',
            userName: 'Nome do usuario',
            userMail: 'Email do usuario',
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
        
    });

    it('should not be able to submit a feedback with an invalid screenshot',()=> {
        expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example content',
            screenshot: 'data:image/',
            userName: 'Nome do usuario',
            userMail: 'Email do usuario',
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback without type',()=> {
        expect(submitFeedback.execute({
            type: '',
            comment: 'example content',
            screenshot: 'data:image/png;base64,ergrergegreg',
            userName: 'Nome do usuario',
            userMail: 'Email do usuario',
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback without comment',()=> {
        expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,ergrergegreg',
            userName: 'Nome do usuario',
            userMail: 'Email do usuario',
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback without userName',()=> {
        expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Teste',
            screenshot: 'data:image/png;base64,ergrergegreg',
            userName: '',
            userMail: 'Email do usuario',
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback without userMail',()=> {
        expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Teste',
            screenshot: 'data:image/png;base64,ergrergegreg',
            userName: 'Nome do usuario',
            userMail: '',
        })).rejects.toThrow();
    });
})