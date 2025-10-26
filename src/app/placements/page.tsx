'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Award, ChevronRight, RefreshCw, AlertCircle } from 'lucide-react';
import Navbar from '@/components/ui/navigation-menu';
import Footer from '@/components/ui/Footer';
import Link from 'next/link';
import { usePlacements, Placement } from '@/data/api';
import { usePlacementPosters, PlacementPoster } from '@/data/api';

// Skeleton Loading Components
const PlacementCardSkeleton = () => (
  <div className="relative h-[420px] sm:h-[450px] rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-200 animate-pulse">
    {/* Top Text Skeleton */}
    <div className="absolute top-4 sm:top-6 left-0 right-0 text-center z-10 px-4">
      <div className="h-5 bg-gray-300 rounded-lg mx-auto w-3/4"></div>
    </div>

    {/* Student Image Skeleton */}
    <div className="absolute top-9 sm:top-14 left-1/2 -translate-x-1/2 z-10 w-[320px] h-[320px] sm:w-[320px] sm:h-[320px]">
      <div className="w-full h-full bg-gray-300 rounded-full"></div>
    </div>

    {/* Bottom Info Skeleton */}
    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-gray-400/70 via-gray-400/30 to-transparent z-20">
      <div className="space-y-2">
        <div className="h-6 bg-gray-300 rounded w-2/3"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);

const StatsSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 animate-pulse">
    <div className="h-12 sm:h-16 bg-gray-200 rounded w-3/4 mx-auto"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mt-3"></div>
  </div>
);

const PosterSkeleton = () => (
  <div className="group relative overflow-hidden rounded-2xl shadow-lg bg-gray-200 animate-pulse">
    <div className="relative w-full aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-300">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1725BB]/10 to-[#FF6002]/10" />
      <div className="w-full h-full bg-gray-300"></div>
    </div>
  </div>
);

