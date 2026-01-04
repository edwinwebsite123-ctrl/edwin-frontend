"use client";

import { useBlogs } from "@/data/api";
import Image from "next/image";
import Link from "next/link";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/ui/navigation-menu";
import Footer from "@/components/ui/Footer";

// Function to create content preview
const createContentPreview = (content: string, maxLength: number = 150): string => {
  if (!content) return "";

  if (content.length <= maxLength) return content;

  // Find the last complete word within the limit
  const truncated = content.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  return lastSpaceIndex > 0
    ? truncated.substring(0, lastSpaceIndex) + '...'
    : truncated + '...';
};
export default function BlogPage() {

  const { blogs, loading, error, refetch } = useBlogs();

  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {

    setIsRetrying(true);

    try {

      await refetch();

    } finally {

      setIsRetrying(false);

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

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Error loading blogs</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={handleRetry}
              disabled={isRetrying}
              className="flex items-center gap-2 bg-[#1725BB] text-white px-6 py-3 rounded-lg hover:bg-[#1725BB]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
              {isRetrying ? 'Retrying...' : 'Try Again'}
            </button>
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
            {/* {!loading && blogs.length > 0 && (
              <button
                onClick={handleRetry}
                disabled={isRetrying}
                className="mt-4 flex items-center gap-2 text-[#1725BB] hover:text-[#1725BB]/80 transition-colors text-sm disabled:opacity-50 mx-auto"
              >
                <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
                {isRetrying ? 'Refreshing...' : 'Refresh Data'}
              </button>
            )} */}
          </div>

          {/* Loading overlay for refresh */}
          {isRetrying && blogs.length > 0 && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 flex items-center gap-3">
                <RefreshCw className="w-6 h-6 animate-spin text-[#1725BB]" />
                <span className="text-gray-700">Updating blogs...</span>
              </div>
            </div>
          )}

          {/* Blog Grid */}
          {blogs.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No blogs available</h3>
              <p className="text-gray-600 mb-4">Check back later for new content.</p>
              <button
                onClick={handleRetry}
                disabled={isRetrying}
                className="flex items-center gap-2 bg-[#1725BB] text-white px-6 py-3 rounded-lg hover:bg-[#1725BB]/90 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
                {isRetrying ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Link key={blog.id} href={`/edwinfeaturednews/${blog.slug}`} className="group">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
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
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.5 9h7M8.5 12h7M8.5 15h4" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-grow p-6">
                      <p className="text-sm text-[#FF6002] font-semibold mb-2">{blog.date}</p>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#1725BB] transition-colors">
                        {blog.title}
                      </h3>
                      {/* Content Preview */}
                      <div className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3" dangerouslySetInnerHTML={{ __html: createContentPreview(blog.content) }} />
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