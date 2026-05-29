"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, Suspense } from "react";
import { CollegeCard } from "@/components/colleges/CollegeCard";
import { CollegeFilters } from "@/components/colleges/CollegeFilters";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useCollegeSearch } from "@/lib/hooks/useCollegeSearch";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

function CollegesContent() {
  const searchParams = useSearchParams();
  const { filters, updateFilter, resetFilters, results, total, hasMore, loadMore, activeFilterCount } = useCollegeSearch();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const exam = searchParams.get("exam");
    if (exam) updateFilter("exam", exam as never);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Colleges in India</h1>
        <p className="text-slate-500 mt-1">Discover and compare top colleges</p>
      </div>

      {/* Search + Mobile Filter Toggle */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search colleges, cities, states..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            leftIcon={<Search size={16} />}
            rightIcon={filters.search ? (
              <button onClick={() => updateFilter("search", "")}><X size={14} /></button>
            ) : undefined}
          />
        </div>
        <Button
          variant={filtersOpen ? "primary" : "outline"}
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="md:hidden shrink-0"
        >
          <SlidersHorizontal size={16} />
          {activeFilterCount > 0 && <span className="bg-white text-blue-600 text-xs rounded-full w-4 h-4 flex items-center justify-center">{activeFilterCount}</span>}
        </Button>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside className={`w-64 shrink-0 ${filtersOpen ? "block" : "hidden"} md:block`}>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sticky top-24">
            <CollegeFilters
              filters={filters}
              onUpdate={updateFilter}
              onReset={resetFilters}
              activeCount={activeFilterCount}
            />
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-slate-500">
              Showing <span className="font-semibold text-slate-700">{results.length}</span> of{" "}
              <span className="font-semibold text-slate-700">{total}</span> colleges
            </p>
            {activeFilterCount > 0 && (
              <button onClick={resetFilters} className="text-xs text-red-500 hover:text-red-600 font-medium flex items-center gap-1">
                <X size={12} /> Clear filters
              </button>
            )}
          </div>

          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Search size={48} className="text-slate-200 mb-4" />
              <h3 className="text-lg font-semibold text-slate-700 mb-2">No colleges found</h3>
              <p className="text-slate-400 mb-4">Try adjusting your filters or search terms</p>
              <Button variant="secondary" onClick={resetFilters}>Clear all filters</Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                {results.map((college) => (
                  <CollegeCard key={college.id} college={college} />
                ))}
              </div>

              {hasMore && (
                <div className="flex justify-center mt-8">
                  <Button variant="outline" onClick={loadMore} className="px-8">
                    Load more colleges
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CollegesPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh] text-slate-400">Loading...</div>}>
      <CollegesContent />
    </Suspense>
  );
}
