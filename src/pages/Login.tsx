import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Diamond, ShieldCheck, User, Key, ArrowRight } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { useUserStore } from '../store/useUserStore'
import { useNavigate } from 'react-router-dom'

export function Login() {
  const { setLogin } = useUserStore()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Admin check against the DS Clinic protocol
    if (email === 'admin@ds.clinic') {
      setLogin('Clinical Admin', email)
      navigate('/admin')
    } else {
      setLogin('Johnathan Doe', email || 'patient@ds-clinical.com')
      navigate('/portal')
    }
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-6 relative overflow-hidden px-12 pb-40">
      {/* Background Motifs */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-5"
      >
         <Diamond size={800} weight="thin" className="text-gold" />
      </motion.div>

      <motion.div 
         initial={{ opacity: 0, y: 50 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
         className="w-full max-w-lg bg-onyx p-16 lg:p-24 shadow-[0_50px_100px_-20px_rgba(18,20,24,0.35)] relative z-10 border border-gold/10"
      >
        <div className="flex flex-col items-center mb-16">
            <div className="w-12 h-12 border border-gold flex items-center justify-center mb-8 relative">
                <span className="text-xl font-serif font-bold text-cream">DS</span>
            </div>
            <h2 className="text-4xl font-serif text-cream italic font-light tracking-tight mb-4">Patient Login</h2>
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-gold/60 text-center">Secure Health Dossier Access</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-12">
            <div className="space-y-4">
               <label className="text-[9px] font-bold tracking-[0.4em] uppercase text-gold/40">IDENTIFICATION (EMAIL)</label>
               <div className="relative group">
                  <User size={20} weight="light" className="absolute left-0 top-1/2 -translate-y-1/2 text-gold/30 group-focus-within:text-gold transition-colors" />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-transparent border-b border-gold/20 p-5 pl-10 focus:outline-none focus:border-gold transition-all font-serif text-xl text-cream selection:bg-gold/30"
                  />
               </div>
            </div>

            <div className="space-y-4">
               <label className="text-[9px] font-bold tracking-[0.4em] uppercase text-gold/40">SECURE PASSPHRASE</label>
               <div className="relative group">
                  <Key size={20} weight="light" className="absolute left-0 top-1/2 -translate-y-1/2 text-gold/30 group-focus-within:text-gold transition-colors" />
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-transparent border-b border-gold/20 p-5 pl-10 focus:outline-none focus:border-gold transition-all font-serif text-xl text-cream selection:bg-gold/30"
                  />
               </div>
            </div>

           <div className="flex justify-end pt-4">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gold/40 hover:text-gold cursor-pointer transition-colors">FORGOT PASSPHRASE</span>
           </div>

           <button type="submit" className="btn-premium w-full !py-8 bg-gold text-onyx hover:bg-cream hover:text-onyx active:scale-[0.98]">
              ACCESS MY DOSSIER
           </button>
           
           <div className="flex flex-col items-center gap-10 pt-16">
              <div className="text-[10px] font-bold tracking-widest text-gold/30 hover:text-gold transition-colors cursor-help group relative">
                 ADMIN PROTOCOL: admin@ds.clinic
                 <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-onyx border border-gold/20 p-3 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    <span className="text-[8px] text-gold uppercase tracking-tighter">Use this for administrative access</span>
                 </div>
              </div>
              <Link to="/" className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-30 hover:opacity-100 transition-opacity text-cream flex items-center gap-4 group">
                 <ArrowRight size={14} className="rotate-180 group-hover:-translate-x-2 transition-transform" />
                 RETURN TO HOME
              </Link>
              <div className="flex items-center gap-4 opacity-10">
                 <ShieldCheck size={20} className="text-gold" />
                 <p className="text-[8px] font-bold tracking-[0.2em] uppercase text-cream">HIPAA PROTECTED ACCESS</p>
              </div>
           </div>
        </form>
      </motion.div>
    </div>
  )
}
