import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

export const TestimonialsEditor = () => {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [sectionContent, setSectionContent] = useState({
    badge_text: 'Depoimentos',
    title: 'O que as famílias\ndizem sobre nós',
    secondary_text: '5.0 · 500+ avaliações',
  })
  const [sectionSaving, setSectionSaving] = useState(false)

  async function loadSectionContent() {
    const { data } = await supabase
      .from('section_content')
      .select('*')
      .eq('section_id', 'testimonials')
      .single()
    if (data) {
      setSectionContent({
        badge_text: data.badge_text ?? 'Depoimentos',
        title: data.title ?? 'O que as famílias\ndizem sobre nós',
        secondary_text: data.secondary_text ?? '5.0 · 500+ avaliações',
      })
    }
  }

  async function saveSectionContent() {
    setSectionSaving(true)
    const { error } = await supabase
      .from('section_content')
      .upsert({
        section_id: 'testimonials',
        badge_text: sectionContent.badge_text,
        title: sectionContent.title,
        subtitle: null,
        cta_button_text: null,
        secondary_text: sectionContent.secondary_text,
        secondary_cta_text: null,
        updated_at: new Date().toISOString(),
      })
    setSectionSaving(false)
    if (error) { alert('Erro ao salvar cabeçalho'); return }
    alert('Cabeçalho salvo com sucesso!')
  }

  async function loadData() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('order_index')

    console.log('TESTIMONIALS DATA:', data)
    console.log('TESTIMONIALS ERROR:', error)

    if (data) setItems(data)

    setLoading(false)
  }

  useEffect(() => {
    loadData()
    loadSectionContent()
  }, [])

  async function save(item: any) {
    const { data, error } = await supabase
      .from('testimonials')
      .update(item)
      .eq('id', item.id)
      .select()

    console.log('SAVE DATA:', data)
    console.log('SAVE ERROR:', error)

    if (error) { alert('Erro ao salvar'); return }
    alert('Salvo com sucesso!')
  }

  async function toggle(item: any) {
    const newVisible = !item.is_visible
    const { error } = await supabase
      .from('testimonials')
      .update({ is_visible: newVisible })
      .eq('id', item.id)
    if (error) { alert('Erro ao atualizar visibilidade'); return }
    setItems(prev => prev.map(i => i.id === item.id ? { ...i, is_visible: newVisible } : i))
  }

  async function remove(item: any) {
    if (!window.confirm(`Excluir o depoimento de "${item.name}"? Esta ação não pode ser desfeita.`)) return
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', item.id)
    if (error) { alert('Erro ao excluir'); return }
    setItems(prev => prev.filter(i => i.id !== item.id))
  }

  if (loading) {
    return <div style={{ padding: '2rem' }}>Carregando...</div>
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Editor de Depoimentos</h1>

      <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderLeft: '4px solid #C4622D' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1.25rem', fontSize: '1rem', fontWeight: 700, color: '#1C1917' }}>
          Cabeçalho da Seção Depoimentos
        </h2>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#57534E', display: 'block', marginBottom: '4px' }}>Texto do badge (ex: Depoimentos)</span>
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

        <label style={{ display: 'block', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#57534E', display: 'block', marginBottom: '4px' }}>Linha de avaliação geral (ex: 5.0 · 500+ avaliações)</span>
          <input style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d6d3d1', fontSize: '0.9rem', boxSizing: 'border-box' }}
            value={sectionContent.secondary_text}
            onChange={e => setSectionContent(prev => ({ ...prev, secondary_text: e.target.value }))}
          />
        </label>

        <button onClick={saveSectionContent} disabled={sectionSaving}
          style={{ background: '#C4622D', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px', cursor: sectionSaving ? 'not-allowed' : 'pointer', fontWeight: 600, opacity: sectionSaving ? 0.7 : 1 }}>
          {sectionSaving ? 'Salvando...' : 'Salvar Cabeçalho'}
        </button>
      </div>

      <h2 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 700, color: '#1C1917' }}>Depoimentos individuais</h2>

      {items.map((item, index) => (
        <div
          key={item.id}
          style={{
            border: '1px solid #ddd',
            padding: '1rem',
            marginBottom: '2rem',
            borderRadius: '8px',
          }}
        >
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 0 }}>
            Depoimento {index + 1}
            {!item.is_visible && (
              <span style={{ fontSize: '0.75rem', fontWeight: 400, color: '#DC2626', background: 'rgba(220,38,38,0.08)', padding: '2px 8px', borderRadius: '4px' }}>Oculto</span>
            )}
          </h3>

          <input
            value={item.name || ''}
            placeholder="Nome"
            onChange={(e) => {
              const copy = [...items]
              copy[index].name = e.target.value
              setItems(copy)
            }}
          />

          <br /><br />

          <input
            value={item.location || ''}
            placeholder="Localização"
            onChange={(e) => {
              const copy = [...items]
              copy[index].location = e.target.value
              setItems(copy)
            }}
          />

          <br /><br />

          <input
            value={item.pet || ''}
            placeholder="Pet"
            onChange={(e) => {
              const copy = [...items]
              copy[index].pet = e.target.value
              setItems(copy)
            }}
          />

          <br /><br />

          <textarea
            rows={5}
            style={{ width: '100%' }}
            value={item.text || ''}
            placeholder="Depoimento"
            onChange={(e) => {
              const copy = [...items]
              copy[index].text = e.target.value
              setItems(copy)
            }}
          />

          <br /><br />

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button onClick={() => save(item)}
              style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#C4622D', color: 'white', fontWeight: 600, cursor: 'pointer' }}>
              Salvar
            </button>
            <button onClick={() => toggle(item)}
              style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #d6d3d1', background: 'white', color: '#44403C', fontWeight: 600, cursor: 'pointer' }}>
              {item.is_visible ? 'Ocultar' : 'Mostrar'}
            </button>
            <button onClick={() => remove(item)}
              style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(220,38,38,0.3)', background: 'rgba(220,38,38,0.06)', color: '#DC2626', fontWeight: 600, cursor: 'pointer' }}>
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}