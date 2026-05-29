"use client";
import { College } from "@/types/college";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { useCompareStore } from "@/lib/store/compareStore";
import { useSavedStore } from "@/lib/store/savedStore";
import { useAuthStore } from "@/lib/store/authStore";
import { formatCurrency, formatPackage, cn } from "@/lib/utils";
import {
  MapPin, ExternalLink, Heart, GitCompare, Building, GraduationCap,
  TrendingUp, MessageSquare, CheckCircle, ThumbsUp, Calendar, Users
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AuthModal } from "@/components/auth/AuthModal";

export function CollegeDetailClient({ college }: { college: College }) {
  const { toggle: toggleCompare, has: inCompare, isFull } = useCompareStore();
  const { toggle: toggleSave, isSaved } = useSavedStore();
  const { user } = useAuthStore();
  const [authOpen, setAuthOpen] = useState(false);

  const comparing = inCompare(college.id);
  const saved = isSaved(college.id);

  const handleSave = () => {
    if (!user) { setAuthOpen(true); return; }
    toggleSave(college.id);
  };

  return (
    <>
      {/* Hero */}
      <div className="relative h-56 md:h-72 bg-gradient-to-br from-blue-800 to-indigo-900 overflow-hidden">
        <img src={college.heroImage} alt={college.name} className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 max-w-7xl mx-auto">
          <div className="flex items-end gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center overflow-hidden shrink-0">
              <img src={college.logo} alt="" className="w-12 h-12 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            </div>
            <div className="text-white min-w-0">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="primary" className="bg-blue-500/80">{college.type}</Badge>
                {college.ranking.nirf && <Badge variant="warning">NIRF #{college.ranking.nirf}</Badge>}
                {college.accreditation.map((a) => <Badge key={a} className="bg-white/20 text-white">{a}</Badge>)}
              </div>
              <h1 className="text-xl md:text-3xl font-bold leading-tight">{college.name}</h1>
              <p className="flex items-center gap-1.5 text-blue-100 mt-1 text-sm">
                <MapPin size={14} /> {college.location.city}, {college.location.state} · Est. {college.established}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Action bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <div className="flex items-center gap-4">
            <div>
              <StarRating rating={college.rating} size="md" showValue />
              <p className="text-xs text-slate-400 mt-0.5">{college.reviewCount.toLocaleString()} reviews</p>
            </div>
            <div className="h-10 w-px bg-slate-100" />
            <div>
              <p className="text-xs text-slate-400">Annual Fees</p>
              <p className="font-semibold text-slate-800">{formatCurrency(college.fees.min)} – {formatCurrency(college.fees.max)}</p>
            </div>
            <div className="h-10 w-px bg-slate-100 hidden sm:block" />
            <div className="hidden sm:block">
              <p className="text-xs text-slate-400">Avg Package</p>
              <p className="font-semibold text-emerald-600">{formatPackage(college.placements.averagePackage)}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={saved ? "danger" : "outline"}
              size="sm"
              onClick={handleSave}
            >
              <Heart size={15} className={saved ? "fill-white" : ""} />
              {saved ? "Saved" : "Save"}
            </Button>
            <Button
              variant={comparing ? "primary" : "secondary"}
              size="sm"
              onClick={() => toggleCompare(college.id)}
              disabled={!comparing && isFull()}
            >
              <GitCompare size={15} />
              {comparing ? "Added" : "Compare"}
            </Button>
            <a href={college.website} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                <ExternalLink size={14} />
                Website
              </Button>
            </a>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="placements">Placements</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  <h2 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Building size={18} className="text-blue-600" /> About
                  </h2>
                  <p className="text-slate-600 leading-relaxed">{college.about}</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <CheckCircle size={18} className="text-blue-600" /> Highlights
                  </h2>
                  <div className="grid grid-cols-2 gap-2">
                    {college.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2 text-sm text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                        {h}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  <h2 className="font-semibold text-slate-900 mb-4">Facilities</h2>
                  <div className="flex flex-wrap gap-2">
                    {college.facilities.map((f) => (
                      <span key={f} className="bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 text-sm text-slate-700">{f}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                  <h3 className="font-semibold text-slate-900 mb-4">Quick Facts</h3>
                  <dl className="space-y-3">
                    {[
                      { label: "Established", value: college.established.toString(), icon: Calendar },
                      { label: "Total Students", value: college.totalStudents.toLocaleString(), icon: Users },
                      { label: "Campus Size", value: college.campusSize, icon: Building },
                    ].map(({ label, value, icon: Icon }) => (
                      <div key={label} className="flex items-center justify-between">
                        <span className="text-sm text-slate-500 flex items-center gap-1.5"><Icon size={14} />{label}</span>
                        <span className="text-sm font-semibold text-slate-800">{value}</span>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                  <h3 className="font-semibold text-slate-900 mb-3">Entrance Exams</h3>
                  <div className="flex flex-wrap gap-2">
                    {college.exams.map((e) => (
                      <Link key={e} href={`/colleges?exam=${encodeURIComponent(e)}`}>
                        <Badge variant="primary" className="cursor-pointer hover:bg-blue-200 transition-colors">{e}</Badge>
                      </Link>
                    ))}
                  </div>
                </div>

                {college.ranking.nirf && (
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-5">
                    <h3 className="font-semibold text-slate-900 mb-3">Rankings</h3>
                    <div className="space-y-2">
                      {college.ranking.nirf && (
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">NIRF India</span>
                          <span className="font-bold text-amber-700">#{college.ranking.nirf}</span>
                        </div>
                      )}
                      {college.ranking.qs && (
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">QS World</span>
                          <span className="font-bold text-amber-700">#{college.ranking.qs}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses">
            <div className="space-y-3">
              {college.courses.map((course) => (
                <div key={course.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900">{course.name}</h3>
                      <Badge variant={course.level === "UG" ? "primary" : course.level === "PG" ? "success" : "warning"}>
                        {course.level}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-500 flex items-center gap-3">
                      <span className="flex items-center gap-1"><Calendar size={13} /> {course.duration}</span>
                      <span>{course.seats} seats</span>
                    </p>
                    <p className="text-xs text-slate-400 mt-1">Eligibility: {course.eligibility}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400">Annual Fees</p>
                    <p className="text-lg font-bold text-slate-900">{formatCurrency(course.fees)}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Placements Tab */}
          <TabsContent value="placements">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h2 className="font-semibold text-slate-900 mb-5 flex items-center gap-2">
                  <TrendingUp size={18} className="text-blue-600" /> Placement Statistics ({college.placements.year})
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Average Package", value: formatPackage(college.placements.averagePackage), color: "text-blue-600" },
                    { label: "Highest Package", value: formatPackage(college.placements.highestPackage), color: "text-emerald-600" },
                    { label: "Median Package", value: formatPackage(college.placements.medianPackage), color: "text-purple-600" },
                    { label: "Placement Rate", value: `${college.placements.placementRate}%`, color: "text-amber-600" },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="bg-slate-50 rounded-xl p-4">
                      <p className="text-xs text-slate-400 mb-1">{label}</p>
                      <p className={`text-xl font-bold ${color}`}>{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5">
                  <p className="text-sm text-slate-500 mb-2">Placement Rate</p>
                  <div className="bg-slate-100 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-emerald-500 h-3 rounded-full transition-all"
                      style={{ width: `${college.placements.placementRate}%` }}
                    />
                  </div>
                  <p className="text-right text-xs text-slate-400 mt-1">{college.placements.placementRate}%</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h2 className="font-semibold text-slate-900 mb-4">Top Recruiters</h2>
                <div className="flex flex-wrap gap-2">
                  {college.placements.topRecruiters.map((r) => (
                    <span key={r} className="bg-blue-50 text-blue-700 border border-blue-100 rounded-lg px-3 py-1.5 text-sm font-medium">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <div className="space-y-4">
              {college.reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center">
                        {review.authorAvatar}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{review.authorName}</p>
                        <p className="text-xs text-slate-400">{review.course} · Batch {review.batch}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <StarRating rating={review.rating} size="sm" showValue />
                      <p className="text-xs text-slate-400">{new Date(review.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</p>
                    </div>
                  </div>

                  <h3 className="font-semibold text-slate-900 mb-2">{review.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{review.body}</p>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs font-semibold text-emerald-600 mb-1.5">Pros</p>
                      {review.pros.map((p) => (
                        <p key={p} className="flex items-start gap-1.5 text-xs text-slate-600 mb-1">
                          <span className="text-emerald-500 mt-0.5">+</span> {p}
                        </p>
                      ))}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-red-500 mb-1.5">Cons</p>
                      {review.cons.map((c) => (
                        <p key={c} className="flex items-start gap-1.5 text-xs text-slate-600 mb-1">
                          <span className="text-red-400 mt-0.5">−</span> {c}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-slate-50 text-xs text-slate-400">
                    <ThumbsUp size={12} /> {review.helpful} found this helpful
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
