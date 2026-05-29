"use client";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { RangeSlider } from "@/components/ui/RangeSlider";
import { STATES, COLLEGE_TYPES, EXAMS, COURSE_LEVELS } from "@/lib/data/colleges";
import type { CollegeFilters } from "@/types/college";
import { SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollegeFiltersProps {
  filters: CollegeFilters;
  onUpdate: <K extends keyof CollegeFilters>(key: K, value: CollegeFilters[K]) => void;
  onReset: () => void;
  activeCount: number;
}

export function CollegeFilters({ filters, onUpdate, onReset, activeCount }: CollegeFiltersProps) {
  return (
    <aside className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-semibold text-slate-900">
          <SlidersHorizontal size={16} />
          Filters
          {activeCount > 0 && (
            <span className="bg-blue-100 text-blue-700 text-xs rounded-full px-2 py-0.5">{activeCount}</span>
          )}
        </h3>
        {activeCount > 0 && (
          <button onClick={onReset} className="flex items-center gap-1 text-xs text-slate-500 hover:text-red-500 transition-colors">
            <X size={12} /> Clear all
          </button>
        )}
      </div>

      <Select
        label="Sort By"
        value={filters.sortBy}
        onChange={(e) => onUpdate("sortBy", e.target.value as CollegeFilters["sortBy"])}
        options={[
          { value: "rating", label: "Highest Rated" },
          { value: "ranking", label: "NIRF Ranking" },
          { value: "fees_asc", label: "Fees: Low to High" },
          { value: "fees_desc", label: "Fees: High to Low" },
          { value: "name", label: "Name (A-Z)" },
        ]}
      />

      <Select
        label="State"
        value={filters.state}
        onChange={(e) => onUpdate("state", e.target.value)}
        placeholder="All States"
        options={STATES.map((s) => ({ value: s, label: s }))}
      />

      <Select
        label="College Type"
        value={filters.type}
        onChange={(e) => onUpdate("type", e.target.value as CollegeFilters["type"])}
        placeholder="All Types"
        options={COLLEGE_TYPES.map((t) => ({ value: t, label: t }))}
      />

      <Select
        label="Entrance Exam"
        value={filters.exam}
        onChange={(e) => onUpdate("exam", e.target.value as CollegeFilters["exam"])}
        placeholder="All Exams"
        options={EXAMS.map((e) => ({ value: e, label: e }))}
      />

      <Select
        label="Course Level"
        value={filters.courseLevel}
        onChange={(e) => onUpdate("courseLevel", e.target.value as CollegeFilters["courseLevel"])}
        placeholder="All Levels"
        options={COURSE_LEVELS.map((l) => ({ value: l, label: l }))}
      />

      <RangeSlider
        label="Max Fees (Annual)"
        min={0}
        max={10000000}
        value={filters.maxFees}
        onChange={(v) => onUpdate("maxFees", v)}
      />

      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-slate-700">Min Rating</span>
          <span className="text-slate-500">{filters.minRating > 0 ? `${filters.minRating}+` : "Any"}</span>
        </div>
        <div className="flex gap-2">
          {[0, 3, 3.5, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => onUpdate("minRating", r)}
              className={cn(
                "flex-1 py-1.5 rounded-lg text-xs font-medium border transition-colors",
                filters.minRating === r
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-slate-200 text-slate-600 hover:border-blue-300"
              )}
            >
              {r === 0 ? "Any" : `${r}+`}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
