import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://sgdreaasfmgswafyooqu.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_r7xkV3Hvmuw5BekLtB_1sA_7vk_c2DA'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export const MAX_PLAYERS = 32
export const TEAM_SIZE = 4
export const MAX_TEAMS = 8
export const ADMIN_PASSWORD = 'tricityAdmin2026'
