import { useState } from "react";
import useConversation from "@/zustand/useConversation";
import { useToast } from "./use-toast";

export default function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectConversation } = useConversation();
  const { toast } = useToast();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/message/send/${selectConversation._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setMessages([...messages, data]);
    } catch (error) {
      toast.error({ title: error.message });
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendMessage };
}
