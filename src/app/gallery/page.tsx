'use client'
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface GalleryImage {
  id: number;
  src: string;
  title: string;
}

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryImages = [
    { id: 1, src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200', title: 'Main Campus Building' },
    { id: 2, src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200', title: 'Student Life' },
    { id: 3, src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200', title: 'Modern Classrooms' },
    { id: 4, src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200', title: 'Annual Day Celebration' },
    { id: 5, src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200', title: 'Library Corner' },
    { id: 6, src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200', title: 'Group Study' },
    { id: 7, src: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1200', title: 'Science Fair' },
    { id: 8, src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200', title: 'Interactive Learning' },
    { id: 9, src: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1200', title: 'Sports Complex' },
    { id: 10, src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200', title: 'Creative Workshop' },
    { id: 11, src: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1200', title: 'Cultural Festival' },
    { id: 12, src: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=1200', title: 'Garden Area' },
    { id: 13, src: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=1200', title: 'Computer Lab' },
    { id: 14, src: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=1200', title: 'Art Class' },
    { id: 15, src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1200', title: 'Music Room' },
  ];

  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = (currentIndex + 1) % galleryImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAxMmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMTIgMGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            Edwin Academy
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto mb-6"></div>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Capturing Moments, Creating Memories
          </p>
        </div>
      </header>

      {/* Gallery Section */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              onClick={() => openLightbox(image, index)}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer bg-slate-100"
              style={{
                animation: `fadeInScale 0.8s ease-out ${index * 0.08}s both`
              }}
            >
              <Image
                src={image.src}
                alt={image.title}
                width={400}
                height={300}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="absolute inset-0 flex items-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-white font-semibold text-lg mb-1">{image.title}</h3>
                    <div className="w-12 h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/98 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all hover:rotate-90 duration-300 backdrop-blur-md"
          >
            <X size={24} />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={prevImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all backdrop-blur-md hover:scale-110"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all backdrop-blur-md hover:scale-110"
          >
            <ChevronRight size={28} />
          </button>

          {/* Image Counter */}
          <div className="absolute top-6 left-6 z-50 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm">
            {currentIndex + 1} / {galleryImages.length}
          </div>

          {/* Main Image */}
          <div className="h-full flex items-center justify-center p-4 md:p-20" onClick={e => e.stopPropagation()}>
            <div className="max-w-7xl w-full">
              <Image
                src={selectedImage.src}
                alt={selectedImage.title}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl animate-zoomIn"
              />
              <div className="mt-8 text-center">
                <h3 className="text-white font-semibold text-2xl md:text-3xl">{selectedImage.title}</h3>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-zoomIn {
          animation: zoomIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default GalleryPage;