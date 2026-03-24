import { useUserStore } from '../store/useUserStore'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Diamond, ShieldCheck, List, FileText, Calendar, WarningCircle } from '@phosphor-icons/react'

export function PatientPortal() {
  const { user, appointments, isLoggedIn } = useUserStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    }
  }, [isLoggedIn, navigate])

  if (!isLoggedIn) return null

  return (
    <div className="min-h-screen bg-cream lg:px-24 py-40">
      <div className="section-container">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-32">
           <div>
              <span className="label-luxury">The Secure Portal</span>
              <h1 className="text-6xl font-serif text-onyx mb-4 font-light italic text-balance">Welcome, {(user?.name || 'Patient').split(' ')[0]}.</h1>
              <p className="text-sm font-light text-onyx/40 italic tracking-wide">Secure Clinical Dossier — {user?.email}</p>
           </div>
           <div className="flex gap-12 pt-8 border-l border-onyx/5 pl-12 h-fit">
              <div className="flex flex-col">
                 <span className="text-[10px] font-bold tracking-widest uppercase opacity-40 mb-2">Sovereign Tier</span>
                 <span className="text-xl font-serif text-gold">Concierge Access</span>
              </div>
              <div className="flex flex-col">
                 <span className="text-[10px] font-bold tracking-widest uppercase opacity-40 mb-2">Next Visit</span>
                 <span className="text-xl font-serif text-onyx">
                   {appointments.length > 0 ? appointments[appointments.length-1].date : 'No Visits Scheduled'}
                 </span>
              </div>
           </div>
        </div>

        {/* Clinical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           
           {/* Left: Treatment Timeline (Luxury) */}
           <div className="lg:col-span-8 space-y-12">
              <div className="bg-white p-12 lg:p-16 shadow-[0_40px_80px_-20px_rgba(18,20,24,0.05)] border border-onyx/5">
                 <div className="flex justify-between items-center mb-16">
                    <h3 className="text-3xl font-serif text-onyx">Clinical History</h3>
                    <div className="text-onyx/20"><List size={24} weight="light" /></div>
                 </div>
                 
                 <div className="space-y-12">
                   {appointments.length > 0 ? (
                    [...appointments].reverse().map((t, i) => (
                       <motion.div 
                         key={i} 
                         initial={{ opacity: 0, x: -20 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: i * 0.1 }}
                         className="flex flex-col md:flex-row justify-between items-start md:items-center py-8 border-b border-onyx/5 group transition-colors hover:border-gold/50 cursor-pointer"
                       >
                          <div className="flex gap-8 items-center">
                             <div className="w-12 h-12 bg-cream flex items-center justify-center text-onyx transition-colors group-hover:bg-onyx group-hover:text-gold">
                                <span className="font-serif text-lg font-bold">0{appointments.length - i}</span>
                             </div>
                             <div>
                                <h4 className="text-xl font-medium font-serif leading-none tracking-tight">{t.service}</h4>
                                <p className="text-xs font-light text-onyx/30 tracking-widest uppercase mt-3 italic">{t.clinician}</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-12 mt-6 md:mt-0">
                             <div className="flex flex-col items-end">
                                <span className="text-xs font-bold tracking-[0.2em] uppercase text-onyx/20 italic">{t.date}</span>
                                <span className="text-[9px] font-bold text-gold/60 tracking-widest uppercase">{t.time}</span>
                             </div>
                             <span className="text-[10px] font-bold tracking-[0.3em] uppercase w-32 px-4 py-2 text-center rounded-none shadow-sm bg-black text-gold">
                                SCHEDULED
                             </span>
                          </div>
                       </motion.div>
                    ))
                   ) : (
                    <div className="py-20 text-center text-onyx/20 italic font-serif">
                       No clinical records found.
                    </div>
                   )}
                 </div>
              </div>
           </div>

           {/* Right: Personal Dossier Actions */}
           <div className="lg:col-span-4 space-y-12">
              <div className="bg-onyx text-cream p-12 lg:p-16 border border-gold/20 shadow-2xl relative overflow-hidden">
                 <Diamond size={120} weight="light" className="absolute -bottom-10 -right-10 opacity-5 text-gold" />
                 <h3 className="text-3xl font-serif mb-10 text-gold italic">The Digital Dossier</h3>
                 
                 <div className="space-y-10">
                    <button className="flex items-center gap-6 w-full text-left group">
                       <div className="w-10 h-10 border border-gold/30 flex items-center justify-center transition-colors group-hover:bg-gold group-hover:text-onyx"><FileText size={20} weight="light" /></div>
                       <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-60 group-hover:opacity-100 transition-all">Clinical Notes (PDF)</span>
                    </button>
                    <button className="flex items-center gap-6 w-full text-left group">
                       <div className="w-10 h-10 border border-gold/30 flex items-center justify-center transition-colors group-hover:bg-gold group-hover:text-onyx"><Calendar size={20} weight="light" /></div>
                       <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-60 group-hover:opacity-100 transition-all">Medical Itinerary</span>
                    </button>
                    <button className="flex items-center gap-6 w-full text-left group">
                       <div className="w-10 h-10 border border-gold/30 flex items-center justify-center transition-colors group-hover:bg-gold group-hover:text-onyx"><ShieldCheck size={20} weight="light" /></div>
                       <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-60 group-hover:opacity-100 transition-all">Sovereign Privacy Policy</span>
                    </button>
                 </div>
              </div>

              <div className="bg-platinum/50 p-12 border border-onyx/5 flex items-center gap-6">
                 <div className="text-onyx/20"><WarningCircle size={28} weight="light" /></div>
                 <div>
                    <h5 className="text-[10px] font-bold tracking-widest uppercase opacity-60">Confidentiality Protocol</h5>
                    <p className="text-[10px] italic text-onyx/30 mt-1 text-balance">This dossier is end-to-end encrypted and shared only with your lead clinicians.</p>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  )
}
