"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { useCompareStore } from "@/lib/store/compareStore";
import { useSavedStore } from "@/lib/store/savedStore";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { BookOpen, GitCompare, Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { AuthModal } from "@/components/auth/AuthModal";

const NAV_LINKS = [
  { href: "/colleges", label: "Colleges" },
  { href: "/compare", label: "Compare" },
  { href: "/saved", label: "Saved" },
];

export function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const { ids: compareIds } = useCompareStore();
  const { savedIds } = useSavedStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600">
              <BookOpen size={22} />
              <span>CollegeFind</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    pathname.startsWith(link.href)
                      ? "text-blue-600 bg-blue-50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  )}
                >
                  {link.label === "Compare" && compareIds.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {compareIds.length}
                    </span>
                  )}
                  {link.label === "Saved" && savedIds.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {savedIds.length}
                    </span>
                  )}
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">
                    {user.avatar}
                  </span>
                  <span className="text-sm text-slate-700">{user.name.split(" ")[0]}</span>
                  <Button variant="ghost" size="sm" onClick={logout}>Logout</Button>
                </div>
              ) : (
                <Button size="sm" onClick={() => setAuthOpen(true)}>Sign In</Button>
              )}
            </div>

            <button className="md:hidden p-2 rounded-lg hover:bg-slate-100" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium",
                  pathname.startsWith(link.href) ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"
                )}
              >
                {link.label}
                {link.label === "Compare" && compareIds.length > 0 && (
                  <span className="ml-auto bg-blue-600 text-white text-xs rounded-full px-1.5 py-0.5">{compareIds.length}</span>
                )}
              </Link>
            ))}
            <div className="pt-2 border-t border-slate-100">
              {user ? (
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-sm text-slate-700">{user.name}</span>
                  <Button variant="ghost" size="sm" onClick={() => { logout(); setMobileOpen(false); }}>Logout</Button>
                </div>
              ) : (
                <Button className="w-full" size="sm" onClick={() => { setAuthOpen(true); setMobileOpen(false); }}>Sign In</Button>
              )}
            </div>
          </div>
        )}
      </header>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
