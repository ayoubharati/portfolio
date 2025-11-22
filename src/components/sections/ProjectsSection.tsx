"use client";

import { useState, useEffect, useRef } from "react";
import { Github, ArrowRight, ChevronLeft, ChevronRight, Code2 } from "lucide-react";

// --- Configuration ---
const CARD_WIDTH = 400;
const GAP = 32;
const SCROLL_DURATION = 800; // ms (Slower = smoother)

// --- Easing Function for "Good" Animation ---
// Quartic Ease Out: Starts fast, decelerates gently
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

// --- 1. The "Pro" Placeholder Component ---
const ProjectPlaceholder = ({ title }: { title: string }) => (
  <div className="w-full h-full bg-zinc-900 relative overflow-hidden flex flex-col border-b border-primary-dark/10">
    {/* Abstract Grid Background */}
    <div className="absolute inset-0 opacity-20"
      style={{ backgroundImage: 'radial-gradient(#4a5568 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
    </div>

    {/* Terminal Header */}
    <div className="flex items-center gap-2 p-3 border-b border-white/10 bg-white/5 relative z-10">
      <div className="w-3 h-3 rounded-full bg-red-500/80" />
      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
      <div className="w-3 h-3 rounded-full bg-green-500/80" />
      <div className="ml-auto text-[10px] font-mono text-white/40">bash</div>
    </div>

    {/* Content */}
    <div className="p-4 flex-1 flex flex-col justify-center relative z-10">
      <div className="font-mono text-xs text-green-400 mb-1">$ npm run build</div>
      <div className="font-mono text-xs text-white/60 mb-4">
        Building <span className="text-yellow-400">"{title}"</span>...<br />
        <span className="opacity-50">Done in 1.2s</span>
      </div>

      {/* Floating Icon */}
      <div className="absolute right-4 bottom-4 text-white/5 transform rotate-12 scale-150">
        <Code2 size={80} />
      </div>
    </div>

    {/* Animated Scanline */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[20%] animate-scanline pointer-events-none" />

    <style jsx>{`
      @keyframes scanline {
        0% { top: -20%; }
        100% { top: 120%; }
      }
      .animate-scanline {
        animation: scanline 3s linear infinite;
      }
    `}</style>
  </div>
);

const projects = [
  {
    id: 1,
    title: "PharmaChain",
    description:
      "A full-stack blockchain and IoT platform ensuring secure traceability of pharmaceutical products. It integrates smart contracts, IPFS, and AI verification to monitor and validate medicine quality throughout the supply chain.",
    techStack: ["React.js", "React Native", "Solidity", "Ethereum", "IPFS", "Node-RED", "Python", "AI/ML"],
    link: "https://github.com/ayoubharati/medProject",
    thumbnail: "/assets/pharmachain_cover.png",
  },
  {
    id: 2,
    title: "MarkerGo",
    description:
      "A modern cross-platform mobile application built with Expo & React Native for discovering and managing local market listings. Includes geolocation, image uploads, native device support (iOS/Android/Web), and state management with Zustand.",
    techStack: ["React Native", "Expo", "TypeScript", "NativeWind", "Zustand", "Expo Router"],
    link: "https://github.com/abdellah-elgharbi/MarkerGo",
    // thumbnail: "/assets/market_cover.png", // Commented out to test the placeholder
  },
  {
    id: 3,
    title: "Paraphrase FR",
    description:
      "A research-driven NLP project focused on French paraphrase detection using the PAWS-X dataset. It benchmarks multiple approaches — from TF-IDF baselines to fine-tuned CamemBERT and hybrid models.",
    techStack: ["Python", "Transformers", "CamemBERT", "Streamlit", "PyTorch", "NLTK"],
    link: "https://github.com/ayoubharati/paraphrase_fr",
    thumbnail: "/assets/paraphrase_fr_cover.png",
  },
  {
    id: 4,
    title: "SqlRag",
    description: "A full-stack AI-powered data warehouse chatbot that transforms natural language queries into SQL queries through a sophisticated 7-step workflow.",
    techStack: ["React.js", "Flask", "Python", "Google Gemini AI", "FAISS", "PostgreSQL", "Chart.js"],
    link: "https://github.com/ayoubharati/dataware_chatbot",
    thumbnail: "/assets/sqlrag_cover.png"
  },
  {
    id: 5,
    title: "ExamSessionManager",
    description:
      "A full-stack web application for managing and automating exam supervision within universities. It streamlines scheduling, teacher assignments, and session monitoring with a secure interface and real-time updates.",
    techStack: ["React.js", "Spring Boot", "Spring Security", "Hibernate", "MySQL", "Tailwind CSS"],
    link: "https://github.com/YounesAO/ExamSessionManger",
    thumbnail: "/assets/examsessionmanager_cover.png",
  },
  {
    id: 6,
    title: "Smart Rehab",
    description:
      "A smart rehabilitation platform that leverages real-time pose detection and motion analysis to assist patients and therapists in monitoring and improving physical recovery.",
    techStack: ["Vite.js", "Spring Boot", "MySQL", "Java (Android)", "Docker", "Pose Detection"],
    link: "https://github.com/Ballouk12/SmartRehab",
    thumbnail: "/assets/smartrehab_cover.png",
  }
];

export default function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [imgError, setImgError] = useState<Record<string, boolean>>({});

  const duplicatedProjects = [...projects, ...projects, ...projects];

  // --- 2. Custom Smooth Scroll Function ---
  const animateScroll = (target: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const start = container.scrollLeft;
    const distance = target - start;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / SCROLL_DURATION, 1);
      const easedProgress = easeOutQuart(progress);

      container.scrollLeft = start + (distance * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setIsAutoScrolling(false);
      }
    };

    setIsAutoScrolling(true);
    requestAnimationFrame(step);
  };

  const scrollToIndex = (index: number) => {
    const scrollPosition = index * (CARD_WIDTH + GAP);
    animateScroll(scrollPosition);
  };

  const handleNext = () => {
    if (isAutoScrolling) return;
    const nextIndex = (currentIndex + 1) % projects.length;
    setCurrentIndex(nextIndex);
    scrollToIndex(nextIndex + projects.length);
  };

  const handlePrev = () => {
    if (isAutoScrolling) return;
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    setCurrentIndex(prevIndex);
    scrollToIndex(prevIndex + projects.length);
  };

  // Handle Image Errors
  const handleImageError = (id: number) => {
    setImgError(prev => ({ ...prev, [id]: true }));
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = (CARD_WIDTH + GAP) * projects.length;
    }
  }, []);

  // Infinite Loop Logic
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isAutoScrolling) return;

      const scrollLeft = container.scrollLeft;
      const totalSetWidth = (CARD_WIDTH + GAP) * projects.length;

      if (scrollLeft < totalSetWidth * 0.5) {
        container.scrollLeft = scrollLeft + totalSetWidth;
      } else if (scrollLeft > totalSetWidth * 2.5) {
        container.scrollLeft = scrollLeft - totalSetWidth;
      }

      const relativeScroll = scrollLeft - totalSetWidth;
      const index = Math.round(relativeScroll / (CARD_WIDTH + GAP));
      const normalizedIndex = ((index % projects.length) + projects.length) % projects.length;

      if (normalizedIndex !== currentIndex) {
        setCurrentIndex(normalizedIndex);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentIndex, isAutoScrolling]);

  return (
    <section id="projects" className="min-h-screen flex flex-col justify-center pt-32 pb-20 bg-[#042A15] overflow-hidden">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-[42px] md:text-[72px] font-heading !text-white mb-4">
            <span className="font-accent text-[#FFD700]">My</span> Projects
          </h2>
          <p className="text-base !text-gray-300 font-body max-w-2xl mx-auto">
            A collection of innovative projects showcasing my expertise in full-stack development.
          </p>
        </div>
      </div>

      <div className="relative w-full max-w-[1400px] mx-auto px-4">
        <button
          onClick={handlePrev}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white shadow-xl border border-gray-100 text-primary-dark flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300"
          aria-label="Previous"
        >
          <ChevronLeft size={20} className="md:w-7 md:h-7" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white shadow-xl border border-gray-100 text-primary-dark flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300"
          aria-label="Next"
        >
          <ChevronRight size={20} className="md:w-7 md:h-7" />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory py-12 px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {duplicatedProjects.map((project, index) => (
            <div
              key={`${project.id}-${index}`}
              className="flex-shrink-0 w-[85vw] md:w-[400px] snap-center group relative bg-white border-2 border-primary-dark rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2"
            >
              {/* Thumbnail / Placeholder Logic */}
              <div className="relative h-52 overflow-hidden bg-zinc-100">
                {project.thumbnail && !imgError[`${project.id}-${index}`] ? (
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    onError={() => handleImageError(`${project.id}-${index}`)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <ProjectPlaceholder title={project.title} />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
              </div>

              <div className="p-6">
                <h3 className="text-[24px] font-bold text-primary-dark mb-3 group-hover:text-[#FFD700] transition-colors">
                  {project.title}
                </h3>

                <p className="text-[15px] text-gray-600 leading-relaxed mb-5 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-500">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex gap-3">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#063F1F] text-white font-medium hover:bg-[#FFD700] hover:text-[#063F1F] transition-all duration-300 shadow-lg shadow-primary-dark/20"
                  >
                    View Project
                    <ArrowRight size={16} />
                  </a>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-4 py-2.5 rounded-lg border-2 border-gray-200 text-gray-700 hover:border-[#063F1F] hover:text-[#063F1F] transition-all duration-300"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}