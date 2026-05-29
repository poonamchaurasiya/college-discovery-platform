"use client";
import { useCompareStore } from "@/lib/store/compareStore";
import { COLLEGES } from "@/lib/data/colleges";
import { CompareTable } from "@/components/compare/CompareTable";
import { CollegeCard } from "@/components/colleges/CollegeCard";
import { Button } from "@/components/ui/Button";
import { GitCompare, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function ComparePage() {
  const { ids, clear } = useCompareStore();
  const colleges = ids.map((id) => COLLEGES.find((c) => c.id === id)).filter(Boolean) as typeof COLLEGES;

  if (ids.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <GitCompare size={64} className="text-slate-200 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-slate-900 mb-3">Nothing to Compare Yet</h1>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          Add up to 3 colleges to compare them side by side. Look for the <GitCompare size={14} className="inline" /> icon on any college card.
        </p>
        <Link href="/colleges">
          <Button size="lg">
            <Plus size={18} /> Browse Colleges
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Compare Colleges</h1>
          <p className="text-slate-500 mt-1">Side-by-side comparison of {colleges.length} college{colleges.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex gap-2">
          {ids.length < 3 && (
            <Link href="/colleges">
              <Button variant="outline" size="sm">
                <Plus size={15} /> Add More
              </Button>
            </Link>
          )}
          <Button variant="ghost" size="sm" onClick={clear} className="text-slate-400 hover:text-red-500">
            <Trash2 size={15} /> Clear All
          </Button>
        </div>
      </div>

      {ids.length < 2 && (
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-6 text-sm text-amber-700">
          Add at least 2 colleges to see the comparison. Currently comparing {ids.length} college.{" "}
          <Link href="/colleges" className="font-semibold underline">Browse colleges →</Link>
        </div>
      )}

      <CompareTable colleges={colleges} />

      {/* Suggestion strip */}
      {ids.length < 3 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Add more colleges to compare
            <span className="ml-2 text-sm font-normal text-slate-400">(click the compare icon)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {COLLEGES.filter((c) => !ids.includes(c.id)).slice(0, 3).map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
