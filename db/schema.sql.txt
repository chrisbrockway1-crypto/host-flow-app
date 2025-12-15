-- Schema for the Host Flow Micro-SaaS

-- 1. Users Table (for Hosts)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    uuid VARCHAR(255) UNIQUE NOT NULL, -- For external auth provider (if used)
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    company_name VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Properties Table (One Host can have many Properties)
CREATE TABLE properties (
    id SERIAL PRIMARY KEY,
    host_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    property_name VARCHAR(150) NOT NULL,
    address TEXT NOT NULL,
    custom_checkout_instructions TEXT, -- Main feature content
    wifi_ssid VARCHAR(100),
    wifi_password VARCHAR(100),
    welcome_book_slug VARCHAR(50) UNIQUE NOT NULL -- Unique URL for the public welcome page
);

-- 3. Guests & Bookings Table (One Property can have many Bookings)
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
    guest_name VARCHAR(100) NOT NULL,
    guest_email VARCHAR(255),
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    is_checked_out BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add Index for fast lookup on the most common join
CREATE INDEX idx_property_host ON properties (host_id);