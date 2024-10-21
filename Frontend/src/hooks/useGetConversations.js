import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const { toast } = useToast();
  const fetchedRef = useRef(false); // To track if data has been fetched

  useEffect(() => {
    const getConversations = async () => {
      if (fetchedRef.current) return; // Prevent fetching if already done
      fetchedRef.current = true; // Mark as fetched

      setLoading(true);
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        setConversations(data);
      } catch {
        toast({ title: "Conversations Loading error.." });
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
