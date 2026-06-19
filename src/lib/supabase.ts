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

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    fetch: (input: RequestInfo | URL, init?: RequestInit) =>
      fetch(input, { ...init, cache: 'no-store' }),
  },
})

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
  bg_image_mobile_url: string | null
  hero_decor_1_image: string | null
  hero_decor_1_visible: boolean
  hero_decor_2_image: string | null
  hero_decor_2_visible: boolean
  updated_at: string
}

export type Contact = {
  id: string
  badge_text: string
  section_title: string
  section_subtitle: string
  sidebar_title: string
  whatsapp_number: string
  whatsapp_label: string
  email: string
  email_response_text: string
  instagram_handle: string
  instagram_url: string
  instagram_subtitle: string
  phone_number: string
  phone_hours: string
  trust_badge_text: string
  form_title: string
  form_subtitle: string
  submit_button_text: string
  success_title: string
  success_body: string
  privacy_text: string
  is_visible: boolean
  show_form: boolean
  updated_at: string
}
export type About = {
  id: string
  section_title: string
  name: string
  role_title: string
  credentials_line: string
  bio_paragraph_1: string
  bio_paragraph_2: string
  photo_url: string
  credential_1_label: string
  credential_1_sub: string
  credential_1_icon: string
  credential_2_label: string
  credential_2_sub: string
  credential_2_icon: string
  credential_3_label: string
  credential_3_sub: string
  credential_3_icon: string
  credential_4_label: string
  credential_4_sub: string
  credential_4_icon: string
  show_timeline: boolean
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
  credit_text: string
  bg_color: string
  updated_at: string
}

export type HowItWorksStep = {
  id: string
  step_number: string
  icon_name: string
  title: string
  description: string
  order_index: number
  is_visible: boolean
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
export type SiteSettings = {
  id: string
  company_name: string
  company_subtitle: string
  logo_url: string
  primary_cta_text: string
  primary_cta_link: string
  whatsapp_url: string
  instagram_url: string
  email: string
  color_primary: string
  color_primary_dark: string
  color_secondary: string
  color_accent: string
  color_text_dark: string
  color_bg_light: string
  tracking_scripts: string | null
}

export type NavLink = {
  id: string
  label: string
  href: string
  order_index: number
  is_visible: boolean
  updated_at: string
}

export type FooterLink = {
  id: string
  group_name: string
  group_order: number
  label: string
  href: string
  order_index: number
  updated_at: string
}

export type SectionContent = {
  section_id: string
  badge_text: string | null
  title: string | null
  subtitle: string | null
  cta_button_text: string | null
  secondary_text: string | null
  secondary_cta_text: string | null
  updated_at: string
}