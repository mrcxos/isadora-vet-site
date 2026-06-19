import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

export const DestinationsEditor = () => {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [sectionContent, setSectionContent] = useState({
    badge_text: 'Destinos Atendidos',
    title: 'Levamos seu pet para\nqualquer lugar do mundo',
    subtitle: 'Conhecemos as regulamentações específicas de cada país. Seja para uma mudança permanente ou uma temporada, estamos prontos para orientar você em cada destino.',
    secondary_text: 'Não encontrou seu destino na lista? Atendemos mais de 20 países ao redor do mundo. Entre em contato para uma consulta personalizada.',
    secondary_cta_text: 'Consultar meu destino',
  })
  const [sectionSaving, setSectionSaving] = useState(false)

  async function loadSectionContent() {
    const { data } = await supabase
      .from('section_content')
      .select('*')
      .eq('section_id', 'destinations')
      .single()
    if (data) {
      setSectionContent({
        badge_text: data.badge_text ?? 'Destinos Atendidos',
        title: data.title ?? 'Levamos seu pet para\nqualquer lugar do mundo',
        subtitle: data.subtitle ?? '',
        secondary_text: data.secondary_text ?? '',
        secondary_cta_text: data.secondary_cta_text ?? '',
      })
    }
  }

  async function saveSectionContent() {
    setSectionSaving(true)
    const { error } = await supabase
      .from('section_content')
      .upsert({
        section_id: 'destinations',
        badge_text: sectionContent.badge_text,
        title: sectionContent.title,
        subtitle: sectionContent.subtitle,
        cta_button_text: null,
        secondary_text: sectionContent.secondary_text,
        secondary_cta_text: sectionContent.secondary_cta_text,
        updated_at: new Date().toISOString(),
      })
    setSectionSaving(false)
    if (error) { alert('Erro ao salvar cabeçalho'); return }
    alert('Cabeçalho salvo com sucesso!')
  }

  async function loadData() {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .order('order_index')

    console.log('DESTINATIONS DATA:', data)
    console.log('DESTINATIONS ERROR:', error)

    if (data) setItems(data)

    setLoading(false)
  }

  useEffect(() => {
    loadData()
    loadSectionContent()
  }, [])

  async function save(item: any) {
    const { data, error } = await supabase
      .from('destinations')
      .update({
        country: item.country,
        flag: item.flag,
        difficulty: item.difficulty,
        requirements: item.requirements,
        color: item.color,
        order_index: item.order_index,
        is_visible: item.is_visible,
      })
      .eq('id', item.id)
      .select()

    console.log('SAVE DATA:', data)
    console.log('SAVE ERROR:', error)

    if (error) {
      alert('Erro ao salvar')
      return
    }

    alert('Destino salvo com sucesso!')
  }

  if (loading) {
    return <div style={{ padding: '2rem' }}>Carregando...</div>
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Editor de Destinos</h1>

      <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderLeft: '4px solid #C4622D' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1.25rem', fontSize: '1rem', fontWeight: 700, color: '#1C1917' }}>
          Cabeçalho da Seção Destinos
        </h2>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#57534E', display: 'block', marginBottom: '4px' }}>Texto do badge (ex: Destinos Atendidos)</span>
          <input style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d6d3d1', fontSize: '0.9rem', boxSizing: 'border-box' }}
            value={sectionContent.badge_text}
            onChange={e => setSectionContent(prev => ({ ...prev, badge_text: e.target.value }))}
          />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#57534E', display: 'block', marginBottom: '4px' }}>Título principal (use \n para quebra de linha)</span>
          <input style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d6d3d1', fontSize: '0.9rem', boxSizing: 'border-box' }}
            value={sectionContent.title}
            onChange={e => setSectionContent(prev => ({ ...prev, title: e.target.value }))}
          />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#57534E', display: 'block', marginBottom: '4px' }}>Subtítulo abaixo do título</span>
          <textarea style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d6d3d1', fontSize: '0.9rem', minHeight: '80px', resize: 'vertical', boxSizing: 'border-box' }}
            value={sectionContent.subtitle}
            onChange={e => setSectionContent(prev => ({ ...prev, subtitle: e.target.value }))}
          />
        </label>

        <p style={{ margin: '0 0 0.75rem', fontSize: '0.75rem', fontWeight: 700, color: '#A8A29E', textTransform: 'uppercase', letterSpacing: '0.06em' }}>— Banner inferior —</p>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#57534E', display: 'block', marginBottom: '4px' }}>Texto do banner inferior</span>
          <textarea style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d6d3d1', fontSize: '0.9rem', minHeight: '72px', resize: 'vertical', boxSizing: 'border-box' }}
            value={sectionContent.secondary_text}
            onChange={e => setSectionContent(prev => ({ ...prev, secondary_text: e.target.value }))}
          />
        </label>

        <label style={{ display: 'block', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#57534E', display: 'block', marginBottom: '4px' }}>Texto do botão do banner</span>
          <input style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d6d3d1', fontSize: '0.9rem', boxSizing: 'border-box' }}
            value={sectionContent.secondary_cta_text}
            onChange={e => setSectionContent(prev => ({ ...prev, secondary_cta_text: e.target.value }))}
          />
        </label>

        <button onClick={saveSectionContent} disabled={sectionSaving}
          style={{ background: '#C4622D', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px', cursor: sectionSaving ? 'not-allowed' : 'pointer', fontWeight: 600, opacity: sectionSaving ? 0.7 : 1 }}>
          {sectionSaving ? 'Salvando...' : 'Salvar Cabeçalho'}
        </button>
      </div>

      <h2 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 700, color: '#1C1917' }}>Destinos individuais</h2>

      {items.map((item, index) => (
        <div
          key={item.id}
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          <h3>Destino {index + 1}</h3>

          <input
            style={{ width: '100%' }}
            value={item.country || ''}
            placeholder="País"
            onChange={(e) => {
              const copy = [...items]
              copy[index].country = e.target.value
              setItems(copy)
            }}
          />

          <br /><br />

          <input
            style={{ width: '100%' }}
            value={item.flag || ''}
            placeholder="Bandeira (emoji)"
            onChange={(e) => {
              const copy = [...items]
              copy[index].flag = e.target.value
              setItems(copy)
            }}
          />

          <br /><br />

          <input
            style={{ width: '100%' }}
            value={item.difficulty || ''}
            placeholder="Dificuldade"
            onChange={(e) => {
              const copy = [...items]
              copy[index].difficulty = e.target.value
              setItems(copy)
            }}
          />

          <br /><br />

          <textarea
            rows={6}
            style={{ width: '100%' }}
            value={(item.requirements || []).join('\n')}
            placeholder="Requisitos (um por linha)"
            onChange={(e) => {
              const copy = [...items]
              copy[index].requirements = e.target.value
                .split('\n')
                .filter(Boolean)
              setItems(copy)
            }}
          />

          <br /><br />

          <input
            style={{ width: '100%' }}
            value={item.color || ''}
            placeholder="Cor"
            onChange={(e) => {
              const copy = [...items]
              copy[index].color = e.target.value
              setItems(copy)
            }}
          />

          <br /><br />

          <label>
            Ordem:
            <input
              type="number"
              value={item.order_index}
              onChange={(e) => {
                const copy = [...items]
                copy[index].order_index = Number(e.target.value)
                setItems(copy)
              }}
            />
          </label>

          <br /><br />

          <label>
            <input
              type="checkbox"
              checked={item.is_visible}
              onChange={(e) => {
                const copy = [...items]
                copy[index].is_visible = e.target.checked
                setItems(copy)
              }}
            />
            Exibir destino
          </label>

          <br /><br />

          <button onClick={() => save(item)}>
            Salvar Destino
          </button>
        </div>
      ))}
    </div>
  )
}