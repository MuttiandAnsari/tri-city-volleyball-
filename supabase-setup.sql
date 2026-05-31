-- Run this in your Supabase SQL Editor
-- https://supabase.com/dashboard/project/sgdreaasfmgswafyooqu/sql

-- 1. Player/team registrations
CREATE TABLE IF NOT EXISTS tournament_registrations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  registration_type text NOT NULL CHECK (registration_type IN ('individual', 'team')),
  team_name text,
  skill_level text,
  player1_name text NOT NULL,
  player1_email text NOT NULL,
  player1_phone text,
  player2_name text,
  player2_email text,
  player2_phone text,
  player3_name text,
  player3_email text,
  player3_phone text,
  player4_name text,
  player4_email text,
  player4_phone text,
  created_at timestamptz DEFAULT now()
);

-- 2. Generated teams (created when bracket is generated)
CREATE TABLE IF NOT EXISTS tournament_teams (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  team_name text NOT NULL,
  player1 text NOT NULL,
  player2 text,
  player3 text,
  player4 text,
  seed integer,
  created_at timestamptz DEFAULT now()
);

-- 3. Bracket matches
CREATE TABLE IF NOT EXISTS tournament_matches (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  round integer NOT NULL,
  match_number integer NOT NULL,
  team1_id uuid REFERENCES tournament_teams(id) ON DELETE SET NULL,
  team2_id uuid REFERENCES tournament_teams(id) ON DELETE SET NULL,
  winner_id uuid REFERENCES tournament_teams(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- 4. Enable Row Level Security (public read, authenticated write)
ALTER TABLE tournament_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournament_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournament_matches ENABLE ROW LEVEL SECURITY;

-- Public can read teams and matches (to view bracket)
CREATE POLICY "Public read teams" ON tournament_teams FOR SELECT USING (true);
CREATE POLICY "Public read matches" ON tournament_matches FOR SELECT USING (true);

-- Anyone can insert a registration (public sign-up form)
CREATE POLICY "Public insert registrations" ON tournament_registrations FOR INSERT WITH CHECK (true);

-- Service role (admin panel via anon key for now) can do everything
CREATE POLICY "Admin all registrations" ON tournament_registrations FOR ALL USING (true);
CREATE POLICY "Admin all teams" ON tournament_teams FOR ALL USING (true);
CREATE POLICY "Admin all matches" ON tournament_matches FOR ALL USING (true);

-- Enable realtime on all tables
ALTER PUBLICATION supabase_realtime ADD TABLE tournament_registrations;
ALTER PUBLICATION supabase_realtime ADD TABLE tournament_teams;
ALTER PUBLICATION supabase_realtime ADD TABLE tournament_matches;

-- 5. Reviews
CREATE TABLE IF NOT EXISTS reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  role text,
  approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read approved reviews" ON reviews FOR SELECT USING (approved = true);
CREATE POLICY "Public insert reviews" ON reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin all reviews" ON reviews FOR ALL USING (true);
