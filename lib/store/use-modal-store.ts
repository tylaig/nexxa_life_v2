import { create } from "zustand"

export type ModalType = 
  | "addKnowledgeSource" 
  | "createAiAgent" 
  | "newContact" 
  | "newSegment" 
  | "newOrder" 
  | "newTemplate" 
  | "newAutomation"
  | "exportData"

export interface ModalStore {
  isOpen: boolean
  type: ModalType | null
  data: any
  open: (type: ModalType, data?: any) => void
  close: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  type: null,
  data: {},
  open: (type, data = {}) => set({ isOpen: true, type, data }),
  close: () => set({ isOpen: false, type: null, data: {} }),
}))
