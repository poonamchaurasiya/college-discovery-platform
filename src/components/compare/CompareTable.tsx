"use client";
import { College } from "@/types/college";
import { useCompareStore } from "@/lib/store/compareStore";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency, formatPackage, cn } from "@/lib/utils";
import { MapPin, X, Check, Minus } from "lucide-react";
import Link from "next/link";

interface CompareTableProps {
  colleges: College[];
}

function Cell({ children, highlight }: { children: React.ReactNode; highlight?: boolean }) {
  return (
    <td className={cn("px-4 py-4 text-sm align-top", highlight && "bg-blue-50/50")}>
      {children}
    </td>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <tr className="border-b border-slate-100 last:border-0">
      <td className="px-4 py-4 text-sm font-medium text-slate-500 bg-slate-50 w-36 align-top sticky left-0">{label}</td>
      {children}
    </tr>
  );
}

function BestValue({ values, lowerIsBetter = false }: { values: number[]; lowerIsBetter?: boolean }) {
  const best = lowerIsBetter ? Math.min(...values) : Math.max(...values);
  return (
    <>
      {values.map((v, i) => (
        <Cell key={i} highlight={v === best}>
          <span className={cn("font-semibold", v === best ? "text-emerald-600" : "text-slate-700")}>
            {formatPackage(v)}
          </span>
          {v === best && <span className="ml-1 text-xs text-emerald-500">Best</span>}
        </Cell>
      ))}
    </>
  );
}

export function CompareTable({ colleges }: CompareTableProps) {
  const { remove } = useCompareStore();

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm bg-white">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="px-4 py-4 bg-slate-50 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-36 sticky left-0">
              College
            </th>
            {colleges.map((college) => (
              <th key={college.id} className="px-4 py-4 text-left">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <img src={college.logo} alt="" className="w-6 h-6 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      <Link href={`/colleges/${college.id}`} className="text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors line-clamp-2">
                        {college.shortName}
                      </Link>
                    </div>
                    <p className="flex items-center gap-1 text-xs text-slate-400">
                      <MapPin size={10} /> {college.location.city}
                    </p>
                  </div>
                  <button onClick={() => remove(college.id)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 shrink-0">
                    <X size={14} />
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <Row label="Rating">
            {colleges.map((c) => (
              <Cell key={c.id}>
                <div className="flex items-center gap-1.5">
                  <StarRating rating={c.rating} size="sm" />
                  <span className="font-semibold text-slate-700">{c.rating.toFixed(1)}</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{c.reviewCount.toLocaleString()} reviews</p>
              </Cell>
            ))}
          </Row>

          <Row label="Location">
            {colleges.map((c) => (
              <Cell key={c.id}>
                <span className="text-slate-800">{c.location.city}, {c.location.state}</span>
              </Cell>
            ))}
          </Row>

          <Row label="Type">
            {colleges.map((c) => (
              <Cell key={c.id}>
                <Badge variant={c.type === "Government" ? "success" : c.type === "Deemed" ? "primary" : "warning"}>
                  {c.type}
                </Badge>
              </Cell>
            ))}
          </Row>

          <Row label="NIRF Rank">
            {(() => {
              const nirfValues = colleges.map((c) => c.ranking.nirf ?? Infinity);
              const best = Math.min(...nirfValues);
              return colleges.map((c) => (
                <Cell key={c.id} highlight={c.ranking.nirf === best}>
                  <span className={cn("font-semibold", c.ranking.nirf === best ? "text-emerald-600" : "text-slate-700")}>
                    {c.ranking.nirf ? `#${c.ranking.nirf}` : "–"}
                  </span>
                  {c.ranking.nirf === best && c.ranking.nirf && <span className="ml-1 text-xs text-emerald-500">Best</span>}
                </Cell>
              ));
            })()}
          </Row>

          <Row label="Annual Fees">
            {(() => {
              const feeVals = colleges.map((c) => c.fees.min);
              const best = Math.min(...feeVals);
              return colleges.map((c) => (
                <Cell key={c.id} highlight={c.fees.min === best}>
                  <p className={cn("font-semibold", c.fees.min === best ? "text-emerald-600" : "text-slate-700")}>
                    {formatCurrency(c.fees.min)} – {formatCurrency(c.fees.max)}
                  </p>
                  {c.fees.min === best && <span className="text-xs text-emerald-500">Most Affordable</span>}
                </Cell>
              ));
            })()}
          </Row>

          <Row label="Avg Package">
            <BestValue values={colleges.map((c) => c.placements.averagePackage)} />
          </Row>

          <Row label="Highest Pkg">
            <BestValue values={colleges.map((c) => c.placements.highestPackage)} />
          </Row>

          <Row label="Placement %">
            {(() => {
              const rates = colleges.map((c) => c.placements.placementRate);
              const best = Math.max(...rates);
              return colleges.map((c) => (
                <Cell key={c.id} highlight={c.placements.placementRate === best}>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-100 rounded-full h-2 max-w-[80px]">
                      <div
                        className={cn("h-2 rounded-full", c.placements.placementRate === best ? "bg-emerald-500" : "bg-blue-400")}
                        style={{ width: `${c.placements.placementRate}%` }}
                      />
                    </div>
                    <span className={cn("text-sm font-semibold", c.placements.placementRate === best ? "text-emerald-600" : "text-slate-700")}>
                      {c.placements.placementRate}%
                    </span>
                  </div>
                </Cell>
              ));
            })()}
          </Row>

          <Row label="Est. Year">
            {colleges.map((c) => (
              <Cell key={c.id}><span className="text-slate-700">{c.established}</span></Cell>
            ))}
          </Row>

          <Row label="Campus">
            {colleges.map((c) => (
              <Cell key={c.id}><span className="text-slate-700">{c.campusSize}</span></Cell>
            ))}
          </Row>

          <Row label="Students">
            {colleges.map((c) => (
              <Cell key={c.id}><span className="text-slate-700">{c.totalStudents.toLocaleString()}</span></Cell>
            ))}
          </Row>

          <Row label="Exams">
            {colleges.map((c) => (
              <Cell key={c.id}>
                <div className="flex flex-wrap gap-1">
                  {c.exams.map((e) => <Badge key={e} variant="outline" className="text-xs">{e}</Badge>)}
                </div>
              </Cell>
            ))}
          </Row>

          <Row label="Accreditation">
            {colleges.map((c) => (
              <Cell key={c.id}>
                <div className="flex flex-wrap gap-1">
                  {c.accreditation.map((a) => <Badge key={a} variant="primary" className="text-xs">{a}</Badge>)}
                </div>
              </Cell>
            ))}
          </Row>

          <Row label="Top Recruiters">
            {colleges.map((c) => (
              <Cell key={c.id}>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {c.placements.topRecruiters.slice(0, 4).join(", ")}
                  {c.placements.topRecruiters.length > 4 && ` +${c.placements.topRecruiters.length - 4} more`}
                </p>
              </Cell>
            ))}
          </Row>

          <Row label="Facilities">
            {colleges.map((c) => (
              <Cell key={c.id}>
                <div className="space-y-1">
                  {c.facilities.slice(0, 4).map((f) => (
                    <p key={f} className="flex items-center gap-1.5 text-xs text-slate-600">
                      <Check size={11} className="text-emerald-500 shrink-0" /> {f}
                    </p>
                  ))}
                </div>
              </Cell>
            ))}
          </Row>
        </tbody>
      </table>
    </div>
  );
}
