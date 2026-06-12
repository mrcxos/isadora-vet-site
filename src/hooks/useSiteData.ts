import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type {
  Hero,
  Contact,
  About,
  AboutTimeline,
  Footer,
  Service,
  Destination,
  Testimonial,
  Faq,
} from '../lib/supabase'

// ─── Dados de fallback (conteúdo original do site) ───────────
// Usados automaticamente se o Supabase não responder

const FALLBACK_HERO: Hero = {
  id: 'fallback',
  badge_text: 'Especialista em Viagens Pet Internacionais',
  title_line_1: 'Seu pet viaja com',
  title_line_2: 'segurança e conforto',
  title_line_3: 'para qualquer país',
  subtitle: 'Assessoria completa e personalizada para a viagem internacional do seu companheiro de quatro patas. Documentação, logística, veterinária e todo o processo burocrático cuidado por especialistas.',
  cta_primary_label: 'Solicitar Consulta Gratuita',
  cta_secondary_label: 'Ver Serviços',
  trust_1_text: '100% seguro e documentado',
  trust_2_text: '+20 países atendidos',
  trust_3_text: '+500 pets transportados',
  bg_image_url: 'https://images.unsplash.com/photo-1696875135742-c3044510c9e2?w=1920&h=1080&fit=crop&auto=format',
  updated_at: '',
}

const FALLBACK_CONTACT: Contact = {
  id: 'main',
  section_title: 'Vamos planejar a viagem do seu pet juntos',
  section_subtitle: 'A consulta inicial é gratuita e sem compromisso. Conte-me sobre o seu pet e o destino, e eu retorno em até 24 horas com um plano personalizado.',
  whatsapp_number: '+5500000000000',
  whatsapp_label: 'Resposta prioritária',
  email: 'contato@isadoralima.com.br',
  instagram_handle: '@isadoralima.pettravel',
  instagram_url: 'https://instagram.com/isadoralima.pettravel',
  phone_number: '+55 (00) 0000-0000',
  phone_hours: 'Seg–Sex, 9h–18h',
  trust_badge_text: 'Consulta inicial gratuita. Sem compromisso, sem pressão. Apenas orientação especializada para a família do seu pet.',
  updated_at: '',
}

const FALLBACK_ABOUT: About = {
  id: 'main',
  name: 'Isadora Lima',
  role_title: 'Especialista em Viagens Pet Internacionais',
  credentials_line: 'IATA Certified · +8 anos de experiência',
  bio_paragraph_1: 'Tutora apaixonada por animais, Isadora Lima sabe na pele o desafio de viajar internacionalmente com um pet. Depois de enfrentar sozinha as burocracias, prazos e regulamentações de diferentes países, transformou essa experiência em uma missão: nenhuma família deveria passar por isso sem orientação especializada.',
  bio_paragraph_2: 'Com certificação IATA, profundo conhecimento das regulamentações internacionais e uma rede de parceiros veterinários e logísticos em todo o mundo, Isadora oferece uma assessoria completa, humana e eficiente. Seu método já garantiu a entrada bem-sucedida de mais de 500 animais em mais de 20 países, com zero reprovações na fronteira.',
  photo_url: 'https://images.unsplash.com/photo-1573497019236-17f8177b81e8?w=800&h=1000&fit=crop&auto=format',
  credential_1_label: 'Certificada IATA',
  credential_1_sub: 'Transporte Animal',
  credential_2_label: '+500 Famílias',
  credential_2_sub: 'Atendidas com sucesso',
  credential_3_label: '+20 Países',
  credential_3_sub: 'Regulamentações dominadas',
  credential_4_label: '100% Aprovação',
  credential_4_sub: 'Na entrada dos destinos',
  updated_at: '',
}

