import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses | Edwin Academy",
  description:
    "Explore industry-aligned courses at Edwin Academy designed to build real-world skills in technology, business, and creative fields.",
  keywords: [
    "Edwin Academy courses",
    "Career training Kerala",
    "Professional courses",
    "IT courses Kerala",
    "Job-ready training",
  ],
  alternates: {
    canonical: "https://www.edwinacademy.com/course",
  },
  openGraph: {
    title: "Explore Career-Building Courses | Edwin Academy",
    description:
      "Join our specialized programs and gain practical skills for your career journey. Learn from industry professionals at Edwin Academy.",
    url: "https://www.edwinacademy.com/course",
  },
};

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}