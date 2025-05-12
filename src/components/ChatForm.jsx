import { useRef } from 'react'
import { CiLocationArrow1 } from "react-icons/ci";

function ChatForm({onSendMessage}) {
     const inputref = useRef()

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userMsg = inputref.current.value.trim();
        if(!userMsg) return;
        onSendMessage(userMsg);
        inputref.current.value = "";

    }
    return (
        <div className='py-2 px-2 border-t bg-white'>
            <form action="#" className="flex gap-2" onSubmit={handleFormSubmit}>
                <div className='relative flex-1'>
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="w-full border rounded-full px-4 py-2 pr-10 focus:outline-none"
                        required
                        ref={inputref}
                    />
                    <button
                    type='submit'
                    className="bg-blue-500 text-white absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 hover:bg-blue-600 transition"
                    >
                        <CiLocationArrow1 />
                    </button>

                </div>
            </form>
        </div>
    )
}

export default ChatForm