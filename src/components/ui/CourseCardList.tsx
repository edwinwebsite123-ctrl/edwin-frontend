'use client';
import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  Briefcase,
  HeartPulse,
  Brush,
  GraduationCap,
  Globe,
  Laptop,
  ArrowRight,
} from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'INFORMATION TECHNOLOGY (IT)',
    description:
      'Explore cutting-edge IT courses that build your foundation in software, data, and systems.',
    image: '/card-1.png',
    icon: <Laptop size={22} />,
  },
  {
    id: 2,
    title: 'MANAGEMENT & COMMERCE',
    description:
      'Master the art of business management, finance, and entrepreneurship.',
    image: '/card-2.png',
    icon: <Briefcase size={22} />,
  },
  {
    id: 3,
    title: 'HEALTHCARE',
    description:
      'Advance your career in medical and healthcare fields with specialized programs.',
    image: '/card-3.png',
    icon: <HeartPulse size={22} />,
  },
  {
    id: 4,
    title: 'CREATIVE',
    description:
      'Unleash your imagination with design, arts, and multimedia creative courses.',
    image: '/card-5.png',
    icon: <Brush size={22} />,
  },
  {
    id: 5,
    title: 'UG/PG PROGRAMS',
    description:
      'Comprehensive undergraduate and postgraduate programs for career excellence.',
    image: '/card-4.png',
    icon: <GraduationCap size={22} />,
  },
  {
    id: 6,
    title: 'Other Edwin Programs',
    description:
      'Discover a wide variety of skill-based professional courses by Edwin Academy.',
    image: '/images/others.jpg',
    icon: <Globe size={22} />,
  },
];

export default function CourseCardList() {
  return (
    <Section>
      <HeaderWrapper>
        <h2>Learn Without Limits</h2>
        <p>
          Choose from a wide range of professional courses designed to empower
          creativity, sharpen skills, and advance careers.
        </p>
        <button>Explore Courses</button>
      </HeaderWrapper>

      <CardContainer>
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.15,
              duration: 0.6,
              ease: 'easeOut',
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Card>
              <ImageContainer>
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <GradientOverlay />
              </ImageContainer>

              <OverlayIcon>{course.icon}</OverlayIcon>

              <Content>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <ViewButton>
                  View Course <ArrowRight size={16} />
                </ViewButton>
              </Content>
            </Card>
          </motion.div>
        ))}
      </CardContainer>
    </Section>
  );
}

/* ---------------- STYLES ---------------- */

const Section = styled.section`
  padding: 80px 20px;
  /* background: #f9fafc; */
  text-align: center;
`;

const HeaderWrapper = styled.div`
  max-width: 700px;
  margin: 0 auto 60px;
  
  
  h2 {
    font-size: 2.4rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 10px;
  }
  p {
    color: #4b5563;
    margin-bottom: 25px;
    font-size: 1.1rem;
    line-height: 1.6;
  }
  button {
    background: #2563eb;
    color: white;
    padding: 12px 28px;
    border: none;
    border-radius: 9999px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      background: #1e40af;
      transform: translateY(-2px);
    }
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 1.8rem;
    }
    p {
      font-size: 1rem;
    }
  }
`;

const CardContainer = styled.div`
  display: grid;
  justify-content: center;
  gap: 30px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  max-width: 1100px;
  margin: 0 auto;
`;

const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.3));
  opacity: 0.8;
  transition: opacity 0.4s ease;
`;

const Card = styled.div`
  position: relative;
  height: 420px;
  border-radius: 20px;
  overflow: hidden;
  color: white;
  background: #000;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.25);
  }

  &:hover ${GradientOverlay} {
    opacity: 0.6;
  }
`;

const ImageContainer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
`;

const OverlayIcon = styled.div`
  position: absolute;
  top: 18px;
  right: 18px;
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(8px);
  border-radius: 50%;
  padding: 10px;
  z-index: 3;
  transition: all 0.3s ease;

  svg {
    color: #9BF900 ;
  }

  ${Card}:hover & {
    background: rgba(255, 255, 255, 0.25);
    transform: rotate(10deg);
  }
`;

const Content = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  z-index: 3;
  text-align: left;

  h3 {
    font-size: 1.15rem;
    font-weight: 700;
    margin-bottom: 8px;
  }

  p {
    font-size: 0.95rem;
    color: #e5e7eb;
    line-height: 1.5;
    margin-bottom: 18px;
  }
`;

const ViewButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: #FF6002 ;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 999px;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  backdrop-filter: blur(6px);

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(3px);
  }
`;
