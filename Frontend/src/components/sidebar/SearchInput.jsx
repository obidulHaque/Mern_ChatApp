import { useState } from "react";
import { Search } from "lucide-react";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import { useToast } from "@/hooks/use-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectConversation } = useConversation();
  const { conversations } = useGetConversations();
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectConversation(conversation);
      setSearch("");
    } else toast({ title: "No such user found!" });
  };
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full lg:w-[60vw] w-[85vw] lg:h-[2vw] h-[10vw] px-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle text-white">
        <Search className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};
export default SearchInput;
