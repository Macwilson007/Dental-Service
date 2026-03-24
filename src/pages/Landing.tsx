import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Diamond, Sparkle, Tooth, ShieldCheck, Clock } from '@phosphor-icons/react'
import { ServiceCard } from '../components/ServiceCard'

import { useUserStore } from '../store/useUserStore'

const iconMap: Record<string, any> = {
  Sparkle,
  Tooth,
  ShieldCheck,
  Clock
}

export function Landing() {
  const { content } = useUserStore()
  const { hero, services, clinicians } = content

  return (
    <div className="flex flex-col bg-cream overflow-hidden">
      {/* Hero: The Cinema of Oral Care */}
      <section className="relative min-h-screen flex items-center justify-center py-20">
        <div className="section-container grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10 w-full">
           
           {/* Left: Dramatic Typography */}
           <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                 <div className="flex items-center gap-4 mb-10 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: 40 }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className="h-[1px] bg-gold"
                    />
                    <span className="text-sm font-bold tracking-[0.5em] uppercase text-gold">Elite Clinical Standards</span>
                 </div>
                 
                 <h1 className="text-7xl lg:text-[10vw] font-serif leading-[0.9] tracking-tighter mb-10 selection:bg-gold/40">
                    {hero.titleTop} <br />
                    <span className="italic font-light">{hero.titleBottom}</span>
                 </h1>
                 
                 <p className="text-xl lg:text-3xl font-serif font-light text-onyx/40 leading-relaxed mb-16 max-w-xl">
                    {hero.subtitle}
                 </p>

                 <div className="flex flex-col sm:flex-row gap-8 items-start">
                    <Link to="/book" className="btn-premium group flex items-center gap-4">
                       RESERVE YOUR VISIT
                       <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-500" />
                    </Link>
                    <Link to="/services" className="text-sm font-bold tracking-[0.4em] uppercase py-5 border-b border-onyx/10 hover:border-onyx transition-colors">
                       DISCOVER THE SERVICES
                    </Link>
                 </div>
              </motion.div>
           </div>

           {/* Right: Architectural Hero Visual */}
           <div className="lg:col-span-6 relative">
              <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="aspect-[4/5] bg-onyx overflow-hidden shadow-[0_50px_100px_-20px_rgba(18,20,24,0.15)] relative"
              >
                 <img 
                   src={hero.heroImageUrl} 
                   alt="Modern Dental Clinic" 
                   className="object-cover w-full h-full mix-blend-soft-light opacity-90 animate-slow-pan"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-onyx/40 to-transparent" />
                 
                 {/* Floating Signature */}
                 <div className="absolute top-10 right-10 flex flex-col items-end opacity-20">
                    <Diamond size={32} weight="light" className="text-gold mb-2" />
                    <span className="text-xs font-bold tracking-[0.6em] uppercase">Private Practice</span>
                 </div>
              </motion.div>
           </div>
        </div>

        {/* Vertical Text Branding */}
        <div className="absolute bottom-10 left-10 hidden xl:flex flex-col items-start gap-4 transform rotate-180 [writing-mode:vertical-lr] opacity-10">
           <span className="text-sm font-bold tracking-[1em] uppercase">MODERN CONCIERGE DENTISTRY</span>
        </div>
      </section>

      {/* Philosophy Section: The Manifesto of Precision */}
      <section id="philosophy" className="py-24 md:py-48 bg-onyx text-cream relative overflow-hidden scroll-mt-20">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square bg-gold/[0.02] blur-[100px] rounded-full pointer-events-none" />
         <div className="section-container grid grid-cols-1 lg:grid-cols-12 gap-24 items-center relative z-10">
            <div className="lg:col-span-5 space-y-12">
               <motion.div
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 1 }}
               >
                  <span className="text-sm font-bold tracking-[0.6em] uppercase text-gold/60 block mb-8">Our Philosophy</span>
                  <h2 className="text-6xl lg:text-8xl font-serif font-light leading-[0.8] mb-12 tracking-tighter">
                    Clinical <br /> 
                    <span className="italic font-normal text-gold">Purity.</span>
                  </h2>
                  <div className="h-px w-20 bg-gold/40" />
               </motion.div>
            </div>
            <div className="lg:col-span-7 space-y-16">
               <motion.p 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 1, delay: 0.2 }}
                 className="text-2xl lg:text-5xl font-serif font-light text-cream/30 leading-[1.3] max-w-4xl"
               >
                  "We have decoupled dentistry from the sterile clinical environment. At <span className="text-gold italic">Dental Service</span>, we curate health through the lens of architectural serenity and biological respect."
               </motion.p>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-cream/5">
                  <div className="space-y-4">
                     <h3 className="text-sm font-bold tracking-[0.4em] uppercase text-gold">01. Bio-Integration</h3>
                     <p className="text-sm tracking-widest leading-relaxed text-cream/20">Our treatments are synchronized with your natural aesthetics, ensuring structural integrity and cellular-level compatibility.</p>
                  </div>
                  <div className="space-y-4">
                     <h3 className="text-sm font-bold tracking-[0.4em] uppercase text-gold">02. Digital Artisanship</h3>
                     <p className="text-sm tracking-widest leading-relaxed text-cream/20">We leverage ultra-high-resolution imaging and AI-driven precision to design smile architectures that are uniquely yours.</p>
                  </div>
                  <div className="space-y-4">
                     <h3 className="text-sm font-bold tracking-[0.4em] uppercase text-gold">03. Concierge Sovereignty</h3>
                     <p className="text-sm tracking-widest leading-relaxed text-cream/20">Your time is your most finite resource. Our zero-wait protocol and private consultation suites respect your autonomy.</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Services: The Clinical Portfolio */}
      <section id="services" className="py-24 md:py-48 bg-cream scroll-mt-20">
         <div className="section-container">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-32 gap-12">
               <div className="max-w-3xl space-y-8">
                  <span className="text-sm font-bold tracking-[0.6em] uppercase text-gold/60 block">The Portfolio</span>
                  <h2 className="text-7xl lg:text-[10vw] font-serif tracking-tighter mb-8 leading-[0.8]">Clinical <br /> <span className="font-light italic text-gold">Modules.</span></h2>
               </div>
               <div className="flex flex-col gap-6 items-start">
                  <p className="text-sm font-serif italic text-onyx/40 max-w-xs leading-relaxed">
                    A curated spectrum of restorative and aesthetic interventions delivered with architectural precision.
                  </p>
                  <Link to="/book" className="group flex items-center gap-6 text-sm font-bold tracking-[0.4em] uppercase text-gold border-b border-gold/10 pb-2 hover:border-gold transition-all">
                     Reserve Visit <ArrowRight size={12} className="group-hover:translate-x-2 transition-transform" />
                  </Link>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-[1px] bg-onyx/5 border border-onyx/5">
               {services.map((s, i) => (
                 <ServiceCard key={s.id} {...s} icon={iconMap[s.iconName]} delay={i * 0.15} />
               ))}
            </div>
         </div>
      </section>

      {/* Clinicians: The Medical Atelier */}
      <section id="clinicians" className="py-24 md:py-48 bg-cream border-t border-onyx/5 scroll-mt-20">
         <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
               <div className="lg:col-span-4 sticky top-32 space-y-12">
                  <span className="text-sm font-bold tracking-[0.6em] uppercase text-gold/60 block">Medical Atelier</span>
                  <h2 className="text-6xl lg:text-7xl font-serif tracking-tight leading-[0.9]">The Senior <br /> <span className="italic font-light">Artisans.</span></h2>
                  <p className="text-sm tracking-widest font-medium leading-loose text-onyx/40 max-w-sm">
                    Our clinicians are globally recognized surgeons and aesthetic engineers, dedicated to the mastery of biological dentistry.
                  </p>
               </div>
               
               <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                  {clinicians.map((clinician, i) => (
                    <motion.div 
                      key={clinician.id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 }}
                      className={`space-y-8 group ${i === 1 ? 'mt-24' : ''}`}
                    >
                       <div className="aspect-[4/5] bg-onyx overflow-hidden relative">
                          <img src={clinician.imageUrl} className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" alt={clinician.name} />
                          <div className="absolute inset-x-8 bottom-8">
                             <span className="text-xs font-bold tracking-[0.5em] uppercase text-gold/80 bg-onyx/90 px-4 py-2 backdrop-blur-sm">{clinician.role}</span>
                          </div>
                       </div>
                       <div className="space-y-2 px-2">
                          <h4 className="text-3xl font-serif tracking-tight">{clinician.name}</h4>
                          <p className="text-sm font-bold tracking-[0.4em] uppercase text-onyx/30">{clinician.education}</p>
                          <p className="text-xs text-onyx/40 leading-relaxed pt-4 font-serif italic italic max-w-sm">"{clinician.quote}"</p>
                       </div>
                    </motion.div>
                  ))}
               </div>
            </div>
         </div>
      </section>

    </div>
  )
}
