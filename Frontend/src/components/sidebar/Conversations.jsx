import Conversation from "./Conversation";
import useGetConversations from "@/hooks/useGetConversations";
import Skeleton from "../skeleton/Skeleton";
import { getRandomEmoji } from "@/utils/emoji";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  if (loading) {
    return <Skeleton />;
  }
  return (
    <div className="py-2 flex flex-col overflow-auto lg:block ">
      {conversations.map((conversation, indx) => (
        <Conversation
          conversation={conversation}
          key={indx}
          emoji={getRandomEmoji()}
        />
      ))}
    </div>
  );
};
export default Conversations;
