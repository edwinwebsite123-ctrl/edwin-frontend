import React, { useState } from 'react';
import { Sparkles, Plus, X } from 'lucide-react';

export default function EdwinTalks() {
  const [posters, setPosters] = useState([
    {
      id: 1,
      image: "/edwintalks/2.jpeg",
      title: "AI in Education"
    },
    {
      id: 2,
      image: "/edwintalks/4.jpeg",
      title: "Building Startups"
    },
    {
      id: 3,
      image: "/edwintalks/3.jpeg",
      title: "Design Thinking"
    },
    {
      id: 4,
      image: "/edwintalks/1.jpeg",
      title: "Data Science"
    },
    {
      id: 5,
      image: "/edwintalks/5.jpeg",
      title: "Digital Marketing"
    },
    {
      id: 6,
      image: "/edwintalks/6.jpeg",
      title: "Cybersecurity"
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');

  const addPoster = () => {
    if (newImageUrl.trim()) {
      setPosters([...posters, {
        id: posters.length + 1,
        image: newImageUrl,
        title: `Talk ${posters.length + 1}`
      }]);
      setNewImageUrl('');
      setShowModal(false);
    }
  };

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

        {/* Add Poster Button */}
        

        {/* Professional Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posters.map((poster) => (
            <div 
              key={poster.id} 
              className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl"
            >
              <div className="aspect-[4/5] relative overflow-hidden bg-gray-100">
                <img
                  src={poster.image}
                  alt={poster.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="h-1.5 w-full" style={{ backgroundColor: '#1725BB' }}></div>
            </div>
          ))}
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

      {/* Modal */}
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