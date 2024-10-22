import React from "react";
import Conversations from "./Conversations";
import Logout from "@/auth/logOut";
import useConversation from "@/zustand/useConversation";
import SearchInput from "./SearchInput";

export default function Sidebar() {
  const { selectConversation } = useConversation();
  const isShow = selectConversation === null;

  return (
    <div
      className={`border-r border-slate-500 p-4 flex flex-col lg:w-[50vw] w-[100vw] relative overflow-hidden ${
        isShow ? "block" : "lg:block hidden"
      }`}
    >
      <SearchInput />
      <Conversations />
      <div className="bottom-2 absolute right-2 ">
        <Logout />
      </div>
    </div>
  );
}
