'use client';

import React, { useState } from 'react';
import { Sparkles, X, RefreshCw, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { useEdwinTalks, EdwinTalk } from '@/data/api';

// Skeleton Loading Component
const PosterSkeleton = () => (
  <div className="group bg-white rounded-lg overflow-hidden border border-gray-200 animate-pulse">
    <div className="aspect-[4/5] relative overflow-hidden bg-gray-200">
      <div className="w-full h-full bg-gray-300"></div>
    </div>
    <div className="h-1.5 w-full bg-gray-300"></div>
  </div>
);

// Stats Skeleton
const StatsSkeleton = () => (
  <div className="text-center p-8 rounded-xl border border-gray-200 bg-gray-50 animate-pulse">
    <div className="h-12 bg-gray-300 rounded w-20 mx-auto mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-32 mx-auto"></div>
  </div>
);

export default function EdwinTalks() {
  const { talks, loading, error, refetch } = useEdwinTalks();
  const [isRetrying, setIsRetrying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');

  // Retry function
  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      await refetch();
    } finally {
      setIsRetrying(false);
    }
  };

  // Note: The addPoster function would need to be implemented with a proper API call
  // to your backend to actually add new talks. This is just the frontend part.
  const addPoster = () => {
    if (newImageUrl.trim()) {
      // In a real implementation, you would make an API call here
      // to add the new talk to the backend
      console.log('Adding new poster:', newImageUrl);
      setNewImageUrl('');
      setShowModal(false);
      // After successful API call, you would refetch the data
      // refetch();
    }
  };

  // Loading state
  if (loading && talks.length === 0) {
    return (
      <section className="relative bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 animate-pulse" style={{ borderColor: '#1725BB20', backgroundColor: '#1725BB08' }}>
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-32"></div>
            </div>

            <div className="h-16 bg-gray-300 rounded w-64 mx-auto mb-6"></div>
            <div className="w-20 h-1 mx-auto mb-6 rounded-full bg-gray-300"></div>
            <div className="h-6 bg-gray-300 rounded w-96 mx-auto"></div>
          </div>

          {/* Posters Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <PosterSkeleton key={index} />
            ))}
          </div>

          {/* Stats Skeleton */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatsSkeleton />
            <StatsSkeleton />
            <StatsSkeleton />
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error && talks.length === 0) {
    return (
      <section className="relative bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6" style={{ borderColor: '#1725BB20', backgroundColor: '#1725BB08' }}>
              <Sparkles size={16} style={{ color: '#1725BB' }} />
              <span className="text-sm font-bold tracking-wide uppercase" style={{ color: '#1725BB' }}>
                Industry Experts Program
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold mb-6 uppercase" style={{ color: '#1725BB' }}>
              Edwin Talks
            </h2>

            <div className="w-20 h-1 mx-auto mb-6 rounded-full" style={{ backgroundColor: '#9BF900' }}></div>

            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Exclusive sessions with visionary leaders shaping the future
            </p>
          </div>

          {/* Error Message */}
          <div className="flex flex-col items-center justify-center py-16 space-y-6">
            <AlertCircle className="w-16 h-16 text-red-500" />
            <div className="text-center space-y-2">
              <p className="text-red-500 text-lg font-semibold">Failed to load Edwin Talks</p>
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
        </div>
      </section>
    );
  }

  // Empty state
  if (!loading && talks.length === 0) {
    return (
      <section className="relative bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6" style={{ borderColor: '#1725BB20', backgroundColor: '#1725BB08' }}>
              <Sparkles size={16} style={{ color: '#1725BB' }} />
              <span className="text-sm font-bold tracking-wide uppercase" style={{ color: '#1725BB' }}>
                Industry Experts Program
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold mb-6 uppercase" style={{ color: '#1725BB' }}>
              Edwin Talks
            </h2>

            <div className="w-20 h-1 mx-auto mb-6 rounded-full" style={{ backgroundColor: '#9BF900' }}></div>

            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Exclusive sessions with visionary leaders shaping the future
            </p>
          </div>

          {/* Empty State Message */}
          <div className="flex flex-col items-center justify-center py-16 space-y-6">
            <div className="text-gray-500 text-lg text-center">
              <p>No Edwin Talks to display yet.</p>
              <p className="text-sm mt-2">Check back later for upcoming sessions.</p>
            </div>
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 bg-[#1725BB] text-white px-6 py-3 rounded-lg hover:bg-[#1725BB]/90 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6" style={{ borderColor: '#1725BB20', backgroundColor: '#1725BB08' }}>
            <Sparkles size={16} style={{ color: '#1725BB' }} />
            <span className="text-sm font-bold tracking-wide uppercase" style={{ color: '#1725BB' }}>
              Industry Experts Program
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6 uppercase" style={{ color: '#1725BB' }}>
            Edwin Talks
          </h2>

          <div className="w-20 h-1 mx-auto mb-6 rounded-full" style={{ backgroundColor: '#9BF900' }}></div>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Exclusive sessions with visionary leaders shaping the future
          </p>

          {/* Refresh button */}
          {/* <button
            onClick={handleRetry}
            disabled={isRetrying}
            className="mt-4 flex items-center gap-2 text-[#1725BB] hover:text-[#1725BB]/80 transition-colors text-sm disabled:opacity-50 mx-auto"
          >
            <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
            {isRetrying ? 'Refreshing...' : 'Refresh'}
          </button> */}
        </div>

        {/* Loading overlay for refresh */}
        {isRetrying && talks.length > 0 && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 flex items-center gap-3">
              <RefreshCw className="w-6 h-6 animate-spin text-[#1725BB]" />
              <span className="text-gray-700">Updating Edwin Talks...</span>
            </div>
          </div>
        )}

        {/* Professional Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isRetrying ? (
            // Show skeletons during refresh
            Array.from({ length: Math.min(talks.length, 6) }).map((_, index) => (
              <PosterSkeleton key={index} />
            ))
          ) : (
            // Show actual talks data
            talks.map((talk: EdwinTalk) => (
              <div
                key={talk.id}
                className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl"
              >
                <div className="aspect-[4/5] relative overflow-hidden bg-gray-100">
                  {talk.image && (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}${talk.image}`}
                      alt={talk.title}
                      width={400}
                      height={500}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        // Fallback image if the talk image fails to load
                        e.currentTarget.src = '/edwintalks/fallback.jpg';
                      }}
                    />
                  )}
                </div>

                <div className="h-1.5 w-full" style={{ backgroundColor: '#1725BB' }}></div>
              </div>
            ))
          )}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 rounded-xl border border-gray-200 bg-gray-50">
            <div className="text-5xl font-bold mb-2" style={{ color: '#1725BB' }}>50+</div>
            <div className="text-gray-600 font-medium">Expert Sessions</div>
          </div>
          <div className="text-center p-8 rounded-xl border border-gray-200 bg-gray-50">
            <div className="text-5xl font-bold mb-2" style={{ color: '#1725BB' }}>10K+</div>
            <div className="text-gray-600 font-medium">Total Attendees</div>
          </div>
          <div className="text-center p-8 rounded-xl border border-gray-200 bg-gray-50">
            <div className="text-5xl font-bold mb-2" style={{ color: '#1725BB' }}>95%</div>
            <div className="text-gray-600 font-medium">Satisfaction Rate</div>
          </div>
        </div>
      </div>

      {/* Modal - Note: This would need backend integration to actually work */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold" style={{ color: '#1725BB' }}>Add New Poster</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="text"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addPoster}
                className="flex-1 px-6 py-3 rounded-lg font-semibold text-white transition-all"
                style={{ backgroundColor: '#FF6002' }}
              >
                Add Poster
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}