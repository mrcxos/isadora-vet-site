import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

export const AboutTimelineEditor = () => {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  async function loadData() {
    const { data, error } = await supabase
      .from('about_timeline')
      .select('*')
      .order('order_index')

    console.log('TIMELINE DATA:', data)
    console.log('TIMELINE ERROR:', error)

    if (data) setItems(data)

    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  async function save(item: any) {
    const { data, error } = await supabase
      .from('about_timeline')
      .update({
        year: item.year,
        title: item.title,
        description: item.description,
        order_index: item.order_index,
      })
      .eq('id', item.id)
      .select()

    console.log('SAVE DATA:', data)
    console.log('SAVE ERROR:', error)

    if (error) {
      alert('Erro ao salvar')
      return
    }

    alert('Timeline salva com sucesso!')
  }

  if (loading) {
    return <div style={{ padding: '2rem' }}>Carregando...</div>
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>About Timeline Editor</h1>

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
          <h3>Marco {index + 1}</h3>

          <input
            style={{ width: '100%' }}
            value={item.year || ''}
            placeholder="Ano"
            onChange={(e) => {
              const copy = [...items]
              copy[index].year = e.target.value
              setItems(copy)
            }}
          />

          <br /><br />

          <input
            style={{ width: '100%' }}
            value={item.title || ''}
            placeholder="Título"
            onChange={(e) => {
              const copy = [...items]
              copy[index].title = e.target.value
              setItems(copy)
            }}
          />

          <br /><br />

          <textarea
            rows={4}
            style={{ width: '100%' }}
            value={item.description || ''}
            placeholder="Descrição"
            onChange={(e) => {
              const copy = [...items]
              copy[index].description = e.target.value
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

          <button onClick={() => save(item)}>
            Salvar Marco
          </button>
        </div>
      ))}
    </div>
  )
}