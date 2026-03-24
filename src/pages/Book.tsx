import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, Clock, User, Phone, WarningCircle, CheckCircle, ShieldCheck } from '@phosphor-icons/react'

import { useUserStore } from '../store/useUserStore'

const bookingSchema = z.object({
  fullName: z.string().min(3, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  serviceType: z.string().min(1, 'Please select a service'),
  preferredDate: z.string().min(1, 'Preferred date is required'),
  preferredTime: z.string().min(1, 'Please select a time slot'),
  notes: z.string().optional(),
})

type BookingFormValues = z.infer<typeof bookingSchema>

export function Book() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { setLogin, addAppointment, isLoggedIn } = useUserStore()
  
  const { register, handleSubmit, formState: { errors } } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    mode: 'onBlur',
  })

  const onSubmit = (data: BookingFormValues) => {
    // DS Clinical logic: Automatic secure registration upon first booking
    if (!isLoggedIn) {
      setLogin(data.fullName, data.email)
    }

    addAppointment({
      service: data.serviceType === 'couture' ? 'Couture Smile Makeover' : 
               data.serviceType === 'bio' ? 'Biological Hygiene' : 
               data.serviceType === 'precision' ? 'Restorative Precision' : 'Concierge Diagnostics',
      date: data.preferredDate,
      time: data.preferredTime === 'am' ? '09:00 AM' : data.preferredTime === 'mid' ? '12:30 PM' : '03:45 PM',
      clinician: 'Dr. Julian Valerius',
    })

    setIsSubmitted(true)
  }

  if (isSubmitted) {
     return (
        <section className="section-padding flex flex-col items-center justify-center min-h-[80vh] text-center bg-cream px-12 pt-40">
           <motion.div 
             initial={{ scale: 0.8, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ type: 'spring', damping: 15 }}
             className="w-24 h-24 border border-gold rounded-full flex items-center justify-center text-gold mb-12"
           >
              <CheckCircle size={48} weight="light" />
           </motion.div>
           <h2 className="text-6xl font-serif text-onyx mb-8 font-light italic">Request Initiated.</h2>
           <p className="text-xl text-onyx/40 font-serif font-light max-w-2xl mb-16 leading-relaxed">
             We have received your request for a personalized clinical experience. A dedicated concierge will reach out to confirm your itinerary within the hour.
           </p>
           <Link to="/" className="btn-premium">RETURN TO HOME</Link>
        </section>
     )
  }

  return (
    <section className="py-40 bg-white min-h-screen">
      <div className="section-container grid grid-cols-1 lg:grid-cols-12 gap-24">
        
        {/* Left Side: Concierge Context */}
        <div className="lg:col-span-4 lg:sticky lg:top-40 h-fit">
          <span className="label-luxury">The Reservation</span>
          <h2 className="text-7xl font-serif text-onyx mb-12 leading-[1.05] tracking-tight">Schedule <br /> your <span className="italic">itinerary.</span></h2>
          <p className="text-xl text-onyx/40 font-serif font-light leading-relaxed mb-16 italic">
             "Our scheduling process is curated to respect your most finite resource: time. Clinical visits are optimized for zero-wait access."
          </p>

          <div className="space-y-16 pt-16 border-t border-onyx/5">
             <div className="flex gap-8">
                <div className="text-gold"><Clock size={32} weight="light" /></div>
                <div>
                   <h4 className="text-[10px] font-bold tracking-widest uppercase mb-2">Zero-Wait Protocol</h4>
                   <p className="text-sm font-light text-onyx/40 leading-relaxed">Our clinical scheduling ensures you are seen within 180 seconds of arrival.</p>
                </div>
             </div>
             <div className="flex gap-8">
                <div className="text-gold"><ShieldCheck size={32} weight="light" /></div>
                <div>
                   <h4 className="text-[10px] font-bold tracking-widest uppercase mb-2">Private Consultation</h4>
                   <p className="text-sm font-light text-onyx/40 leading-relaxed">Discrete entry and departures available upon request for high-profile clients.</p>
                </div>
             </div>
          </div>
        </div>

        {/* Right Side: High-End Form */}
        <div className="lg:col-span-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-cream p-12 lg:p-24 shadow-[0_50px_100px_-20px_rgba(18,20,24,0.05)]"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-3">
                     <label className="text-[10px] font-bold tracking-[0.4em] uppercase text-gold">CLIENT IDENTIFICATION</label>
                     <input 
                        {...register('fullName')}
                        placeholder="Johnathan D. Patient"
                        className="w-full bg-transparent border-b border-onyx/10 p-4 focus:outline-none focus:border-gold transition-all font-serif text-xl"
                     />
                     {errors.fullName && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest pt-2">{errors.fullName.message}</p>}
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-bold tracking-[0.4em] uppercase text-gold">PRIMARY CHANNEL (EMAIL)</label>
                     <input 
                        {...register('email')}
                        type="email"
                        placeholder="your@email.com"
                        className="w-full bg-transparent border-b border-onyx/10 p-4 focus:outline-none focus:border-gold transition-all font-serif text-xl"
                     />
                     {errors.email && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest pt-2">{errors.email.message}</p>}
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                  <div className="space-y-3">
                     <label className="text-[10px] font-bold tracking-[0.4em] uppercase text-gold">SECURE CONTACT (MOBILE)</label>
                     <input 
                        {...register('phone')}
                        placeholder="+44 7000 000000"
                        className="w-full bg-transparent border-b border-onyx/10 p-4 focus:outline-none focus:border-gold transition-all font-serif text-xl"
                     />
                     {errors.phone && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest pt-2">{errors.phone.message}</p>}
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-bold tracking-[0.4em] uppercase text-gold">REQUIRED PROTOCOL</label>
                     <select 
                        {...register('serviceType')}
                        className="w-full bg-transparent border-b border-onyx/10 p-4 focus:outline-none focus:border-gold transition-all font-serif text-xl appearance-none"
                     >
                        <option value="">Select Service</option>
                        <option value="couture">Couture Smile Makeover</option>
                        <option value="bio">Biological Hygiene & Scan</option>
                        <option value="precision">Restorative Precision</option>
                        <option value="urgent">Concierge Diagnostics</option>
                     </select>
                     {errors.serviceType && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest pt-2 text-right">{errors.serviceType.message}</p>}
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                  <div className="space-y-3">
                     <label className="text-[10px] font-bold tracking-[0.4em] uppercase text-gold">PREFERRED DATE</label>
                     <input 
                        {...register('preferredDate')}
                        type="date"
                        className="w-full bg-transparent border-b border-onyx/10 p-4 focus:outline-none focus:border-gold transition-all font-serif text-xl"
                     />
                     {errors.preferredDate && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest pt-2">{errors.preferredDate.message}</p>}
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-bold tracking-[0.4em] uppercase text-gold">TIME WINDOW</label>
                     <select 
                        {...register('preferredTime')}
                        className="w-full bg-transparent border-b border-onyx/10 p-4 focus:outline-none focus:border-gold transition-all font-serif text-xl appearance-none"
                     >
                        <option value="">Choose Time</option>
                        <option value="am">Early Morning (8am - 11am)</option>
                        <option value="mid">Mid-Day (11am - 2pm)</option>
                        <option value="pm">Afternoon (2pm - 5pm)</option>
                     </select>
                     {errors.preferredTime && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest pt-2 text-right">{errors.preferredTime.message}</p>}
                  </div>
               </div>

               <div className="space-y-3 pt-8">
                  <label className="text-[10px] font-bold tracking-[0.4em] uppercase text-gold">CLINICAL NOTES & REQUESTS</label>
                  <textarea 
                     {...register('notes')}
                     rows={4}
                     placeholder="Disclose any previous dental experiences or sedation preferences..."
                     className="w-full bg-transparent border border-onyx/5 p-8 focus:outline-none focus:border-gold transition-all font-serif text-lg italic tracking-wide resize-none"
                  />
               </div>

               <button 
                 type="submit" 
                 className="btn-premium w-full !py-8 text-xs font-bold tracking-[0.4em]"
                >
                   INITIATE RESERVATION
               </button>

               <div className="flex items-center gap-4 justify-center pt-8 opacity-20 group">
                  <ShieldCheck size={20} className="text-gold" />
                  <p className="text-[10px] font-bold tracking-[0.1em] uppercase group-hover:opacity-100 transition-opacity">HIPAA SECURE & END-TO-END ENCRYPTED</p>
               </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
