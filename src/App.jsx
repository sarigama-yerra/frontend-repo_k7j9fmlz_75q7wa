import { useEffect, useState } from 'react'
import Dashboard from './components/Dashboard'
import QuickAdd from './components/QuickAdd'
import Notifications from './components/Notifications'

function App() {
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  useEffect(() => {
    const open = () => setShowQuickAdd(true);
    window.addEventListener('open-quick-add', open);
    return () => window.removeEventListener('open-quick-add', open);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 space-y-6">
        <Dashboard />
        <Notifications />
      </div>
      {showQuickAdd && <QuickAdd onAdded={() => { setShowQuickAdd(false); location.reload(); }} />}
    </div>
  )
}

export default App
