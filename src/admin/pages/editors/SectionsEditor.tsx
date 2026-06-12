import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

export const SectionsEditor = () => {
  const [sections, setSections] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  async function loadData() {
    const { data, error } = await supabase
      .from('sections')
      .select('*')
      .order('order_index')

    console.log('SECTIONS DATA:', data)
    console.log('SECTIONS ERROR:', error)

    if (data) setSections(data)

    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  async function save(section: any) {
    const { data, error } = await supabase
      .from('sections')
      .update({
        label: section.label,
        is_visible: section.is_visible,
        order_index: section.order_index,
      })
      .eq('id', section.id)
      .select()

    console.log('SAVE DATA:', data)
    console.log('SAVE ERROR:', error)

    if (error) {
      alert('Erro ao salvar')
      return
    }

    alert('Seção salva com sucesso!')
  }

  if (loading) {
    return <div style={{ padding: '2rem' }}>Carregando...</div>
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Sections Editor</h1>

      {sections.map((section, index) => (
        <div
          key={section.id}
          style={{
            border: '1px solid #ddd',
            padding: '1rem',
            marginBottom: '1rem',
            borderRadius: '8px',
          }}
        >
          <h3>Seção {index + 1}</h3>

          <input
            style={{ width: '100%' }}
            value={section.label || ''}
            placeholder="Nome da seção"
            onChange={(e) => {
              const copy = [...sections]
              copy[index].label = e.target.value
              setSections(copy)
            }}
          />

          <br /><br />

          <label>
            Ordem:
            <input
              type="number"
              value={section.order_index}
              onChange={(e) => {
                const copy = [...sections]
                copy[index].order_index = Number(e.target.value)
                setSections(copy)
              }}
            />
          </label>

          <br /><br />

          <label>
            <input
              type="checkbox"
              checked={section.is_visible}
              onChange={(e) => {
                const copy = [...sections]
                copy[index].is_visible = e.target.checked
                setSections(copy)
              }}
            />
            Exibir seção
          </label>

          <br /><br />

          <button onClick={() => save(section)}>
            Salvar Seção
          </button>
        </div>
      ))}
    </div>
  )
}