import Conversation from "./Conversation";
import useGetConversations from "@/hooks/useGetConversations";
import Skeleton from "../skeleton/Skeleton";
const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  if (loading) {
    return <Skeleton />;
  }
  return (
    <div className="py-2 flex flex-col overflow-auto lg:block ">
      {conversations.map((conversation, indx) => (
        <Conversation conversation={conversation} key={indx} />
      ))}
    </div>
  );
};
export default Conversations;