const FALLBACK_ABOUT_TIMELINE: AboutTimeline[] = [
  { id: '1', year: '2016', title: 'Início da Jornada', description: 'Primeira experiência pessoal transportando um pet internacionalmente — frustração com a falta de orientação especializada no Brasil deu origem ao propósito.', order_index: 0, updated_at: '' },
  { id: '2', year: '2018', title: 'Especialização Internacional', description: 'Capacitação em regulamentações de transporte animal pela IATA (International Air Transport Association) e certificações em medicina veterinária preventiva.', order_index: 1, updated_at: '' },
  { id: '3', year: '2020', title: 'Lançamento da Assessoria', description: 'Criação da Isadora Lima Assessoria de Viagem Pet Internacional, com foco em assessoria personalizada para tutores que precisam viajar com seus animais.', order_index: 2, updated_at: '' },
  { id: '4', year: '2022', title: '+200 Pets Transportados', description: 'Marco celebrado com 200 animais de companhia levados com segurança para mais de 15 países, com 100% de aprovação na entrada.', order_index: 3, updated_at: '' },
  { id: '5', year: '2024', title: 'Referência no Mercado', description: 'Reconhecida como uma das principais especialistas em viagens pet internacionais do Brasil, com mais de 500 famílias atendidas e presença em todo o país.', order_index: 4, updated_at: '' },
]

const FALLBACK_FOOTER: Footer = {
  id: 'main',
  brand_description: 'Assessoria especializada em viagens internacionais com pets. Cuidamos de cada detalhe para que seu companheiro de patas viaje com segurança, saúde e conforto.',
  whatsapp_url: 'https://wa.me/5500000000000',
  instagram_url: 'https://instagram.com/isadoralima.pettravel',
  email: 'contato@isadoralima.com.br',
  cta_title: 'Pronto para planejar a viagem internacional do seu pet?',
  cta_subtitle: 'Consulta inicial gratuita. Sem compromisso. Comece agora.',
  cta_primary_label: 'Solicitar Consulta Gratuita',
  cta_whatsapp_label: 'WhatsApp',
  copyright_text: 'Isadora Lima Assessoria de Viagem Pet Internacional. Todos os direitos reservados.',
  updated_at: '',
}

const FALLBACK_SERVICES: Service[] = [
  { id: '1', title: 'Documentação Completa', description: 'Organizamos toda a documentação exigida para a entrada do seu pet no país de destino: passaporte veterinário, certificados sanitários, atestados de vacinas, microchip, sorologia antirrábica e tudo mais que o destino exige.', features: ['Certificado Internacional de Saúde', 'Passaporte Europeu', 'Sorologia Antirrábica', 'Apostilamento'], color: '#C4622D', icon_name: 'FileText', order_index: 0, is_visible: true, updated_at: '' },
  { id: '2', title: 'Logística de Transporte', description: 'Planejamos a viagem do início ao fim: escolha da companhia aérea mais adequada, modalidade de transporte (cabine, porão ou cargo), caixas homologadas, escalas e conexões ideais para o conforto do seu pet.', features: ['Seleção de companhia aérea', 'Caixas IATA aprovadas', 'Gerenciamento de escalas', 'Acompanhamento em tempo real'], color: '#6B7C5C', icon_name: 'Plane', order_index: 1, is_visible: true, updated_at: '' },
  { id: '3', title: 'Consultoria Veterinária', description: 'Orientamos sobre exames necessários, vacinas obrigatórias, tratamentos preventivos, carência de medicamentos e toda a preparação de saúde que o animal precisa antes de embarcar.', features: ['Protocolo de vacinação', 'Exames pré-viagem', 'Medicamentos permitidos', 'Tratamentos preventivos'], color: '#C4622D', icon_name: 'Stethoscope', order_index: 2, is_visible: true, updated_at: '' },
  { id: '4', title: 'Orientação por Destino', description: 'Cada país tem suas próprias regras. Fornecemos um guia detalhado com todas as exigências específicas do país de destino, prazos, órgãos responsáveis, custos e armadilhas comuns a evitar.', features: ['Regulamentações por país', 'Prazos e antecedência', 'Órgãos certificadores', 'Custos estimados'], color: '#6B7C5C', icon_name: 'MapPin', order_index: 3, is_visible: true, updated_at: '' },
  { id: '5', title: 'Assessoria Personalizada', description: 'Acompanhamento individualizado para cada família. Desde a primeira consulta até o momento em que seu pet pisa na nova terra, estamos ao seu lado para resolver qualquer imprevisto.', features: ['Consulta inicial gratuita', 'Suporte via WhatsApp', 'Acompanhamento em dias de viagem', 'Pós-viagem'], color: '#C4622D', icon_name: 'HeartHandshake', order_index: 4, is_visible: true, updated_at: '' },
  { id: '6', title: 'Checklist e Cronograma', description: 'Criamos um cronograma personalizado com todas as etapas, prazos e checklist de providências para que você nunca perca nenhum detalhe importante antes da viagem.', features: ['Cronograma detalhado', 'Alertas de prazo', 'Checklist interativo', 'Revisão final pré-embarque'], color: '#6B7C5C', icon_name: 'CheckCircle2', order_index: 5, is_visible: true, updated_at: '' },
]

