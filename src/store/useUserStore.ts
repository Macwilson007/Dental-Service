import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface Appointment {
  id: string
  service: string
  date: string
  time: string
  clinician: string
  status: 'Pending' | 'Confirmed' | 'Completed'
}

interface Service {
  id: string
  title: string
  description: string
  tag?: string
  iconName: string // To map to Phosphor icons
}

interface Clinician {
  id: string
  name: string
  role: string
  education: string
  quote: string
  imageUrl: string
}

interface ContentStore {
  hero: {
    titleTop: string
    titleBottom: string
    subtitle: string
    heroImageUrl: string
  }
  services: Service[]
  clinicians: Clinician[]
}

const initialContent: ContentStore = {
  hero: {
    titleTop: "Artistry in",
    titleBottom: "Precision.",
    subtitle: "Experience the confluence of clinical excellence and spatial luxury.",
    heroImageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2000"
  },
  services: [
    {
      id: "1",
      title: "Couture Smiles",
      description: "Bespoke aesthetic reconstructions combining ceramic engineering with facial harmony.",
      tag: "Signature",
      iconName: "Sparkle"
    },
    {
      id: "2",
      title: "Biological Hygiene",
      description: "Clinical purity protocols designed to maintain your foundation and systemic health.",
      iconName: "Tooth"
    },
    {
      id: "3",
      title: "Precision Restoration",
      description: "Microscopic dental engineering to restore structural integrity with invisible boundaries.",
      iconName: "ShieldCheck"
    },
    {
      id: "4",
      title: "Oral Concierge",
      description: "Priority access to our lead clinicians for urgent diagnostic and restorative needs.",
      iconName: "Clock"
    }
  ],
  clinicians: [
    {
      id: "julian",
      name: "Dr. Julian Valerius",
      role: "Chief Surgeon",
      education: "DDS, MS · AESTHETIC ARCHITECTURE",
      quote: "Every reconstruction is a dialogue between physics and emotion. We design for both.",
      imageUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=1000"
    },
    {
      id: "elena",
      name: "Dr. Elena Serafina",
      role: "Aesthetic Director",
      education: "DMD · BIOLOGICAL ORTHODONTICS",
      quote: "The preservation of natural tissue is the ultimate act of clinical luxury.",
      imageUrl: "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=1000"
    }
  ]
}

interface UserState {
  isLoggedIn: boolean
  isAdmin: boolean
  user: {
    name: string | null
    email: string | null
    lastVisit: string | null
  }
  appointments: Appointment[]
  content: ContentStore
  setLogin: (name: string, email: string) => void
  logout: () => void
  addAppointment: (appointment: Omit<Appointment, 'id' | 'status'>) => void
  updateContent: (newContent: Partial<ContentStore>) => void
  updateService: (id: string, updates: Partial<Service>) => void
  updateClinician: (id: string, updates: Partial<Clinician>) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      isAdmin: false,
      user: {
        name: null,
        email: null,
        lastVisit: null,
      },
      appointments: [],
      content: initialContent,
      setLogin: (name, email) => 
        set({ 
          isLoggedIn: true, 
          isAdmin: email === 'admin@ds.clinic',
          user: { name, email, lastVisit: '2026-03-10' } 
        }),
      logout: () => 
        set({ 
          isLoggedIn: false, 
          isAdmin: false,
          user: { name: null, email: null, lastVisit: null },
          appointments: []
        }),
      addAppointment: (app) =>
        set((state) => ({
          appointments: [
            ...state.appointments,
            { ...app, id: Math.random().toString(36).substring(7), status: 'Pending' }
          ]
        })),
      updateContent: (newContent) =>
        set((state) => ({
          content: { ...state.content, ...newContent }
        })),
      updateService: (id, updates) =>
        set((state) => ({
          content: {
            ...state.content,
            services: state.content.services.map(s => s.id === id ? { ...s, ...updates } : s)
          }
        })),
      updateClinician: (id, updates) =>
        set((state) => ({
          content: {
            ...state.content,
            clinicians: state.content.clinicians.map(c => c.id === id ? { ...c, ...updates } : c)
          }
        }))
    }),
    {
      name: 'ds_clinical_store_v2',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
