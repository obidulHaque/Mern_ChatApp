import React, { useState } from "react";

import { Send } from "lucide-react";
import useSendMessage from "@/hooks/useSendMessage";

export default function MessageInput() {
  const [message, setMessage] = useState();
  const { sendMessage } = useSendMessage();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };
  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="lg:w-full w-[90vw] relative">
        <textarea
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          rows="2"
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          <Send />
        </button>
      </div>
    </form>
  );
}