const FALLBACK_DESTINATIONS: Destination[] = [
  { id: '1', country: 'Estados Unidos', flag: '🇺🇸', difficulty: 'Moderado', requirements: ['Microchip ISO 15224', 'Vacina antirrábica', 'Health Certificate USDA', 'Prazo: 7–10 dias úteis'], color: '#4B5563', order_index: 0, is_visible: true, updated_at: '' },
  { id: '2', country: 'Portugal', flag: '🇵🇹', difficulty: 'Moderado', requirements: ['Passaporte Europeu', 'Vacina antirrábica', 'Tratamento antiparasitário', 'Prazo: 30–60 dias'], color: '#0EA5E9', order_index: 1, is_visible: true, updated_at: '' },
  { id: '3', country: 'Austrália', flag: '🇦🇺', difficulty: 'Rigoroso', requirements: ['Sorologia antirrábica', 'Tratamento parasitário', 'Quarentena obrigatória', 'Prazo: 6+ meses'], color: '#F59E0B', order_index: 2, is_visible: true, updated_at: '' },
  { id: '4', country: 'Reino Unido', flag: '🇬🇧', difficulty: 'Moderado', requirements: ['Microchip', 'Vacina antirrábica', 'Tapeworm treatment', 'Prazo: 21 dias pós-vacina'], color: '#6B7C5C', order_index: 3, is_visible: true, updated_at: '' },
  { id: '5', country: 'Canadá', flag: '🇨🇦', difficulty: 'Simples', requirements: ['Certificado de saúde', 'Vacina antirrábica', 'Declaração de propriedade', 'Prazo: 7 dias'], color: '#C4622D', order_index: 4, is_visible: true, updated_at: '' },
  { id: '6', country: 'Alemanha', flag: '🇩🇪', difficulty: 'Moderado', requirements: ['Passaporte Europeu', 'Chip eletrônico', 'Vacinas em dia', 'Prazo: 30–45 dias'], color: '#7C3AED', order_index: 5, is_visible: true, updated_at: '' },
  { id: '7', country: 'Japão', flag: '🇯🇵', difficulty: 'Rigoroso', requirements: ['2 doses antirrábica', 'Sorologia', 'Importação aprovada', 'Prazo: 7+ meses'], color: '#EC4899', order_index: 6, is_visible: true, updated_at: '' },
  { id: '8', country: 'França', flag: '🇫🇷', difficulty: 'Moderado', requirements: ['Passaporte Europeu', 'Microchip ISO', 'Vacinação completa', 'Prazo: 21 dias mínimo'], color: '#0284C7', order_index: 7, is_visible: true, updated_at: '' },
  { id: '9', country: 'Espanha', flag: '🇪🇸', difficulty: 'Moderado', requirements: ['Passaporte Europeu', 'Chip + vacinas', 'Certificado sanitário', 'Prazo: 30 dias'], color: '#DC2626', order_index: 8, is_visible: true, updated_at: '' },
  { id: '10', country: 'Itália', flag: '🇮🇹', difficulty: 'Moderado', requirements: ['Passaporte Europeu', 'Microchip', 'Vacina antirrábica', 'Prazo: 21 dias mínimo'], color: '#16A34A', order_index: 9, is_visible: true, updated_at: '' },
  { id: '11', country: 'Suíça', flag: '🇨🇭', difficulty: 'Moderado', requirements: ['Passaporte EU válido', 'Vacinas em dia', 'Certificado USDA/MAPA', 'Prazo: 30 dias'], color: '#64748B', order_index: 10, is_visible: true, updated_at: '' },
  { id: '12', country: 'Nova Zelândia', flag: '🇳🇿', difficulty: 'Rigoroso', requirements: ['Sorologia antirrábica', 'Quarentena 10 dias', 'Tratamentos especiais', 'Prazo: 6+ meses'], color: '#0F766E', order_index: 11, is_visible: true, updated_at: '' },
]

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'Mariana Fonseca', location: 'São Paulo → Lisboa, Portugal', pet: 'Bolinha, Golden Retriever, 3 anos', rating: 5, text: 'A Isadora foi fundamental na mudança da nossa família para Portugal. Sem ela, jamais teríamos conseguido organizar toda a documentação do Bolinha a tempo. Ela nos orientou passo a passo, indicou a veterinária certa, acompanhou todos os prazos e ainda nos acalmou nos momentos de ansiedade. O Bolinha chegou em Lisboa saudável, feliz e sem nenhum problema na fronteira. Recomendo de olhos fechados!', initials: 'MF', color: '#C4622D', order_index: 0, is_visible: true, updated_at: '' },
  { id: '2', name: 'Ricardo e Ana Souza', location: 'Rio de Janeiro → Toronto, Canadá', pet: 'Luna, Shih Tzu, 5 anos', rating: 5, text: 'Levamos nossa Luna para o Canadá e a Isadora cuidou de absolutamente tudo. A documentação estava impecável, a caixa de transporte dentro das normas da companhia aérea, e todo o processo foi tranquilo. A Luna viajou na cabine conosco e chegou muito bem. Não consigo imaginar passar por isso sem a ajuda da Isadora. Profissional incrível!', initials: 'RS', color: '#6B7C5C', order_index: 1, is_visible: true, updated_at: '' },
  { id: '3', name: 'Fernanda Carvalho', location: 'Brasília → Frankfurt, Alemanha', pet: 'Thor, Pastor Alemão, 4 anos', rating: 5, text: 'Achei que seria impossível levar o Thor para a Alemanha — um cachorro grande em voo internacional parecia um pesadelo. A Isadora desmistificou tudo. Ela conhece cada detalhe, cada prazo, cada exigência. O processo foi muito mais tranquilo do que eu imaginava, e o Thor chegou na Alemanha sem nenhum contratempo. Serviço excelente, atendimento humanizado.', initials: 'FC', color: '#C4622D', order_index: 2, is_visible: true, updated_at: '' },
  { id: '4', name: 'Paulo Mendes', location: 'Curitiba → Sydney, Austrália', pet: 'Mel, Labrador, 2 anos', rating: 5, text: 'A Austrália tem as regras mais rígidas do mundo para entrada de animais, e eu sabia disso. Sem a Isadora, certamente teria cometido algum erro que inviabilizaria a viagem. Ela nos preparou com 8 meses de antecedência, controlou cada prazo da sorologia, e a Mel foi aprovada na quarentena australiana sem nenhum problema. Investimento que valeu cada centavo.', initials: 'PM', color: '#6B7C5C', order_index: 3, is_visible: true, updated_at: '' },
  { id: '5', name: 'Juliana e Marcos Lima', location: 'Florianópolis → Miami, EUA', pet: 'Pipoca, Yorkshire, 7 anos', rating: 5, text: 'Estávamos desesperados porque descobrimos tarde que precisaríamos viajar em 2 meses. A Isadora entrou em contato e em menos de 48 horas já tinha montado um plano de ação. Ela conseguiu fazer tudo no prazo, com toda a documentação correta. A Pipoca viajou na cabine conosco e os agentes da imigração em Miami aprovaram na hora. Que profissional incrível!', initials: 'JL', color: '#C4622D', order_index: 4, is_visible: true, updated_at: '' },
  { id: '6', name: 'Camila Rodrigues', location: 'Belo Horizonte → Londres, Reino Unido', pet: 'Freddie, Beagle, 6 anos', rating: 5, text: 'A Isadora tem um dom especial: ela explica tudo de forma clara, não deixa nenhuma dúvida sem resposta e está sempre disponível. Com o Brexit as regras do Reino Unido mudaram muito e ela estava completamente atualizada. O Freddie chegou a Londres perfeito e nossa família está muito feliz. Só tenho gratidão.', initials: 'CR', color: '#6B7C5C', order_index: 5, is_visible: true, updated_at: '' },
]

