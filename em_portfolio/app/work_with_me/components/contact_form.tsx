import { useSpring, animated } from '@react-spring/web'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import ThreeDots from 'react-loading-icons/dist/esm/components/three-dots';

enum message_states {
    creating_message,
    submitting,
    failed,
    success
}

enum ErrorTypes {
    no_email,
    wrong_email,
    empty_message,
    message_too_long,
}

const error_messages = {
    [ErrorTypes.no_email]: "You need to put an email here so I can get back to you!",
    [ErrorTypes.wrong_email]: "This email doesn't look quite right",
    [ErrorTypes.empty_message]: "Hey, you haven't typed me a message yet!",
    [ErrorTypes.message_too_long]: "Woah there, this message is a bit too long to send",
}

export default function ContactFormNew({ className }) {

    const [formData, setFormData] = useState<{name:string, email:string, message:string}>({
        name: '',
        email: '',
        message: ''
    });

    const [messageState, setmessageState] = useState<message_states>(message_states.creating_message);
    const [errors, setErrors] = useState<ErrorTypes[]>([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const growSpring = useSpring({
        from: { scale: 0.9 },
        to: { scale: 1 },
        config: { duration: 80 },
    });

    const verifyUserInput = (): { errors: ErrorTypes[]; isValid: boolean } => {
        const errors: ErrorTypes[] = [];
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // No email
        if (!formData["email"] || formData["email"].length === 0) {
            errors.push(ErrorTypes.no_email)
        }
    
        // Wrong email
        else if (formData["email"] && !emailRegex.test(formData["email"])) {
            errors.push(ErrorTypes.wrong_email)
        }

        // Empty message
        if (!formData["message"] || formData["message"].trim().length === 0) {
            errors.push(ErrorTypes.empty_message)
        }

        // Message too long
        else if (formData["message"] && formData["message"].trim().length > 1000) {
            errors.push(ErrorTypes.message_too_long)
        }
        
        return { errors, isValid: errors.length == 0 };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setmessageState(message_states.submitting);

        const { errors, isValid } = verifyUserInput();

        console.log(errors)

        if (!isValid) {
            setErrors(errors)
            setmessageState(message_states.failed)
            return
        }
        
        try {
            const response = await fetch('/api/contact/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( formData.message.trim() ),
            });
        
            if (!response.ok) throw new Error('Failed to send message');

            if (response.ok) {
                setmessageState(message_states.success)
            }

        } catch (error) {
            console.error('Submission error:', error);
            setmessageState(message_states.failed)
        }
    };

    return (
        <animated.div className={`${className} w-full flex flex-col`} style={{...growSpring}}>
            {messageState != message_states.success && <form onSubmit={handleSubmit} className='bg-perfume-100 rounded-lg p-4 h-fit'>
                <div className='flex items-center'>
                    {"name"}
                    <input name="name" value={formData.name} onChange={handleChange} className=" pl-0.5 w-full h-full my-2 ml-5 rounded-lg bg-perfume-50 border-perfume-500/40 border-2" 
                        type='text' style={{ height: "2rem" }}
                    />
                </div>

                <div className='mt-2'>
                    <div className='text-red-700 text-sm m-0 p-0'>
                        {errors.includes(ErrorTypes.no_email) && <p className='p-0 m-0'>{error_messages[ErrorTypes.no_email]}</p>}
                        {errors.includes(ErrorTypes.wrong_email) && <p className='p-0 m-0'>{error_messages[ErrorTypes.wrong_email]}</p>}
                    </div>

                    <div className='flex items-center'>
                        {"email*"}
                        <input name="email" value={formData.email} onChange={handleChange} placeholder={" this is mandatory"} 
                        className={`pl-0.5 w-full h-full mb-2 ml-4 rounded-lg border-2 ${ errors ? "bg-perfume-50 border-perfume-500/40" : "bg-perfume-50 border-perfume-500/40"}`}
                            type='email' style={{ height: "2rem" }}
                        />
                    </div>

                </div>

                <div className='mt-4'>
                    <div className='text-red-700 text-sm m-0 p-0'>
                        {errors.includes(ErrorTypes.empty_message) && <p className='p-0 m-0'>{error_messages[ErrorTypes.empty_message]}</p>}
                        {errors.includes(ErrorTypes.message_too_long) &&<p className='p-0 m-0'>{error_messages[ErrorTypes.message_too_long]}</p>}
                    </div>

                    <div className='flex flex-col'>
                        {"message*"}
                        <textarea name="message" value={formData.message} onChange={handleChange} placeholder={"What's up?"} className='px-0.5 items-center h-32 w-full rounded-lg bg-perfume-50 border-perfume-500/40 border-2' />
                    </div>
                </div>
            </form>}
          
            { messageState != message_states.success && <button onClick={handleSubmit} disabled={messageState == message_states.submitting} className='py-1 px-2 bg-perfume-100 rounded-lg mt-4 self-center flex space-x-4 items-center'>
                {messageState == message_states.submitting ? "Submitting..." : "submit"}
                {messageState != message_states.submitting && <Image alt="click icon" src={"/icons/cursor.png"} width={20} height={20} className="object-cover m-0 ml-1"/>}
                {messageState == message_states.submitting && <ThreeDots className='h-6 w-6 ml-4' fill='#7d24a7' speed={.5}/>}
            </button>}

            {messageState == message_states.success && 
                // <Image alt={"success"} width={100} height={100} src={"/"}/>
                <div className='self-center text-center'>
                    <p className='self-center font-extrabold text-2xl p-0 mb-4'>message sent</p>
                    <p className='self-center font-extrabold text-l m-0 p-0 mb-4 text-perfume-500'>I'll get back to you as soon as possible!</p>
                </div>

            }

        </animated.div>
    )
}

