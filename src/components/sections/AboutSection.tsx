'use client'

import Image from 'next/image';
import imageSrc from '../../assets/mee.jpeg';

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center pt-32 pb-20 px-6 bg-[#F5F5F5]">
      <div className="max-w-[980px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div>
            <h2 className="text-[42px] md:text-[72px] font-heading text-primary-dark mb-6 leading-[1.2]">
              <span className="font-accent">About</span> Ayoub Harati
            </h2>

            <p className="text-base leading-relaxed text-primary-dark mb-6 font-body">
              At Ayoub Harati, I am dedicated to pushing boundaries and creating impactful solutions through cutting-edge technology. With a focus on innovation and excellence, I strive to empower businesses with transformative digital tools and services.
            </p>

            <p className="text-base leading-relaxed text-primary-dark mb-8 font-body">
              I'm a 5th-year software engineering student at ENSA El Jadida, specializing in full-stack development, mobile applications, and business intelligence solutions. My foundation spans Java, Python, JavaScript, and SQL, with hands-on expertise in Spring Boot, React.js, and modern cloud technologies.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  const element = document.getElementById('projects')
                  if (element) {
                    window.scrollTo({
                      top: element.offsetTop - 80,
                      behavior: 'smooth'
                    })
                  }
                }}
                className="px-8 py-3 rounded-[10px] border border-primary-dark bg-accent-lime text-primary-dark font-body text-base hover:bg-accent-lime/90 transition-colors"
              >
                DISCOVER MORE
              </button>

              <a
                href="/assets/Ayoub_Harati_CV.pdf"
                download="Ayoub_Harati_CV.pdf"
                className="px-8 py-3 rounded-[10px] border-2 border-primary-dark text-primary-dark font-body text-base hover:bg-primary-dark hover:text-white transition-all duration-300"
              >
                DOWNLOAD CV
              </a>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative w-full h-[350px] md:h-[600px] flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image
                src={imageSrc}
                alt="Ayoub Harati"
                fill
                className="object-contain mix-blend-multiply hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
