import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Placements | Edwin Academy",
  description:
    "Discover how Edwin Academy connects learners with top recruiters through dedicated placement support and career readiness programs.",
  keywords: [
    "Edwin Academy placements",
    "Job placement Kerala",
    "Career support",
    "Recruiters Kerala",
  ],
  alternates: {
    canonical: "https://www.edwinacademy.com/placements",
  },
  openGraph: {
    title: "Placements | Career Opportunities with Edwin Academy",
    description:
      "See how Edwin Academy helps students secure jobs and internships through strong industry partnerships and mentoring.",
    url: "https://www.edwinacademy.com/placements",
  },
};

export default function PlacementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}