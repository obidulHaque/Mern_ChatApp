import useConversation from "@/zustand/useConversation";
import { useSocketContext } from "@/context/SocketContext";

const Conversation = ({ conversation, emoji }) => {
  const { selectConversation, setSelectConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);
  const selection = selectConversation?._id === conversation._id;
  const activiti = isOnline ? "block" : "hidden";
  // console.log(selection);
  const bg = selection ? " bg-sky-600" : "";
  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${bg}`}
        onClick={() => setSelectConversation(conversation)}
      >
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img src={`${conversation.profilePic}`} alt="user avatar" />
          </div>
        </div>
        <div
          className={`lg:w-[0.5vw] w-[3vw] lg:h-[0.5vw] h-[3vw] bg-green-500 rounded-lg mb-10 ${activiti}`}
        ></div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullName} </p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      <div className="divider my-0 py-0 h-1" />
    </>
  );
};
export default Conversation;
