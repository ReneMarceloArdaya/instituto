import { create } from 'zustand';

type UserState = {
  userId: string | null;
  setUserId: (id: string | null) => void;
};

export const useUserStore = create<UserState>((set) => ({
  userId: null,
  setUserId: (id) => set({ userId: id }),
}));
