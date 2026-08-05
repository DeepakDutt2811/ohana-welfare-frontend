-- Run against the ohana_db database created by 001_create_database.sql, e.g.:
--   psql -U ohana_user -d ohana_db -f migrations/002_create_tables.sql
--
-- Mirrors backend/app/models.py. If you have Python + the backend's
-- dependencies installed, you can instead run `python init_db.py`, which
-- creates the same tables from the SQLAlchemy models.

CREATE TABLE IF NOT EXISTS donations (
    id                    SERIAL PRIMARY KEY,
    full_name             VARCHAR(150) NOT NULL,
    email                 VARCHAR(150) NOT NULL,
    phone                 VARCHAR(20)  NOT NULL,
    pan_number            VARCHAR(10),
    address               VARCHAR(255),
    city                  VARCHAR(100),
    state                 VARCHAR(100),
    pincode               VARCHAR(10),
    country               VARCHAR(100) NOT NULL DEFAULT 'India',
    amount                NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
    currency              VARCHAR(3) NOT NULL DEFAULT 'INR',
    consent_updates       BOOLEAN NOT NULL DEFAULT FALSE,
    razorpay_order_id     VARCHAR(100) UNIQUE,
    razorpay_payment_id   VARCHAR(100),
    razorpay_signature    VARCHAR(255),
    payment_status        VARCHAR(20) NOT NULL DEFAULT 'created'
                           CHECK (payment_status IN ('created', 'paid', 'failed')),
    created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_donations_email ON donations (email);
CREATE INDEX IF NOT EXISTS idx_donations_payment_status ON donations (payment_status);

CREATE TABLE IF NOT EXISTS contacts (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(150) NOT NULL,
    email       VARCHAR(150) NOT NULL,
    phone       VARCHAR(20),
    subject     VARCHAR(50) NOT NULL DEFAULT 'general',
    message     VARCHAR(2000) NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts (email);
