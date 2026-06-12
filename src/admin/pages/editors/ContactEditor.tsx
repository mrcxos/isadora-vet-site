import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

export function ContactEditor() {
  const [loading, setLoading] = useState(true)
  const [contact, setContact] = useState<any>(null)

  async function loadData() {
    console.log('INICIANDO LOAD')

  const { data, error } = await supabase
  .from('contact')
  .select('*')

alert(JSON.stringify(error))
console.log(data)

    console.log('DATA:', data)
    console.log('ERROR:', error)

    setLoading(false)

    if (error) return

    if (data && data.length > 0) {
      setContact(data[0])
    }
    console.log('CONTACT:', data[0])
  }

  useEffect(() => {
    loadData()
  }, [])

 async function save() {
  if (!contact) return

  console.log('ID ATUAL:', contact.id)
console.log('SALVANDO:', contact)

  const { data, error } = await supabase
    .from('contact')
    .update({
      whatsapp_number: contact.whatsapp_number,
      email: contact.email,
      instagram_handle: contact.instagram_handle,
      phone_number: contact.phone_number,
    })
    .eq('id', contact.id)
    .select()

  console.log('SAVE DATA:', data)
  console.log('SAVE ERROR:', error)

  if (error) {
    alert(JSON.stringify(error))
    return
  }

  alert('Salvo com sucesso!')
}

  if (loading) {
    return (
      <div style={{ padding: '2rem' }}>
        Carregando...
      </div>
    )
  }

  if (!contact) {
    return (
      <div style={{ padding: '2rem' }}>
        Nenhum registro encontrado na tabela contact.
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '700px' }}>
      <h1>Editor de Contato</h1>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginTop: '2rem',
        }}
      >
        <label>
          WhatsApp
          <input
            style={{ width: '100%' }}
            value={contact.whatsapp_number || ''}
            onChange={(e) =>
              setContact({
                ...contact,
                whatsapp_number: e.target.value,
              })
            }
          />
        </label>

        <label>
          Email
          <input
            style={{ width: '100%' }}
            value={contact.email || ''}
            onChange={(e) =>
              setContact({
                ...contact,
                email: e.target.value,
              })
            }
          />
        </label>

        <label>
          Instagram
          <input
            style={{ width: '100%' }}
            value={contact.instagram_handle || ''}
            onChange={(e) =>
              setContact({
                ...contact,
                instagram_handle: e.target.value,
              })
            }
          />
        </label>

        <label>
          Telefone
          <input
            style={{ width: '100%' }}
            value={contact.phone_number || ''}
            onChange={(e) =>
              setContact({
                ...contact,
                phone_number: e.target.value,
              })
            }
          />
        </label>

        <button
          onClick={save}
          style={{
            padding: '12px',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Salvar Alterações
        </button>
      </div>
    </div>
  )
}