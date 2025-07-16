-- Migration: Add sauna status table
-- Created: 2025-07-16 23:59:12

-- Create the sauna status table
CREATE TABLE IF NOT EXISTS sauna_status (
  id SERIAL PRIMARY KEY,
  is_started BOOLEAN DEFAULT FALSE,
  start_time TIMESTAMP WITH TIME ZONE,
  started_by VARCHAR(100),
  temperature INTEGER,
  temperature_time TIMESTAMP WITH TIME ZONE,
  temperature_by VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a function to automatically update the updated_at timestamp (if not exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at for sauna_status
CREATE TRIGGER update_sauna_status_updated_at
    BEFORE UPDATE ON sauna_status
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert initial sauna status (there should only be one row)
INSERT INTO sauna_status (is_started, temperature, temperature_time, temperature_by) 
VALUES (FALSE, 78, NOW(), 'System')
ON CONFLICT DO NOTHING; 