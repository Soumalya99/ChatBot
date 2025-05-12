import { useState, useCallback } from 'react';
import axios from 'axios';
import ChatIcon from './components/ChatIcon';
import Chats from './components/Chats';
import ChatForm from './components/ChatForm';

function App() {
  const [chatHistory, setChatHistory] = useState([
    { role: 'model', message: 'Hey buddy 🚀\nHello, how can I help you?' }
  ]);

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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#F4F0FF] to-[#DACDFF]">
      <div className="w-[420px] overflow-hidden rounded-[18px] shadow-lg bg-white">
        <header className="flex items-center justify-between py-5 px-4 bg-blue-400">
          <div className="flex items-center gap-2 ms-2">
            <ChatIcon />
            <h2 className="text-xl font-semibold text-white tracking-wide">ChatBot</h2>
          </div>
        </header>

        <Chats chatHistory={chatHistory} />

        <ChatForm onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default App;