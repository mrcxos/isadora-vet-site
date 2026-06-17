import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

export const SiteSettingsEditor = () => {
  const [settings, setSettings] = useState<any>(null)

  async function loadData() {
    const { data } = await supabase
      .from('site_settings')
      .select('*')
      .limit(1)
      .single()

    if (data) setSettings(data)
  }

  useEffect(() => {
    loadData()
  }, [])

  async function save() {
    const { error } = await supabase
      .from('site_settings')
      .update({
        company_name: settings.company_name,
        company_subtitle: settings.company_subtitle,
        logo_url: settings.logo_url,
        primary_cta_text: settings.primary_cta_text,
        primary_cta_link: settings.primary_cta_link,
        whatsapp_url: settings.whatsapp_url,
        instagram_url: settings.instagram_url,
        email: settings.email,
      })
      .eq('id', settings.id)

    if (error) {
      alert('Erro ao salvar')
      return
    }

    alert('Configurações salvas!')
  }

  if (!settings) return <div style={{ padding: '2rem' }}>Carregando...</div>

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Configurações do Site</h1>

      <input
        placeholder="Nome da empresa"
        value={settings.company_name || ''}
        onChange={(e) =>
          setSettings({
            ...settings,
            company_name: e.target.value,
          })
        }
      />

      <br /><br />

      <input
        placeholder="Subtítulo"
        value={settings.company_subtitle || ''}
        onChange={(e) =>
          setSettings({
            ...settings,
            company_subtitle: e.target.value,
          })
        }
      />

      <br /><br />

      <input
        placeholder="URL da logo"
        value={settings.logo_url || ''}
        onChange={(e) =>
          setSettings({
            ...settings,
            logo_url: e.target.value,
          })
        }
      />

      <br /><br />

      <input
        placeholder="Texto do botão"
        value={settings.primary_cta_text || ''}
        onChange={(e) =>
          setSettings({
            ...settings,
            primary_cta_text: e.target.value,
          })
        }
      />

      <br /><br />

      <input
        placeholder="Link do botão"
        value={settings.primary_cta_link || ''}
        onChange={(e) =>
          setSettings({
            ...settings,
            primary_cta_link: e.target.value,
          })
        }
      />

      <br /><br />

      <button onClick={save}>
        Salvar
      </button>
    </div>
  )
}