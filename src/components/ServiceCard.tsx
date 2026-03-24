import React from 'react'
import { IconProps } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { ArrowRight } from '@phosphor-icons/react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface ServiceCardProps {
  title: string
  description: string
  icon: React.ElementType<IconProps>
  tag?: string
  delay?: number
}

export function ServiceCard({ title, description, icon: Icon, tag, delay = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-white p-12 flex flex-col items-start h-full cursor-pointer relative overflow-hidden transition-all duration-1000 hover:shadow-2xl"
    >
      {/* Subtle Hover Reveal */}
      <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      
      {tag && (
        <span className="absolute top-10 right-10 text-[9px] font-bold tracking-[0.4em] uppercase text-gold">
          {tag}
        </span>
      )}

      <div className="w-14 h-14 flex items-center justify-center bg-cream/80 text-onyx mb-12 relative overflow-hidden transition-all duration-700 group-hover:bg-gold group-hover:text-white group-hover:scale-110">
        <Icon size={32} weight="light" />
      </div>

      <h3 className="text-3xl font-serif text-onyx mb-6 transition-transform duration-700 group-hover:translate-x-2">
        {title}
      </h3>
      
      <p className="text-onyx/30 leading-relaxed font-light mb-auto transition-colors duration-700 group-hover:text-onyx/60">
        {description}
      </p>

      <div className="mt-14 flex items-center gap-4 text-[10px] font-bold tracking-[0.3em] uppercase text-onyx/20 group-hover:text-gold transition-colors duration-1000">
        PROTOCOL DETAILS
        <ArrowRight size={14} className="group-hover:translate-x-4 transition-transform duration-1000" />
      </div>

      {/* Decorative Corner Line */}
      <div className="absolute bottom-0 right-0 w-0 h-[1px] bg-gold transition-all duration-1000 group-hover:w-20" />
    </motion.div>
  )
}
