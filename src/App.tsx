import { Routes, Route } from 'react-router-dom'
import { Landing } from './pages/Landing'
import { Book } from './pages/Book'
import { Login } from './pages/Login'
import { PatientPortal } from './pages/PatientPortal'
import { AdminDashboard } from './pages/AdminDashboard'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-cream selection:bg-gold/30">
      <Navbar />
      <main className="flex-grow pt-16">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/book" element={<Book />} />
          <Route path="/login" element={<Login />} />
          <Route path="/portal" element={<PatientPortal />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Landing />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
