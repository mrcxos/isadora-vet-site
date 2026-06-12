import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

export const ServicesEditor = () => {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

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

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Editor de Serviços</h1>

      {services.map((service, index) => (
        <div
          key={service.id}
          style={{
            border: '1px solid #ddd',
            padding: '1rem',
            marginBottom: '2rem',
            borderRadius: '8px',
          }}
        >
          <h3>Serviço {index + 1}</h3>

          <label>
            Título
            <input
              style={{ width: '100%' }}
              value={service.title || ''}
              onChange={(e) => {
                const updated = [...services]
                updated[index].title = e.target.value
                setServices(updated)
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
              padding: '10px 20px',
              cursor: 'pointer',
            }}
          >
            Salvar Serviço
          </button>
        </div>
      ))}
    </div>
  )
}