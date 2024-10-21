import { create } from "zustand";

const useConversation = create((set) => ({
  selectConversation: null,
  setSelectConversation: (selectConversation) => set({ selectConversation }),
  messages: [], // initialize messages as an array
  setMessages: (newMessages) => set({ messages: newMessages }), // merging with existing messages
}));

export default useConversation;
