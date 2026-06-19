import { useEffect, useState } from 'react'
import {
  GraduationCap, Award, Globe, Heart, Shield, Star,
  CheckCircle2, Plane, PawPrint, Trophy, ThumbsUp, BadgeCheck, Medal, Sparkles,
} from 'lucide-react'
import { supabase } from '../../../lib/supabase'

const ICON_LIST = [
  { name: 'GraduationCap', Icon: GraduationCap },
  { name: 'Award',         Icon: Award },
  { name: 'Globe',         Icon: Globe },
  { name: 'Heart',         Icon: Heart },
  { name: 'Shield',        Icon: Shield },
  { name: 'Star',          Icon: Star },
  { name: 'CheckCircle2',  Icon: CheckCircle2 },
  { name: 'Plane',         Icon: Plane },
  { name: 'PawPrint',      Icon: PawPrint },
  { name: 'Trophy',        Icon: Trophy },
  { name: 'ThumbsUp',      Icon: ThumbsUp },
  { name: 'BadgeCheck',    Icon: BadgeCheck },
  { name: 'Medal',         Icon: Medal },
  { name: 'Sparkles',      Icon: Sparkles },
]

const CREDENTIAL_DEFAULTS = ['GraduationCap', 'Award', 'Globe', 'Heart']

function IconSelector({ value, onChange }: { value: string; onChange: (name: string) => void }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
      {ICON_LIST.map(({ name, Icon }) => {
        const selected = value === name
        return (
          <button
            key={name}
            type="button"
            title={name}
            onClick={() => onChange(name)}
            style={{
              padding: '6px 4px 4px',
              borderRadius: '8px',
              border: `2px solid ${selected ? '#C4622D' : '#e7e5e4'}`,
              background: selected ? 'rgba(196,98,45,0.10)' : '#fafaf9',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column' as const,
              alignItems: 'center',
              gap: '3px',
              width: '54px',
            }}
          >
            <Icon size={18} color={selected ? '#C4622D' : '#78716C'} />
            <span style={{ fontSize: '0.55rem', color: selected ? '#C4622D' : '#78716C', whiteSpace: 'nowrap' as const, overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '50px', fontWeight: selected ? 700 : 400 }}>
              {name}
            </span>
          </button>
        )
      })}
    </div>
  )
}

