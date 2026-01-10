"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/ui/navigation-menu";
import Footer from "@/components/ui/Footer";

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

export default function BlogDetailPage() {
  const params = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.slug) {
      fetchBlog();
    }
  }, [params.slug]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${params.slug}/`);
      if (!response.ok) {
        throw new Error("Blog not found");
      }

      const data = await response.json();
      setBlog(data);
    } catch (err) {
      console.error("Error fetching blog:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="h-8 w-8 border-4 border-[#1725BB] border-t-transparent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !blog) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Blog not found</h2>
            <p className="text-gray-600 mb-6">The blog you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/edwinfeaturednews" className="px-6 py-3 bg-[#1725BB] text-white font-semibold rounded-xl hover:bg-[#1725BB]/90 transition-colors">
              Back to Blogs
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link href="/edwinfeaturednews" className="inline-flex items-center gap-2 text-[#1725BB] hover:text-[#1725BB]/80 mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blogs
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
            <p className="text-lg text-gray-600">{blog.date}</p>
          </div>

          {/* Image */}
          <div className="mb-8">
            {blog.image ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}${blog.image}`}
                alt={blog.title}
                width={800}
                height={400}
                className="w-full h-full md:h-[500px] object-cover rounded-xl"
              />
            ) : (
              <div className="w-full h-64 md:h-96 bg-gray-100 rounded-xl flex items-center justify-center">
                <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.5 9h7M8.5 12h7M8.5 15h4" />
                </svg>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}