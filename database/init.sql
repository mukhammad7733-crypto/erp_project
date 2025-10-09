-- Database initialization script for ERP System

-- Create database (run this as postgres superuser)
CREATE DATABASE erp_db;

-- Create user
CREATE USER erp_user WITH PASSWORD 'erp_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE erp_db TO erp_user;

-- Connect to the database
\c erp_db

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO erp_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO erp_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO erp_user;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Set timezone
SET timezone = 'UTC';
