import { Metadata } from "next";

interface Course {
  id: string;
  title: string;
  short_description: string;
  category: string;
  duration: string;
  level: string;
  mode: string;
  certification: string;
  image: string;
  overview: string;
  modules: { title: string; content: string[] }[];
  career_opportunities: string[];
  tools: string[];
  highlights: string[];
  created_at: string;
  updated_at: string;
}

async function getCourse(id: string): Promise<Course | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${id}/`,
      { cache: "no-store" }
    );

    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {

  // ✅ MUST await params
  const { id } = await params;

  const course = await getCourse(id);

  if (!course) {
    return {
      title: "Course Not Found | Edwin Academy",
      description: "The requested course could not be found.",
    };
  }

  const description = `${course.title} - ${course.duration}. ${course.short_description.substring(0, 140)}...`;

  return {
    title: `${course.title} | Professional Course | Edwin Academy`,
    description,
    keywords: [
      course.title,
      course.category,
      `${course.level} course`,
      "online learning",
      ...course.tools.slice(0, 5),
    ],
    alternates: {
      canonical: `https://www.edwinacademy.com/course/${id}`,
    },
    openGraph: {
      title: course.title,
      description: course.short_description,
      url: `https://www.edwinacademy.com/course/${id}`,
      images: course.image
        ? [`${process.env.NEXT_PUBLIC_API_URL}${course.image}`]
        : [],
    },
  };
}

export default function CourseDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