// ======== Main Component ========
export default function PlacementPage() {
  const { placements, loading, error, refetch } = usePlacements();
  const { posters: placementPosters, loading: postersLoading, error: postersError, refetch: refetchPosters } = usePlacementPosters();
  const [isRetrying, setIsRetrying] = useState(false);
  const [isRetryingPosters, setIsRetryingPosters] = useState(false);

  // Retry functions
  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      await refetch();
    } finally {
      setIsRetrying(false);
    }
  };

  const handleRetryPosters = async () => {
    setIsRetryingPosters(true);
    try {
      await refetchPosters();
    } finally {
      setIsRetryingPosters(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* HERO SECTION - Professional Header */}
        <section className="relative bg-gradient-to-r from-[#1725BB] to-[#4A5DFF] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          <div className="relative z-10 text-center py-16 sm:py-20 lg:py-24 px-4 sm:px-6 max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 border border-white/20">
              <Award className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">Industry Leading Placements</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-4 uppercase">
              Empowering Careers Through Excellence
            </h1>
            
            <p className="max-w-3xl mx-auto text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed px-4">
              Edwin Academy takes pride in transforming students into industry-ready professionals. 
              Our placement record speaks for itself — our alumni are thriving in leading global companies.
            </p>
          </div>
        </section>

        {/* PLACEMENT STATS */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto py-12 sm:py-16 px-4 sm:px-6 text-center">
          {loading ? (
            // Loading state for stats
            <>
              <StatsSkeleton />
              <StatsSkeleton />
              <StatsSkeleton />
            </>
          ) : error ? (
            // Error state for stats
            <div className="col-span-3 flex flex-col items-center justify-center py-8 space-y-4">
              <AlertCircle className="w-12 h-12 text-red-500" />
              <p className="text-red-500 text-lg">Failed to load statistics</p>
            </div>
          ) : (
            // Actual stats
            <>
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-4xl sm:text-5xl font-bold text-[#1725BB]">98%</h3>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">Placement Success Rate</p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-4xl sm:text-5xl font-bold text-[#1725BB]">300+</h3>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">Hiring Partners</p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-4xl sm:text-5xl font-bold text-[#1725BB]">5000+</h3>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">Students Placed</p>
              </div>
            </>
          )}
        </section>

        {/* PLACEMENT GRID */}
        <section className="w-full py-12 sm:py-16 lg:py-24 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6002]/10 to-[#1725BB]/10 px-4 py-2 rounded-full mb-4">
                <Sparkles className="text-[#FF6002] w-5 h-5" />
                <span className="text-sm font-semibold text-gray-700">
                  Success Stories
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 uppercase">
                Our Proud Achievers
              </h2>
              <p className="text-gray-600 mt-2 max-w-2xl mx-auto text-base lg:text-lg">
                Celebrating talented individuals who secured dream placements at
                industry-leading companies
              </p>

              {/* Refresh button */}
              {!loading && placements.length > 0 && (
                <button
                  onClick={handleRetry}
                  disabled={isRetrying}
                  className="mt-4 flex items-center gap-2 text-[#1725BB] hover:text-[#1725BB]/80 transition-colors text-sm disabled:opacity-50 mx-auto"
                >
                  <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
                  {isRetrying ? 'Refreshing...' : 'Refresh Data'}
                </button>
              )}
            </div>

            {/* Loading overlay for refresh */}
            {isRetrying && placements.length > 0 && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 flex items-center gap-3">
                  <RefreshCw className="w-6 h-6 animate-spin text-[#1725BB]" />
                  <span className="text-gray-700">Updating placements...</span>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && placements.length === 0 && (
              <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <AlertCircle className="w-16 h-16 text-red-500" />
                <div className="text-center space-y-2">
                  <p className="text-red-500 text-lg font-semibold">Failed to load placements</p>
                  <p className="text-gray-600 text-sm max-w-md">{error}</p>
                </div>
                <button
                  onClick={handleRetry}
                  disabled={isRetrying}
                  className="flex items-center gap-2 bg-[#1725BB] text-white px-6 py-3 rounded-lg hover:bg-[#1725BB]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
                  {isRetrying ? 'Retrying...' : 'Try Again'}
                </button>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && placements.length === 0 && (
              <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <div className="text-gray-500 text-lg text-center">
                  <p>No placements to display yet.</p>
                  <p className="text-sm mt-2">Check back later for updates.</p>
                </div>
                <button
                  onClick={handleRetry}
                  className="flex items-center gap-2 bg-[#1725BB] text-white px-6 py-3 rounded-lg hover:bg-[#1725BB]/90 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </button>
              </div>
            )}

            {/* Placement Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading && placements.length === 0 ? (
                // Initial loading skeletons
                Array.from({ length: 6 }).map((_, index) => (
                  <PlacementCardSkeleton key={index} />
                ))
              ) : isRetrying ? (
                // Refresh loading with skeletons
                Array.from({ length: Math.min(placements.length, 6) }).map((_, index) => (
                  <PlacementCardSkeleton key={index} />
                ))
              ) : (
                // Actual placement data
                placements.map((placement: Placement) => (
                  <div
                    key={placement.id}
                    className="relative h-[420px] sm:h-[450px] rounded-2xl sm:rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-500 group"
                    style={{
                      backgroundImage: `url('${process.env.NEXT_PUBLIC_API_URL}${placement.background_image || '/placements/bg.png'}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-500" />

                    {/* Top Text */}
                    <div className="absolute top-4 sm:top-6 left-0 right-0 text-center z-10 px-4">
                      <h3 className="text-white text-base sm:text-lg font-semibold tracking-wide uppercase">
                        Placed at {placement.company}
                      </h3>
                    </div>

                    {/* Student Image */}
                    <div className="absolute top-28 sm:top-32 left-1/2 -translate-x-1/2 z-10 w-[320px] h-[320px] sm:w-[320px] sm:h-[320px]">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}${placement.student_image}`}
                        alt={placement.name}
                        fill
                        className="object-contain drop-shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-500"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = '/placements/default-student.png';
                        }}
                      />
                    </div>

                    {/* Bottom Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex items-end justify-between bg-gradient-to-t from-black/70 via-black/30 to-transparent z-20">
                      <div className="text-white">
                        <h4 className="text-base sm:text-lg font-bold leading-tight">
                          {placement.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-white/80">
                          {placement.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* PLACEMENT POSTERS GALLERY */}
        <section className="w-full py-12 sm:py-16 lg:py-24 px-4 bg-gradient-to-br from-gray-100 to-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-4 shadow-md">
                <Award className="text-[#1725BB] w-5 h-5" />
                <span className="text-sm font-semibold text-gray-700">Placement Gallery</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 uppercase">
                Placement Highlights
              </h2>

              <p className="text-gray-600 mt-2 max-w-2xl mx-auto text-base lg:text-lg px-4">
                Browse through our collection of placement announcements and achievement posters
              </p>

              {/* Refresh button for posters */}
              {!postersLoading && placementPosters.length > 0 && (
                <button
                  onClick={handleRetryPosters}
                  disabled={isRetryingPosters}
                  className="mt-4 flex items-center gap-2 text-[#1725BB] hover:text-[#1725BB]/80 transition-colors text-sm disabled:opacity-50 mx-auto"
                >
                  <RefreshCw className={`w-4 h-4 ${isRetryingPosters ? 'animate-spin' : ''}`} />
                  {isRetryingPosters ? 'Refreshing...' : 'Refresh Posters'}
                </button>
              )}
            </div>

            {/* Loading overlay for posters refresh */}
            {isRetryingPosters && placementPosters.length > 0 && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 flex items-center gap-3">
                  <RefreshCw className="w-6 h-6 animate-spin text-[#1725BB]" />
                  <span className="text-gray-700">Updating posters...</span>
                </div>
              </div>
            )}

            {/* Error State for Posters */}
            {postersError && placementPosters.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 space-y-6">
                <AlertCircle className="w-16 h-16 text-red-500" />
                <div className="text-center space-y-2">
                  <p className="text-red-500 text-lg font-semibold">Failed to load placement posters</p>
                  <p className="text-gray-600 text-sm max-w-md">{postersError}</p>
                </div>
                <button
                  onClick={handleRetryPosters}
                  disabled={isRetryingPosters}
                  className="flex items-center gap-2 bg-[#1725BB] text-white px-6 py-3 rounded-lg hover:bg-[#1725BB]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RefreshCw className={`w-4 h-4 ${isRetryingPosters ? 'animate-spin' : ''}`} />
                  {isRetryingPosters ? 'Retrying...' : 'Try Again'}
                </button>
              </div>
            )}

            {/* Empty State for Posters */}
            {!postersLoading && !postersError && placementPosters.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 space-y-6">
                <div className="text-gray-500 text-lg text-center">
                  <p>No placement posters to display yet.</p>
                  <p className="text-sm mt-2">Check back later for updates.</p>
                </div>
                <button
                  onClick={handleRetryPosters}
                  className="flex items-center gap-2 bg-[#1725BB] text-white px-6 py-3 rounded-lg hover:bg-[#1725BB]/90 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </button>
              </div>
            )}

            {/* Poster Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {postersLoading && placementPosters.length === 0 ? (
                // Initial loading skeletons for posters
                Array.from({ length: 8 }).map((_, index) => (
                  <PosterSkeleton key={index} />
                ))
              ) : isRetryingPosters ? (
                // Refresh loading with skeletons for posters
                Array.from({ length: Math.min(placementPosters.length, 8) }).map((_, index) => (
                  <PosterSkeleton key={index} />
                ))
              ) : (
                // Actual posters data
                placementPosters.map((poster: PlacementPoster, index) => (
                  <div
                    key={poster.id}
                    className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-2"
                  >
                    {/* Poster Image */}
                    <div className="relative w-full aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1725BB]/10 to-[#FF6002]/10" />

                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}${poster.image}`}
                        alt={poster.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        className="object-cover"
                        priority={index < 4}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="relative bg-[#1725BB] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          <div className="relative z-10 text-center py-16 sm:py-20 lg:py-24 px-4 sm:px-6 max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 leading-tight uppercase">
              Ready to Build Your Career?
            </h2>
            
            <p className="max-w-2xl mx-auto text-white/90 text-sm sm:text-base lg:text-lg mb-8 sm:mb-10 leading-relaxed">
              Join Edwin Academy today and take your first step toward a successful and fulfilling career.
            </p>
            
            <Link href="/contact">
              <button className="group inline-flex items-center gap-3 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Apply Now
                <span className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-full group-hover:translate-x-1 transition-transform duration-300">
                  <ChevronRight className="w-4 h-4" strokeWidth={3} />
                </span>
              </button>
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}