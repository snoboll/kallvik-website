# Kallvik Website Setup Guide

## Prerequisites

1. **Supabase Account**: Create a free account at [supabase.com](https://supabase.com)
2. **Node.js**: Make sure you have Node.js installed

## Database Setup

### 1. Create a New Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for the project to be fully provisioned

### 2. Run the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy and paste the contents of `database/schema.sql`
3. Click **Run** to execute the SQL

### 3. Set Up Environment Variables

Create a `.env` file in your project root with:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

To find these values:

- **URL**: In your Supabase project dashboard → Settings → API → Project URL
- **Anon Key**: In your Supabase project dashboard → Settings → API → Project API keys → anon/public

## Running the Application

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

## Testing the Booking System

1. Navigate to "Boka stuga" in the app
2. Toggle some days (Monday-Sunday checkboxes)
3. Click "Spara Bokning"
4. Check your Supabase database to see the data was saved
5. Refresh the page - the selections should persist

## Troubleshooting

### Common Issues

**Error: "supabaseUrl is required"**

- Make sure your `.env` file exists and has the correct variable names
- Restart your development server after creating the `.env` file

**Error: "Failed to load booking data"**

- Check that the database table was created successfully
- Verify your Supabase project is running and accessible

**Error: "Insert/Update failed"**

- Make sure Row Level Security (RLS) is disabled for testing, or configure proper policies
- Check the browser console for more detailed error messages

### Database Verification

You can verify the database setup by running this query in the Supabase SQL editor:

```sql
SELECT * FROM bookings ORDER BY week_start;
```

## Next Steps

Once the basic booking system is working, you can:

- Add user authentication
- Implement date navigation (previous/next week)
- Add booking validation and business rules
- Create a calendar view
- Add email notifications

## Development Notes

- The booking system uses the current week (starting Monday) by default
- Each week can only have one booking record (unique constraint)
- The `updated_at` timestamp is automatically updated on changes
- The system handles both creating new bookings and updating existing ones
