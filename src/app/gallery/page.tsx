'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Award, 
  GraduationCap, 
  ImageIcon,
  RefreshCw,
  AlertCircle,
  Users
} from 'lucide-react';
import { usePGGallery } from '@/data/api';

// Skeleton Loading Component
const GallerySkeleton = () => (
  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-200 animate-pulse">
        <div className="w-full h-64 bg-gray-300"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-5">
          <div className="h-6 bg-gray-400 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-400 rounded w-1/2"></div>
        </div>
      </div>
    ))}
  </div>
);

interface GalleryImage {
  id: number;
  src: string | null;
  title: string;
  date: string;
}

const GalleryPage = () => {
  const { programs, events, convocations, achievements, loading, error, refetch } = usePGGallery();
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeTab, setActiveTab] = useState('programs');
  const [isRetrying, setIsRetrying] = useState(false);

  // Retry function
  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      await refetch();
    } finally {
      setIsRetrying(false);
    }
  };

  const tabs = [
    { id: 'programs', label: 'Programs', icon: Calendar, data: programs },
    { id: 'events', label: 'Events', icon: Users, data: events },
    { id: 'convocations', label: 'Convocations', icon: GraduationCap, data: convocations },
    { id: 'achievements', label: 'Achievements', icon: Award, data: achievements },
  ];

  const getCurrentGallery = (): GalleryImage[] => {
    const activeTabData = tabs.find(tab => tab.id === activeTab);
    if (!activeTabData) return [];
    
    return activeTabData.data.map(item => ({
      id: item.id,
      src: item.src ? `${process.env.NEXT_PUBLIC_API_URL}${item.src}` : null,
      title: item.title || 'Untitled',
      date: item.date || 'No date'
    }));
  };

  const currentGallery = getCurrentGallery().filter(item => item.src !== null);

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    
    const index = currentGallery.findIndex((img) => img.id === selectedImage.id);
    if (index === -1) return;

    const newIndex = direction === 'next'
      ? (index + 1) % currentGallery.length
      : (index - 1 + currentGallery.length) % currentGallery.length;
    
    setSelectedImage(currentGallery[newIndex]);
  }, [selectedImage, currentGallery]);

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateImage('prev');
      if (e.key === 'ArrowRight') navigateImage('next');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentGallery, navigateImage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50">
      {/* Header */}
      <header className="text-center py-12">
        <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">Campus Gallery</h1>
        <p className="text-slate-600 mt-3 text-lg max-w-2xl mx-auto">
          Relive our finest moments — from academic triumphs to joyful celebrations.
        </p>

        {/* Refresh button */}
        {!loading && (programs.length > 0 || events.length > 0 || convocations.length > 0 || achievements.length > 0) && (
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors text-sm disabled:opacity-50 mx-auto"
          >
            <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
            {isRetrying ? 'Refreshing...' : 'Refresh Gallery'}
          </button>
        )}
      </header>

      {/* Loading overlay for refresh */}
      {isRetrying && (programs.length > 0 || events.length > 0 || convocations.length > 0 || achievements.length > 0) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center gap-3">
            <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
            <span className="text-gray-700">Updating gallery...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center py-16 space-y-6">
          <AlertCircle className="w-16 h-16 text-red-500" />
          <div className="text-center space-y-2">
            <p className="text-red-500 text-lg font-semibold">Failed to load gallery</p>
            <p className="text-gray-600 text-sm max-w-md">{error}</p>
          </div>
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
            {isRetrying ? 'Retrying...' : 'Try Again'}
          </button>
        </div>
      )}

      {/* Tabs - Only show if not loading and no error */}
      {!loading && !error && (
        <div className="flex justify-center space-x-3 mb-10 flex-wrap px-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const tabData = tab.data.filter(item => item.src !== null).length;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-5 py-3 rounded-full font-medium transition-all shadow-sm border ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white hover:bg-blue-50 text-slate-600 border-slate-200'
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {tab.label}
                {tabData > 0 && (
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    activeTab === tab.id 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {tabData}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Gallery Content */}
      <main className="max-w-7xl mx-auto px-4 pb-16">
        {/* Loading State */}
        {loading && <GallerySkeleton />}

        {/* Empty State - When no images with src exist */}
        {!loading && !error && currentGallery.length === 0 && (
          <div className="text-center py-20">
            <ImageIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg mb-4">No images available in this category</p>
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        )}

        {/* Gallery Grid - Only show items with src */}
        {!loading && !error && currentGallery.length > 0 && (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {currentGallery.map((img, i) => (
              <div
                key={img.id}
                onClick={() => openLightbox(img)}
                className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white"
                style={{ animation: `fadeIn 0.5s ease-out ${i * 0.05}s both` }}
              >
                <div className="w-full h-64 relative">
                  <Image
                    src={img.src!}
                    alt={img.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <h3 className="text-white text-xl font-semibold mb-1">{img.title}</h3>
                  <p className="text-slate-300 text-sm flex items-center">
                    <Calendar className="w-4 h-4 mr-2" /> {img.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Lightbox - Only show if selectedImage has src */}
      {selectedImage && selectedImage.src && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-slate-300 transition p-2 rounded-full hover:bg-white/10 z-10"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          
          {currentGallery.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('prev');
                }}
                className="absolute left-6 text-white hover:text-slate-300 transition p-3 rounded-full hover:bg-white/10 z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('next');
                }}
                className="absolute right-6 text-white hover:text-slate-300 transition p-3 rounded-full hover:bg-white/10 z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          <div
            className="max-w-5xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[80vh]">
              <Image
                src={selectedImage.src}
                alt={selectedImage.title}
                fill
                className="object-contain rounded-lg"
                sizes="90vw"
              />
            </div>
            <div className="text-center mt-6 text-white">
              <h3 className="text-2xl font-semibold mb-2">{selectedImage.title}</h3>
              <p className="text-slate-300 flex items-center justify-center">
                <Calendar className="w-4 h-4 mr-2" /> {selectedImage.date}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default GalleryPage;