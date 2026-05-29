"use client";
import { useSavedStore } from "@/lib/store/savedStore";
import { useAuthStore } from "@/lib/store/authStore";
import { COLLEGES } from "@/lib/data/colleges";
import { CollegeCard } from "@/components/colleges/CollegeCard";
import { Button } from "@/components/ui/Button";
import { Heart, BookOpen, LogIn } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AuthModal } from "@/components/auth/AuthModal";

export default function SavedPage() {
  const { savedIds } = useSavedStore();
  const { user } = useAuthStore();
  const [authOpen, setAuthOpen] = useState(false);

  const savedColleges = savedIds
    .map((id) => COLLEGES.find((c) => c.id === id))
    .filter(Boolean) as typeof COLLEGES;

  if (!user) {
    return (
      <>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
          <LogIn size={64} className="text-slate-200 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-slate-900 mb-3">Sign In to Save Colleges</h1>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">
            Create a free account to save colleges and access them later from any device.
          </p>
          <Button size="lg" onClick={() => setAuthOpen(true)}>
            <LogIn size={18} /> Sign In / Create Account
          </Button>
        </div>
        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      </>
    );
  }

  if (savedColleges.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <Heart size={64} className="text-slate-200 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-slate-900 mb-3">No Saved Colleges</h1>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          Tap the heart icon on any college card to save it here for later.
        </p>
        <Link href="/colleges">
          <Button size="lg">
            <BookOpen size={18} /> Explore Colleges
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Saved Colleges</h1>
        <p className="text-slate-500 mt-1">{savedColleges.length} college{savedColleges.length !== 1 ? "s" : ""} saved</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {savedColleges.map((college) => (
          <CollegeCard key={college.id} college={college} />
        ))}
      </div>
    </div>
  );
}
