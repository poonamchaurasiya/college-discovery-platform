import { useMemo, useState } from "react";
import { COLLEGES } from "@/lib/data/colleges";
import type { CollegeFilters } from "@/types/college";
import { useDebounce } from "./useDebounce";

const DEFAULT_FILTERS: CollegeFilters = {
  search: "",
  state: "",
  type: "",
  exam: "",
  courseLevel: "",
  minFees: 0,
  maxFees: 10000000,
  minRating: 0,
  sortBy: "rating",
};

const PAGE_SIZE = 6;

export function useCollegeSearch() {
  const [filters, setFilters] = useState<CollegeFilters>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(filters.search, 300);

  const filtered = useMemo(() => {
    let result = COLLEGES.filter((c) => {
      if (debouncedSearch) {
        const q = debouncedSearch.toLowerCase();
        const match =
          c.name.toLowerCase().includes(q) ||
          c.shortName.toLowerCase().includes(q) ||
          c.location.city.toLowerCase().includes(q) ||
          c.location.state.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (filters.state && c.location.state !== filters.state) return false;
      if (filters.type && c.type !== filters.type) return false;
      if (filters.exam && !c.exams.includes(filters.exam as never)) return false;
      if (filters.courseLevel && !c.courses.some((cr) => cr.level === filters.courseLevel)) return false;
      if (c.fees.min > filters.maxFees || c.fees.max < filters.minFees) return false;
      if (c.rating < filters.minRating) return false;
      return true;
    });

    result = [...result].sort((a, b) => {
      switch (filters.sortBy) {
        case "rating": return b.rating - a.rating;
        case "fees_asc": return a.fees.min - b.fees.min;
        case "fees_desc": return b.fees.max - a.fees.max;
        case "ranking": return (a.ranking.nirf ?? 999) - (b.ranking.nirf ?? 999);
        case "name": return a.name.localeCompare(b.name);
        default: return 0;
      }
    });

    return result;
  }, [debouncedSearch, filters]);

  const paginated = useMemo(() => filtered.slice(0, page * PAGE_SIZE), [filtered, page]);
  const hasMore = paginated.length < filtered.length;

  const updateFilter = <K extends keyof CollegeFilters>(key: K, value: CollegeFilters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  };

  const loadMore = () => setPage((p) => p + 1);

  const activeFilterCount = [
    filters.state, filters.type, filters.exam, filters.courseLevel,
    filters.minRating > 0 ? "rating" : "",
    filters.minFees > 0 || filters.maxFees < 10000000 ? "fees" : "",
  ].filter(Boolean).length;

  return { filters, updateFilter, resetFilters, results: paginated, total: filtered.length, hasMore, loadMore, activeFilterCount };
}
