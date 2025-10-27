import { useEffect, useState, useCallback } from "react";


const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface CourseModule {
  title: string;
  content: string[];
}

export interface Course {
  id: string;
  title: string;
  short_description: string;
  category: string;
  duration: string;
  level: string;
  mode: string;
  certification: string;
  image: string;
  overview: string;
  modules: CourseModule[];
  career_opportunities: string[];
  tools: string[];
  highlights: string[];
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

interface UseCoursesResult {
  courses: Course[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useCourses = (): UseCoursesResult => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${baseUrl}/api/courses/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch courses: ${errorText || response.statusText}`);
      }

      const data: Course[] = await response.json();
      setCourses(data);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return { courses, loading, error, refetch: fetchCourses };
};


export const useTopCourses = (): UseCoursesResult => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${baseUrl}/api/courses/top-choice/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch courses: ${errorText || response.statusText}`);
      }

      const data: Course[] = await response.json();
      setCourses(data);
    } catch (err) {
      console.error("Error fetching top courses:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return { courses, loading, error, refetch: fetchCourses };
};

export interface Placement {
  id: number;
  name: string;
  role: string;
  company: string;
  company_logo: string;       // image URL from Django backend
  student_image: string;      // image URL from Django backend
  background_image: string;   // image URL from Django backend
  created_at?: string;        // optional, if added in Django
}


export const usePlacements = () => {
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlacements = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${baseUrl}/api/placements/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch placements: ${errorText || response.statusText}`);
      }

      const data: Placement[] = await response.json();
      setPlacements(data);
    } catch (err) {
      console.error("Error fetching placements:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlacements();
  }, []);

  return { placements, loading, error, refetch: fetchPlacements };
};

export interface EdwinTalk {
  id: number;
  title: string;
  image: string;        // image URL from Django backend
}

interface UseEdwinTalksResult {
  talks: EdwinTalk[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useEdwinTalks = (): UseEdwinTalksResult => {
  const [talks, setTalks] = useState<EdwinTalk[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTalks = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${baseUrl}/api/edwintalks/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch EdwinTalks: ${errorText || response.statusText}`);
      }

      const data: EdwinTalk[] = await response.json();
      setTalks(data);
    } catch (err) {
      console.error("Error fetching EdwinTalks:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTalks();
  }, []);

  return { talks, loading, error, refetch: fetchTalks };
};


export interface Testimonial {
  id: number;
  text: string;
  name: string;
  role: string;
  image: string | null; // URL to actual image or null
}

interface UseTestimonialsResult {
  testimonials: Testimonial[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useTestimonials(): UseTestimonialsResult {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/testimonials/`);
      if (!res.ok) throw new Error('Failed to fetch testimonials');
      const data: Testimonial[] = await res.json();
      setTestimonials(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  return { testimonials, loading, error, refetch: fetchTestimonials };
}


export interface Faculty {
  id: number;
  name: string;
  title: string;
  faculty_image: string;
  bg_image: string;
}


export const useFaculty = () => {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFaculty = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/api/faculty/`);
      if (!res.ok) throw new Error("Failed to fetch faculty data");
      const data = await res.json();
      setFaculty(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  return { faculty, loading, error, refetch: fetchFaculty };
};



export interface PlacementPoster {
  id: number;
  image: string; // image URL
  alt: string;
}


export const usePlacementPosters = () => {
  const [posters, setPosters] = useState<PlacementPoster[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosters = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/api/placement-posters/`);
      if (!res.ok) throw new Error("Failed to fetch posters");
      const data: PlacementPoster[] = await res.json();
      setPosters(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosters();
  }, []);

  return { posters, loading, error, refetch: fetchPosters };
};



export interface Program {
  id: number;
  code: string;
  name: string;
  subtitle: string;
  description: string;
  duration: string;
  specializations: string[];
  eligibility: string;
  students: string;
  modules: number;
  rating: number;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface UseProgramResult {
  programs: Program[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}


export function useUGPrograms(): UseProgramResult {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrograms = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/api/ug-programs/`);
      if (!res.ok) throw new Error("Failed to fetch UG programs");

      const data = await res.json();
      setPrograms(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  return { programs, loading, error, refetch: fetchPrograms };
}


export function usePGPrograms(): UseProgramResult {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrograms = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/api/pg-programs/`);
      if (!res.ok) throw new Error("Failed to fetch PG programs");

      const data = await res.json();
      setPrograms(data);
    } catch (err: unknown) {
setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  return { programs, loading, error, refetch: fetchPrograms };
}


export interface GalleryItem {
  id: number;
  src: string | null;
  title: string | null;
  date: string | null;
}

export interface GalleryResponse {
  programs: GalleryItem[];
  events: GalleryItem[];
  convocations: GalleryItem[];
  achievements: GalleryItem[];
}

export function usePGGallery() {
  const [data, setData] = useState<GalleryResponse>({
    programs: [],
    events: [],
    convocations: [],
    achievements: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGallery = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/api/gallery/`);
      if (!res.ok) throw new Error("Failed to fetch gallery data");
      const json: GalleryResponse = await res.json();
      setData(json);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  return { ...data, loading, error, refetch: fetchGallery };
}