import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { ScreenshotButton } from "../ScreenshotButton";
import { api } from "../../../lib/api"
import { Loading } from "../../Loading";

interface FeedbackContentStepProps{
    feedbackType: FeedbackType;
    onFeedbackRestartRequested:() => void;
    onFeedbackSent: () => void;
}

export function FeedbackContentStep({
    feedbackType,
    onFeedbackRestartRequested,
    onFeedbackSent,
}: FeedbackContentStepProps) {
    const [isSendingFeedback, setIsSendingFeedback] = useState(false)
    const [screenshot, setScreenshot] = useState<string | null>(null)
    const [comment, setComment] = useState('')
    const [userName, setUserName] = useState('')
    const [userMail, setUserMail] = useState('')


    const feedbackTypeInfo = feedbackTypes[feedbackType]

    async function handleSubmitFeedback(event: FormEvent) {
        event.preventDefault();
        setIsSendingFeedback(true);

        await api.post('/feedbacks',
        {
            type: feedbackType,
            comment,
	        screenshot,
            userName,
            userMail,
        });
        setIsSendingFeedback(false);
        // fetch(`http://localhost:3333/feedbacks`,{
        //         method: "POST",
        //         body: JSON.stringify(
        //             {
        //                 "type": `${feedbackTypeInfo.title}`,
        //                 "comment": `${comment}`,
	    //                 "userName": `${userName}`,
	    //                 "userMail": `${userMail}`,
        //             }
        //         )
            
        //     }
        // )
        // console.log({
        //     screenshot,
        //     comment,
        // })

        onFeedbackSent();
    }

    return (
        <>
            <header>
                <button 
                    type="button" 
                    className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
                    onClick={onFeedbackRestartRequested}>
                    <ArrowLeft weight="bold" className="w-4 h-4"/>
                </button>
                <span className='text-xl leading-6 flex items-center gap-2 dark:text-zinc-50 text-zinc-900'>
                    <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6"/>
                    {feedbackTypeInfo.title}
                </span>
                <CloseButton/>
            </header>
            
            <form onSubmit={handleSubmitFeedback} className="my-4 w-full flex flex-col gap-2">
                <input type="text" placeholder="Informe seu nome" required className="min-w-[304px] w-full min-h-[30px] text-sm dark:placeholder-zinc-100 dark:text-zinc-50 placeholder-zinc-800 text-zinc-600 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none" onChange={event => setUserName(event.target.value)}/>
                <input type="email" name="emailUsuario" id="emailUsuario" required placeholder="Informe seu email" className="min-w-[304px] w-full min-h-[30px] text-sm dark:placeholder-zinc-100 dark:text-zinc-50 placeholder-zinc-800 text-zinc-600 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none"onChange={event => setUserMail(event.target.value)}/>
                <textarea 
                    className="min-w-[304px] w-full min-h-[112px] text-sm dark:placeholder-zinc-100 dark:text-zinc-50 placeholder-zinc-800 text-zinc-600 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                    placeholder="Conte com detalhes o que está acontecendo"
                    onChange={event => setComment(event.target.value)}
                />
                <footer className="flex gap-2 mt-2">
                   <ScreenshotButton 
                    screenshot={screenshot}
                    onScreenshotTook={setScreenshot}
                   />

                    <button 
                        type="submit"
                        disabled={comment.length === 0}
                        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                    >
                        {isSendingFeedback ? <Loading/> : 'Enviar feedback'}
                    </button>
                </footer>
            </form>
        </>
    )
}