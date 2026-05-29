"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SavedStore {
  savedIds: string[];
  save: (id: string) => void;
  unsave: (id: string) => void;
  toggle: (id: string) => void;
  isSaved: (id: string) => boolean;
}

export const useSavedStore = create<SavedStore>()(
  persist(
    (set, get) => ({
      savedIds: [],
      save: (id) => {
        if (!get().savedIds.includes(id)) set({ savedIds: [...get().savedIds, id] });
      },
      unsave: (id) => set({ savedIds: get().savedIds.filter((i) => i !== id) }),
      toggle: (id) => {
        const { savedIds } = get();
        set({ savedIds: savedIds.includes(id) ? savedIds.filter((i) => i !== id) : [...savedIds, id] });
      },
      isSaved: (id) => get().savedIds.includes(id),
    }),
    { name: "saved-colleges" }
  )
);
