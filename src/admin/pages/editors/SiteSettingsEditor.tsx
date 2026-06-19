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
  console.log('SALVANDO:', settings)

  const { error } = await supabase
    .from('site_settings')
    .upsert({
      id: settings.id,
      company_name: settings.company_name,
      company_subtitle: settings.company_subtitle,
      logo_url: settings.logo_url,
      primary_cta_text: settings.primary_cta_text,
      primary_cta_link: settings.primary_cta_link,
      whatsapp_url: settings.whatsapp_url,
      instagram_url: settings.instagram_url,
      email: settings.email,
      color_primary: settings.color_primary,
      color_primary_dark: settings.color_primary_dark,
      color_secondary: settings.color_secondary,
      color_accent: settings.color_accent,
      color_text_dark: settings.color_text_dark,
      color_bg_light: settings.color_bg_light,
      tracking_scripts: settings.tracking_scripts || null,
    })

  if (error) {
    console.error(error)
    alert('Erro ao salvar')
    return
  }

  alert('Configurações salvas!')
}

  if (!settings) return <div style={{ padding: '2rem' }}>Carregando...</div>

  const colorFields: { key: string; label: string }[] = [
    { key: 'color_primary',      label: 'Cor primária (botões, destaques)' },
    { key: 'color_primary_dark', label: 'Cor primária escura (hover de botões)' },
    { key: 'color_secondary',    label: 'Cor secundária (acentos verdes)' },
    { key: 'color_accent',       label: 'Cor de destaque (títulos em laranja claro)' },
    { key: 'color_text_dark',    label: 'Cor de texto escuro (títulos, texto principal)' },
    { key: 'color_bg_light',     label: 'Cor de fundo claro (fundos de seções claras)' },
  ]

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

      <h2 style={{ marginBottom: '1rem' }}>Paleta de Cores Global</h2>
      <p style={{ marginBottom: '1rem', color: '#666', fontSize: '0.875rem' }}>
        Essas cores são aplicadas em todo o site. Alterar aqui afeta botões, gradientes e acentos em todas as seções.
      </p>

      {colorFields.map(({ key, label }) => (
        <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem' }}>
          <input
            type="color"
            value={settings[key] || '#000000'}
            onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
            style={{ width: '48px', height: '36px', cursor: 'pointer', border: '1px solid #ccc', borderRadius: '4px', padding: '2px' }}
          />
          <span style={{ fontSize: '0.9375rem', color: '#1C1917' }}>{label}</span>
          <code style={{ fontSize: '0.8125rem', color: '#666' }}>{settings[key]}</code>
        </div>
      ))}

      <br />

      <div style={{ marginBottom: '1.5rem', padding: '1.5rem', background: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderLeft: '4px solid #C4622D' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#1C1917' }}>
            Tags de Rastreamento (Google Ads, Analytics, etc)
          </h2>
          {settings.tracking_scripts?.trim()
            ? <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '2px 10px', borderRadius: '20px', background: 'rgba(22,163,74,0.10)', color: '#16A34A', border: '1px solid rgba(22,163,74,0.25)', whiteSpace: 'nowrap' }}>● Configurado</span>
            : <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '2px 10px', borderRadius: '20px', background: 'rgba(120,113,108,0.08)', color: '#78716C', border: '1px solid rgba(120,113,108,0.20)', whiteSpace: 'nowrap' }}>○ Vazio</span>
          }
        </div>
        <p style={{ margin: '0 0 1rem', fontSize: '0.8125rem', color: '#57534E', lineHeight: 1.6 }}>
          Cole aqui o código completo da tag fornecido pelo Google Ads ou Google Analytics. O código será inserido automaticamente em todas as páginas do site. Aceita múltiplos blocos de <code style={{ background: 'rgba(196,98,45,0.08)', padding: '1px 5px', borderRadius: '4px' }}>&lt;script&gt;</code> ou outras tags.
        </p>
        <textarea
          rows={10}
          placeholder={'<!-- Cole aqui o código do Google Tag Manager, Google Analytics, Google Ads, etc -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag(\'js\', new Date());\n  gtag(\'config\', \'G-XXXXXXXXXX\');\n</script>'}
          value={settings.tracking_scripts || ''}
          onChange={e => setSettings({ ...settings, tracking_scripts: e.target.value || null })}
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d6d3d1', fontSize: '0.8125rem', fontFamily: 'monospace', lineHeight: 1.6, resize: 'vertical', boxSizing: 'border-box' as const, color: '#1C1917' }}
          spellCheck={false}
        />
        <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              window.open('/', '_blank')
              alert(
                'Para verificar se o código foi instalado corretamente:\n\n' +
                '1. Na aba que acabou de abrir, pressione F12 (ou Cmd+Option+I no Mac)\n' +
                '2. Vá para a aba "Elements" (Chrome/Edge) ou "Inspetor" (Firefox)\n' +
                '3. Expanda a tag <head> no topo do documento\n' +
                '4. Seu código de rastreamento deve aparecer como um ou mais elementos <script> ou <noscript> dentro do <head>\n\n' +
                'Dica: use Ctrl+F (Cmd+F) dentro do painel de Elements para buscar pelo ID da sua tag (ex: G-XXXXXXXXXX)'
              )
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid rgba(196,98,45,0.30)', background: 'rgba(196,98,45,0.06)', color: '#C4622D', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            ↗ Verificar instalação
          </button>
          <span style={{ fontSize: '0.75rem', color: '#A8A29E' }}>
            Salve primeiro, depois clique para abrir o site e inspecionar o &lt;head&gt;
          </span>
        </div>
      </div>

      <button onClick={save}>
        Salvar
      </button>
    </div>
  )
}