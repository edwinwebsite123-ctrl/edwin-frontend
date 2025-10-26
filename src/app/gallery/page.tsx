'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Award, 
  GraduationCap, 
  ImageIcon,
} from 'lucide-react';

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  date: string;
}

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeTab, setActiveTab] = useState('programs');

  const galleryData = {
    programs: [
      { id: 1, src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80', title: 'Annual Tech Symposium', date: 'March 2024' },
      { id: 2, src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', title: 'Science Exhibition', date: 'February 2024' },
      { id: 3, src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80', title: 'Cultural Fest', date: 'January 2024' },
      { id: 4, src: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80', title: 'Leadership Workshop', date: 'March 2024' },
      { id: 5, src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80', title: 'Annual Sports Day', date: 'December 2023' },
    ],
    events: [
      { id: 6, src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80', title: 'Guest Lecture', date: 'March 2024' },
      { id: 7, src: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80', title: 'International Seminar', date: 'February 2024' },
      { id: 8, src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80', title: 'Alumni Reunion', date: 'January 2024' },
    ],
    convocations: [
      { id: 9, src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80', title: 'Convocation 2024', date: 'May 2024' },
      { id: 10, src: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=800&q=80', title: 'Degree Distribution', date: 'May 2024' },
      { id: 11, src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80', title: 'Academic Honors', date: 'May 2024' },
    ],
    achievements: [
      { id: 12, src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80', title: 'National Award Ceremony', date: 'April 2024' },
      { id: 13, src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80', title: 'Sports Championship', date: 'March 2024' },
      { id: 14, src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80', title: 'Innovation Award', date: 'February 2024' },
    ],
  };

  const tabs = [
    { id: 'programs', label: 'Programs & Events', icon: Calendar },
    { id: 'convocations', label: 'Convocations', icon: GraduationCap },
    { id: 'achievements', label: 'Achievements', icon: Award },
  ];

  const getCurrentGallery = () => {
    if (activeTab === 'programs') return [...galleryData.programs, ...galleryData.events];
    return galleryData[activeTab as keyof typeof galleryData];
  };

  const currentGallery = getCurrentGallery();

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction: string) => {
    if (!selectedImage) return;
    const index = currentGallery.findIndex((img) => img.id === selectedImage.id);
    const newIndex = 
      direction === 'next'
        ? (index + 1) % currentGallery.length
        : (index - 1 + currentGallery.length) % currentGallery.length;
    setSelectedImage(currentGallery[newIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50">
      {/* Header */}
      <header className="text-center py-12">
        <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">Campus Gallery</h1>
        <p className="text-slate-600 mt-3 text-lg max-w-2xl mx-auto">
          Relive our finest moments — from academic triumphs to joyful celebrations.
        </p>
      </header>

      {/* Tabs */}
      <div className="flex justify-center space-x-3 mb-10 flex-wrap px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
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
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      <main className="max-w-7xl mx-auto px-4 pb-16">
        {currentGallery.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {currentGallery.map((img, i) => (
              <div
                key={img.id}
                onClick={() => openLightbox(img)}
                className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                style={{ animation: `fadeIn 0.5s ease-out ${i * 0.05}s both` }}
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  width={800}
                  height={256}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <h3 className="text-white text-xl font-semibold mb-1">{img.title}</h3>
                  <p className="text-slate-300 text-sm flex items-center">
                    <Calendar className="w-4 h-4 mr-2" /> {img.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <ImageIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">No images available in this category</p>
          </div>
        )}
      </main>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-slate-300 transition p-2 rounded-full hover:bg-white/10"
          >
            <X className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('prev');
            }}
            className="absolute left-6 text-white hover:text-slate-300 transition p-3 rounded-full hover:bg-white/10"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('next');
            }}
            className="absolute right-6 text-white hover:text-slate-300 transition p-3 rounded-full hover:bg-white/10"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div
            className="max-w-5xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.src}
              alt={selectedImage.title}
              width={1200}
              height={800}
              className="w-full h-full object-contain rounded-lg"
              unoptimized
            />
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