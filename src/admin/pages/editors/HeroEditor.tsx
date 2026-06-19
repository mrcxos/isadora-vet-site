import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

const inp = { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d6d3d1', fontSize: '0.9rem', boxSizing: 'border-box' as const }
const ta  = { ...inp, minHeight: '100px', resize: 'vertical' as const }
const lbl = { fontSize: '0.8125rem', fontWeight: 600 as const, color: '#57534E', display: 'block', marginBottom: '4px' }
const card = { background: 'white', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }

function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
      <div
        onClick={() => onChange(!value)}
        style={{ width: '44px', height: '24px', borderRadius: '12px', background: value ? '#C4622D' : '#d6d3d1', position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}
      >
        <div style={{ position: 'absolute', top: '3px', left: value ? '23px' : '3px', width: '18px', height: '18px', borderRadius: '50%', background: 'white', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
      </div>
      <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1C1917' }}>{label}</span>
    </label>
  )
}

export const HeroEditor = () => {
  const [hero, setHero] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  async function loadData() {
    const { data, error } = await supabase.from('hero').select('*').single()
    console.log('HERO DATA:', data)
    console.log('HERO ERROR:', error)
    if (data) setHero(data)
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  async function save() {
    if (!hero) return
    const { data, error } = await supabase
      .from('hero')
      .update({
        badge_text: hero.badge_text,
        title_line_1: hero.title_line_1,
        title_line_2: hero.title_line_2,
        title_line_3: hero.title_line_3,
        subtitle: hero.subtitle,
        cta_primary_label: hero.cta_primary_label,
        cta_secondary_label: hero.cta_secondary_label,
        trust_1_text: hero.trust_1_text,
        trust_2_text: hero.trust_2_text,
        trust_3_text: hero.trust_3_text,
        bg_image_url: hero.bg_image_url,
        hero_decor_1_image: hero.hero_decor_1_image || null,
        hero_decor_1_visible: hero.hero_decor_1_visible,
        hero_decor_2_image: hero.hero_decor_2_image || null,
        hero_decor_2_visible: hero.hero_decor_2_visible,
      })
      .eq('id', hero.id)
      .select()
    console.log('SAVE DATA:', data)
    console.log('SAVE ERROR:', error)
    if (error) { alert('Erro ao salvar'); return }
    alert('Hero salvo com sucesso!')
  }

  if (loading) return <div style={{ padding: '2rem' }}>Carregando...</div>
  if (!hero) return <div style={{ padding: '2rem' }}>Nenhum registro encontrado.</div>

  return (
    <div style={{ padding: '2rem', maxWidth: '900px' }}>
      <h1>Hero Editor</h1>

      <div style={{ ...card, borderLeft: '4px solid #C4622D' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1.25rem', fontSize: '1rem', fontWeight: 700, color: '#1C1917' }}>Textos do Hero</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label style={{ display: 'block' }}>
            <span style={lbl}>Badge (ex: Especialista em Viagens Pet Internacionais)</span>
            <input style={inp} value={hero.badge_text || ''} onChange={e => setHero({ ...hero, badge_text: e.target.value })} />
          </label>
          <label style={{ display: 'block' }}>
            <span style={lbl}>Título — linha 1</span>
            <input style={inp} value={hero.title_line_1 || ''} onChange={e => setHero({ ...hero, title_line_1: e.target.value })} />
          </label>
          <label style={{ display: 'block' }}>
            <span style={lbl}>Título — linha 2 (exibida em laranja/destaque)</span>
            <input style={inp} value={hero.title_line_2 || ''} onChange={e => setHero({ ...hero, title_line_2: e.target.value })} />
          </label>
          <label style={{ display: 'block' }}>
            <span style={lbl}>Título — linha 3</span>
            <input style={inp} value={hero.title_line_3 || ''} onChange={e => setHero({ ...hero, title_line_3: e.target.value })} />
          </label>
          <label style={{ display: 'block' }}>
            <span style={lbl}>Subtítulo</span>
            <textarea style={ta} value={hero.subtitle || ''} onChange={e => setHero({ ...hero, subtitle: e.target.value })} />
          </label>
          <label style={{ display: 'block' }}>
            <span style={lbl}>Botão principal (ex: Solicitar Consulta Gratuita)</span>
            <input style={inp} value={hero.cta_primary_label || ''} onChange={e => setHero({ ...hero, cta_primary_label: e.target.value })} />
          </label>
          <label style={{ display: 'block' }}>
            <span style={lbl}>Botão secundário (ex: Ver Serviços)</span>
            <input style={inp} value={hero.cta_secondary_label || ''} onChange={e => setHero({ ...hero, cta_secondary_label: e.target.value })} />
          </label>
        </div>
      </div>

      <div style={{ ...card, borderLeft: '4px solid #6B7C5C' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1.25rem', fontSize: '1rem', fontWeight: 700, color: '#1C1917' }}>Selos de Confiança</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label style={{ display: 'block' }}>
            <span style={lbl}>Texto do selo 1 (ex: 100% seguro e documentado)</span>
            <input style={inp} value={hero.trust_1_text || ''} onChange={e => setHero({ ...hero, trust_1_text: e.target.value })} />
          </label>
          <label style={{ display: 'block' }}>
            <span style={lbl}>Texto do selo 2 (ex: +20 países atendidos)</span>
            <input style={inp} value={hero.trust_2_text || ''} onChange={e => setHero({ ...hero, trust_2_text: e.target.value })} />
          </label>
          <label style={{ display: 'block' }}>
            <span style={lbl}>Texto do selo 3 (ex: +500 pets transportados)</span>
            <input style={inp} value={hero.trust_3_text || ''} onChange={e => setHero({ ...hero, trust_3_text: e.target.value })} />
          </label>
        </div>
      </div>

      <div style={{ ...card, borderLeft: '4px solid #C4622D' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1.25rem', fontSize: '1rem', fontWeight: 700, color: '#1C1917' }}>Imagem de Fundo</h2>
        <label style={{ display: 'block' }}>
          <span style={lbl}>URL da imagem de fundo</span>
          <input style={inp} value={hero.bg_image_url || ''} onChange={e => setHero({ ...hero, bg_image_url: e.target.value })} />
        </label>
        {hero.bg_image_url && (
          <img src={hero.bg_image_url} alt="Preview" style={{ marginTop: '8px', width: '100%', maxHeight: '160px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e7e5e4' }} />
        )}
      </div>

      <div style={{ ...card, borderLeft: '4px solid #6B7C5C' }}>
        <h2 style={{ marginTop: 0, marginBottom: '4px', fontSize: '1rem', fontWeight: 700, color: '#1C1917' }}>Elemento decorativo 1</h2>
        <p style={{ marginTop: 0, marginBottom: '1.25rem', fontSize: '0.8125rem', color: '#78716C' }}>Quadrado grande — canto superior direito (192×192px, vidro branco)</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Toggle
            value={hero.hero_decor_1_visible !== false}
            onChange={v => setHero({ ...hero, hero_decor_1_visible: v })}
            label="Exibir elemento"
          />
          <label style={{ display: 'block' }}>
            <span style={lbl}>URL de imagem opcional (quando preenchida, aparece dentro do quadrado, nítida, sem filtros)</span>
            <input style={inp} value={hero.hero_decor_1_image || ''} onChange={e => setHero({ ...hero, hero_decor_1_image: e.target.value })} placeholder="https://..." />
          </label>
          {hero.hero_decor_1_image && (
            <img src={hero.hero_decor_1_image} alt="Preview" style={{ width: '96px', height: '96px', objectFit: 'cover', borderRadius: '16px', border: '1px solid #e7e5e4' }} />
          )}
        </div>
      </div>

      <div style={{ ...card, borderLeft: '4px solid #6B7C5C' }}>
        <h2 style={{ marginTop: 0, marginBottom: '4px', fontSize: '1rem', fontWeight: 700, color: '#1C1917' }}>Elemento decorativo 2</h2>
        <p style={{ marginTop: 0, marginBottom: '1.25rem', fontSize: '0.8125rem', color: '#78716C' }}>Quadrado menor — canto inferior direito (112×112px, vidro laranja)</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Toggle
            value={hero.hero_decor_2_visible !== false}
            onChange={v => setHero({ ...hero, hero_decor_2_visible: v })}
            label="Exibir elemento"
          />
          <label style={{ display: 'block' }}>
            <span style={lbl}>URL de imagem opcional (quando preenchida, aparece dentro do quadrado, nítida, sem filtros)</span>
            <input style={inp} value={hero.hero_decor_2_image || ''} onChange={e => setHero({ ...hero, hero_decor_2_image: e.target.value })} placeholder="https://..." />
          </label>
          {hero.hero_decor_2_image && (
            <img src={hero.hero_decor_2_image} alt="Preview" style={{ width: '96px', height: '96px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e7e5e4' }} />
          )}
        </div>
      </div>

      <button onClick={save} style={{ background: '#C4622D', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '1rem' }}>
        Salvar Hero
      </button>
    </div>
  )
}
