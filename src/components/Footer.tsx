import React from 'react'
import { Link } from 'react-router-dom'
import { Diamond } from '@phosphor-icons/react'

export function Footer() {
  return (
    <footer className="py-32 bg-cream border-t border-onyx/5 relative z-10">
      <div className="section-container flex flex-col lg:flex-row justify-between items-start gap-20">
        <div>
          <div className="flex align-center gap-4 mb-10">
            <div className="w-10 h-10 border border-onyx flex items-center justify-center">
              <span className="text-sm font-serif font-bold">DS</span>
            </div>
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase translate-y-3">DENTAL SERVICE</span>
          </div>
          <p className="text-sm font-light text-onyx/40 max-w-sm italic">Clinical Luxury & High-Performance Dental Care. EST. 2026. <br />Available in London, Zurich, and NYC.</p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-24">
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold">The Practice</h4>
            <ul className="space-y-4 text-xs font-medium tracking-wider text-onyx/50 transition-colors">
              <li className="hover:text-onyx cursor-pointer transition-colors">Locations</li>
              <li className="hover:text-onyx cursor-pointer transition-colors">Clinicians</li>
              <li className="hover:text-onyx cursor-pointer transition-colors">Pricing Archetypes</li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold">Concierge</h4>
            <ul className="space-y-4 text-xs font-medium tracking-wider text-onyx/50 transition-colors">
              <li className="hover:text-onyx cursor-pointer transition-colors">Portal Access</li>
              <li className="hover:text-onyx cursor-pointer transition-colors">Secure Messaging</li>
              <li className="hover:text-onyx cursor-pointer transition-colors">Patient Rights</li>
            </ul>
          </div>
          <div className="hidden lg:block space-y-6">
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold">Direct Access</h4>
            <p className="text-lg font-serif italic text-onyx">+1 800 LUX-SMILE</p>
            <p className="text-[10px] font-bold tracking-[0.1em] opacity-40 uppercase">EXCLUSIVELY LONDON / NYC</p>
          </div>
        </div>
      </div>
      <div className="section-container mt-32 border-t border-onyx/5 pt-12 flex flex-col md:flex-row justify-between opacity-30">
        <p className="text-[9px] font-bold tracking-[0.4em] uppercase">© 2026 DENTAL SERVICE PRIVATE PRACTICE. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8 mt-4 md:mt-0">
          <span className="text-[9px] font-bold tracking-[0.4em] uppercase cursor-pointer">PRIVACY</span>
          <span className="text-[9px] font-bold tracking-[0.4em] uppercase cursor-pointer">TERMS</span>
        </div>
      </div>
    </footer>
  )
}
