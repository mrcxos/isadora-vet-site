import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

export const FaqEditor = () => {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

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
      <h1>FAQ Editor</h1>

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