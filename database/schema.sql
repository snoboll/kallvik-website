-- Create the bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  week_start DATE NOT NULL,
  monday BOOLEAN DEFAULT FALSE,
  tuesday BOOLEAN DEFAULT FALSE,
  wednesday BOOLEAN DEFAULT FALSE,
  thursday BOOLEAN DEFAULT FALSE,
  friday BOOLEAN DEFAULT FALSE,
  saturday BOOLEAN DEFAULT FALSE,
  sunday BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create unique constraint so each week can only have one booking
ALTER TABLE bookings ADD CONSTRAINT unique_week_start UNIQUE (week_start);

-- Create an index for faster lookups
CREATE INDEX IF NOT EXISTS idx_bookings_week_start ON bookings(week_start);

-- Insert some sample data for testing (optional)
INSERT INTO bookings (week_start, monday, tuesday, wednesday, thursday, friday, saturday, sunday) 
VALUES 
  ('2024-01-01', true, false, true, false, true, true, false),
  ('2024-01-08', false, true, false, true, false, true, true)
ON CONFLICT (week_start) DO NOTHING;

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 