const FALLBACK_FAQ: Faq[] = [
  { id: '1', question: 'Com quanto tempo de antecedência devo começar a organizar a viagem do meu pet?', answer: 'Idealmente, o processo deve começar com pelo menos 3 a 6 meses de antecedência para destinos de dificuldade moderada, como Europa e América do Norte. Para países com exigências rigorosas, como Austrália, Nova Zelândia e Japão, recomendo iniciar com no mínimo 8 a 12 meses antes da viagem. Quanto mais cedo começar, mais tranquilo será o processo e menor o risco de imprevistos nos prazos de vacinas, sorologia e documentação.', category: 'Planejamento', order_index: 0, is_visible: true, updated_at: '' },
  { id: '2', question: 'Meu pet pode viajar na cabine comigo?', answer: 'Depende do tamanho e peso do animal e das regras da companhia aérea. Em geral, pets de pequeno porte (menos de 8kg incluindo a caixa) podem viajar na cabine. Animais maiores viajam no compartimento de bagagem pressurizado (porão). Algumas raças de focinho curto (braquicéfalas), como Bulldogs, Pugs e Persas, têm restrições específicas em várias companhias. Na assessoria, analisamos individualmente cada caso e indicamos a melhor opção de companhia aérea para o seu pet.', category: 'Transporte', order_index: 1, is_visible: true, updated_at: '' },
  { id: '3', question: 'Quais vacinas meu pet precisa ter?', answer: 'A vacina antirrábica é obrigatória para praticamente todos os destinos internacionais. Para alguns países, como os da União Europeia, o Japão, Austrália e Nova Zelândia, é necessário também comprovar título de anticorpos antirrábicos através da sorologia, com antecedência mínima que varia por país. Além da antirrábica, são exigidas outras vacinas do protocolo básico veterinário (V8, V10, entre outras). Cada destino tem seu protocolo específico, e orientamos você sobre exatamente o que é necessário.', category: 'Saúde', order_index: 2, is_visible: true, updated_at: '' },
  { id: '4', question: 'O que é a sorologia antirrábica e quando é necessária?', answer: 'A sorologia antirrábica é um exame de sangue que comprova que seu pet desenvolveu anticorpos suficientes contra a raiva após a vacinação. É exigida por países considerados "livres de raiva", como Austrália, Nova Zelândia, Japão, Finlândia, Noruega, entre outros, e também por países da União Europeia em determinadas situações. O exame deve ser feito em laboratório credenciado e, em muitos países, é necessário aguardar um prazo mínimo (geralmente 90 a 180 dias) após o resultado positivo antes de viajar. Por isso a antecedência é essencial.', category: 'Saúde', order_index: 3, is_visible: true, updated_at: '' },
  { id: '5', question: 'Quanto custa a assessoria?', answer: 'O valor da assessoria varia de acordo com o destino, o número de animais, a complexidade do processo e o pacote de serviços contratado. Oferecemos pacotes básicos, intermediários e completos, além de consultoria pontual para quem já tem conhecimento e precisa tirar dúvidas específicas. A consulta inicial é gratuita e, após entender o seu caso, apresentamos uma proposta personalizada. Entre em contato para receber um orçamento detalhado sem compromisso.', category: 'Serviços', order_index: 4, is_visible: true, updated_at: '' },
  { id: '6', question: 'O que acontece se meu pet for barrado na fronteira?', answer: 'Com a assessoria adequada, as chances de isso acontecer são praticamente nulas. Toda a documentação é verificada e revisada antes do embarque. No entanto, em casos de força maior, como problemas de saúde do animal detectados no momento da inspeção veterinária, o animal pode ser colocado em quarentena ou devolvido ao país de origem. Por isso é tão importante contar com um acompanhamento profissional: verificamos tudo com antecedência para garantir que nenhum detalhe seja esquecido.', category: 'Segurança', order_index: 5, is_visible: true, updated_at: '' },
  { id: '7', question: 'Existe alguma raça proibida em determinados países?', answer: 'Sim. Algumas raças consideradas potencialmente perigosas são proibidas ou têm restrições severas em vários países. O Reino Unido, por exemplo, proíbe Pit Bull Terriers, Dogo Argentino, Fila Brasileiro e Tosa Inu. A Alemanha, França, Bélgica e outros países europeus também têm listas de raças restritas. Antes de iniciar o processo, verificamos se a raça do seu pet está sujeita a alguma restrição no país de destino.', category: 'Regulamentações', order_index: 6, is_visible: true, updated_at: '' },
  { id: '8', question: 'Posso viajar com gatos? As regras são as mesmas dos cães?', answer: 'Sim, atendemos tutores de gatos e as regras geralmente são semelhantes às dos cães: microchip, vacina antirrábica, certificado de saúde e, em alguns casos, sorologia antirrábica. Os gatos têm uma vantagem: não existem restrições de raça. Porém, o estresse da viagem tende a ser maior nos felinos, por isso orientamos sobre sedação, adaptação à caixa de transporte e outras estratégias para tornar a experiência mais confortável para o animal.', category: 'Outros animais', order_index: 7, is_visible: true, updated_at: '' },
  { id: '9', question: 'Vocês também ajudam com a parte de adaptar o pet ao país de destino?', answer: 'Sim! Nossa assessoria vai além da documentação e do transporte. Orientamos sobre climas diferentes, alimentação no exterior, encontrar veterinários de confiança no destino, registro do animal no novo país quando necessário, e adaptação do pet ao novo ambiente. Queremos garantir não apenas que seu pet chegue, mas que esteja bem na nova casa.', category: 'Pós-viagem', order_index: 8, is_visible: true, updated_at: '' },
  { id: '10', question: 'E se eu precisar retornar ao Brasil com meu pet depois de um tempo?', answer: 'O retorno ao Brasil também tem suas exigências. O MAPA (Ministério da Agricultura) exige certificado de saúde emitido pelo veterinário oficial do país de origem, vacinas em dia e, dependendo do país, outros documentos. Caso você precise planejar o retorno, podemos orientar sobre o processo de reimportação, que em muitos casos é mais simples do que a exportação, mas ainda assim requer atenção aos detalhes.', category: 'Retorno ao Brasil', order_index: 9, is_visible: true, updated_at: '' },
]

