import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import { Save, Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react'
import {
  GraduationCap, Award, Globe, Heart, Shield, Star,
  CheckCircle2, Plane, PawPrint, Trophy, ThumbsUp, BadgeCheck, Medal, Sparkles,
  MessageCircle, ClipboardList, FileCheck, PartyPopper,
} from 'lucide-react'

type IconComponent = typeof GraduationCap

const ICON_LIST: { name: string; Icon: IconComponent }[] = [
  { name: 'MessageCircle', Icon: MessageCircle },
  { name: 'ClipboardList', Icon: ClipboardList },
  { name: 'FileCheck',     Icon: FileCheck },
  { name: 'Plane',         Icon: Plane },
  { name: 'PartyPopper',   Icon: PartyPopper },
  { name: 'GraduationCap', Icon: GraduationCap },
  { name: 'Award',         Icon: Award },
  { name: 'Globe',         Icon: Globe },
  { name: 'Heart',         Icon: Heart },
  { name: 'Shield',        Icon: Shield },
  { name: 'Star',          Icon: Star },
  { name: 'CheckCircle2',  Icon: CheckCircle2 },
  { name: 'PawPrint',      Icon: PawPrint },
  { name: 'Trophy',        Icon: Trophy },
  { name: 'ThumbsUp',      Icon: ThumbsUp },
  { name: 'BadgeCheck',    Icon: BadgeCheck },
  { name: 'Medal',         Icon: Medal },
  { name: 'Sparkles',      Icon: Sparkles },
]

type StepRow = {
  id: string
  step_number: string
  icon_name: string
  title: string
  description: string
  order_index: number
  is_visible: boolean
  updated_at: string
  _isNew?: boolean
}

type SectionState = {
  badge_text: string
  title: string
  subtitle: string
}

function IconSelector({ value, onChange }: { value: string; onChange: (name: string) => void }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
      {ICON_LIST.map(({ name, Icon }) => (
        <button
          key={name}
          type="button"
          title={name}
          onClick={() => onChange(name)}
          style={{
            width: '54px',
            height: '54px',
            borderRadius: '8px',
            border: value === name ? '2px solid #C4622D' : '1px solid rgba(28,25,23,0.15)',
            background: value === name ? 'rgba(196,98,45,0.08)' : 'white',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px',
            padding: '4px',
          }}
        >
          <Icon size={18} color={value === name ? '#C4622D' : '#78716C'} />
          <span style={{ fontSize: '0.55rem', color: value === name ? '#C4622D' : '#A8A29E', lineHeight: 1, textAlign: 'center', wordBreak: 'break-all' }}>
            {name}
          </span>
        </button>
      ))}
    </div>
  )
}

