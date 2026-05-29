import { COLLEGES } from "@/lib/data/colleges";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CollegeDetailClient } from "./CollegeDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return COLLEGES.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const college = COLLEGES.find((c) => c.id === id);
  if (!college) return { title: "College Not Found" };
  return {
    title: college.name,
    description: `${college.name} — ${college.location.city}, ${college.location.state}. Fees: ₹${college.fees.min.toLocaleString()} – ₹${college.fees.max.toLocaleString()}/yr`,
  };
}

export default async function CollegeDetailPage({ params }: Props) {
  const { id } = await params;
  const college = COLLEGES.find((c) => c.id === id);
  if (!college) notFound();
  return <CollegeDetailClient college={college} />;
}
