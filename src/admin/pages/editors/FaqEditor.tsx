import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

export const FaqEditor = () => {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [sectionContent, setSectionContent] = useState({
    badge_text: 'Perguntas Frequentes',
    title: 'Tudo que você precisa\nsaber antes de viajar',
    subtitle: 'Respondemos as dúvidas mais comuns dos tutores. Não encontrou o que procura? Entre em contato diretamente.',
    secondary_text: 'Ainda tem dúvidas? Fale diretamente com a Isadora — a consulta inicial é gratuita.',
    cta_button_text: 'Falar com a Isadora',
  })
  const [sectionSaving, setSectionSaving] = useState(false)

  async function loadSectionContent() {
    const { data } = await supabase
      .from('section_content')
      .select('*')
      .eq('section_id', 'faq')
      .single()
    if (data) {
      setSectionContent({
        badge_text: data.badge_text ?? 'Perguntas Frequentes',
        title: data.title ?? 'Tudo que você precisa\nsaber antes de viajar',
        subtitle: data.subtitle ?? '',
        secondary_text: data.secondary_text ?? '',
        cta_button_text: data.cta_button_text ?? '',
      })
    }
  }

  async function saveSectionContent() {
    setSectionSaving(true)
    const { error } = await supabase
      .from('section_content')
      .upsert({
        section_id: 'faq',
        badge_text: sectionContent.badge_text,
        title: sectionContent.title,
        subtitle: sectionContent.subtitle,
        cta_button_text: sectionContent.cta_button_text,
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
      .from('faq')
      .select('*')
      .order('order_index')

    console.log('FAQ DATA:', data)
    console.log('FAQ ERROR:', error)

    if (data) setItems(data)

    setLoading(false)
  }

  useEffect(() => {
    loadData()
    loadSectionContent()
  }, [])

  async function save(item: any) {
    const { data, error } = await supabase
      .from('faq')
      .update({
        question: item.question,
        answer: item.answer,
        category: item.category,
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

    alert('FAQ salvo com sucesso!')
  }

  if (loading) {
    return <div style={{ padding: '2rem' }}>Carregando...</div>
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Editor de FAQ</h1>

      <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderLeft: '4px solid #C4622D' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1.25rem', fontSize: '1rem', fontWeight: 700, color: '#1C1917' }}>
          Cabeçalho da Seção FAQ
        </h2>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#57534E', display: 'block', marginBottom: '4px' }}>Texto do badge (ex: Perguntas Frequentes)</span>
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
          <textarea style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d6d3d1', fontSize: '0.9rem', minHeight: '72px', resize: 'vertical', boxSizing: 'border-box' }}
            value={sectionContent.subtitle}
            onChange={e => setSectionContent(prev => ({ ...prev, subtitle: e.target.value }))}
          />
        </label>

        <p style={{ margin: '0 0 0.75rem', fontSize: '0.75rem', fontWeight: 700, color: '#A8A29E', textTransform: 'uppercase', letterSpacing: '0.06em' }}>— Banner inferior —</p>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#57534E', display: 'block', marginBottom: '4px' }}>Texto do banner inferior (ex: Ainda tem dúvidas?...)</span>
          <textarea style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d6d3d1', fontSize: '0.9rem', minHeight: '64px', resize: 'vertical', boxSizing: 'border-box' }}
            value={sectionContent.secondary_text}
            onChange={e => setSectionContent(prev => ({ ...prev, secondary_text: e.target.value }))}
          />
        </label>

        <label style={{ display: 'block', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#57534E', display: 'block', marginBottom: '4px' }}>Texto do botão (ex: Falar com a Isadora)</span>
          <input style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d6d3d1', fontSize: '0.9rem', boxSizing: 'border-box' }}
            value={sectionContent.cta_button_text}
            onChange={e => setSectionContent(prev => ({ ...prev, cta_button_text: e.target.value }))}
          />
        </label>

        <button onClick={saveSectionContent} disabled={sectionSaving}
          style={{ background: '#C4622D', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px', cursor: sectionSaving ? 'not-allowed' : 'pointer', fontWeight: 600, opacity: sectionSaving ? 0.7 : 1 }}>
          {sectionSaving ? 'Salvando...' : 'Salvar Cabeçalho'}
        </button>
      </div>

      <h2 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 700, color: '#1C1917' }}>Perguntas individuais</h2>

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
          <h3>Pergunta {index + 1}</h3>

          <input
            style={{ width: '100%' }}
            value={item.question || ''}
            placeholder="Pergunta"
            onChange={(e) => {
              const copy = [...items]
              copy[index].question = e.target.value
              setItems(copy)
            }}
          />

          <br /><br />

          <textarea
            rows={5}
            style={{ width: '100%' }}
            value={item.answer || ''}
            placeholder="Resposta"
            onChange={(e) => {
              const copy = [...items]
              copy[index].answer = e.target.value
              setItems(copy)
            }}
          />

          <br /><br />

          <input
            style={{ width: '100%' }}
            value={item.category || ''}
            placeholder="Categoria"
            onChange={(e) => {
              const copy = [...items]
              copy[index].category = e.target.value
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
            Exibir pergunta
          </label>

          <br /><br />

          <button onClick={() => save(item)}>
            Salvar FAQ
          </button>
        </div>
      ))}
    </div>
  )
}