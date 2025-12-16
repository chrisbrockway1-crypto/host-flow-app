// /app/welcome/[slug]/page.js
import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'; // To allow basic HTML in markdown (if needed)

// *** Placeholder DB Function (REPLACE WITH YOUR ACTUAL DB CODE) ***
async function getPropertyDataBySlug(slug) {
  // This function would fetch the property details from your DB based on the slug
  console.log(`Fetching data for slug: ${slug}`);

  // Mock Data for development:
  if (slug === '5k7d8f2a') {
    return {
      property_name: "The Mountain View Cabin",
      address: "123 Aspen Drive, CO 80123",
      wifi_ssid: "Cozy Cabin Guest WiFi",
      wifi_password: "bigdoglover",
      custom_checkout_instructions: `
### Checkout Time: 10:00 AM

Please help us prepare for the next guests by following these simple steps:

1.  **Dishes:** Load and start the dishwasher. All dishes should be put away.
2.  **Laundry:** Place all used towels and linens in the laundry hamper provided in the hall closet.
3.  **Trash:** Take all trash out to the bear-proof bin by the front door.
4.  **Heating:** Please set the thermostat to 65°F (18°C).
5.  **Lock Up:** Ensure all windows and doors are securely locked before departure.
      `,
    };
  }
  return null;
}

export default async function WelcomeBookPage({ params }) {
  const { slug } = params;
  const property = await getPropertyDataBySlug(slug);

  if (!property) {
    return (
      <div className="text-center p-20">
        <h1 className="text-4xl text-red-600">404 - Property Not Found</h1>
        <p className="mt-4 text-lg">The welcome book for this slug does not exist.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-indigo-600 text-white p-8 text-center shadow-lg">
        <h1 className="text-4xl font-extrabold">{property.property_name}</h1>
        <p className="text-lg mt-2 font-light">{property.address}</p>
      </header>

      <main className="max-w-4xl mx-auto py-12 px-6">
        {/* WIFI Details Section */}
        <section className="mb-12 p-6 bg-white border-l-4 border-indigo-500 shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">🔑 Key Information: WiFi Details</h2>
          <div className="space-y-3 text-lg">
            <p><strong>Network Name (SSID):</strong> <span className="font-mono bg-gray-100 p-1 rounded">{property.wifi_ssid}</span></p>
            <p><strong>Password:</strong> <span className="font-mono bg-gray-100 p-1 rounded">{property.wifi_password}</span></p>
          </div>
        </section>

        {/* Checkout Instructions Section (The Main Value) */}
        <section className="p-8 bg-white shadow-xl rounded-lg">
          <h2 className="text-3xl font-bold text-gray-800 border-b pb-4 mb-6">✅ Essential Checkout Instructions</h2>
          
          <div className="prose prose-indigo max-w-none">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {property.custom_checkout_instructions}
            </ReactMarkdown>
          </div>
        </section>
        
      </main>

      <footer className="text-center py-6 text-gray-500">
        Powered by Host Flow — Your Stay Made Simple.
      </footer>
    </div>
  );
}