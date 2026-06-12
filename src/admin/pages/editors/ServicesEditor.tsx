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