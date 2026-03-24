import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { SignOut, User, List, X, Diamond } from '@phosphor-icons/react'
import { useUserStore } from '../store/useUserStore'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  
  const { user, isLoggedIn, isAdmin, logout } = useUserStore()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

    const handleLogout = () => {
    logout()
    navigate('/')
    setIsMobileMenuOpen(false)
  }

  const links = [
    { name: 'PHILOSOPHY', id: 'philosophy' },
    { name: 'SERVICES', id: 'services' },
    { name: 'CLINICIANS', id: 'clinicians' },
    { name: 'CONTACT', path: '/book' },
  ]

  const handleLinkClick = (id?: string, path?: string) => {
    setIsMobileMenuOpen(false)
    if (path) return // Let Link handle it

    if (location.pathname === '/' && id) {
      const el = document.getElementById(id)
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 px-6 lg:px-24 py-8 ${
        isScrolled ? 'bg-cream/90 backdrop-blur-2xl py-6 shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
        {/* Luxury Logo */}
        <Link to="/" className="flex items-center gap-5 group">
           <div className="w-12 h-12 border border-onyx flex items-center justify-center relative transition-colors duration-500 group-hover:border-gold">
              <span className="text-xl font-serif font-bold tracking-tighter">DS</span>
              <Diamond size={8} className="absolute -top-1 -right-1 text-gold" weight="fill" />
           </div>
           <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-onyx/80">DENTAL SERVICE</span>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gold/60 mt-0.5">EST. 2026</span>
           </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-16">
          <ul className="flex items-center gap-12">
            {links.map(link => (
              <li key={link.name}>
                {link.path ? (
                  <Link 
                    to={link.path}
                    className="text-[10px] font-bold tracking-[0.3em] uppercase text-onyx/40 hover:text-gold transition-colors relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-gold transition-all duration-500 group-hover:w-full" />
                  </Link>
                ) : (
                  <Link
                    to={`/#${link.id}`}
                    onClick={() => handleLinkClick(link.id)}
                    className="text-[10px] font-bold tracking-[0.3em] uppercase text-onyx/40 hover:text-gold transition-colors relative group underline-none"
                  >
                    {link.name}
                    <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-gold transition-all duration-500 group-hover:w-full" />
                  </Link>
                )}
              </li>
            ))}
          </ul>
          
          <div className="h-4 w-px bg-onyx/10 mx-4" />
          
          <div className="flex items-center gap-10">
            {isLoggedIn ? (
              <div className="flex items-center gap-6">
                {isAdmin ? (
                  <>
                    <Link to="/admin" className="text-gold hover:text-onyx transition-all font-serif italic text-sm border-b border-gold/20 pb-1 flex items-center gap-2">
                       <Diamond size={8} weight="fill" className="text-gold" />
                       ADMIN ARCHIVE
                    </Link>
                    <button onClick={handleLogout} className="text-onyx/20 hover:text-gold transition-colors">
                      <SignOut size={20} weight="light" />
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/portal" className="text-onyx/40 hover:text-onyx transition-all font-serif italic text-sm border-b border-gold/20 pb-1">
                      {(user?.name || 'Patient').split(' ')[0]}
                    </Link>
                    <button onClick={handleLogout} className="text-onyx/20 hover:text-gold transition-colors">
                      <SignOut size={20} weight="light" />
                    </button>
                  </>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-onyx/40 hover:text-onyx transition-colors">
                <User size={22} weight="light" />
              </Link>
            )}
            <Link to="/book" className="btn-premium !py-4 !px-8">
              RESERVE VISIT
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-onyx"
        >
          {isMobileMenuOpen ? <X size={28} /> : <List size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-cream z-[60] p-12 flex flex-col justify-between"
          >
             <div className="flex justify-between items-center">
                <span className="text-xl font-serif font-bold tracking-tighter">DS</span>
                <button onClick={() => setIsMobileMenuOpen(false)}><X size={32} /></button>
             </div>

             <ul className="space-y-10">
                {links.map(link => (
                  <li key={link.name}>
                    {link.path ? (
                      <Link 
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-4xl font-serif text-onyx hover:text-gold transition-colors block"
                      >
                         {link.name}
                      </Link>
                    ) : (
                      <Link
                        to={`/#${link.id}`}
                        onClick={() => handleLinkClick(link.id)}
                        className="text-4xl font-serif text-onyx hover:text-gold transition-colors block underline-none"
                      >
                         {link.name}
                      </Link>
                    )}
                  </li>
                ))}
                {isLoggedIn && (
                  <li>
                    {isAdmin ? (
                      <Link 
                        to="/admin" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-4xl font-serif text-gold block"
                      >
                         ADMIN ARCHIVE
                      </Link>
                    ) : (
                      <Link 
                        to="/portal" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-4xl font-serif text-gold italic block"
                      >
                         MY DOSSIER
                      </Link>
                    )}
                  </li>
                )}
             </ul>

             <div className="space-y-8">
                {isLoggedIn ? (
                  <button onClick={handleLogout} className="btn-premium w-full text-center flex items-center justify-center gap-4">
                    <SignOut size={20} /> SIGN OUT
                  </button>
                ) : (
                  <Link 
                    to="/book" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-premium w-full text-center"
                  >
                     RESERVE VISIT
                  </Link>
                )}
                <div className="flex justify-center gap-10 opacity-30">
                   <span className="text-[10px] font-bold tracking-widest uppercase">LONDON</span>
                   <span className="text-[10px] font-bold tracking-widest uppercase">SYDNEY</span>
                   <span className="text-[10px] font-bold tracking-widest uppercase">NYC</span>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
