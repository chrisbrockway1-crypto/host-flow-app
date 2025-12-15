// /app/properties/new/page.js
'use client';
import { useState } from 'react';
import Button from '@/components/Button';

export default function NewPropertyPage() {
  const [formData, setFormData] = useState({
    property_name: '',
    address: '',
    wifi_ssid: '',
    wifi_password: '',
    custom_checkout_instructions: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(`Success! Property added. Public URL slug: ${result.welcome_book_slug}`);
        // In a real app, you would redirect the user to the property dashboard
      } else {
        setMessage(`Error: ${result.error || 'Failed to save property.'}`);
      }
    } catch (error) {
      setMessage('Network error or server issue.');
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ label, name, type = 'text', required = true }) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        required={required}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Set Up a New Property</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-xl">
        <InputField label="Property Name (e.g., The Sunset Loft)" name="property_name" />
        <InputField label="Full Address" name="address" />
        <InputField label="WiFi Network Name (SSID)" name="wifi_ssid" required={false} />
        <InputField label="WiFi Password" name="wifi_password" type="password" required={false} />
        
        <div className="mb-6">
          <label htmlFor="custom_checkout_instructions" className="block text-sm font-medium text-gray-700">
            Checkout Instructions (Markdown supported)
          </label>
          <textarea
            id="custom_checkout_instructions"
            name="custom_checkout_instructions"
            rows="6"
            value={formData.custom_checkout_instructions}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="e.g., * Please start the dishwasher. * Place all towels in the laundry basket. * Lock the front door."
          ></textarea>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Property & Generate Welcome Book'}
        </Button>
        {message && <p className="mt-4 text-sm text-center text-indigo-600">{message}</p>}
      </form>
    </div>
  );
}