const inp = { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d6d3d1', fontSize: '0.9rem', boxSizing: 'border-box' as const }
const ta  = { ...inp, minHeight: '100px', resize: 'vertical' as const }
const lbl = { fontSize: '0.8125rem', fontWeight: 600 as const, color: '#57534E', display: 'block', marginBottom: '4px' }
const card = { background: 'white', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }

export const AboutEditor = () => {
  const [about, setAbout] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  async function loadData() {
    const { data, error } = await supabase.from('about').select('*').single()
    console.log('ABOUT DATA:', data)
    console.log('ABOUT ERROR:', error)
    if (data) setAbout(data)
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  async function save() {
    if (!about) return
    const { data, error } = await supabase
      .from('about')
      .update({
        section_title: about.section_title,
        name: about.name,
        role_title: about.role_title,
        credentials_line: about.credentials_line,
        bio_paragraph_1: about.bio_paragraph_1,
        bio_paragraph_2: about.bio_paragraph_2,
        photo_url: about.photo_url,
        credential_1_label: about.credential_1_label,
        credential_1_sub: about.credential_1_sub,
        credential_1_icon: about.credential_1_icon,
        credential_2_label: about.credential_2_label,
        credential_2_sub: about.credential_2_sub,
        credential_2_icon: about.credential_2_icon,
        credential_3_label: about.credential_3_label,
        credential_3_sub: about.credential_3_sub,
        credential_3_icon: about.credential_3_icon,
        credential_4_label: about.credential_4_label,
        credential_4_sub: about.credential_4_sub,
        credential_4_icon: about.credential_4_icon,
        show_timeline: about.show_timeline,
      })
      .eq('id', about.id)
      .select()
    console.log('SAVE DATA:', data)
    console.log('SAVE ERROR:', error)
    if (error) { alert('Erro ao salvar'); return }
    alert('Sobre salvo com sucesso!')
  }

  if (loading) return <div style={{ padding: '2rem' }}>Carregando...</div>
  if (!about) return <div style={{ padding: '2rem' }}>Nenhum registro encontrado.</div>

  return (
    <div style={{ padding: '2rem', maxWidth: '900px' }}>
      <h1>About Editor</h1>

      <div style={{ ...card, borderLeft: '4px solid #C4622D' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1.25rem', fontSize: '1rem', fontWeight: 700, color: '#1C1917' }}>Cabeçalho da Seção Sobre</h2>
        <label style={{ display: 'block' }}>
          <span style={lbl}>Título da seção (use \n para quebra de linha)</span>
          <textarea style={{ ...ta, minHeight: '72px' }} value={about.section_title || ''} onChange={e => setAbout({ ...about, section_title: e.target.value })} />
        </label>
      </div>

      <div style={{ ...card, borderLeft: '4px solid #C4622D' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1.25rem', fontSize: '1rem', fontWeight: 700, color: '#1C1917' }}>Perfil</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label style={{ display: 'block' }}>
            <span style={lbl}>Nome</span>
            <input style={inp} value={about.name || ''} onChange={e => setAbout({ ...about, name: e.target.value })} />
          </label>
          <label style={{ display: 'block' }}>
            <span style={lbl}>Cargo / especialidade</span>
            <input style={inp} value={about.role_title || ''} onChange={e => setAbout({ ...about, role_title: e.target.value })} />
          </label>
          <label style={{ display: 'block' }}>
            <span style={lbl}>Linha de credenciais (ex: IATA Certified · +8 anos)</span>
            <input style={inp} value={about.credentials_line || ''} onChange={e => setAbout({ ...about, credentials_line: e.target.value })} />
          </label>
          <label style={{ display: 'block' }}>
            <span style={lbl}>Bio — parágrafo 1</span>
            <textarea style={ta} value={about.bio_paragraph_1 || ''} onChange={e => setAbout({ ...about, bio_paragraph_1: e.target.value })} />
          </label>
          <label style={{ display: 'block' }}>
            <span style={lbl}>Bio — parágrafo 2</span>
            <textarea style={ta} value={about.bio_paragraph_2 || ''} onChange={e => setAbout({ ...about, bio_paragraph_2: e.target.value })} />
          </label>
          <label style={{ display: 'block' }}>
            <span style={lbl}>URL da foto</span>
            <input style={inp} value={about.photo_url || ''} onChange={e => setAbout({ ...about, photo_url: e.target.value })} />
          </label>
        </div>
      </div>

      {CREDENTIAL_DEFAULTS.map((defaultIcon, idx) => {
        const n = idx + 1
        const iconField = `credential_${n}_icon`
        const labelField = `credential_${n}_label`
        const subField = `credential_${n}_sub`
        return (
          <div key={n} style={{ ...card, borderLeft: '4px solid #6B7C5C' }}>
            <h2 style={{ marginTop: 0, marginBottom: '1.25rem', fontSize: '1rem', fontWeight: 700, color: '#1C1917' }}>Card de Credencial {n}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label style={{ display: 'block' }}>
                <span style={lbl}>Título do card</span>
                <input style={inp} value={about[labelField] || ''} onChange={e => setAbout({ ...about, [labelField]: e.target.value })} />
              </label>
              <label style={{ display: 'block' }}>
                <span style={lbl}>Subtítulo do card</span>
                <input style={inp} value={about[subField] || ''} onChange={e => setAbout({ ...about, [subField]: e.target.value })} />
              </label>
              <div>
                <span style={lbl}>Ícone do card</span>
                <IconSelector
                  value={about[iconField] ?? defaultIcon}
                  onChange={name => setAbout({ ...about, [iconField]: name })}
                />
              </div>
            </div>
          </div>
        )
      })}

      <div style={{ ...card, borderLeft: '4px solid #C4622D' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1.25rem', fontSize: '1rem', fontWeight: 700, color: '#1C1917' }}>Configurações da Seção</h2>
        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
          <div
            onClick={() => setAbout({ ...about, show_timeline: !about.show_timeline })}
            style={{
              width: '44px',
              height: '24px',
              borderRadius: '12px',
              background: about.show_timeline !== false ? '#C4622D' : '#d6d3d1',
              position: 'relative',
              cursor: 'pointer',
              transition: 'background 0.2s',
              flexShrink: 0,
            }}
          >
            <div style={{
              position: 'absolute',
              top: '3px',
              left: about.show_timeline !== false ? '23px' : '3px',
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              background: 'white',
              transition: 'left 0.2s',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            }} />
          </div>
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1C1917' }}>Exibir linha do tempo</span>
        </label>
      </div>

      <button onClick={save} style={{ background: '#C4622D', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '1rem' }}>
        Salvar Sobre
      </button>
    </div>
  )
}
