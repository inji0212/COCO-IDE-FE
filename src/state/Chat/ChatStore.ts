import { create } from 'zustand';

export interface Message {
  memberId: string;
  message: string;
  nickname: string;
  createdAt: string;
  chatId: string;
  isDeleted: boolean;
}

interface ChatState {
  messages: Message[];
  addMessage: (message: Message) => void;
  deleteMessage: (id: string) => void;
  deleteAllMessages: () => void;
}

const useChatStore = create<ChatState>(set => ({
  messages: [], // 초기 메시지 배열

  // 메시지 추가 함수
  addMessage: (message: Message) =>
    set(state => {
      const newMessages = [...state.messages, message];
      return { messages: newMessages };
    }),

  // 메시지 삭제 함수
  deleteMessage: chatId =>
    set(state => ({
      messages: state.messages.filter(message => message.chatId !== chatId),
    })),
  // 모든 메시지를 삭제하는 함수
  deleteAllMessages: () => set({ messages: [] }), // 모든 메시지를 비우는 로직
}));

export default useChatStore;
