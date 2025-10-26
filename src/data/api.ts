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