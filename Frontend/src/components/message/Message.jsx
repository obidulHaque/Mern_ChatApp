import React from "react";
import { useAuthContext } from "@/context/authContext";
import useConversation from "@/zustand/useConversation";
import { extractTime } from "@/utils/extractTime";
export default function Message({ msg }) {
  const { authUser } = useAuthContext();
  const { selectConversation } = useConversation();
  // console.log(selectConversation);
  const Iam = authUser._id === msg.senderId;
  const Nam = Iam ? authUser.fullName : selectConversation.username;
  const chatPossition = Iam ? "justify-end" : "justify-start";
  const formattedTime = extractTime(msg.createdAt);
  return (
    <div class={`flex ${chatPossition} gap-2.5 my-4 `}>
      <div class="flex flex-col lg:w-full w-[50vw] max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
        <div class="flex items-center space-x-2 rtl:space-x-reverse">
          <span class="text-sm font-semibold text-gray-900 dark:text-white">
            {Nam}
          </span>
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
            {formattedTime}
          </span>
        </div>
        <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
          {msg.message}
        </p>
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
          Delivered
        </span>
      </div>
    </div>
  );
}
