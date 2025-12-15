// /app/app/layout.js
import { redirect } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { isAuthenticated } from '@/lib/auth';

export default async function AppLayout({ children }) {
  // 1. CRITICAL: Check Authentication on the server
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    // Redirect unauthenticated users to the login page
    redirect('/auth/login');
  }

  // 2. Render the protected app structure
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

// Sidebar component placeholder to complete the structure (saved in /components/Sidebar.js)
/*
export default function Sidebar() {
  const navItems = [
    { name: 'Dashboard', href: '/app/dashboard' },
    { name: 'My Properties', href: '/app/properties' },
    { name: 'New Booking', href: '/app/bookings/new' },
    { name: 'Billing', href: '/app/billing' }, // New link
  ];
  // ... Tailwind CSS structure here
}
*/