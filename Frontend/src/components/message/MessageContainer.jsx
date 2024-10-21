import MessageInput from "./MessageInput";
import Messages from "./Messages";
import useConversation from "@/zustand/useConversation";
import { ChevronLeft } from "lucide-react";

const MessageContainer = () => {
  const { selectConversation, setSelectConversation } = useConversation();
  const isShow = selectConversation === null;
  const handleClick = () => {
    setSelectConversation(null);
  };

  if (selectConversation === null) {
    return (
      <div
        className={`flex justify-center items-center text-[5vw] w-[50vw] ${
          isShow ? "lg:flex hidden" : ""
        } `}
      >
        <p>Empty</p>
      </div>
    );
  }
  return (
    <div
      className={`w-[50vw] flex flex-col  ${
        isShow ? "lg:block hidden" : "block"
      }`}
    >
      <>
        {/* Header */}
        <div className="bg-slate-500 px-4 py-2 mb-2 lg:w-[50vw] w-[100vw] flex items-center gap-2 lg:h-auto h-[20vw]">
          <div onClick={handleClick}>
            {" "}
            <ChevronLeft />
          </div>
          <span className="label-text">
            <img
              class="w-8 h-8 rounded-full"
              src={`${selectConversation.profilePic}`}
              alt=""
            />
          </span>{" "}
          <span className="text-gray-900 font-bold">
            {selectConversation.fullName}
          </span>
        </div>

        <Messages />
        <MessageInput />
      </>
    </div>
  );
};
export default MessageContainer;
