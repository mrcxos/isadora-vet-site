import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

export const DestinationsEditor = () => {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

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
      <h1>Destinations Editor</h1>

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