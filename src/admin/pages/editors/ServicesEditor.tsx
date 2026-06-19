import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

export const ServicesEditor = () => {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [sectionContent, setSectionContent] = useState({
    badge_text: 'Nossos Serviços',
    title: 'Tudo que seu pet precisa\npara uma viagem perfeita',
    subtitle: 'Cuidamos de cada detalhe para que a viagem internacional do seu pet seja segura, legal e tranquila. Do planejamento à chegada no destino.',
    cta_button_text: 'Solicitar Assessoria Completa',
  })
  const [sectionSaving, setSectionSaving] = useState(false)

  async function loadSectionContent() {
    const { data } = await supabase
      .from('section_content')
      .select('*')
      .eq('section_id', 'services')
      .single()
    if (data) {
      setSectionContent({
        badge_text: data.badge_text ?? 'Nossos Serviços',
        title: data.title ?? 'Tudo que seu pet precisa\npara uma viagem perfeita',
        subtitle: data.subtitle ?? '',
        cta_button_text: data.cta_button_text ?? '',
      })
    }
  }

  async function saveSectionContent() {
    setSectionSaving(true)
    const { error } = await supabase
      .from('section_content')
      .upsert({
        section_id: 'services',
        badge_text: sectionContent.badge_text,
        title: sectionContent.title,
        subtitle: sectionContent.subtitle,
        cta_button_text: sectionContent.cta_button_text,
        secondary_text: null,
        secondary_cta_text: null,
        updated_at: new Date().toISOString(),
      })
    setSectionSaving(false)
    if (error) { alert('Erro ao salvar cabeçalho'); return }
    alert('Cabeçalho salvo com sucesso!')
  }

  async function loadData() {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('order_index')

    console.log('SERVICES DATA:', data)
    console.log('SERVICES ERROR:', error)

    if (data) {
      setServices(data)
    }

    setLoading(false)
  }

  useEffect(() => {
    loadData()
    loadSectionContent()
  }, [])

  async function save(service: any) {
    const { data, error } = await supabase
      .from('services')
      .update({
        title: service.title,
        description: service.description,
        features: service.features,
        color: service.color,
        icon_name: service.icon_name,
        order_index: service.order_index,
        is_visible: service.is_visible,
      })
      .eq('id', service.id)
      .select()

    console.log('SAVE DATA:', data)
    console.log('SAVE ERROR:', error)

    if (error) {
      alert('Erro ao salvar')
      return
    }

    alert('Serviço salvo com sucesso!')
  }

  if (loading) {
    return (
      <div style={{ padding: '2rem' }}>
        Carregando...
      </div>
    )
  }
async function remove(id: string) {
  const confirmar = window.confirm(
    'Tem certeza que deseja excluir este serviço?'
  )

  if (!confirmar) return

  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id)

  if (error) {
    alert('Erro ao excluir')
    return
  }

  alert('Serviço excluído!')
  loadData()
}
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Editor de Serviços</h1>

      <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderLeft: '4px solid #C4622D' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1.25rem', fontSize: '1rem', fontWeight: 700, color: '#1C1917' }}>
          Cabeçalho da Seção Serviços
        </h2>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#57534E', display: 'block', marginBottom: '4px' }}>Texto do badge (ex: Nossos Serviços)</span>
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

        <label style={{ display: 'block', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#57534E', display: 'block', marginBottom: '4px' }}>Texto do botão de rodapé (ex: Solicitar Assessoria Completa)</span>
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

      <h2 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 700, color: '#1C1917' }}>Serviços individuais</h2>

      {services.map((service, index) => (
        <div
          key={service.id}
          style={{
  background: 'white',
  borderRadius: '16px',
  padding: '1.5rem',
  marginBottom: '1.5rem',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
}}
        >
          <h3>Serviço {index + 1}</h3>

          <label>
            Título
            <input
              style={{
  width: '100%',
  padding: '12px',
  borderRadius: '10px',
  border: '1px solid #d6d3d1',
  marginTop: '6px',
}}
            />
          </label>

          <br />
          <br />

          <label>
            Descrição
            <textarea
              style={{
                width: '100%',
                minHeight: '100px',
              }}
              value={service.description || ''}
              onChange={(e) => {
                const updated = [...services]
                updated[index].description = e.target.value
                setServices(updated)
              }}
            />
          </label>

          <br />
          <br />

          <label>
            Features (uma por linha)
            <textarea
              style={{
                width: '100%',
                minHeight: '120px',
              }}
              value={(service.features || []).join('\n')}
              onChange={(e) => {
                const updated = [...services]

                updated[index].features = e.target.value
                  .split('\n')
                  .filter(Boolean)

                setServices(updated)
              }}
            />
          </label>

          <br />
          <br />

          <label>
            Cor
            <input
              style={{ width: '100%' }}
              value={service.color || ''}
              onChange={(e) => {
                const updated = [...services]
                updated[index].color = e.target.value
                setServices(updated)
              }}
            />
          </label>

          <br />
          <br />

          <label>
            Ícone
            <input
              style={{ width: '100%' }}
              value={service.icon_name || ''}
              onChange={(e) => {
                const updated = [...services]
                updated[index].icon_name = e.target.value
                setServices(updated)
              }}
            />
          </label>

          <br />
          <br />

          <label>
            Ordem
            <input
              type="number"
              value={service.order_index}
              onChange={(e) => {
                const updated = [...services]
                updated[index].order_index =
                  Number(e.target.value)

                setServices(updated)
              }}
            />
          </label>

          <br />
          <br />

          <label>
            <input
              type="checkbox"
              checked={service.is_visible}
              onChange={(e) => {
                const updated = [...services]
                updated[index].is_visible =
                  e.target.checked

                setServices(updated)
              }}
            />
            Visível
          </label>

          <br />
          <br />

        <button
  onClick={() => save(service)}
  style={{
    background: '#C4622D',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 600,
  }}
>
  Salvar Serviço
</button>
          <button
  onClick={() => remove(service.id)}
  style={{
    marginLeft: '10px',
    background: '#dc2626',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
  }}
>
  Excluir
</button>
        </div>
      ))}
    </div>
  )
}