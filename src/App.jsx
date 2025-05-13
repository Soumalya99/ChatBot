import { useState, useCallback } from 'react';
import axios from 'axios';
import ChatIcon from './components/ChatIcon';
import Chats from './components/Chats';
import ChatForm from './components/ChatForm';
import { FaCommentDots } from "react-icons/fa";
import { IoIosArrowDropdown } from "react-icons/io";


function App() {
  const [chatHistory, setChatHistory] = useState([
    { role: 'model', message: 'Hey buddy 🚀\nHello, how can I help you?' }
  ]);

  const [isOpen, setIsOpen] = useState(false);

  /* -------------------------------------------------- *
   * 1️⃣  One stable, memoised function that actually   *
   *     contacts Gemini and patches the “loading”      *
   * -------------------------------------------------- */
  const getModelResponse = useCallback((latestUserMsg) => {
    // format request payload
    const contents = [{ parts: [{ text: latestUserMsg }] }];

    // optimistic “typing …”
    setChatHistory(prev => [...prev, { role: 'model', message: 'loading-response' }]);

    (async () => {
      try {
        const { data } = await axios.post(
          import.meta.env.VITE_GEMINI_URL,
          { contents },
          { headers: { 'Content-Type': 'application/json' } }
        );

        const answer =
          data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ??
          'Sorry, I could not find a response.';

        // replace the last loading message
        setChatHistory(prev => {
          const next = [...prev];
          const idx = next.map(m => m.message).lastIndexOf('loading-response');
          if (idx !== -1) next[idx] = { role: 'model', message: answer };
          return next;
        });
      } catch (e) {
        setChatHistory(prev => {
          const next = [...prev];
          const idx = next.map(m => m.message).lastIndexOf('loading-response');
          if (idx !== -1) next[idx] = { role: 'model', message: 'Sorry, something went wrong.' };
          return next;
        });
        console.error('Gemini request failed', e);
      }
    })();
  }, []);

  /* -------------------------------------------------- *
   * 2️⃣  Append the user message, then (once) trigger   *
   *     the call that fetches the model reply.         *
   * -------------------------------------------------- */
  const handleSendMessage = useCallback(
    (userMsg) => {
      setChatHistory(prev => [...prev, { role: 'user', message: userMsg }]);
      // call ONLY ONCE, outside the updater – StrictMode-safe
      getModelResponse(userMsg);
    },
    [getModelResponse]
  );

  /* ---------------- UI ------------------- */
   return (
    <>
      {/* Chat window – only visible when isOpen === true */}
      <div
        className={`fixed bottom-8 right-3 w-[400px] overflow-hidden rounded-[18px] shadow-lg
          backdrop-blur-md bg-gray-400
          transform transition-all duration-300 ease-in-out
          ${isOpen
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-8 scale-95 pointer-events-none'}
        `}
      >
        <header className="flex items-center justify-between py-4 px-4 bg-blue-700/80">
          <div className="flex items-center gap-2 ms-2">
            <ChatIcon />
            <h2 className="text-xl font-semibold text-white tracking-wide">ChatBot</h2>
          </div>

          {/* Close icon lives in header */}
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-gray-200 transition"
            aria-label="Close chat"
          >
            <IoIosArrowDropdown size={25} />
          </button>
        </header>

        <Chats chatHistory={chatHistory} />
        <ChatForm onSendMessage={handleSendMessage} />
      </div>
      
       {/* Toggle button – always visible */}
       {!isOpen && (
         <button
           onClick={() => setIsOpen((prev) => !prev)}
           className={`fixed bottom-2 ms-2 right-3 p-2.5 rounded-full scale-100
             bg-violet-700/60 hover:bg-violet-800/70 hover:scale-120 text-white 
             shadow-lg focus:outline-none transition`}
           aria-label="Open chat"
         >
           <FaCommentDots size={20} />
         </button>
       )}
    </>
  );
}

export default App;