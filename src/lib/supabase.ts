import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
console.log('SUPABASE URL:', supabaseUrl)
console.log('SUPABASE KEY:', supabaseAnonKey)
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Variáveis de ambiente do Supabase não encontradas. Verifique o arquivo .env.local.'
  )
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)

export type Section = {
  id: string
  label: string
  is_visible: boolean
  order_index: number
  updated_at: string
}

export type Hero = {
  id: string
  badge_text: string
  title_line_1: string
  title_line_2: string
  title_line_3: string
  subtitle: string
  cta_primary_label: string
  cta_secondary_label: string
  trust_1_text: string
  trust_2_text: string
  trust_3_text: string
  bg_image_url: string
  updated_at: string
}

export type Contact = {
  id: string
  section_title: string
  section_subtitle: string
  whatsapp_number: string
  whatsapp_label: string
  email: string
  instagram_handle: string
  instagram_url: string
  phone_number: string
  phone_hours: string
  trust_badge_text: string
  updated_at: string
}
export type About = {
  id: string
  name: string
  role_title: string
  credentials_line: string
  bio_paragraph_1: string
  bio_paragraph_2: string
  photo_url: string
  credential_1_label: string
  credential_1_sub: string
  credential_2_label: string
  credential_2_sub: string
  credential_3_label: string
  credential_3_sub: string
  credential_4_label: string
  credential_4_sub: string
  updated_at: string
}

export type AboutTimeline = {
  id: string
  year: string
  title: string
  description: string
  order_index: number
  updated_at: string
}

export type Footer = {
  id: string
  brand_description: string
  whatsapp_url: string
  instagram_url: string
  email: string
  cta_title: string
  cta_subtitle: string
  cta_primary_label: string
  cta_whatsapp_label: string
  copyright_text: string
  updated_at: string
}

export type Service = {
  id: string
  title: string
  description: string
  features: string[]
  color: string
  icon_name: string
  order_index: number
  is_visible: boolean
  updated_at: string
}

export type Destination = {
  id: string
  country: string
  flag: string
  difficulty: 'Simples' | 'Moderado' | 'Rigoroso'
  requirements: string[]
  color: string
  order_index: number
  is_visible: boolean
  updated_at: string
}

export type Testimonial = {
  id: string
  name: string
  location: string
  pet: string
  rating: number
  text: string
  initials: string
  color: string
  order_index: number
  is_visible: boolean
  updated_at: string
}

export type Faq = {
  id: string
  question: string
  answer: string
  category: string
  order_index: number
  is_visible: boolean
  updated_at: string
}

export type SiteImage = {
  id: string
  section_id: string
  key: string
  storage_path: string | null
  public_url: string | null
  alt_text: string
  updated_at: string
}