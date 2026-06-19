import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import { ChevronUp, ChevronDown, Trash2, Plus, Save } from 'lucide-react'

type LinkRow = {
  id: string
  label: string
  href: string
  _isNew?: boolean
}

type GroupState = {
  name: string
  links: LinkRow[]
}

export const FooterEditor = () => {
  const [footer, setFooter] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const [groups, setGroups] = useState<GroupState[]>([])
  const [deletedLinkIds, setDeletedLinkIds] = useState<string[]>([])
  const [linksSaving, setLinksSaving] = useState(false)

  async function loadData() {
    const { data, error } = await supabase.from('footer').select('*').single()
    console.log('FOOTER DATA:', data)
    console.log('FOOTER ERROR:', error)
    if (data) setFooter(data)
    setLoading(false)
  }

  async function loadLinks() {
    const { data } = await supabase
      .from('footer_links')
      .select('*')
      .order('group_order')
      .order('order_index')

    if (data && data.length > 0) {
      const groupMap = new Map<string, LinkRow[]>()
      const groupOrderMap = new Map<string, number>()

      data.forEach((link: any) => {
        if (!groupMap.has(link.group_name)) {
          groupMap.set(link.group_name, [])
          groupOrderMap.set(link.group_name, link.group_order)
        }
        groupMap.get(link.group_name)!.push({ id: link.id, label: link.label, href: link.href })
      })

      const sorted = Array.from(groupMap.entries())
        .sort(([a], [b]) => (groupOrderMap.get(a) ?? 0) - (groupOrderMap.get(b) ?? 0))
        .map(([name, links]) => ({ name, links }))

      setGroups(sorted)
    }
  }

  useEffect(() => {
    loadData()
    loadLinks()
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
        credit_text: footer.credit_text,
        bg_color: footer.bg_color,
      })
      .eq('id', footer.id)
      .select()

    console.log('SAVE DATA:', data)
    console.log('SAVE ERROR:', error)

    if (error) { alert('Erro ao salvar'); return }
    alert('Footer salvo com sucesso!')
  }

  async function saveLinks() {
    setLinksSaving(true)
    try {
      if (deletedLinkIds.length > 0) {
        const { error } = await supabase.from('footer_links').delete().in('id', deletedLinkIds)
        if (error) throw error
      }

      const toUpsert = groups.flatMap((group, gi) =>
        group.links.map((link, li) => ({
          id: link.id,
          group_name: group.name,
          group_order: gi,
          label: link.label,
          href: link.href,
          order_index: li,
          updated_at: new Date().toISOString(),
        }))
      )

      if (toUpsert.length > 0) {
        const { error } = await supabase.from('footer_links').upsert(toUpsert)
        if (error) throw error
      }

      setDeletedLinkIds([])
      alert('Links do rodapé salvos com sucesso!')
    } catch (err) {
      console.error(err)
      alert('Erro ao salvar links. Tente novamente.')
    } finally {
      setLinksSaving(false)
    }
  }

  function addGroup() {
    const name = window.prompt('Nome do novo grupo:')
    if (!name?.trim()) return
    setGroups(prev => [...prev, { name: name.trim(), links: [] }])
  }

  function removeGroup(gi: number) {
    const group = groups[gi]
    if (!window.confirm(`Remover o grupo "${group.name}" e todos os seus ${group.links.length} link(s)?`)) return
    setDeletedLinkIds(prev => [
      ...prev,
      ...group.links.filter(l => !l._isNew).map(l => l.id),
    ])
    setGroups(prev => prev.filter((_, i) => i !== gi))
  }

  function renameGroup(gi: number, newName: string) {
    setGroups(prev => prev.map((g, i) => i === gi ? { ...g, name: newName } : g))
  }

  function addLink(gi: number) {
    const newLink: LinkRow = { id: crypto.randomUUID(), label: 'Novo link', href: '#', _isNew: true }
    setGroups(prev => prev.map((g, i) => i === gi ? { ...g, links: [...g.links, newLink] } : g))
  }

  function removeLink(gi: number, li: number) {
    const link = groups[gi].links[li]
    if (!window.confirm(`Remover o link "${link.label}"?`)) return
    if (!link._isNew) setDeletedLinkIds(prev => [...prev, link.id])
    setGroups(prev => prev.map((g, i) => i !== gi ? g : { ...g, links: g.links.filter((_, j) => j !== li) }))
  }

  function moveUp(gi: number, li: number) {
    if (li === 0) return
    setGroups(prev => prev.map((g, i) => {
      if (i !== gi) return g
      const links = [...g.links]
      ;[links[li - 1], links[li]] = [links[li], links[li - 1]]
      return { ...g, links }
    }))
  }

  function moveDown(gi: number, li: number) {
    setGroups(prev => prev.map((g, i) => {
      if (i !== gi) return g
      if (li === g.links.length - 1) return g
      const links = [...g.links]
      ;[links[li], links[li + 1]] = [links[li + 1], links[li]]
      return { ...g, links }
    }))
  }

  function updateLink(gi: number, li: number, field: 'label' | 'href', value: string) {
    setGroups(prev => prev.map((g, i) => i !== gi ? g : {
      ...g,
      links: g.links.map((link, j) => j !== li ? link : { ...link, [field]: value }),
    }))
  }

  if (loading) return <div style={{ padding: '2rem' }}>Carregando...</div>

  const inputStyle: React.CSSProperties = {
    padding: '0.5rem 0.75rem',
    borderRadius: '8px',
    border: '1px solid rgba(28,25,23,0.15)',
    fontSize: '0.875rem',
    color: '#1C1917',
    outline: 'none',
    background: 'white',
    width: '100%',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  }

  const iconBtnBase: React.CSSProperties = {
    padding: '0.3rem',
    borderRadius: '6px',
    border: '1px solid rgba(28,25,23,0.12)',
    background: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '900px' }}>
      <h1 style={{ margin: '0 0 1.5rem', fontSize: '1.25rem', fontWeight: 700, color: '#1C1917' }}>Editor de Rodapé</h1>

      {/* ─── Informações gerais ─── */}
      <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1.25rem', fontSize: '1rem', fontWeight: 700, color: '#1C1917' }}>Informações Gerais</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <textarea rows={4} style={{ ...inputStyle, minHeight: '90px', resize: 'vertical' }}
            value={footer.brand_description || ''} placeholder="Descrição da marca"
            onChange={e => setFooter({ ...footer, brand_description: e.target.value })} />
          <input style={inputStyle} value={footer.whatsapp_url || ''} placeholder="WhatsApp URL"
            onChange={e => setFooter({ ...footer, whatsapp_url: e.target.value })} />
          <input style={inputStyle} value={footer.instagram_url || ''} placeholder="Instagram URL"
            onChange={e => setFooter({ ...footer, instagram_url: e.target.value })} />
          <input style={inputStyle} value={footer.email || ''} placeholder="Email"
            onChange={e => setFooter({ ...footer, email: e.target.value })} />
          <input style={inputStyle} value={footer.cta_title || ''} placeholder="Título do banner CTA"
            onChange={e => setFooter({ ...footer, cta_title: e.target.value })} />
          <textarea rows={3} style={{ ...inputStyle, minHeight: '72px', resize: 'vertical' }}
            value={footer.cta_subtitle || ''} placeholder="Subtítulo do banner CTA"
            onChange={e => setFooter({ ...footer, cta_subtitle: e.target.value })} />
          <input style={inputStyle} value={footer.cta_primary_label || ''} placeholder="Texto botão principal"
            onChange={e => setFooter({ ...footer, cta_primary_label: e.target.value })} />
          <input style={inputStyle} value={footer.cta_whatsapp_label || ''} placeholder="Texto botão WhatsApp"
            onChange={e => setFooter({ ...footer, cta_whatsapp_label: e.target.value })} />
          <input style={inputStyle} value={footer.copyright_text || ''} placeholder="Copyright"
            onChange={e => setFooter({ ...footer, copyright_text: e.target.value })} />
          <div>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#57534E', display: 'block', marginBottom: '4px' }}>Texto de crédito (rodapé direito, ex: Feito com ❤ para os tutores e seus pets)</span>
            <input style={inputStyle} value={footer.credit_text || ''} placeholder="Feito com ❤ para os tutores e seus pets"
              onChange={e => setFooter({ ...footer, credit_text: e.target.value })} />
          </div>

          <div>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#57534E', display: 'block', marginBottom: '4px' }}>Cor de fundo do rodapé</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <input type="color" value={footer.bg_color || '#1C1917'}
                onChange={e => setFooter({ ...footer, bg_color: e.target.value })}
                style={{ width: '48px', height: '40px', padding: '2px', borderRadius: '8px', border: '1px solid rgba(28,25,23,0.15)', cursor: 'pointer', flexShrink: 0 }} />
              <input style={{ ...inputStyle, flex: 1 }} value={footer.bg_color || '#1C1917'}
                onChange={e => setFooter({ ...footer, bg_color: e.target.value })}
                placeholder="#1C1917" />
            </div>
          </div>

          <button onClick={save}
            style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #C4622D, #A04E22)', color: 'white', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>
            <Save size={15} /> Salvar Informações
          </button>
        </div>
      </div>

      {/* ─── Links do rodapé ─── */}
      <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#1C1917' }}>Links do Rodapé</h2>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.8125rem', color: '#78716C' }}>
              Edite links e grupos, reordene e adicione/remova conforme necessário.
            </p>
          </div>
          <button onClick={saveLinks} disabled={linksSaving}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #C4622D, #A04E22)', color: 'white', fontSize: '0.875rem', fontWeight: 600, cursor: linksSaving ? 'not-allowed' : 'pointer', opacity: linksSaving ? 0.7 : 1, whiteSpace: 'nowrap' }}>
            <Save size={15} />
            {linksSaving ? 'Salvando...' : 'Salvar Links'}
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '0.875rem' }}>
          {groups.map((group, gi) => (
            <div key={gi} style={{ border: '1px solid rgba(28,25,23,0.08)', borderRadius: '12px', overflow: 'hidden' }}>
              {/* Cabeçalho do grupo */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '0.625rem 0.75rem', background: 'rgba(28,25,23,0.025)', borderBottom: '1px solid rgba(28,25,23,0.07)' }}>
                <input
                  value={group.name}
                  onChange={e => renameGroup(gi, e.target.value)}
                  title="Renomear grupo"
                  style={{ flex: 1, padding: '0.375rem 0.625rem', borderRadius: '6px', border: '1px solid rgba(28,25,23,0.15)', fontSize: '0.875rem', fontWeight: 600, color: '#1C1917', fontFamily: 'inherit' }}
                />
                <button onClick={() => removeGroup(gi)} title="Excluir grupo"
                  style={{ ...iconBtnBase, color: '#DC2626', borderColor: 'rgba(220,38,38,0.20)', background: 'rgba(220,38,38,0.04)', padding: '0.375rem' }}>
                  <Trash2 size={14} />
                </button>
              </div>

              {/* Cabeçalho das colunas */}
              <div style={{ display: 'grid', gridTemplateColumns: '44px 1fr 1fr 30px', gap: '0.375rem', padding: '0.25rem 0.75rem', fontSize: '0.6875rem', fontWeight: 600, color: '#A8A29E', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                <span>Ordem</span>
                <span>Label</span>
                <span>Href</span>
                <span />
              </div>

              {/* Links do grupo */}
              <div style={{ padding: '0 0.5rem 0.5rem' }}>
                {group.links.map((link, li) => (
                  <div key={link.id}
                    style={{ display: 'grid', gridTemplateColumns: '44px 1fr 1fr 30px', gap: '0.375rem', alignItems: 'center', padding: '0.25rem', borderRadius: '8px', background: link._isNew ? 'rgba(196,98,45,0.03)' : 'transparent', marginBottom: '0.125rem' }}>
                    {/* Botões ordem */}
                    <div style={{ display: 'flex', gap: '2px' }}>
                      <button onClick={() => moveUp(gi, li)} disabled={li === 0} title="Mover para cima"
                        style={{ ...iconBtnBase, opacity: li === 0 ? 0.3 : 1, cursor: li === 0 ? 'default' : 'pointer', color: '#78716C' }}>
                        <ChevronUp size={12} />
                      </button>
                      <button onClick={() => moveDown(gi, li)} disabled={li === group.links.length - 1} title="Mover para baixo"
                        style={{ ...iconBtnBase, opacity: li === group.links.length - 1 ? 0.3 : 1, cursor: li === group.links.length - 1 ? 'default' : 'pointer', color: '#78716C' }}>
                        <ChevronDown size={12} />
                      </button>
                    </div>

                    <input value={link.label} onChange={e => updateLink(gi, li, 'label', e.target.value)} style={inputStyle} />
                    <input value={link.href} onChange={e => updateLink(gi, li, 'href', e.target.value)} placeholder="#secao" style={inputStyle} />

                    <button onClick={() => removeLink(gi, li)} title="Remover link"
                      style={{ ...iconBtnBase, color: '#DC2626', borderColor: 'rgba(220,38,38,0.20)', background: 'rgba(220,38,38,0.04)' }}>
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}

                <button onClick={() => addLink(gi)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem', width: '100%', marginTop: '0.375rem', padding: '0.5rem', borderRadius: '8px', border: '1px dashed rgba(196,98,45,0.30)', background: 'rgba(196,98,45,0.03)', color: '#C4622D', fontSize: '0.8125rem', fontWeight: 500, cursor: 'pointer' }}>
                  <Plus size={13} /> Adicionar link
                </button>
              </div>
            </div>
          ))}
        </div>

        <button onClick={addGroup}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', padding: '0.625rem', borderRadius: '10px', border: '1px dashed rgba(196,98,45,0.35)', background: 'rgba(196,98,45,0.04)', color: '#C4622D', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer' }}>
          <Plus size={15} /> Adicionar Grupo
        </button>
      </div>
    </div>
  )
}
