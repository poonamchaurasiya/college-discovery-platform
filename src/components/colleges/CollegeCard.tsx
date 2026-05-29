"use client";
import Link from "next/link";
import { College } from "@/types/college";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { useCompareStore } from "@/lib/store/compareStore";
import { useSavedStore } from "@/lib/store/savedStore";
import { useAuthStore } from "@/lib/store/authStore";
import { formatCurrency, formatPackage, cn } from "@/lib/utils";
import { MapPin, GitCompare, Heart, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { AuthModal } from "@/components/auth/AuthModal";

interface CollegeCardProps {
  college: College;
}

const typeVariant: Record<string, "primary" | "success" | "warning" | "default"> = {
  Government: "success",
  Deemed: "primary",
  Private: "warning",
  Autonomous: "default",
};

export function CollegeCard({ college }: CollegeCardProps) {
  const { toggle: toggleCompare, has: inCompare, isFull } = useCompareStore();
  const { toggle: toggleSave, isSaved } = useSavedStore();
  const { user } = useAuthStore();
  const [authOpen, setAuthOpen] = useState(false);

  const comparing = inCompare(college.id);
  const saved = isSaved(college.id);
  const canAddCompare = comparing || !isFull();

  const handleSave = () => {
    if (!user) { setAuthOpen(true); return; }
    toggleSave(college.id);
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
        <div className="relative h-40 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
          <img
            src={college.heroImage}
            alt={college.name}
            className="w-full h-full object-cover opacity-80"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
            <Badge variant={typeVariant[college.type] ?? "default"}>{college.type}</Badge>
            {college.ranking.nirf && (
              <Badge variant="warning">NIRF #{college.ranking.nirf}</Badge>
            )}
          </div>
          <button
            onClick={handleSave}
            className={cn(
              "absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-sm transition-colors",
              saved ? "bg-rose-500 text-white" : "bg-white/80 text-slate-500 hover:text-rose-500"
            )}
          >
            <Heart size={16} className={saved ? "fill-white" : ""} />
          </button>
        </div>

        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-white border border-slate-100 shadow-sm flex-shrink-0 flex items-center justify-center overflow-hidden">
              <img src={college.logo} alt="" className="w-8 h-8 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            </div>
            <div className="min-w-0">
              <Link href={`/colleges/${college.id}`} className="text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                {college.name}
              </Link>
              <p className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                <MapPin size={11} />
                {college.location.city}, {college.location.state}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <StarRating rating={college.rating} size="sm" />
            <span className="text-xs font-semibold text-slate-700">{college.rating.toFixed(1)}</span>
            <span className="text-xs text-slate-400">({college.reviewCount.toLocaleString()})</span>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
            <div className="bg-slate-50 rounded-lg p-2">
              <p className="text-slate-400">Annual Fees</p>
              <p className="font-semibold text-slate-800 mt-0.5">
                {formatCurrency(college.fees.min)} – {formatCurrency(college.fees.max)}
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-2">
              <p className="text-slate-400 flex items-center gap-1"><TrendingUp size={10} /> Avg Package</p>
              <p className="font-semibold text-emerald-700 mt-0.5">{formatPackage(college.placements.averagePackage)}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            {college.exams.slice(0, 3).map((exam) => (
              <Badge key={exam} variant="outline" className="text-xs">{exam}</Badge>
            ))}
          </div>

          <div className="mt-auto flex gap-2">
            <Link href={`/colleges/${college.id}`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full">View Details</Button>
            </Link>
            <Button
              variant={comparing ? "primary" : canAddCompare ? "secondary" : "ghost"}
              size="sm"
              onClick={() => toggleCompare(college.id)}
              disabled={!canAddCompare}
              title={!canAddCompare ? "Compare list is full (max 3)" : comparing ? "Remove from compare" : "Add to compare"}
            >
              <GitCompare size={15} />
            </Button>
          </div>
        </div>
      </div>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
