"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_COMPARE = 3;

interface CompareStore {
  ids: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  clear: () => void;
  has: (id: string) => boolean;
  isFull: () => boolean;
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      ids: [],
      add: (id) => {
        const { ids } = get();
        if (ids.length < MAX_COMPARE && !ids.includes(id)) {
          set({ ids: [...ids, id] });
        }
      },
      remove: (id) => set({ ids: get().ids.filter((i) => i !== id) }),
      toggle: (id) => {
        const { ids } = get();
        if (ids.includes(id)) {
          set({ ids: ids.filter((i) => i !== id) });
        } else if (ids.length < MAX_COMPARE) {
          set({ ids: [...ids, id] });
        }
      },
      clear: () => set({ ids: [] }),
      has: (id) => get().ids.includes(id),
      isFull: () => get().ids.length >= MAX_COMPARE,
    }),
    { name: "compare-store" }
  )
);
