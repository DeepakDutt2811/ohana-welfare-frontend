-- Run this once as the postgres superuser, e.g.:
--   psql -U postgres -f migrations/001_create_database.sql
--
-- Creates the app role and database. Change the password before running
-- against anything beyond your local machine, and update DATABASE_URL in
-- backend/.env to match.

CREATE ROLE ohana_user WITH LOGIN PASSWORD 'ohana_pass';

CREATE DATABASE ohana_db OWNER ohana_user;

GRANT ALL PRIVILEGES ON DATABASE ohana_db TO ohana_user;
