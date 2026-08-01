-- D1 migration: consented Che Xu Studio portfolio leads from the NorthLine demo.
CREATE TABLE IF NOT EXISTS portfolio_leads (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  business_type TEXT NOT NULL,
  existing_website TEXT,
  primary_goal TEXT NOT NULL,
  package_interest TEXT,
  message TEXT,
  consent INTEGER NOT NULL CHECK (consent = 1),
  source_demo TEXT NOT NULL,
  created_at TEXT NOT NULL,
  consent_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_portfolio_leads_created_at
  ON portfolio_leads (created_at);

CREATE INDEX IF NOT EXISTS idx_portfolio_leads_source_demo
  ON portfolio_leads (source_demo);
