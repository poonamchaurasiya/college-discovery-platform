import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { COLLEGES } from "@/lib/data/colleges";
import { CollegeCard } from "@/components/colleges/CollegeCard";
import { Search, GitCompare, Award, TrendingUp, Users } from "lucide-react";
import { GitHubIcon, LinkedInIcon, LeetCodeIcon } from "@/components/ui/SocialIcons";

const FEATURED_COLLEGES = COLLEGES.slice(0, 3);

const STATS = [
  { icon: Award, value: "12+", label: "Top Colleges" },
  { icon: Users, value: "50K+", label: "Students Helped" },
  { icon: TrendingUp, value: "₹35L+", label: "Highest Package" },
  { icon: GitCompare, value: "3-way", label: "Comparison" },
];

const EXAM_SHORTCUTS = [
  { exam: "JEE Advanced", color: "from-orange-500 to-red-500", count: COLLEGES.filter((c) => c.exams.includes("JEE Advanced")).length },
  { exam: "JEE Main", color: "from-blue-500 to-indigo-500", count: COLLEGES.filter((c) => c.exams.includes("JEE Main")).length },
  { exam: "NEET", color: "from-emerald-500 to-teal-500", count: COLLEGES.filter((c) => c.exams.includes("NEET")).length },
  { exam: "CAT", color: "from-purple-500 to-pink-500", count: COLLEGES.filter((c) => c.exams.includes("CAT")).length },
  { exam: "GATE", color: "from-amber-500 to-orange-500", count: COLLEGES.filter((c) => c.exams.includes("GATE")).length },
  { exam: "CLAT", color: "from-rose-500 to-pink-500", count: COLLEGES.filter((c) => c.exams.includes("CLAT")).length },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-4">India&apos;s #1 College Discovery Platform</p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Find Your <span className="text-yellow-300">Dream College</span> with Confidence
            </h1>
            <p className="text-blue-100 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl">
              Search and compare 1000+ colleges. Filter by exam, fees, location, and placements.
              Make the most important decision of your life — well informed.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/colleges">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 shadow-lg w-full sm:w-auto">
                  <Search size={18} />
                  Explore Colleges
                </Button>
              </Link>
              <Link href="/compare">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 w-full sm:w-auto">
                  <GitCompare size={18} />
                  Compare Colleges
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Icon size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xl font-bold text-slate-900">{value}</p>
                  <p className="text-xs text-slate-500">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Exam */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Browse by Entrance Exam</h2>
            <p className="text-slate-500 mt-1">Find colleges accepting your exam score</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {EXAM_SHORTCUTS.map(({ exam, color, count }) => (
            <Link
              key={exam}
              href={`/colleges?exam=${encodeURIComponent(exam)}`}
              className={`bg-gradient-to-br ${color} text-white rounded-2xl p-4 hover:opacity-90 transition-opacity`}
            >
              <p className="font-bold text-lg leading-tight">{exam}</p>
              <p className="text-xs text-white/80 mt-1">{count} colleges</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Colleges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Featured Colleges</h2>
            <p className="text-slate-500 mt-1">Top-rated institutions by our community</p>
          </div>
          <Link href="/colleges" className="text-sm text-blue-600 font-medium hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_COLLEGES.map((college) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Compare Colleges Side-by-Side</h3>
            <p className="text-indigo-100">Select up to 3 colleges and compare fees, placements, rankings and more.</p>
          </div>
          <Link href="/compare">
            <Button size="lg" className="bg-white text-indigo-700 hover:bg-indigo-50 shrink-0">
              <GitCompare size={18} />
              Start Comparing
            </Button>
          </Link>
        </div>
      </section>

      {/* Developer Profile */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shrink-0 shadow-lg">
            PC
          </div>
          <div className="text-center md:text-left">
            <p className="text-slate-400 text-sm font-medium uppercase tracking-widest mb-1">Built by</p>
            <h2 className="text-2xl font-bold text-white mb-1">Poonam Chaurasiya</h2>
            <p className="text-slate-400 text-sm max-w-md">
              Frontend Engineer passionate about building great user experiences. This platform was crafted with Next.js, React, TypeScript, and TailwindCSS.
            </p>
          </div>
          <div className="md:ml-auto flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <a
              href="https://github.com/poonamchaurasiya"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
            >
              <GitHubIcon size={16} /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/poonam-chaurasiya/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-blue-600/80 hover:bg-blue-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
            >
              <LinkedInIcon size={16} /> LinkedIn
            </a>
            <a
              href="https://leetcode.com/u/punamchaurasia/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-amber-500/80 hover:bg-amber-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
            >
              <LeetCodeIcon size={16} /> LeetCode
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
