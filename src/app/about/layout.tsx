import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Edwin Academy",
  description:
    "Edwin Academy is a future-focused training institute in Kerala that empowers learners through expert-led courses and hands-on experience.",
  keywords: [
    "About Edwin Academy",
    "Edwin Academy Kerala",
    "Training institute Kerala",
    "Career learning Kerala",
  ],
  openGraph: {
    title: "About Edwin Academy | Building Confident Professionals",
    description:
      "Learn about Edwin Academy’s mission, vision, and commitment to shaping future-ready professionals.",
    url: "https://www.edwinacademy.com/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}