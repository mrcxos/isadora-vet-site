import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

export const TestimonialsEditor = () => {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

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
  }, [])

  async function save(item: any) {
    const { data, error } = await supabase
      .from('testimonials')
      .update(item)
      .eq('id', item.id)
      .select()

    console.log('SAVE DATA:', data)
    console.log('SAVE ERROR:', error)

    if (error) {
      alert('Erro ao salvar')
      return
    }

    alert('Salvo com sucesso!')
  }

  if (loading) {
    return <div style={{ padding: '2rem' }}>Carregando...</div>
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Testimonials Editor</h1>

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
          <h3>Depoimento {index + 1}</h3>

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

          <button onClick={() => save(item)}>
            Salvar
          </button>
        </div>
      ))}
    </div>
  )
}