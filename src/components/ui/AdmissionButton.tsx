'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, X, CheckCircle2, ChevronDown } from 'lucide-react';

/**
 * FULL file implementation:
 * - AdmissionProvider (wrap your app with this at top-level)
 * - useAdmission() hook to open modal from anywhere
 * - StartLearningButton component (default "Start Learning Now")
 * - EnrollButton component (use inside course cards: <EnrollButton course="Web Development" />)
 * - AdmissionModal & SuccessModal (rendered via portal so they overlay everything)
 *
 * USAGE:
 * Wrap your app (or root area) with <AdmissionProvider>{children}</AdmissionProvider>
 * Then use <StartLearningButton /> anywhere or <EnrollButton course="Some Course" /> anywhere.
 */

/* =========================
   Admission Context & Hook
   ========================= */
interface AdmissionOptions { course?: string; }

interface AdmissionContextType {
  openModal: (options?: AdmissionOptions) => void;
  closeModal: () => void;
  modalOpen: boolean;
  preselectedCourse: string;
  closeSuccess: () => void;
  successOpen: boolean;
  submittedName: string;
  notifySuccess: (fullName: string) => void;
}

const AdmissionContext = createContext<AdmissionContextType | null>(null);

export function AdmissionProvider({ children }: { children: ReactNode }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [preselectedCourse, setPreselectedCourse] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);
  const [submittedName, setSubmittedName] = useState('');

  const openModal = useCallback((options: AdmissionOptions = {}) => {
    // options: { course: 'Course Name' }
    if (options.course) setPreselectedCourse(options.course);
    else setPreselectedCourse('');
    // small timeout to ensure preselectedCourse applies before modal opens (but not required)
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    // keep preselectedCourse for next open? We clear it for safety
    setPreselectedCourse('');
  }, []);

  const notifySuccess = useCallback((fullName: string) => {
    // Called by modal after successful submit
    setSubmittedName(fullName);
    setSuccessOpen(true);
  }, []);

  const closeSuccess = useCallback(() => {
    setSuccessOpen(false);
    setSubmittedName('');
  }, []);

  const value = useMemo(
    () => ({
      openModal,
      closeModal,
      modalOpen,
      preselectedCourse,
      closeSuccess,
      successOpen,
      submittedName,
      notifySuccess,
    }),
    [openModal, closeModal, modalOpen, preselectedCourse, closeSuccess, successOpen, submittedName, notifySuccess]
  );

  return (
    <AdmissionContext.Provider value={value}>
      {children}
      <AdmissionModalPortal />
      <SuccessModalPortal />
    </AdmissionContext.Provider>
  );
}

export function useAdmission() {
  const ctx = useContext(AdmissionContext);
  if (!ctx) {
    throw new Error('useAdmission must be used within AdmissionProvider');
  }
  return ctx;
}

/* =========================
   Portal Wrappers
   ========================= */
function AdmissionModalPortal() {
  const ctx = useContext(AdmissionContext);
  if (!ctx) return null;
  const {
    modalOpen,
    closeModal,
    preselectedCourse,
    notifySuccess,
  } = ctx;

  return typeof document !== 'undefined'
    ? createPortal(
        <AdmissionModal
          isOpen={modalOpen}
          onClose={closeModal}
          onSuccess={(name: string) => {
            // notify parent provider
            notifySuccess(name);
            // close modal handled inside onSuccess caller (we'll let modal call onClose itself or provider)
          }}
          prefillCourse={preselectedCourse}
        />,
        document.body
      )
    : null;
}

function SuccessModalPortal() {
  const ctx = useContext(AdmissionContext);
  if (!ctx) return null;
  const { successOpen, closeSuccess, submittedName } = ctx;

  return typeof document !== 'undefined'
    ? createPortal(
        <SuccessModal isOpen={successOpen} onClose={closeSuccess} name={submittedName} />,
        document.body
      )
    : null;
}

