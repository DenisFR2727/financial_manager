import { create } from 'zustand';

interface MonthState {
  month: string;
  setMonth: (month: string) => void;
}

const getCurrentMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

export const useMonthStore = create<MonthState>((set) => ({
  month: getCurrentMonth(),
  setMonth: (month) => set({ month }),
}));