// ─── Hook genérico interno ────────────────────────────────────

function useSupabaseData<T>(
  fetcher: () => Promise<T>,
  fallback: T
): { data: T; loading: boolean } {
  const [data, setData] = useState<T>(fallback)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetcher()
      .then(result => { if (!cancelled) setData(result) })
      .catch(() => { /* fallback já está no estado inicial */ })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  return { data, loading }
}

// ─── Hooks públicos por seção ─────────────────────────────────

export function useHero() {
  return useSupabaseData<Hero>(
    async () => {
      const { data, error } = await supabase
        .from('hero')
        .select('*')
        .single()
      if (error || !data) throw error
      return data
    },
    FALLBACK_HERO
  )
}

export function useContact() {
  return useSupabaseData<Contact>(
    async () => {
      const { data, error } = await supabase
        .from('contact')
        .select('*')
        .eq('id', 'main')
        .single()
      if (error || !data) throw error
      return data
    },
    FALLBACK_CONTACT
  )
}

export function useAbout() {
  return useSupabaseData<{ about: About; timeline: AboutTimeline[] }>(
    async () => {
      const [aboutRes, timelineRes] = await Promise.all([
        supabase.from('about').select('*').eq('id', 'main').single(),
        supabase.from('about_timeline').select('*').order('order_index'),
      ])
      if (aboutRes.error || !aboutRes.data) throw aboutRes.error
      return {
        about: aboutRes.data,
        timeline: timelineRes.data ?? FALLBACK_ABOUT_TIMELINE,
      }
    },
    { about: FALLBACK_ABOUT, timeline: FALLBACK_ABOUT_TIMELINE }
  )
}

export function useFooter() {
  return useSupabaseData<Footer>(
    async () => {
      const { data, error } = await supabase
        .from('footer')
        .select('*')
        .eq('id', 'main')
        .single()
      if (error || !data) throw error
      return data
    },
    FALLBACK_FOOTER
  )
}

export function useServices() {
  return useSupabaseData<Service[]>(
    async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_visible', true)
        .order('order_index')
      if (error) throw error
      return data ?? []
    },
    FALLBACK_SERVICES
  )
}

export function useDestinations() {
  return useSupabaseData<Destination[]>(
    async () => {
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .eq('is_visible', true)
        .order('order_index')
      if (error) throw error
      return data ?? []
    },
    FALLBACK_DESTINATIONS
  )
}

export function useTestimonials() {
  return useSupabaseData<Testimonial[]>(
    async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_visible', true)
        .order('order_index')
      if (error) throw error
      return data ?? []
    },
    FALLBACK_TESTIMONIALS
  )
}

export function useFaq() {
  return useSupabaseData<Faq[]>(
    async () => {
      const { data, error } = await supabase
        .from('faq')
        .select('*')
        .eq('is_visible', true)
        .order('order_index')
      if (error) throw error
      return data ?? []
    },
    FALLBACK_FAQ
  )
}