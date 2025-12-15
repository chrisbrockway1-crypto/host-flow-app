// /components/GuestWelcomeEmail.js
import React from 'react';

export const GuestWelcomeEmail = ({ guestName, propertyName, welcomeBookUrl }) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f4f4f4' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ color: '#4f46e5', fontSize: '24px', textAlign: 'center' }}>
          Your Stay at {propertyName} is Coming Soon!
        </h1>
        <p style={{ fontSize: '16px', lineHeight: '1.5', color: '#333' }}>
          Hello {guestName},
        </p>
        <p style={{ fontSize: '16px', lineHeight: '1.5', color: '#333' }}>
          We are excited to welcome you to {propertyName}! To ensure a smooth arrival, please review your digital welcome book now. It contains important details like entry codes, check-in instructions, and WiFi passwords.
        </p>
        
        {/* Call-to-Action Button */}
        <div style={{ textAlign: 'center', margin: '30px 0' }}>
          <a
            href={welcomeBookUrl}
            style={{
              backgroundColor: '#4f46e5',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 'bold',
              display: 'inline-block'
            }}
          >
            Open Your Digital Welcome Book
          </a>
        </div>
        
        <p style={{ fontSize: '14px', lineHeight: '1.5', color: '#666' }}>
          Check-in is tomorrow. We look forward to hosting you!
        </p>
        
        <hr style={{ margin: '20px 0', borderColor: '#ddd' }} />
        
        <p style={{ fontSize: '12px', color: '#999', textAlign: 'center' }}>
          This message was automated by Host Flow.
        </p>
      </div>
    </div>
  );
};