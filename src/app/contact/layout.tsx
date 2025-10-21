import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Edwin Academy | Get in Touch With Us",
  description:
    "Get in touch with Edwin Academy. Visit our centers in Kannur, Calicut, and Kochi or contact us via phone or social media.",
  keywords: [
    "Edwin Academy contact",
    "Training institute contact Kerala",
    "Kannur Calicut Kochi academy",
    "Contact Edwin Academy",
  ],
  alternates: {
    canonical: "https://www.edwinacademy.com/contact",
  },
  openGraph: {
    title: "Contact Edwin Academy | Locations in Kannur, Calicut & Kochi",
    description:
      "Reach out to Edwin Academy for admissions, course info, or placements. We're here to help you achieve your career goals.",
    url: "https://www.edwinacademy.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

