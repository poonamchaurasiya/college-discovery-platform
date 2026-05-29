"use client";
import Link from "next/link";
import { useCompareStore } from "@/lib/store/compareStore";
import { COLLEGES } from "@/lib/data/colleges";
import { Button } from "@/components/ui/Button";
import { X, GitCompare } from "lucide-react";

export function CompareBar() {
  const { ids, remove, clear } = useCompareStore();
  if (ids.length === 0) return null;

  const colleges = ids.map((id) => COLLEGES.find((c) => c.id === id)).filter(Boolean);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700 shrink-0">
          <GitCompare size={16} />
          <span className="hidden sm:inline">Comparing</span>
          <span className="bg-blue-600 text-white text-xs rounded-full px-1.5 py-0.5">{ids.length}/3</span>
        </div>

        <div className="flex items-center gap-2 flex-1 min-w-0 overflow-x-auto">
          {colleges.map((college) => college && (
            <div key={college.id} className="flex items-center gap-1.5 bg-blue-50 border border-blue-100 rounded-lg px-2.5 py-1.5 shrink-0">
              <span className="text-xs font-medium text-blue-800 max-w-[140px] truncate">{college.shortName}</span>
              <button onClick={() => remove(college.id)} className="text-blue-400 hover:text-blue-600">
                <X size={12} />
              </button>
            </div>
          ))}
          {Array.from({ length: 3 - ids.length }).map((_, i) => (
            <div key={i} className="flex items-center justify-center w-24 h-8 border border-dashed border-slate-200 rounded-lg shrink-0">
              <span className="text-xs text-slate-400">+ Add</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button onClick={clear} className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Clear</button>
          <Link href="/compare">
            <Button size="sm" disabled={ids.length < 2}>Compare Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