export const HowItWorksEditor = () => {
  const [section, setSection] = useState<SectionState>({
    badge_text: 'Como Funciona',
    title: 'Do primeiro contato à\nchegada no destino',
    subtitle: 'Um processo estruturado, humano e eficiente. Cuidamos de cada detalhe para que você não precise se preocupar com nada.',
  })
  const [steps, setSteps] = useState<StepRow[]>([])
  const [deletedIds, setDeletedIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [sectionSaving, setSectionSaving] = useState(false)
  const [stepsSaving, setStepsSaving] = useState(false)

  async function loadData() {
    const [sectionRes, stepsRes] = await Promise.all([
      supabase.from('section_content').select('*').eq('section_id', 'how_it_works').single(),
      supabase.from('how_it_works_steps').select('*').order('order_index'),
    ])
    if (sectionRes.data) {
      setSection({
        badge_text: sectionRes.data.badge_text ?? 'Como Funciona',
        title: sectionRes.data.title ?? 'Do primeiro contato à\nchegada no destino',
        subtitle: sectionRes.data.subtitle ?? '',
      })
    }
    if (stepsRes.data) setSteps(stepsRes.data)
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  async function saveSection() {
    setSectionSaving(true)
    const { error } = await supabase.from('section_content').upsert({
      section_id: 'how_it_works',
      badge_text: section.badge_text,
      title: section.title,
      subtitle: section.subtitle,
      cta_button_text: null,
      secondary_text: null,
      secondary_cta_text: null,
      updated_at: new Date().toISOString(),
    })
    setSectionSaving(false)
    if (error) { alert('Erro ao salvar cabeçalho'); return }
    alert('Cabeçalho salvo com sucesso!')
  }

  async function saveSteps() {
    setStepsSaving(true)
    try {
      if (deletedIds.length > 0) {
        const { error } = await supabase.from('how_it_works_steps').delete().in('id', deletedIds)
        if (error) throw error
      }
      const toUpsert = steps.map((s, i) => ({
        id: s._isNew ? undefined : s.id,
        step_number: s.step_number,
        icon_name: s.icon_name,
        title: s.title,
        description: s.description,
        order_index: i,
        is_visible: s.is_visible,
        updated_at: new Date().toISOString(),
      }))
      if (toUpsert.length > 0) {
        const { error } = await supabase.from('how_it_works_steps').upsert(toUpsert)
        if (error) throw error
      }
      setDeletedIds([])
      await loadData()
      alert('Steps salvos com sucesso!')
    } catch (err) {
      console.error(err)
      alert('Erro ao salvar steps.')
    } finally {
      setStepsSaving(false)
    }
  }

  function addStep() {
    const newStep: StepRow = {
      id: crypto.randomUUID(),
      step_number: String(steps.length + 1).padStart(2, '0'),
      icon_name: 'Plane',
      title: 'Novo step',
      description: '',
      order_index: steps.length,
      is_visible: true,
      updated_at: '',
      _isNew: true,
    }
    setSteps(prev => [...prev, newStep])
  }

  function removeStep(index: number) {
    const step = steps[index]
    if (!window.confirm(`Remover o step "${step.title}"?`)) return
    if (!step._isNew) setDeletedIds(prev => [...prev, step.id])
    setSteps(prev => prev.filter((_, i) => i !== index))
  }

  function moveUp(index: number) {
    if (index === 0) return
    setSteps(prev => {
      const arr = [...prev]
      ;[arr[index - 1], arr[index]] = [arr[index], arr[index - 1]]
      return arr
    })
  }

  function moveDown(index: number) {
    if (index === steps.length - 1) return
    setSteps(prev => {
      const arr = [...prev]
      ;[arr[index], arr[index + 1]] = [arr[index + 1], arr[index]]
      return arr
    })
  }

  function updateStep(index: number, field: keyof StepRow, value: string | boolean) {
    setSteps(prev => prev.map((s, i) => i !== index ? s : { ...s, [field]: value }))
  }

  if (loading) return <div style={{ padding: '2rem' }}>Carregando...</div>

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #d6d3d1',
    fontSize: '0.9rem',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '0.8125rem',
    fontWeight: 600,
    color: '#57534E',
    display: 'block',
    marginBottom: '4px',
  }

  const cardStyle: React.CSSProperties = {
    background: 'white',
    borderRadius: '16px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '900px' }}>
      <h1 style={{ margin: '0 0 1.5rem', fontSize: '1.25rem', fontWeight: 700, color: '#1C1917' }}>
        Editor — Como Funciona
      </h1>

      {/* Cabeçalho da seção */}
      <div style={{ ...cardStyle, borderLeft: '4px solid #C4622D' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1.25rem', fontSize: '1rem', fontWeight: 700, color: '#1C1917' }}>
          Cabeçalho da Seção
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <span style={labelStyle}>Texto do badge (ex: Como Funciona)</span>
            <input style={inputStyle} value={section.badge_text}
              onChange={e => setSection(prev => ({ ...prev, badge_text: e.target.value }))} />
          </div>
          <div>
            <span style={labelStyle}>Título (use \n para quebra de linha)</span>
            <textarea rows={3} style={{ ...inputStyle, resize: 'vertical' as const, minHeight: '72px' }}
              value={section.title}
              onChange={e => setSection(prev => ({ ...prev, title: e.target.value }))} />
          </div>
          <div>
            <span style={labelStyle}>Subtítulo</span>
            <textarea rows={3} style={{ ...inputStyle, resize: 'vertical' as const, minHeight: '72px' }}
              value={section.subtitle}
              onChange={e => setSection(prev => ({ ...prev, subtitle: e.target.value }))} />
          </div>
        </div>

        <button onClick={saveSection} disabled={sectionSaving}
          style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #C4622D, #A04E22)', color: 'white', fontSize: '0.875rem', fontWeight: 600, cursor: sectionSaving ? 'not-allowed' : 'pointer', opacity: sectionSaving ? 0.7 : 1 }}>
          <Save size={15} /> {sectionSaving ? 'Salvando...' : 'Salvar Cabeçalho'}
        </button>
      </div>

      {/* Steps */}
      <div style={{ ...cardStyle }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#1C1917' }}>Steps</h2>
          <button onClick={saveSteps} disabled={stepsSaving}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #C4622D, #A04E22)', color: 'white', fontSize: '0.875rem', fontWeight: 600, cursor: stepsSaving ? 'not-allowed' : 'pointer', opacity: stepsSaving ? 0.7 : 1, whiteSpace: 'nowrap' }}>
            <Save size={15} /> {stepsSaving ? 'Salvando...' : 'Salvar Steps'}
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {steps.map((step, i) => (
            <div key={step.id} style={{ border: '1px solid rgba(28,25,23,0.08)', borderRadius: '12px', overflow: 'hidden' }}>
              {/* Cabeçalho do card */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 0.75rem', background: step._isNew ? 'rgba(196,98,45,0.04)' : 'rgba(28,25,23,0.025)', borderBottom: '1px solid rgba(28,25,23,0.07)' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  <button onClick={() => moveUp(i)} disabled={i === 0} title="Mover para cima"
                    style={{ padding: '0.3rem', borderRadius: '6px', border: '1px solid rgba(28,25,23,0.12)', background: 'white', cursor: i === 0 ? 'default' : 'pointer', opacity: i === 0 ? 0.3 : 1, display: 'flex', alignItems: 'center', color: '#78716C' }}>
                    <ChevronUp size={13} />
                  </button>
                  <button onClick={() => moveDown(i)} disabled={i === steps.length - 1} title="Mover para baixo"
                    style={{ padding: '0.3rem', borderRadius: '6px', border: '1px solid rgba(28,25,23,0.12)', background: 'white', cursor: i === steps.length - 1 ? 'default' : 'pointer', opacity: i === steps.length - 1 ? 0.3 : 1, display: 'flex', alignItems: 'center', color: '#78716C' }}>
                    <ChevronDown size={13} />
                  </button>
                </div>

                <span style={{ flex: 1, fontSize: '0.875rem', fontWeight: 600, color: '#1C1917' }}>
                  {step.step_number} — {step.title || 'Sem título'}
                  {!step.is_visible && (
                    <span style={{ marginLeft: '8px', fontSize: '0.7rem', fontWeight: 400, color: '#DC2626', background: 'rgba(220,38,38,0.08)', padding: '2px 7px', borderRadius: '4px' }}>Oculto</span>
                  )}
                </span>

                <button onClick={() => updateStep(i, 'is_visible', !step.is_visible)}
                  style={{ padding: '0.3rem 0.625rem', borderRadius: '6px', border: '1px solid rgba(28,25,23,0.12)', background: 'white', cursor: 'pointer', fontSize: '0.75rem', color: '#78716C', whiteSpace: 'nowrap' }}>
                  {step.is_visible ? 'Ocultar' : 'Mostrar'}
                </button>

                <button onClick={() => removeStep(i)} title="Remover step"
                  style={{ padding: '0.3rem', borderRadius: '6px', border: '1px solid rgba(220,38,38,0.20)', background: 'rgba(220,38,38,0.04)', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#DC2626' }}>
                  <Trash2 size={14} />
                </button>
              </div>

              {/* Campos */}
              <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
                  <div>
                    <span style={labelStyle}>Número do step (ex: 01)</span>
                    <input style={inputStyle} value={step.step_number}
                      onChange={e => updateStep(i, 'step_number', e.target.value)} />
                  </div>
                  <div>
                    <span style={labelStyle}>Título</span>
                    <input style={inputStyle} value={step.title}
                      onChange={e => updateStep(i, 'title', e.target.value)} />
                  </div>
                </div>

                <div>
                  <span style={labelStyle}>Descrição</span>
                  <textarea rows={3} style={{ ...inputStyle, resize: 'vertical' as const, minHeight: '72px' }}
                    value={step.description}
                    onChange={e => updateStep(i, 'description', e.target.value)} />
                </div>

                <div>
                  <span style={labelStyle}>Ícone</span>
                  <IconSelector value={step.icon_name} onChange={name => updateStep(i, 'icon_name', name)} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={addStep}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', marginTop: '1rem', padding: '0.625rem', borderRadius: '10px', border: '1px dashed rgba(196,98,45,0.35)', background: 'rgba(196,98,45,0.04)', color: '#C4622D', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer' }}>
          <Plus size={15} /> Adicionar Step
        </button>
      </div>
    </div>
  )
}
