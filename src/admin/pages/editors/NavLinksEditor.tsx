import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import type { NavLink } from '../../../lib/supabase'
import { ChevronUp, ChevronDown, Trash2, Plus, Save, Eye, EyeOff } from 'lucide-react'

type LinkRow = NavLink & { _isNew?: boolean }

export const NavLinksEditor = () => {
  const [links, setLinks] = useState<LinkRow[]>([])
  const [deletedIds, setDeletedIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  async function loadLinks() {
    const { data } = await supabase
      .from('nav_links')
      .select('*')
      .order('order_index')
    if (data) setLinks(data)
    setLoading(false)
  }

  useEffect(() => { loadLinks() }, [])

  function addLink() {
    setLinks(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        label: 'Novo Link',
        href: '#',
        order_index: prev.length,
        is_visible: true,
        updated_at: '',
        _isNew: true,
      },
    ])
  }

  function removeLink(link: LinkRow) {
    if (!window.confirm(`Remover o link "${link.label}" do menu?`)) return
    setLinks(prev => prev.filter(l => l.id !== link.id))
    if (!link._isNew) {
      setDeletedIds(prev => [...prev, link.id])
    }
  }

  function moveUp(index: number) {
    if (index === 0) return
    setLinks(prev => {
      const next = [...prev]
      ;[next[index - 1], next[index]] = [next[index], next[index - 1]]
      return next
    })
  }

  function moveDown(index: number) {
    setLinks(prev => {
      if (index === prev.length - 1) return prev
      const next = [...prev]
      ;[next[index], next[index + 1]] = [next[index + 1], next[index]]
      return next
    })
  }

  function updateLink(id: string, field: 'label' | 'href' | 'is_visible', value: string | boolean) {
    setLinks(prev => prev.map(l => l.id === id ? { ...l, [field]: value } : l))
  }

  async function save() {
    setSaving(true)
    try {
      if (deletedIds.length > 0) {
        const { error } = await supabase.from('nav_links').delete().in('id', deletedIds)
        if (error) throw error
      }

      const toUpsert = links.map((link, i) => ({
        id: link.id,
        label: link.label,
        href: link.href,
        order_index: i,
        is_visible: link.is_visible,
        updated_at: new Date().toISOString(),
      }))

      const { error } = await supabase.from('nav_links').upsert(toUpsert)
      if (error) throw error

      setDeletedIds([])
      setLinks(prev => prev.map(link => ({
        id: link.id,
        label: link.label,
        href: link.href,
        order_index: link.order_index,
        is_visible: link.is_visible,
        updated_at: new Date().toISOString(),
      })))
      alert('Navegação salva com sucesso!')
    } catch (err) {
      console.error(err)
      alert('Erro ao salvar. Tente novamente.')
    } finally {
      setSaving(false)
    }
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
  }

  const iconBtnBase: React.CSSProperties = {
    padding: '0.375rem',
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
    <div style={{ padding: '2rem', maxWidth: '800px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#1C1917' }}>
            Navegação — Links do Menu
          </h1>
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: '#78716C' }}>
            Edite os links, reordene com as setas, mostre ou oculte itens individualmente.
          </p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.625rem 1.25rem',
            borderRadius: '10px',
            border: 'none',
            background: 'linear-gradient(135deg, #C4622D, #A04E22)',
            color: 'white',
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: saving ? 'not-allowed' : 'pointer',
            opacity: saving ? 0.7 : 1,
            whiteSpace: 'nowrap',
          }}
        >
          <Save size={15} />
          {saving ? 'Salvando...' : 'Salvar'}
        </button>
      </div>

      {/* Column headers */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '52px 1fr 1fr 38px 38px',
        gap: '0.5rem',
        padding: '0 0.75rem 0.375rem',
        fontSize: '0.6875rem',
        fontWeight: 600,
        color: '#A8A29E',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      }}>
        <span>Ordem</span>
        <span>Label</span>
        <span>Href</span>
        <span style={{ textAlign: 'center' }}>Vis.</span>
        <span />
      </div>

      {/* Links list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', marginBottom: '0.875rem' }}>
        {links.map((link, i) => (
          <div
            key={link.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '52px 1fr 1fr 38px 38px',
              gap: '0.5rem',
              alignItems: 'center',
              padding: '0.625rem 0.75rem',
              borderRadius: '10px',
              background: link._isNew ? 'rgba(196,98,45,0.04)' : 'white',
              border: link._isNew
                ? '1px solid rgba(196,98,45,0.25)'
                : '1px solid rgba(28,25,23,0.08)',
              transition: 'border-color 0.15s',
            }}
          >
            {/* Up / Down */}
            <div style={{ display: 'flex', gap: '2px' }}>
              <button
                onClick={() => moveUp(i)}
                disabled={i === 0}
                title="Mover para cima"
                style={{ ...iconBtnBase, opacity: i === 0 ? 0.3 : 1, cursor: i === 0 ? 'default' : 'pointer', color: '#78716C' }}
              >
                <ChevronUp size={13} />
              </button>
              <button
                onClick={() => moveDown(i)}
                disabled={i === links.length - 1}
                title="Mover para baixo"
                style={{ ...iconBtnBase, opacity: i === links.length - 1 ? 0.3 : 1, cursor: i === links.length - 1 ? 'default' : 'pointer', color: '#78716C' }}
              >
                <ChevronDown size={13} />
              </button>
            </div>

            {/* Label */}
            <input
              value={link.label}
              onChange={e => updateLink(link.id, 'label', e.target.value)}
              placeholder="Label"
              style={inputStyle}
            />

            {/* Href */}
            <input
              value={link.href}
              onChange={e => updateLink(link.id, 'href', e.target.value)}
              placeholder="#secao"
              style={inputStyle}
            />

            {/* Visibility toggle */}
            <button
              onClick={() => updateLink(link.id, 'is_visible', !link.is_visible)}
              title={link.is_visible ? 'Ocultar do menu' : 'Mostrar no menu'}
              style={{
                ...iconBtnBase,
                color: link.is_visible ? '#16A34A' : '#A8A29E',
                borderColor: link.is_visible ? 'rgba(22,163,74,0.25)' : 'rgba(28,25,23,0.12)',
                background: link.is_visible ? 'rgba(22,163,74,0.06)' : 'white',
              }}
            >
              {link.is_visible ? <Eye size={14} /> : <EyeOff size={14} />}
            </button>

            {/* Remove */}
            <button
              onClick={() => removeLink(link)}
              title="Remover link"
              style={{
                ...iconBtnBase,
                color: '#DC2626',
                borderColor: 'rgba(220,38,38,0.20)',
                background: 'rgba(220,38,38,0.04)',
              }}
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>

      {/* Add link */}
      <button
        onClick={addLink}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          width: '100%',
          padding: '0.625rem',
          borderRadius: '10px',
          border: '1px dashed rgba(196,98,45,0.35)',
          background: 'rgba(196,98,45,0.04)',
          color: '#C4622D',
          fontSize: '0.875rem',
          fontWeight: 500,
          cursor: 'pointer',
        }}
      >
        <Plus size={15} />
        Adicionar Link
      </button>
    </div>
  )
}
