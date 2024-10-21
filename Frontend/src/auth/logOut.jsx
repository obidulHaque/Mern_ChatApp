import { Button } from "@/components/ui/button";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuthContext } from "@/context/authContext";
import { LogOut } from "lucide-react";

export default function Logout() {
  const { toast } = useToast();
  const { setAuthUser } = useAuthContext();

  async function onClick() {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      toast({ title: data.message });
      localStorage.removeItem("chat-user");
      setAuthUser(null);
    } catch (error) {
      toast({ title: error.message });
    }
  }
  return (
    <>
      <Button onClick={onClick}>
        <LogOut />
      </Button>
    </>
  );
}
