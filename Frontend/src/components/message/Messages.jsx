import { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "@/hooks/useGetMessage";
import useListenMessages from "@/hooks/useListenMessages";
const Messages = () => {
  const { loading, messages } = useGetMessage();
  const lastMessageRef = useRef();
  useListenMessages();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  return (
    <div className="px-4 flex-1 overflow-auto lg:w-auto w-screen">
      {!loading &&
        messages.length > 0 &&
        messages.map((msg) => (
          <div key={msg._id} ref={lastMessageRef}>
            <Message msg={msg} />
          </div>
        ))}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};
export default Messages;
