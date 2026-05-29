import Link from "next/link";
import { BookOpen } from "lucide-react";
import { GitHubIcon, LinkedInIcon, LeetCodeIcon } from "@/components/ui/SocialIcons";

const DEVELOPER = {
  name: "Poonam Chaurasiya",
  github: "https://github.com/poonamchaurasiya",
  linkedin: "https://www.linkedin.com/in/poonam-chaurasiya/",
  leetcode: "https://leetcode.com/u/punamchaurasia/",
};

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg mb-3">
              <BookOpen size={20} />
              <span>CollegeFind</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              India&apos;s trusted platform for college discovery, comparisons, and admissions guidance.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/colleges" className="hover:text-white transition-colors">All Colleges</Link></li>
              <li><Link href="/compare" className="hover:text-white transition-colors">Compare Colleges</Link></li>
              <li><Link href="/saved" className="hover:text-white transition-colors">Saved</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Popular Streams</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/colleges?exam=JEE+Advanced" className="hover:text-white transition-colors">JEE Advanced</Link></li>
              <li><Link href="/colleges?exam=NEET" className="hover:text-white transition-colors">NEET</Link></li>
              <li><Link href="/colleges?exam=CAT" className="hover:text-white transition-colors">CAT / MBA</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Developer</h4>
            <div className="space-y-2 text-sm">
              <p className="text-white font-medium">{DEVELOPER.name}</p>
              <ul className="space-y-2 mt-1">
                <li>
                  <a href={DEVELOPER.github} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-white transition-colors">
                    <GitHubIcon size={14} />
                    GitHub
                  </a>
                </li>
                <li>
                  <a href={DEVELOPER.linkedin} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                    <LinkedInIcon size={14} />
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href={DEVELOPER.leetcode} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                    <LeetCodeIcon size={14} />
                    LeetCode
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} CollegeFind. All rights reserved.</span>
          <span className="flex items-center gap-3">
            Built by{" "}
            <a href={DEVELOPER.github} target="_blank" rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors font-medium">
              {DEVELOPER.name}
            </a>
            <span className="flex items-center gap-2">
              <a href={DEVELOPER.github} target="_blank" rel="noopener noreferrer"
                className="hover:text-white transition-colors" aria-label="GitHub">
                <GitHubIcon size={14} />
              </a>
              <a href={DEVELOPER.linkedin} target="_blank" rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors" aria-label="LinkedIn">
                <LinkedInIcon size={14} />
              </a>
              <a href={DEVELOPER.leetcode} target="_blank" rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors" aria-label="LeetCode">
                <LeetCodeIcon size={14} />
              </a>
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
