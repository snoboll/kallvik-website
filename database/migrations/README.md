# Database Migrations

This directory contains database migration files for the Kallvik website project.

## Migration Naming Convention

Files follow the format: `YYYYMMDD_HHMMSS_description.sql`

Example: `20250101_120000_add_sauna_status_table.sql`

## Running Migrations

### Option 1: Supabase Dashboard
1. Go to your Supabase project dashboard
2. Navigate to "SQL Editor"
3. Copy and paste the migration file content
4. Run the SQL

### Option 2: Supabase CLI
```bash
# Run a specific migration file
supabase db push --project-ref YOUR_PROJECT_REF --file database/migrations/MIGRATION_FILE.sql

# Or using psql directly (if you have database password)
psql "postgresql://postgres:PASSWORD@db.PROJECT_REF.supabase.co:5432/postgres" -f database/migrations/MIGRATION_FILE.sql
```

### Option 3: psql with environment variables
```bash
# Set your database URL and run migration
export DATABASE_URL="postgresql://postgres:PASSWORD@db.PROJECT_REF.supabase.co:5432/postgres"
psql $DATABASE_URL -f database/migrations/MIGRATION_FILE.sql
```

## Current Migrations

- `20250716_235912_add_sauna_status_table.sql` - Adds sauna status table for tracking temperature and sauna state 