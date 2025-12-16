// /app/api/bookings/route.js
import { NextResponse } from 'next/server';
import { render } from '@react-email/render'; // Placeholder for turning React component into HTML
import { GuestWelcomeEmail } from '@/components/GuestWelcomeEmail';
import { sendWelcomeEmail } from '@/lib/email';
// import { db } from '@/lib/db'; // Placeholder for DB connection

// --- IMPORTANT: SCHEDULING LOGIC PLACEHOLDER ---
// In a production Micro-SaaS, you would use a robust service like:
// 1. **Dedicated Server/Service:** A background Node.js service running `node-cron` or `agenda`.
// 2. **External Job Queue:** A serverless queue like AWS SQS, Google Cloud Pub/Sub, or dedicated platform like Zapier/Make.com.
async function scheduleEmail(bookingId, checkInDate, guestEmail, propertyName, welcomeBookSlug) {
    const checkInTime = new Date(checkInDate);
    // Calculate the target send time: 24 hours before check-in.
    const sendTime = new Date(checkInTime.getTime() - (24 * 60 * 60 * 1000));
    const now = new Date();

    if (sendTime > now) {
        // --- THIS IS THE CRITICAL LOGIC ---
        // Instead of a simple console.log, the code here would be a call to a service 
        // that persists the task until 'sendTime'.
        console.log(`[Task Scheduled] Booking #${bookingId}: Email scheduled for ${sendTime.toISOString()}`);
        
        // --- For immediate testing during development ---
        // For development, we'll send it immediately if the check-in is soon.
        // In reality, this logic would run on a separate server process.
        if (sendTime < new Date(now.getTime() + (3 * 60 * 60 * 1000))) { // If scheduled within next 3 hours
             const emailHtml = render(
                <GuestWelcomeEmail 
                    guestName="Valued Guest" // You'd use the actual guest name
                    propertyName={propertyName} 
                    welcomeBookUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/welcome/${welcomeBookSlug}`}
                />
            );

            // Mock sending the email immediately for testing visibility
            await sendWelcomeEmail(guestEmail, `Your Host Flow Welcome Book for ${propertyName}`, emailHtml);
        }
        
    } else {
        console.log(`[Task Ignored] Check-in date is in the past or too soon.`);
    }
}

// *** Placeholder DB Function (REPLACE WITH YOUR ACTUAL DB CODE) ***
async function getPropertyInfo(propertyId) {
    // Mock property lookup to get the welcome book slug
    return {
        property_name: "The Mountain View Cabin",
        welcome_book_slug: '5k7d8f2a' 
    };
}

// *** Placeholder DB Function (REPLACE WITH YOUR ACTUAL DB CODE) ***
async function insertBooking(data) {
    // Mock insertion for development
    return { id: Math.floor(Math.random() * 1000), ...data };
}


export async function POST(request) {
    try {
        const body = await request.json();
        const { propertyId, guestName, guestEmail, checkInDate } = body;

        // 1. Validate data
        if (!propertyId || !guestEmail || !checkInDate) {
            return NextResponse.json({ error: 'Missing required booking data.' }, { status: 400 });
        }
        
        // 2. Insert booking into DB
        const newBooking = await insertBooking(body);

        // 3. Get property details (slug, name) needed for the email
        const propertyInfo = await getPropertyInfo(propertyId);

        // 4. Schedule the welcome email
        await scheduleEmail(
            newBooking.id, 
            checkInDate, 
            guestEmail, 
            propertyInfo.property_name,
            propertyInfo.welcome_book_slug
        );
        
        return NextResponse.json({ 
            message: 'Booking added and email scheduled successfully.',
            booking: newBooking
        }, { status: 201 });

    } catch (error) {
        console.error('Booking API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}