/* =========================
   SuccessModal (Portal-friendly)
   ========================= */
interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
}

function SuccessModal({ isOpen, onClose, name }: SuccessModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    // trap body scroll when modal open
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{
        zIndex: 2147483650, // very high so it overlays everything
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative"
        style={{ animation: 'successSlideIn 0.36s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center pt-8 pb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
            <div className="relative bg-gradient-to-br from-green-400 to-green-600 rounded-full p-4">
              <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        <div className="px-6 pb-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
          <p className="text-gray-600 mb-1">
            Thank you, <span className="font-semibold text-gray-900">{name}</span>!
          </p>
          <p className="text-gray-600 mb-6">Your application has been received. Our team will contact you within 24 hours.</p>

          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Got it!
          </button>
        </div>
      </div>

      <style>{`
        @keyframes successSlideIn {
          from { opacity: 0; transform: translateY(-30px) scale(0.9); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

/* =========================
   AdmissionModal (Portal-friendly)
   ========================= */
interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (name: string) => void;
  prefillCourse?: string; // Optional, as it has a default value
}

function AdmissionModal({ isOpen, onClose, onSuccess, prefillCourse = '' }: AdmissionModalProps) {
  interface AdmissionFormData {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    place: string;
    course: string;
    courseMode: string;
    center: string;
    message: string;
  }

  interface AdmissionFormErrors {
    firstName?: string;
    email?: string;
    mobile?: string;
    place?: string;
    courseMode?: string;
    center?: string;
    [key: string]: string | undefined;
  }

  const [formData, setFormData] = useState<AdmissionFormData>({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    place: '',
    course: '',
    courseMode: '',
    center: '',
    message: '',
  });
  const [errors, setErrors] = useState<AdmissionFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const courses = [
    'Web Development',
    'Data Science',
    'Digital Marketing',
    'Graphic Design',
    'Mobile App Development',
    'UI/UX Design',
  ];
  const centers = ['Kannur', 'Calicut', 'Kochi'];

  // Apply prefilled course when modal opens or when prefillCourse changes
  useEffect(() => {
    if (!isOpen) return;
    if (prefillCourse) {
      setFormData((prev) => ({ ...prev, course: prefillCourse }));
      // ensure focus maybe later
    }
  }, [isOpen, prefillCourse]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const validateForm = () => {
    const newErrors: AdmissionFormErrors = {};
    
    // Required fields: firstName, mobile, place
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    else if (!/^\d{10}$/.test(formData.mobile.replace(/\s/g, ''))) newErrors.mobile = 'Please enter a valid 10-digit number';
    if (!formData.place.trim()) newErrors.place = 'Place is required';
    
    // Optional validations (only validate if filled)
    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    // If offline mode is selected, center becomes required
    if (formData.courseMode === 'offline' && !formData.center) {
      newErrors.center = 'Please select a center for offline mode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'courseMode' && value === 'online' ? { center: '' } : {}),
    }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);

    const fullName = formData.lastName.trim() 
      ? `${formData.firstName} ${formData.lastName}`.trim() 
      : formData.firstName.trim();

    // Simulate API
    await new Promise((res) => setTimeout(res, 900));

    // Here you would send formData to API
    console.log('Submitted admission form:', formData);

    // Reset form (keep course cleared so next open doesn't keep previous, but provider prefill will reapply)
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      place: '',
      course: '',
      courseMode: '',
      center: '',
      message: '',
    });
    setErrors({});
    setIsSubmitting(false);

    // Close this modal and notify provider to show success
    onClose();
    onSuccess(fullName);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{
        zIndex: 2147483648,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[92vh] overflow-hidden relative"
        style={{ animation: 'modalSlideIn 0.28s cubic-bezier(.22,1,.36,1)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1725BB] to-[#3d4fc9] text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-all duration-200 hover:rotate-90"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="pr-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-1">Join Edwin Academy</h2>
            <p className="text-white/90 text-sm">Begin Your Learning Journey Today</p>
          </div>
        </div>

        {/* Form content */}
        <div className="overflow-y-auto max-h-[calc(92vh-130px)] p-5 sm:p-6">
          <div className="space-y-4">
            {/* Name fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  className={`w-full px-4 py-2.5 text-sm text-gray-900 bg-white border-2 rounded-xl focus:ring-2 focus:ring-[#1725BB] focus:border-[#1725BB] outline-none transition-all placeholder:text-gray-400 ${
                    errors.firstName ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                  }`}
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1.5">⚠ {errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Last Name <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                </label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  className="w-full px-4 py-2.5 text-sm text-gray-900 bg-white border-2 border-gray-200 hover:border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1725BB] focus:border-[#1725BB] outline-none transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email Address <span className="text-gray-400 text-xs font-normal">(Optional)</span>
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className={`w-full px-4 py-2.5 text-sm text-gray-900 bg-white border-2 rounded-xl focus:ring-2 focus:ring-[#1725BB] focus:border-[#1725BB] outline-none transition-all placeholder:text-gray-400 ${
                  errors.email ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                }`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1.5">⚠ {errors.email}</p>}
            </div>

            {/* Mobile & Place */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  name="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="10-digit number"
                  className={`w-full px-4 py-2.5 text-sm text-gray-900 bg-white border-2 rounded-xl focus:ring-2 focus:ring-[#1725BB] focus:border-[#1725BB] outline-none transition-all placeholder:text-gray-400 ${
                    errors.mobile ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                  }`}
                />
                {errors.mobile && <p className="text-red-500 text-xs mt-1.5">⚠ {errors.mobile}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Place <span className="text-red-500">*</span>
                </label>
                <input
                  name="place"
                  value={formData.place}
                  onChange={handleChange}
                  placeholder="Your city"
                  className={`w-full px-4 py-2.5 text-sm text-gray-900 bg-white border-2 rounded-xl focus:ring-2 focus:ring-[#1725BB] focus:border-[#1725BB] outline-none transition-all placeholder:text-gray-400 ${
                    errors.place ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                  }`}
                />
                {errors.place && <p className="text-red-500 text-xs mt-1.5">⚠ {errors.place}</p>}
              </div>
            </div>

            {/* Course */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Interested Course <span className="text-gray-400 text-xs font-normal">(Optional)</span>
              </label>
              <div className="relative group">
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 pr-10 text-sm text-gray-900 bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 hover:border-[#1725BB]/30 hover:shadow-md rounded-xl focus:ring-2 focus:ring-[#1725BB] focus:border-[#1725BB] outline-none transition-all appearance-none cursor-pointer shadow-sm"
                >
                  <option value="">Choose your course</option>
                  {courses.map((course) => (
                    <option key={course} value={course} className="text-gray-900 py-2">
                      {course}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronDown
                    className={`w-5 h-5 transition-all duration-200 ${
                      formData.course ? 'text-[#1725BB]' : 'text-gray-400 group-hover:text-[#1725BB]'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Course Mode */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Course Mode <span className="text-gray-400 text-xs font-normal">(Optional)</span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer group">
                  <div className="relative">
                    <input
                      type="radio"
                      name="courseMode"
                      value="online"
                      checked={formData.courseMode === 'online'}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-[#1725BB] peer-checked:border-[6px] transition-all" />
                  </div>
                  <span className="ml-2.5 text-sm text-gray-700 font-medium">Online</span>
                </label>

                <label className="flex items-center cursor-pointer group">
                  <div className="relative">
                    <input
                      type="radio"
                      name="courseMode"
                      value="offline"
                      checked={formData.courseMode === 'offline'}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-[#1725BB] peer-checked:border-[6px] transition-all" />
                  </div>
                  <span className="ml-2.5 text-sm text-gray-700 font-medium">Offline</span>
                </label>
              </div>
            </div>

            {/* Center selection (conditional) */}
            {formData.courseMode === 'offline' && (
              <div style={{ animation: 'slideDown 0.3s ease-out' }}>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Select Center <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="center"
                    value={formData.center}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 text-sm text-gray-900 bg-white border-2 rounded-xl focus:ring-2 focus:ring-[#1725BB] focus:border-[#1725BB] outline-none transition-all appearance-none cursor-pointer ${
                      errors.center ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                    } ${!formData.center && 'text-gray-400'}`}
                  >
                    <option value="">Choose your center</option>
                    {centers.map((c) => (
                      <option key={c} value={c} className="text-gray-900">
                        {c}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
                {errors.center && <p className="text-red-500 text-xs mt-1.5">⚠ {errors.center}</p>}
              </div>
            )}

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Additional Message <span className="text-gray-400 text-xs font-normal">(Optional)</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                placeholder="Tell us more about your learning goals..."
                className="w-full px-4 py-2.5 text-sm text-gray-900 bg-white border-2 border-gray-200 hover:border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1725BB] focus:border-[#1725BB] outline-none resize-none transition-all placeholder:text-gray-400"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-50 active:scale-[0.98] transition-all"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full sm:flex-1 px-6 py-3 bg-[#1725BB] text-white rounded-xl font-semibold text-sm hover:bg-[#101aa0] active:scale-[0.98] transition-all disabled:opacity-70"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalSlideIn {
          from { opacity: 0; transform: translateY(-20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* =========================
   Button Components
   ========================= */

/** StartLearningButton
 *  - opens the modal with no preselected course (current scenario)
 */
export function StartLearningButton({ className = '' }) {
  const { openModal } = useAdmission();
  return (
    <button
      onClick={() => openModal()}
      className={`group inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-[#FF6002] text-white rounded-full font-semibold text-sm hover:bg-[#e65502] transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer ${className}`}
    >
      Start Learning Now
      <span className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-full group-hover:translate-x-1 transition-transform duration-300">
        <ArrowRight className="w-4 h-4" strokeWidth={3} />
      </span>
    </button>
  );
}

/** EnrollButton
 *  - used inside a course card or course detail page
 *  - opens the modal and pre-selects the provided course name
 *
 *  Usage: <EnrollButton course="Web Development" />
 */
interface EnrollButtonProps {
  course: string;
  children?: ReactNode;
  className?: string;
}

export function EnrollButton({ course, children, className = '' }: EnrollButtonProps) {
  const { openModal } = useAdmission();
  
  const label = children || `Enroll Now`;
  return (
    <button
      onClick={() => openModal({ course })}
      className={`inline-flex items-center justify-center gap-2.5 px-4 py-2 bg-[#FF6002] text-white rounded-lg font-semibold text-sm hover:bg-[#ff7a2d] transition-all shadow-sm ${className}`}
      aria-label={`Enroll in ${course}`}
      
    >
      
      {label}
      <span className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-full group-hover:translate-x-1 transition-transform duration-300">
    <ArrowRight className="w-4 h-4" strokeWidth={3} />
  </span>
    </button>
  );
}

/* =========================
   Example Usage Component
   ========================= */
export default function AdmissionExample() {
  return (
    <AdmissionProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Edwin Academy</h1>
          <p className="text-gray-600 mb-8">
            Welcome to Edwin Academy! Click the buttons below to test the admission form with optional fields.
          </p>
          
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <StartLearningButton />
              <EnrollButton course="Web Development" />
              <EnrollButton course="Data Science">
                Apply for Data Science
              </EnrollButton>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <h3 className="font-semibold text-blue-900 mb-2">✨ Changes Made:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>Required fields:</strong> First Name, Mobile Number, Place</li>
                <li>• <strong>Optional fields:</strong> Last Name, Email, Course, Course Mode</li>
                <li>• Center is required only if Offline mode is selected</li>
                <li>• Email validation only applies when email is provided</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AdmissionProvider>
  );
}