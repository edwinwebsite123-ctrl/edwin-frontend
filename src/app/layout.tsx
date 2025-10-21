// app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const parkinsans = localFont({
  src: [
    { path: "./fonts/Parkinsans-Light.ttf", weight: "300" },
    { path: "./fonts/Parkinsans-Regular.ttf", weight: "400" },
    { path: "./fonts/Parkinsans-Medium.ttf", weight: "500" },
    { path: "./fonts/Parkinsans-SemiBold.ttf", weight: "600" },
    { path: "./fonts/Parkinsans-Bold.ttf", weight: "700" },
    { path: "./fonts/Parkinsans-ExtraBold.ttf", weight: "800" },
  ],
  variable: "--font-parkinsans",
});

const encodeSans = localFont({
  src: [
    { path: "./fonts/EncodeSansSemiExpanded-Regular.ttf", weight: "400" },
    { path: "./fonts/EncodeSansSemiExpanded-Medium.ttf", weight: "500" },
    { path: "./fonts/EncodeSansSemiExpanded-SemiBold.ttf", weight: "600" },
  ],
  variable: "--font-encodesans",
});

export const metadata: Metadata = {
  title: "Edwin Academy | Career-Focused Training Institute in Kerala",
  description:
    "Edwin Academy offers industry-aligned professional programs to help learners build confidence and skills for real-world careers. Located in Kannur, Calicut, and Kochi.",
  keywords: [
    "Edwin Academy",
    "Edwin Academy Kannur",
     "Edwin Academy Kerala",
      "Edwin Academy Kozhikode",
       "Edwin Academy Kochi",
    "Career training Kerala",
    "Professional courses",
    "Skill development",
    "Job-ready training",
    "Kannur academy",
    "Calicut academy",
    "Kochi academy",
    "IT courses",
    "Digital marketing training",
    "Placement training",
  ],
  authors: [{ name: "Edwin Academy" }],
  creator: "Edwin Academy",
  publisher: "Edwin Academy",
  metadataBase: new URL("https://www.edwinacademy.com"),
  openGraph: {
    title: "Edwin Academy | Future-Ready Professional Training",
    description:
      "Learn with confidence at Edwin Academy — where knowledge meets opportunity. Explore our industry-driven courses in Kannur, Calicut, and Kochi.",
    url: "https://www.edwinacademy.com",
    siteName: "Edwin Academy",
    images: [
      {
        url: "https://www.edwinacademy.com/nav-logo.png",
        width: 1200,
        height: 630,
        alt: "Edwin Academy - Learn with Confidence",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Edwin Academy | Career-Focused Learning in Kerala",
    description:
      "Edwin Academy shapes confident professionals with real-world expertise. Join our programs designed by industry experts.",
    creator: "@edwinacademyofficial",
    images: ["https://www.edwinacademy.com/nav-logo.png"],
  },
  alternates: {
    canonical: "https://www.edwinacademy.com",
  },
  verification: {
    google: "YOUR_GOOGLE_SITE_VERIFICATION_CODE", // Add from Google Search Console
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Schema.org for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "Edwin Academy",
              url: "https://www.edwinacademy.com",
              logo: "https://www.edwinacademy.com/nav-logo.png",
              sameAs: [
                "https://www.linkedin.com/company/edwinacademy/",
                "https://www.instagram.com/edwinacademyofficial",
                "https://www.facebook.com/edwinacademyindia",
                "https://youtube.com/@edwinacademyofficial7586",
              ],
              description:
                "Edwin Academy is a leading career-focused training institute in Kerala, offering industry-aligned programs that prepare students for real-world success.",
              address: [
                {
                  "@type": "PostalAddress",
                  streetAddress: "9th Floor, Thana Square",
                  addressLocality: "Kannur",
                  addressRegion: "Kerala",
                  addressCountry: "India",
                },
                {
                  "@type": "PostalAddress",
                  streetAddress: "2nd Floor, The Ladder, Link Road",
                  addressLocality: "Calicut",
                  addressRegion: "Kerala",
                  addressCountry: "India",
                },
                {
                  "@type": "PostalAddress",
                  streetAddress: "6th Floor, Kandamkulathi Tower, MG Road",
                  addressLocality: "Kochi",
                  addressRegion: "Kerala",
                  addressCountry: "India",
                },
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+91 77369 11702",
                  contactType: "customer service",
                  areaServed: "IN",
                },
                {
                  "@type": "ContactPoint",
                  telephone: "+91 70251 43536",
                  contactType: "admissions",
                  areaServed: "IN",
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${parkinsans.variable} ${encodeSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
