import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edwin Excel Program | Career Accelerator Course",
  description:
    "Edwin Excel is a career accelerator program by Edwin Academy that empowers students with professional skills, mentorship, and placement opportunities.",
  keywords: [
    "Edwin Excel program",
    "Career accelerator Kerala",
    "Professional training",
    "Skill development courses",
  ],
  alternates: {
    canonical: "https://www.edwinacademy.com/edwin-excel",
  },
  openGraph: {
    title: "Edwin Excel | Future-Ready Career Program by Edwin Academy",
    description:
      "Transform your career with Edwin Excel — an exclusive program combining skills, mentoring, and placements.",
    url: "https://www.edwinacademy.com/edwin-excel",
  },
};

export default function EdwinexcelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}