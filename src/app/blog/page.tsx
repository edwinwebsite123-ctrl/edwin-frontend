"use client";

import { useBlogs } from "@/data/api";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/ui/navigation-menu";
import Footer from "@/components/ui/Footer";

// Function to create content preview
const createContentPreview = (content: string, maxLength: number = 150): string => {
  if (!content) return "";
  
  // Remove HTML tags if present
  const plainText = content.replace(/<[^>]*>/g, '');
  
  if (plainText.length <= maxLength) return plainText;
  
  // Find the last complete word within the limit
  const truncated = plainText.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  return lastSpaceIndex > 0 
    ? truncated.substring(0, lastSpaceIndex) + '...'
    : truncated + '...';
};

export default function BlogPage() {
  const { blogs, loading, error } = useBlogs();

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

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Error loading blogs</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-[#FF6002]/10 rounded-full">
              <div className="w-2 h-2 bg-[#FF6002] rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-[#FF6002] uppercase tracking-wide">
                Our Blog
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 uppercase">
              Latest <span className="text-[#1725BB]">Insights</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with our latest thoughts, tips, and industry insights.
            </p>
          </div>

          {/* Blog Grid */}
          {blogs.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No blogs available</h3>
              <p className="text-gray-600">Check back later for new content.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Link key={blog.id} href={`/blog/${blog.slug}`} className="group">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      {blog.image ? (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_URL}${blog.image}`}
                          alt={blog.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-sm text-[#FF6002] font-semibold mb-2">{blog.date}</p>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#1725BB] transition-colors">
                        {blog.title}
                      </h3>
                      {/* Content Preview */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {createContentPreview(blog.content)}
                      </p>
                      <div className="flex items-center text-sm text-gray-600">
                        <span>Read more</span>
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
      
      {/* CSS for line clamping */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}