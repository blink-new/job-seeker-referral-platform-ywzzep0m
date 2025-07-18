import { useState, useEffect } from 'react'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/AppSidebar'
import { Dashboard } from '@/pages/Dashboard'
import { JobSearch } from '@/pages/JobSearch'
import { Referrals } from '@/pages/Referrals'
import { Contacts } from '@/pages/Contacts'
import { ResumeBuilder } from '@/pages/ResumeBuilder'
import { AIVideoStudio } from '@/pages/AIVideoStudio'
import { Applications } from '@/pages/Applications'
import { Analytics } from '@/pages/Analytics'
import { blink } from '@/blink/client'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-amber-50">
        <div className="text-center space-y-6 p-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-amber-500 flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
            </svg>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">JobSeeker Platform</h1>
            <p className="text-muted-foreground max-w-md">
              Your comprehensive job search platform for finding referrals, tailoring resumes, and creating AI-powered video introductions.
            </p>
          </div>
          <button
            onClick={() => blink.auth.login()}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-amber-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            Sign In to Get Started
          </button>
        </div>
      </div>
    )
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onPageChange={setCurrentPage} />
      case 'jobs':
        return <JobSearch />
      case 'referrals':
        return <Referrals />
      case 'contacts':
        return <Contacts />
      case 'resume':
        return <ResumeBuilder />
      case 'video':
        return <AIVideoStudio />
      case 'applications':
        return <Applications />
      case 'analytics':
        return <Analytics />
      default:
        return <Dashboard onPageChange={setCurrentPage} />
    }
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar 
          currentPage={currentPage} 
          onPageChange={setCurrentPage}
          user={user}
        />
        <SidebarInset className="flex-1">
          <main className="flex-1 p-6 lg:p-8">
            {renderPage()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

export default App