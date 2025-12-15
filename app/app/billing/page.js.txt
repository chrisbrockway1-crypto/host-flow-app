// /app/app/billing/page.js
'use client';
import Button from '@/components/Button';
import { isSubscribed } from '@/lib/auth'; // Using the mock subscription status
import { useState, useEffect } from 'react';

// Placeholder function to simulate connecting to the Stripe Portal
const redirectToStripePortal = async (userId) => {
  alert("Simulating redirect to Stripe Customer Portal...");
  // In a real application, you would call your API route:
  // const response = await fetch('/api/billing/portal', { method: 'POST' });
  // const { url } = await response.json();
  // window.location.href = url;
};

export default function BillingPage() {
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check subscription status on client load
  useEffect(() => {
    isSubscribed().then(status => {
      setSubscribed(status);
      setLoading(false);
    });
  }, []);
  
  const statusText = subscribed ? "Active (Host Pro Plan)" : "Inactive (Free Trial)";

  if (loading) return <div className="text-center p-12">Loading Subscription Status...</div>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Subscription & Billing</h1>

      <div className="mb-8 p-6 border-l-4 border-indigo-600 bg-indigo-50 rounded-md">
        <h2 className="text-xl font-semibold text-indigo-700">Current Status: {statusText}</h2>
        {subscribed ? (
          <p className="mt-2 text-indigo-600">You have full access to all Host Flow features, including unlimited bookings and property listings.</p>
        ) : (
          <p className="mt-2 text-red-600">Your account is currently on the Free Tier. Features are limited.</p>
        )}
      </div>

      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Manage Your Plan</h3>
      
      <Button 
        variant="primary" 
        onClick={() => redirectToStripePortal(1)} // Mock user ID 1
        className="w-full sm:w-auto"
      >
        Access Stripe Customer Portal
      </Button>

      <p className="mt-4 text-sm text-gray-500">
        You will be securely redirected to our payment partner, Stripe, to view invoices, update your payment method, or change your plan.
      </p>
    </div>
  );
}