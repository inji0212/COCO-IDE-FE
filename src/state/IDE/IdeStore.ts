import { create } from 'zustand';

interface LanguageStore {
  language: string;
  setLanguage: (language: string) => void;
  languageSelector: boolean;
  setLanguageSelector: (languageSelector: boolean) => void;
}

const useLanguageStore = create<LanguageStore>(set => ({
  language: 'python',
  setLanguage: language => set({ language }),
  languageSelector: false,
  setLanguageSelector: (languageSelector: boolean) => set({ languageSelector }),
}));

export default useLanguageStore;
