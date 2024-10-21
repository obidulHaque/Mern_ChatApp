import React, { useState, useEffect } from "react";
import useConversation from "@/zustand/useConversation";
import { useToast } from "./use-toast";

export default function useGetMessage() {
  const [loading, setLoading] = useState(false);
  const { selectConversation, messages, setMessages } = useConversation();
  const { toast } = useToast();

  useEffect(() => {
    const getMessage = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/message/${selectConversation._id}`);
        const data = await res.json();

        // Set the new messages in the Zustand store
        setMessages(data); // this should now append new messages
      } catch (error) {
        toast({ title: "Getting message Error" });
      } finally {
        setLoading(false);
      }
    };

    if (selectConversation !== null) {
      getMessage();
    }
  }, [selectConversation, setMessages]);

  return { loading, messages };
}
