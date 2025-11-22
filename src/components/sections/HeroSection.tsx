'use client'

import { useEffect, useRef, useState, useMemo } from 'react'

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)
  // Added <HTMLElement> type definition for better TypeScript support
  const containerRef = useRef<HTMLElement | null>(null)

  // 1. Store mouse positions in refs (no re-renders for performance)
  const mousePos = useRef({ x: 0, y: 0 })
  const currentPos = useRef({ x: 0, y: 0 })

  // 2. Generate cubes once on mount to avoid server/client mismatch
  const cubes = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      size: Math.random() * 120 + 30,
      x: Math.random() * 150,
      y: Math.random() * 100,
      isGlowing: Math.random() > 0.65,
      rotation: Math.random() * 360,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 5,
      // Larger cubes move slightly more for a parallax depth effect
      movementFactor: 0.5 + Math.random() * 0.5
    }))
  }, [])

  useEffect(() => {
    setMounted(true)

    // Handle Mouse Move
    // FIX: Added ': MouseEvent' type annotation here
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate position relative to center of screen
      const x = (e.clientX - window.innerWidth / 2)
      const y = (e.clientY - window.innerHeight / 2)
      mousePos.current = { x, y }
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Animation Loop for "Slow" Movement
    let animationFrameId: number

    const animate = () => {
      // LERP (Linear Interpolation): 
      // Move 5% of the distance towards the target per frame
      // Changing 0.05 to 0.02 makes it slower, 0.1 makes it faster
      const ease = 0.05

      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * ease
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * ease

      // Update CSS Variables on the container
      if (containerRef.current) {
        containerRef.current.style.setProperty('--mouse-x', `${currentPos.current.x}px`)
        containerRef.current.style.setProperty('--mouse-y', `${currentPos.current.y}px`)
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  if (!mounted) return null

  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotateX(0deg) rotateY(0deg);
          }
          50% {
            transform: translateY(-20px) rotateX(15deg) rotateY(15deg);
          }
        }
        
        .cube-wrapper {
          /* This wrapper handles the mouse follow movement */
          position: absolute;
          transform-style: preserve-3d;
          will-change: transform;
          /* Using CSS vars updated by JS for performance */
          transform: translate3d(
            calc(var(--mouse-x) * var(--factor) * 0.1), 
            calc(var(--mouse-y) * var(--factor) * 0.1), 
            0
          );
        }

        .cube-container {
          /* This inner container handles the float animation */
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        
        .cube-face {
          position: absolute;
          backface-visibility: hidden;
        }
      `}</style>

      <section
        id="hero"
        ref={containerRef}
        className="min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-24 bg-[#063F1F] relative overflow-hidden"
      >
        {/* 3D Cubes Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {cubes.map((cube) => (
            // Outer Wrapper: Handles Positioning & Mouse Following
            <div
              key={cube.id}
              className="cube-wrapper"
              style={{
                left: `${cube.x}%`,
                top: `${cube.y}%`,
                // @ts-ignore - Custom CSS properties
                '--factor': cube.movementFactor,
              } as React.CSSProperties}
            >
              {/* Inner Container: Handles Float Animation */}
              <div
                className="cube-container"
                style={{
                  width: `${cube.size}px`,
                  height: `${cube.size}px`,
                  animation: `float ${cube.duration}s ease-in-out infinite`,
                  animationDelay: `${cube.delay}s`,
                }}
              >
                {/* Front Face */}
                <div
                  className="cube-face"
                  style={{
                    width: `${cube.size}px`,
                    height: `${cube.size}px`,
                    background: cube.isGlowing
                      ? 'linear-gradient(135deg, rgba(228, 234, 107, 0.95) 0%, rgba(228, 234, 107, 0.4) 100%)'
                      : 'linear-gradient(135deg, rgba(60, 60, 60, 0.9) 0%, rgba(40, 40, 40, 0.7) 100%)',
                    border: `1px solid ${cube.isGlowing ? 'rgba(228, 234, 107, 0.6)' : 'rgba(100, 100, 100, 0.4)'}`,
                    borderRadius: '8px',
                    transform: `translateZ(${cube.size / 2}px)`,
                    boxShadow: cube.isGlowing
                      ? `0 0 30px rgba(228, 234, 107, 0.8), inset 0 0 30px rgba(228, 234, 107, 0.3)`
                      : 'none',
                  }}
                />
                {/* Back Face */}
                <div
                  className="cube-face"
                  style={{
                    width: `${cube.size}px`,
                    height: `${cube.size}px`,
                    background: cube.isGlowing
                      ? 'linear-gradient(135deg, rgba(228, 234, 107, 0.8) 0%, rgba(228, 234, 107, 0.3) 100%)'
                      : 'linear-gradient(135deg, rgba(50, 50, 50, 0.9) 0%, rgba(30, 30, 30, 0.7) 100%)',
                    border: `1px solid ${cube.isGlowing ? 'rgba(228, 234, 107, 0.5)' : 'rgba(80, 80, 80, 0.4)'}`,
                    borderRadius: '8px',
                    transform: `translateZ(-${cube.size / 2}px) rotateY(180deg)`,
                  }}
                />
                {/* Right Face */}
                <div
                  className="cube-face"
                  style={{
                    width: `${cube.size}px`,
                    height: `${cube.size}px`,
                    background: cube.isGlowing
                      ? 'linear-gradient(135deg, rgba(228, 234, 107, 0.7) 0%, rgba(228, 234, 107, 0.3) 100%)'
                      : 'linear-gradient(135deg, rgba(55, 55, 55, 0.9) 0%, rgba(35, 35, 35, 0.7) 100%)',
                    border: `1px solid ${cube.isGlowing ? 'rgba(228, 234, 107, 0.5)' : 'rgba(90, 90, 90, 0.4)'}`,
                    borderRadius: '8px',
                    transform: `rotateY(90deg) translateZ(${cube.size / 2}px)`,
                  }}
                />
                {/* Left Face */}
                <div
                  className="cube-face"
                  style={{
                    width: `${cube.size}px`,
                    height: `${cube.size}px`,
                    background: cube.isGlowing
                      ? 'linear-gradient(135deg, rgba(228, 234, 107, 0.7) 0%, rgba(228, 234, 107, 0.3) 100%)'
                      : 'linear-gradient(135deg, rgba(55, 55, 55, 0.9) 0%, rgba(35, 35, 35, 0.7) 100%)',
                    border: `1px solid ${cube.isGlowing ? 'rgba(228, 234, 107, 0.5)' : 'rgba(90, 90, 90, 0.4)'}`,
                    borderRadius: '8px',
                    transform: `rotateY(-90deg) translateZ(${cube.size / 2}px)`,
                  }}
                />
                {/* Top Face */}
                <div
                  className="cube-face"
                  style={{
                    width: `${cube.size}px`,
                    height: `${cube.size}px`,
                    background: cube.isGlowing
                      ? 'linear-gradient(135deg, rgba(228, 234, 107, 0.85) 0%, rgba(228, 234, 107, 0.4) 100%)'
                      : 'linear-gradient(135deg, rgba(65, 65, 65, 0.9) 0%, rgba(45, 45, 45, 0.7) 100%)',
                    border: `1px solid ${cube.isGlowing ? 'rgba(228, 234, 107, 0.6)' : 'rgba(95, 95, 95, 0.4)'}`,
                    borderRadius: '8px',
                    transform: `rotateX(90deg) translateZ(${cube.size / 2}px)`,
                  }}
                />
                {/* Bottom Face */}
                <div
                  className="cube-face"
                  style={{
                    width: `${cube.size}px`,
                    height: `${cube.size}px`,
                    background: cube.isGlowing
                      ? 'linear-gradient(135deg, rgba(228, 234, 107, 0.6) 0%, rgba(228, 234, 107, 0.3) 100%)'
                      : 'linear-gradient(135deg, rgba(45, 45, 45, 0.9) 0%, rgba(25, 25, 25, 0.7) 100%)',
                    border: `1px solid ${cube.isGlowing ? 'rgba(228, 234, 107, 0.5)' : 'rgba(85, 85, 85, 0.4)'}`,
                    borderRadius: '8px',
                    transform: `rotateX(-90deg) translateZ(${cube.size / 2}px)`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="max-w-[980px] mx-auto relative z-10 w-full text-center">
          <h1 className="text-[42px] sm:text-[60px] md:text-[95px] lg:text-[125px] font-accent text-[#FFD700] leading-[1.1] mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
            Innovate <span className="font-accent italic">with</span>{' '}
            <span className="font-accent">Ayoub</span>
          </h1>

          <p className="text-lg md:text-2xl text-[#FFD700] mb-10 max-w-3xl mx-auto font-body px-4">
            Unlocking Cutting-Edge Solutions Through Big Data, Cloud Computing & AI Excellence
          </p>

          <div className="flex justify-center">
            <button
              onClick={() => {
                const element = document.getElementById('about')
                if (element) {
                  window.scrollTo({
                    top: element.offsetTop - 80,
                    behavior: 'smooth'
                  })
                }
              }}
              className="px-10 py-4 rounded-[12px] bg-transparent border-2 border-[#FFD700] text-[#FFD700] font-body text-base md:text-lg font-semibold hover:bg-[#FFD700]/10 hover:border-[#FFA500] hover:text-[#FFA500] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              style={{ boxShadow: '0 0 15px rgba(255, 215, 0, 0.3)' }}
            >
              EXPLORE NOW
            </button>
          </div>
        </div>
      </section>
    </>
  )
}