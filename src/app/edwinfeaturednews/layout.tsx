import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Featured News, Updates & Insights | Edwin Academy",
  description:
    "Stay updated with the latest news, insights, and announcements from Edwin Academy. Discover stories, achievements, and industry trends.",
  keywords: [
    "Edwin Academy news",
    "Featured articles",
    "Academy updates",
    "Industry insights",
    "Edwin Academy blog",
  ],
  alternates: {
    canonical: "https://www.edwinacademy.com/edwinfeaturednews",
  },
  openGraph: {
    title: "Featured News, Updates & Insights | Edwin Academy",
    description:
      "Explore the latest news and updates from Edwin Academy. Stay informed about our programs, achievements, and industry developments.",
    url: "https://www.edwinacademy.com/edwinfeaturednews",
  },
};

export default function EdwinFeaturedNewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}