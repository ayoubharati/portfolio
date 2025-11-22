'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Menu, X, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  // Transform values for scroll effects
  const headerHeight = useTransform(scrollY, [0, 100], ['100px', '70px'])
  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(6, 63, 31, 0)', 'rgba(6, 63, 31, 0.85)']
  )
  const backdropBlur = useTransform(scrollY, [0, 100], ['0px', '12px'])
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80
      const elementPosition = element.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  const navLinks = [
    { name: 'HOME', id: 'hero' },
    { name: 'ABOUT', id: 'about' },
    { name: 'PROJECTS', id: 'projects' },
    { name: 'CONTACT', id: 'contact' },
  ]

  return (
    <>
      <motion.header
        style={{
          height: headerHeight,
          backgroundColor: headerBackground,
          backdropFilter: `blur(${isScrolled ? 12 : 0}px)`,
          WebkitBackdropFilter: `blur(${isScrolled ? 12 : 0}px)`, // Safari support
        }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Glass border effect on scroll */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent"
          style={{ opacity: isScrolled ? 1 : 0 }}
        />

        <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <motion.div
            style={{ scale: logoScale }}
            className="relative z-50"
          >
            <Link
              href="/"
              className="text-2xl font-heading font-bold tracking-wider text-[#FFD700] flex items-center gap-2 group"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] to-[#FFA500] group-hover:to-[#FFD700] transition-all duration-500">
                AYOUB HARATI
              </span>
              <motion.div
                className="w-2 h-2 rounded-full bg-[#FFD700]"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className="relative text-sm font-body font-medium tracking-widest text-white/90 hover:text-[#FFD700] transition-colors group py-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.5 }}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FFD700] transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#FFD700]" />
              </motion.button>
            ))}

            <motion.button
              onClick={() => scrollToSection('contact')}
              className="ml-4 px-6 py-2.5 rounded-full border border-[#FFD700]/50 text-[#FFD700] font-body text-sm tracking-wider hover:bg-[#FFD700] hover:text-[#063F1F] transition-all duration-300 shadow-[0_0_15px_rgba(255,215,0,0.1)] hover:shadow-[0_0_20px_rgba(255,215,0,0.4)]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              HIRE ME
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden relative z-50 text-[#FFD700] p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[#063F1F]/95 backdrop-blur-xl flex items-center justify-center md:hidden"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] rounded-full bg-[#FFD700]/10 blur-[80px]" />
              <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] rounded-full bg-[#FFD700]/5 blur-[80px]" />
            </div>

            <nav className="flex flex-col items-center space-y-8 w-full max-w-xs relative z-10">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  onClick={() => scrollToSection(link.id)}
                  className="group flex items-center justify-between w-full text-2xl font-heading font-light text-white hover:text-[#FFD700] transition-colors border-b border-white/10 pb-4"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index + 0.2 }}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300 text-[#FFD700]" />
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
