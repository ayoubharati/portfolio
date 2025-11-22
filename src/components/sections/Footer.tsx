import Link from 'next/link'
import { Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="py-12 px-6 bg-primary-dark border-t border-accent-lime">
      <div className="max-w-[980px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-4">
            <h3 className="text-[32px] md:text-[50px] font-heading text-accent-lime mb-4">
              Ayoub Harati
            </h3>

            {/* Social Links */}
            <div className="flex items-center gap-4 mb-6">
              <a
                href="https://www.instagram.com/ayoub_aav/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 text-accent-lime hover:scale-110 transition-transform"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/ayoub-harati-2026a22b9/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 text-accent-lime hover:scale-110 transition-transform"
              >
                <Linkedin size={28} />
              </a>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm font-body text-light-gray">
              <p>
                <a href="mailto:ayoubharati987@gmail.com" className="hover:text-accent-lime transition-colors">
                  ayoubharati987@gmail.com
                </a>
              </p>
              <p>Software Engineering Student</p>
              <p>ENSA El Jadida, Morocco</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="space-y-2 text-sm font-body text-light-gray">
              <p>
                <Link href="#about" className="hover:text-accent-lime transition-colors underline">
                  About
                </Link>
              </p>
              <p>
                <Link href="#projects" className="hover:text-accent-lime transition-colors underline">
                  Projects
                </Link>
              </p>
              <p>
                <Link href="#contact" className="hover:text-accent-lime transition-colors underline">
                  Contact
                </Link>
              </p>
            </div>

            <div className="pt-8 text-sm font-body text-light-gray">
              <p>
                © {new Date().getFullYear()} by Ayoub Harati. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
