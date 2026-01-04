import { Metadata } from "next";

interface Blog {
  id: number;
  title: string;
  date: string;
  image: string;
  content: string;
  status: string;
  created_at: string;
  updated_at: string;
}

async function getBlog(slug: string): Promise<Blog | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${slug}/`,
      { cache: "no-store" }
    );

    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {

  // ✅ MUST await params
  const { slug } = await params;

  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Blog Not Found | Edwin Academy",
      description: "The requested blog article could not be found.",
    };
  }

  // Remove HTML & trim description
  const description =
    blog.content.replace(/<[^>]*>/g, "").substring(0, 150) + "...";

  return {
    title: `${blog.title} | Edwin Academy`,
    description,
    keywords: [
      "Edwin Academy blog",
      blog.title,
      "Featured news",
      "Academy updates",
    ],
    alternates: {
      canonical: `https://www.edwinacademy.com/edwinfeaturednews/${slug}`,
    },
    openGraph: {
      title: blog.title,
      description,
      url: `https://www.edwinacademy.com/edwinfeaturednews/${slug}`,
      images: blog.image
        ? [`${process.env.NEXT_PUBLIC_API_URL}${blog.image}`]
        : [],
    },
  };
}

export default function BlogDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
