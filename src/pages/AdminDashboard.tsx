import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUserStore } from '../store/useUserStore'
import { Navigate } from 'react-router-dom'
import { 
  CloudArrowUp, 
  Trash, 
  Plus, 
  Desktop, 
  Users, 
  Layout, 
  CheckCircle,
  Eye,
  NotePencil,
  Image
} from '@phosphor-icons/react'

function ImageUploadInput({ value, onChange, placeholder }: { value: string, onChange: (val: string) => void, placeholder?: string }) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File must be smaller than 5MB to save locally in localStorage.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex gap-4 items-center w-full">
      <input 
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 w-full bg-white border border-onyx/10 px-6 py-4 font-mono text-xs focus:border-gold outline-none transition-colors"
        placeholder={placeholder || "Visual URL (CDN or Unsplash)..."}
      />
      <div className="relative shrink-0 border border-onyx/10 bg-white hover:border-gold transition-colors">
        <input 
          type="file" 
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          title="Upload Image"
        />
        <div className="py-4 px-6 flex items-center gap-2 text-xs font-bold tracking-widest text-onyx/60 uppercase">
          <Image size={16} />
          <span>UPLOAD</span>
        </div>
      </div>
    </div>
  );
}

export function AdminDashboard() {
  const { isAdmin, content, updateService, updateClinician, updateContent } = useUserStore()
  const [activeTab, setActiveTab] = useState<'hero' | 'services' | 'clinicians' | 'media'>('hero')
  const [saveStatus, setSaveStatus] = useState<string | null>(null)

  if (!isAdmin) {
    return <Navigate to="/login" replace />
  }

  const handleSave = () => {
    setSaveStatus('Configuring Clinical Pipeline...')
    setTimeout(() => {
      setSaveStatus('Changes Persisted.')
      setTimeout(() => setSaveStatus(null), 2000)
    }, 1000)
  }

  const tabs = [
    { id: 'hero', name: 'Identity', icon: Layout },
    { id: 'services', name: 'Clinical Modules', icon: Desktop },
    { id: 'clinicians', name: 'Atelier Staff', icon: Users },
    { id: 'media', name: 'Media Archive', icon: Image },
  ]

  return (
    <div className="min-h-screen bg-cream py-32">
      <div className="section-container">
        <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-sm font-bold tracking-[0.6em] uppercase text-gold/60 block mb-6">Administrative Portal</span>
            <h1 className="text-6xl font-serif tracking-tighter">Clinical <br /> <span className="italic font-light">Architecture.</span></h1>
          </div>
          <div className="flex items-center gap-4">
            <AnimatePresence>
              {saveStatus && (
                <motion.span 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm font-bold tracking-widest text-gold uppercase"
                >
                  {saveStatus}
                </motion.span>
              )}
            </AnimatePresence>
            <button onClick={handleSave} className="btn-premium flex items-center gap-3">
              <CloudArrowUp size={18} weight="light" />
              DEPLOY UPDATES
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`w-full flex items-center gap-4 px-6 py-4 transition-all duration-500 border-l-2 ${
                  activeTab === tab.id 
                    ? 'border-gold bg-gold/5 text-onyx' 
                    : 'border-transparent text-onyx/30 hover:text-onyx hover:bg-onyx/5'
                }`}
              >
                <tab.icon size={20} weight={activeTab === tab.id ? 'fill' : 'light'} />
                <span className="text-sm font-bold tracking-[0.2em] uppercase">{tab.name}</span>
              </button>
            ))}
          </aside>

          {/* Main Workspace */}
          <main className="lg:col-span-9">
            <AnimatePresence mode="wait">
              {activeTab === 'hero' && (
                <motion.div
                  key="hero"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-12"
                >
                  <div className="bg-onyx/[0.02] p-10 border border-onyx/5 space-y-8">
                    <h3 className="text-sm font-bold tracking-[0.4em] uppercase text-gold mb-8">Digital Façade</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-2">
                        <label className="text-xs font-bold tracking-[0.3em] uppercase text-onyx/40">Headline Top</label>
                        <input 
                          type="text" 
                          value={content.hero.titleTop}
                          onChange={(e) => updateContent({ hero: { ...content.hero, titleTop: e.target.value } })}
                          className="w-full bg-white border border-onyx/10 px-6 py-4 font-serif text-xl focus:border-gold outline-none transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold tracking-[0.3em] uppercase text-onyx/40">Headline Bottom (Italic)</label>
                        <input 
                          type="text" 
                          value={content.hero.titleBottom}
                          onChange={(e) => updateContent({ hero: { ...content.hero, titleBottom: e.target.value } })}
                          className="w-full bg-white border border-onyx/10 px-6 py-4 font-serif italic text-xl focus:border-gold outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-[0.3em] uppercase text-onyx/40">Subtitle Dossier</label>
                      <textarea 
                        rows={3}
                        value={content.hero.subtitle}
                        onChange={(e) => updateContent({ hero: { ...content.hero, subtitle: e.target.value } })}
                        className="w-full bg-white border border-onyx/10 px-6 py-4 font-serif text-lg focus:border-gold outline-none transition-colors resize-none"
                      />
                    </div>

                    <div className="space-y-4">
                      <label className="text-xs font-bold tracking-[0.3em] uppercase text-onyx/40">Hero Identity Visual (URL)</label>
                      <div className="flex flex-col gap-6 items-start w-full">
                        <ImageUploadInput 
                          value={content.hero.heroImageUrl}
                          onChange={(val) => updateContent({ hero: { ...content.hero, heroImageUrl: val } })}
                        />
                        <div className="w-32 aspect-square bg-onyx overflow-hidden ring-1 ring-onyx/10 shadow-lg shrink-0">
                          <img src={content.hero.heroImageUrl} className="w-full h-full object-cover" alt="Hero Preview" />
                        </div>
                      </div>
                      <button onClick={() => setActiveTab('media')} className="text-sm font-bold tracking-widest uppercase text-gold/40 hover:text-gold transition-colors pt-4 flex items-center gap-2">
                        <Eye size={14} /> CURATE MEDIA HUB
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'services' && (
                <motion.div
                  key="services"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="flex justify-between items-center mb-10">
                    <h3 className="text-sm font-bold tracking-[0.4em] uppercase text-gold">Module Inventory</h3>
                    <button className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase hover:text-gold transition-colors">
                      <Plus size={14} /> Add Module
                    </button>
                  </div>

                  <div className="space-y-6">
                    {content.services.map((service) => (
                      <div key={service.id} className="bg-white border border-onyx/5 p-8 flex gap-8 items-start group hover:border-gold/30 transition-all duration-700">
                        <div className="w-12 h-12 bg-onyx/5 flex items-center justify-center text-onyx/40 group-hover:text-gold transition-colors">
                          <NotePencil size={24} weight="light" />
                        </div>
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <input 
                              type="text" 
                              value={service.title}
                              onChange={(e) => updateService(service.id, { title: e.target.value })}
                              className="w-full bg-transparent border-b border-onyx/5 py-2 font-serif text-2xl focus:border-gold outline-none transition-colors"
                            />
                            <textarea 
                              value={service.description}
                              onChange={(e) => updateService(service.id, { description: e.target.value })}
                              className="w-full bg-transparent py-2 font-serif italic text-onyx/40 text-sm focus:border-gold outline-none transition-colors resize-none"
                              rows={2}
                            />
                          </div>
                          <div className="flex items-end justify-end gap-4">
                             <button className="p-3 text-onyx/10 hover:text-onyx transition-colors">
                                <Eye size={20} />
                             </button>
                             <button className="p-3 text-onyx/10 hover:text-red-900 transition-colors">
                                <Trash size={20} />
                             </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'clinicians' && (
                <motion.div
                  key="clinicians"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-12"
                >
                  {content.clinicians.map((clinician) => (
                    <div key={clinician.id} className="bg-onyx/[0.02] p-10 border border-onyx/5 space-y-10">
                       <div className="flex gap-10">
                          <div className="w-48 aspect-[4/5] bg-onyx overflow-hidden ring-1 ring-onyx/10">
                             <img src={clinician.imageUrl} className="w-full h-full object-cover grayscale" alt={clinician.name} />
                          </div>
                          <div className="flex-1 space-y-8">
                             <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                  <label className="text-xs font-bold tracking-[0.3em] uppercase text-onyx/40">Artisan Name</label>
                                  <input 
                                    type="text" 
                                    value={clinician.name}
                                    onChange={(e) => updateClinician(clinician.id, { name: e.target.value })}
                                    className="w-full bg-white border border-onyx/10 px-6 py-4 font-serif text-xl focus:border-gold outline-none transition-colors"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-xs font-bold tracking-[0.3em] uppercase text-onyx/40">Clinical Role</label>
                                  <input 
                                    type="text" 
                                    value={clinician.role}
                                    onChange={(e) => updateClinician(clinician.id, { role: e.target.value })}
                                    className="w-full bg-white border border-onyx/10 px-6 py-4 font-[9px] font-bold tracking-widest uppercase focus:border-gold outline-none transition-colors"
                                  />
                                </div>
                             </div>
                             <div className="space-y-2">
                                <label className="text-xs font-bold tracking-[0.3em] uppercase text-onyx/40">Public Quote</label>
                                <textarea 
                                  value={clinician.quote}
                                  onChange={(e) => updateClinician(clinician.id, { quote: e.target.value })}
                                  className="w-full bg-white border border-onyx/10 px-6 py-4 font-serif italic text-onyx/60 focus:border-gold outline-none transition-colors resize-none"
                                  rows={2}
                                />
                             </div>
                             <div className="space-y-2">
                                <label className="text-xs font-bold tracking-[0.3em] uppercase text-onyx/40">Dossier Visual (URL)</label>
                                <ImageUploadInput 
                                  value={clinician.imageUrl}
                                  onChange={(val) => updateClinician(clinician.id, { imageUrl: val })}
                                />
                                <button onClick={() => setActiveTab('media')} className="text-sm font-bold tracking-widest uppercase text-gold/40 hover:text-gold transition-colors pt-4 flex items-center gap-2 justify-end w-full">
                                  <Eye size={14} /> CURATE IN ARCHIVE
                                </button>
                             </div>
                          </div>
                       </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'media' && (
                <motion.div
                  key="media"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-12"
                >
                  <div className="bg-onyx/[0.02] p-10 border border-onyx/5">
                    <h3 className="text-sm font-bold tracking-[0.4em] uppercase text-gold mb-12">Visual Asset Control Center</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-6">
                        <div className="flex justify-between items-end">
                          <span className="text-xs font-bold tracking-[0.3em] uppercase text-onyx/40">Hero Identity Visual</span>
                          <span className="text-xs font-mono text-onyx/20">system_hero_main</span>
                        </div>
                        <div className="aspect-video bg-onyx overflow-hidden ring-1 ring-onyx/10 group relative">
                          <img src={content.hero.heroImageUrl} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0" alt="Hero" />
                          <div className="absolute inset-0 bg-onyx/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <div className="p-4 bg-white/10 backdrop-blur-md border border-white/20">
                                <span className="text-sm font-bold tracking-[0.2em] text-white uppercase">Primary Asset</span>
                             </div>
                          </div>
                        </div>
                        <ImageUploadInput 
                          value={content.hero.heroImageUrl}
                          onChange={(val) => updateContent({ hero: { ...content.hero, heroImageUrl: val } })}
                          placeholder="Visual URL (CDN or Unsplash)..."
                        />
                      </div>

                      {content.clinicians.map((clinician) => (
                        <div key={clinician.id} className="space-y-6">
                          <div className="flex justify-between items-end">
                            <span className="text-xs font-bold tracking-[0.3em] uppercase text-onyx/40">Staff Archive: {clinician.name}</span>
                            <span className="text-xs font-mono text-onyx/20">potrait_v1_{clinician.id.slice(0,4)}</span>
                          </div>
                          <div className="aspect-video bg-onyx overflow-hidden ring-1 ring-onyx/10 group relative">
                            <img src={clinician.imageUrl} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0" alt={clinician.name} />
                            <div className="absolute inset-0 bg-onyx/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                               <div className="p-4 bg-white/10 backdrop-blur-md border border-white/20">
                                  <span className="text-sm font-bold tracking-[0.2em] text-white uppercase">Artisan Portrait</span>
                               </div>
                            </div>
                          </div>
                          <ImageUploadInput 
                            value={clinician.imageUrl}
                            onChange={(val) => updateClinician(clinician.id, { imageUrl: val })}
                            placeholder="Portrait Visual URL..."
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  )
}
