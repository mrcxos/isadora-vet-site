import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

const fieldStyle = { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d6d3d1', fontSize: '0.9rem', boxSizing: 'border-box' as const }
const textareaStyle = { ...fieldStyle, minHeight: '72px', resize: 'vertical' as const }
const labelSpan = { fontSize: '0.8125rem', fontWeight: 600, color: '#57534E', display: 'block', marginBottom: '4px' }
const cardStyle = { background: 'white', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderLeft: '4px solid #C4622D' }

export function ContactEditor() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [contact, setContact] = useState<any>(null)

  async function loadData() {
    const { data } = await supabase.from('contact').select('*').limit(1).single()
    if (data) setContact(data)
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  function set(field: string, value: string) {
    setContact((prev: any) => ({ ...prev, [field]: value }))
  }

  async function save() {
    if (!contact) return
    setSaving(true)
    const { error } = await supabase
      .from('contact')
      .update({
        badge_text: contact.badge_text,
        section_title: contact.section_title,
        section_subtitle: contact.section_subtitle,
        sidebar_title: contact.sidebar_title,
        whatsapp_number: contact.whatsapp_number,
        whatsapp_label: contact.whatsapp_label,
        email: contact.email,
        email_response_text: contact.email_response_text,
        instagram_handle: contact.instagram_handle,
        instagram_url: contact.instagram_url,
        instagram_subtitle: contact.instagram_subtitle,
        phone_number: contact.phone_number,
        phone_hours: contact.phone_hours,
        trust_badge_text: contact.trust_badge_text,
        form_title: contact.form_title,
        form_subtitle: contact.form_subtitle,
        submit_button_text: contact.submit_button_text,
        success_title: contact.success_title,
        success_body: contact.success_body,
        privacy_text: contact.privacy_text,
        is_visible: contact.is_visible,
        show_form: contact.show_form,
      })
      .eq('id', contact.id)
    setSaving(false)
    if (error) { alert('Erro ao salvar: ' + error.message); return }
    alert('Contato salvo com sucesso!')
  }

  if (loading) return <div style={{ padding: '2rem' }}>Carregando...</div>
  if (!contact) return <div style={{ padding: '2rem' }}>Nenhum registro encontrado na tabela contact.</div>

  return (
    <div style={{ padding: '2rem', maxWidth: '800px' }}>
      <h1>Editor de Contato</h1>

      {/* Visibilidade da seção inteira */}
      <div style={{ ...cardStyle, borderLeft: '4px solid #6B7C5C', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <p style={{ margin: 0, fontWeight: 700, color: '#1C1917', fontSize: '0.9375rem' }}>Exibir seção de contato no site</p>
          <p style={{ margin: '2px 0 0', fontSize: '0.8125rem', color: '#78716C' }}>
            {contact.is_visible !== false ? 'Visível — a seção inteira aparece no site' : 'Oculta — a seção inteira não aparece no site'}
          </p>
        </div>
        <button
          onClick={() => setContact((prev: any) => ({ ...prev, is_visible: !prev.is_visible }))}
          style={{
            position: 'relative', width: '44px', height: '24px', borderRadius: '12px', border: 'none', cursor: 'pointer', flexShrink: 0,
            background: contact.is_visible !== false ? '#C4622D' : '#d6d3d1', transition: 'background 0.2s',
          }}
        >
          <span style={{
            position: 'absolute', top: '3px', width: '18px', height: '18px', borderRadius: '50%', background: 'white',
            transition: 'left 0.2s', left: contact.is_visible !== false ? '23px' : '3px',
          }} />
        </button>
      </div>

      {/* Visibilidade do formulário */}
      <div style={{ ...cardStyle, borderLeft: '4px solid #C4622D', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <p style={{ margin: 0, fontWeight: 700, color: '#1C1917', fontSize: '0.9375rem' }}>Exibir formulário de orçamento</p>
          <p style={{ margin: '2px 0 0', fontSize: '0.8125rem', color: '#78716C' }}>
            {contact.show_form !== false ? 'Visível — formulário aparece ao lado da sidebar' : 'Oculto — apenas a sidebar com canais de contato aparece'}
          </p>
        </div>
        <button
          onClick={() => setContact((prev: any) => ({ ...prev, show_form: !prev.show_form }))}
          style={{
            position: 'relative', width: '44px', height: '24px', borderRadius: '12px', border: 'none', cursor: 'pointer', flexShrink: 0,
            background: contact.show_form !== false ? '#C4622D' : '#d6d3d1', transition: 'background 0.2s',
          }}
        >
          <span style={{
            position: 'absolute', top: '3px', width: '18px', height: '18px', borderRadius: '50%', background: 'white',
            transition: 'left 0.2s', left: contact.show_form !== false ? '23px' : '3px',
          }} />
        </button>
      </div>

      <div style={cardStyle}>
        <h2 style={{ marginTop: 0, marginBottom: '1.25rem', fontSize: '1rem', fontWeight: 700, color: '#1C1917' }}>Cabeçalho da Seção</h2>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={labelSpan}>Texto do badge (ex: Entre em Contato)</span>
          <input style={fieldStyle} value={contact.badge_text || ''} onChange={e => set('badge_text', e.target.value)} />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={labelSpan}>Título principal (use \n para quebra de linha)</span>
          <textarea style={textareaStyle} value={contact.section_title || ''} onChange={e => set('section_title', e.target.value)} />
        </label>

        <label style={{ display: 'block', marginBottom: '0' }}>
          <span style={labelSpan}>Subtítulo abaixo do título</span>
          <textarea style={textareaStyle} value={contact.section_subtitle || ''} onChange={e => set('section_subtitle', e.target.value)} />
        </label>
      </div>

      <div style={cardStyle}>
        <h2 style={{ marginTop: 0, marginBottom: '1.25rem', fontSize: '1rem', fontWeight: 700, color: '#1C1917' }}>Sidebar — Canais de Contato</h2>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={labelSpan}>Título da sidebar (ex: Fale comigo pelo canal de sua preferência)</span>
          <input style={fieldStyle} value={contact.sidebar_title || ''} onChange={e => set('sidebar_title', e.target.value)} />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={labelSpan}>Número do WhatsApp (ex: +5511999999999)</span>
          <input style={fieldStyle} value={contact.whatsapp_number || ''} onChange={e => set('whatsapp_number', e.target.value)} />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={labelSpan}>Legenda do WhatsApp (ex: Resposta prioritária)</span>
          <input style={fieldStyle} value={contact.whatsapp_label || ''} onChange={e => set('whatsapp_label', e.target.value)} />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={labelSpan}>E-mail</span>
          <input style={fieldStyle} value={contact.email || ''} onChange={e => set('email', e.target.value)} />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={labelSpan}>Texto abaixo do e-mail (ex: Resposta em até 24h)</span>
          <input style={fieldStyle} value={contact.email_response_text || ''} onChange={e => set('email_response_text', e.target.value)} />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={labelSpan}>Instagram handle (ex: @isadoralima.pettravel)</span>
          <input style={fieldStyle} value={contact.instagram_handle || ''} onChange={e => set('instagram_handle', e.target.value)} />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={labelSpan}>URL do Instagram</span>
          <input style={fieldStyle} value={contact.instagram_url || ''} onChange={e => set('instagram_url', e.target.value)} />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={labelSpan}>Texto abaixo do Instagram (ex: Dicas e novidades)</span>
          <input style={fieldStyle} value={contact.instagram_subtitle || ''} onChange={e => set('instagram_subtitle', e.target.value)} />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={labelSpan}>Telefone</span>
          <input style={fieldStyle} value={contact.phone_number || ''} onChange={e => set('phone_number', e.target.value)} />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={labelSpan}>Horário de atendimento telefônico (ex: Seg–Sex, 9h–18h)</span>
          <input style={fieldStyle} value={contact.phone_hours || ''} onChange={e => set('phone_hours', e.target.value)} />
        </label>

        <label style={{ display: 'block', marginBottom: '0' }}>
          <span style={labelSpan}>Texto do card de confiança (ex: Consulta inicial gratuita...)</span>
          <textarea style={textareaStyle} value={contact.trust_badge_text || ''} onChange={e => set('trust_badge_text', e.target.value)} />
        </label>
      </div>

      <div style={cardStyle}>
        <h2 style={{ marginTop: 0, marginBottom: '1.25rem', fontSize: '1rem', fontWeight: 700, color: '#1C1917' }}>Formulário de Contato</h2>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={labelSpan}>Título do formulário (ex: Solicite seu orçamento)</span>
          <input style={fieldStyle} value={contact.form_title || ''} onChange={e => set('form_title', e.target.value)} />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={labelSpan}>Subtítulo do formulário (ex: Preencha o formulário abaixo...)</span>
          <input style={fieldStyle} value={contact.form_subtitle || ''} onChange={e => set('form_subtitle', e.target.value)} />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={labelSpan}>Texto do botão de envio (ex: Solicite seu orçamento)</span>
          <input style={fieldStyle} value={contact.submit_button_text || ''} onChange={e => set('submit_button_text', e.target.value)} />
        </label>

        <label style={{ display: 'block', marginBottom: '0' }}>
          <span style={labelSpan}>Texto de privacidade abaixo do botão</span>
          <textarea style={textareaStyle} value={contact.privacy_text || ''} onChange={e => set('privacy_text', e.target.value)} />
        </label>
      </div>

      <div style={cardStyle}>
        <h2 style={{ marginTop: 0, marginBottom: '1.25rem', fontSize: '1rem', fontWeight: 700, color: '#1C1917' }}>Mensagem de Sucesso (após envio)</h2>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={labelSpan}>Título (ex: Mensagem recebida!)</span>
          <input style={fieldStyle} value={contact.success_title || ''} onChange={e => set('success_title', e.target.value)} />
        </label>

        <label style={{ display: 'block', marginBottom: '0' }}>
          <span style={labelSpan}>Corpo da mensagem de sucesso</span>
          <textarea style={textareaStyle} value={contact.success_body || ''} onChange={e => set('success_body', e.target.value)} />
        </label>
      </div>

      <button
        onClick={save}
        disabled={saving}
        style={{ background: '#C4622D', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '10px', cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 600, fontSize: '1rem', opacity: saving ? 0.7 : 1 }}
      >
        {saving ? 'Salvando...' : 'Salvar Contato'}
      </button>
    </div>
  )
}
