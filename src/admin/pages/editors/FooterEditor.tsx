import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

export const FooterEditor = () => {
  const [footer, setFooter] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  async function loadData() {
    const { data, error } = await supabase
      .from('footer')
      .select('*')
      .single()

    console.log('FOOTER DATA:', data)
    console.log('FOOTER ERROR:', error)

    if (data) setFooter(data)

    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  async function save() {
    const { data, error } = await supabase
      .from('footer')
      .update({
        brand_description: footer.brand_description,
        whatsapp_url: footer.whatsapp_url,
        instagram_url: footer.instagram_url,
        email: footer.email,
        cta_title: footer.cta_title,
        cta_subtitle: footer.cta_subtitle,
        cta_primary_label: footer.cta_primary_label,
        cta_whatsapp_label: footer.cta_whatsapp_label,
        copyright_text: footer.copyright_text,
      })
      .eq('id', footer.id)
      .select()

    console.log('SAVE DATA:', data)
    console.log('SAVE ERROR:', error)

    if (error) {
      alert('Erro ao salvar')
      return
    }

    alert('Footer salvo com sucesso!')
  }

  if (loading) {
    return <div style={{ padding: '2rem' }}>Carregando...</div>
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '900px' }}>
      <h1>Footer Editor</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

        <textarea
          rows={4}
          value={footer.brand_description || ''}
          placeholder="Descrição da marca"
          onChange={(e) =>
            setFooter({ ...footer, brand_description: e.target.value })
          }
        />

        <input
          value={footer.whatsapp_url || ''}
          placeholder="WhatsApp URL"
          onChange={(e) =>
            setFooter({ ...footer, whatsapp_url: e.target.value })
          }
        />

        <input
          value={footer.instagram_url || ''}
          placeholder="Instagram URL"
          onChange={(e) =>
            setFooter({ ...footer, instagram_url: e.target.value })
          }
        />

        <input
          value={footer.email || ''}
          placeholder="Email"
          onChange={(e) =>
            setFooter({ ...footer, email: e.target.value })
          }
        />

        <input
          value={footer.cta_title || ''}
          placeholder="Título CTA"
          onChange={(e) =>
            setFooter({ ...footer, cta_title: e.target.value })
          }
        />

        <textarea
          rows={3}
          value={footer.cta_subtitle || ''}
          placeholder="Subtítulo CTA"
          onChange={(e) =>
            setFooter({ ...footer, cta_subtitle: e.target.value })
          }
        />

        <input
          value={footer.cta_primary_label || ''}
          placeholder="Texto botão principal"
          onChange={(e) =>
            setFooter({ ...footer, cta_primary_label: e.target.value })
          }
        />

        <input
          value={footer.cta_whatsapp_label || ''}
          placeholder="Texto botão WhatsApp"
          onChange={(e) =>
            setFooter({ ...footer, cta_whatsapp_label: e.target.value })
          }
        />

        <input
          value={footer.copyright_text || ''}
          placeholder="Copyright"
          onChange={(e) =>
            setFooter({ ...footer, copyright_text: e.target.value })
          }
        />

        <button
          onClick={save}
          style={{
            padding: '12px',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Salvar Footer
        </button>

      </div>
    </div>
  )
}