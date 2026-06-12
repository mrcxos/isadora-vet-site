import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

export const HeroEditor = () => {
  const [hero, setHero] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  async function loadData() {
    const { data, error } = await supabase
      .from('hero')
      .select('*')
      .single()

    console.log('HERO DATA:', data)
    console.log('HERO ERROR:', error)

    if (data) {
      setHero(data)
    }

    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  async function save() {
    if (!hero) return

    const { data, error } = await supabase
      .from('hero')
      .update({
        badge_text: hero.badge_text,
        title_line_1: hero.title_line_1,
        title_line_2: hero.title_line_2,
        title_line_3: hero.title_line_3,
        subtitle: hero.subtitle,
        cta_primary_label: hero.cta_primary_label,
        cta_secondary_label: hero.cta_secondary_label,
        trust_1_text: hero.trust_1_text,
        trust_2_text: hero.trust_2_text,
        trust_3_text: hero.trust_3_text,
        bg_image_url: hero.bg_image_url,
      })
      .eq('id', hero.id)
      .select()

    console.log('SAVE DATA:', data)
    console.log('SAVE ERROR:', error)

    if (error) {
      alert('Erro ao salvar')
      return
    }

    alert('Hero salvo com sucesso!')
  }

  if (loading) {
    return <div style={{ padding: '2rem' }}>Carregando...</div>
  }

  if (!hero) {
    return <div style={{ padding: '2rem' }}>Nenhum registro encontrado.</div>
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '900px' }}>
      <h1>Hero Editor</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          value={hero.badge_text || ''}
          placeholder="Badge"
          onChange={(e) =>
            setHero({ ...hero, badge_text: e.target.value })
          }
        />

        <input
          value={hero.title_line_1 || ''}
          placeholder="Título linha 1"
          onChange={(e) =>
            setHero({ ...hero, title_line_1: e.target.value })
          }
        />

        <input
          value={hero.title_line_2 || ''}
          placeholder="Título linha 2"
          onChange={(e) =>
            setHero({ ...hero, title_line_2: e.target.value })
          }
        />

        <input
          value={hero.title_line_3 || ''}
          placeholder="Título linha 3"
          onChange={(e) =>
            setHero({ ...hero, title_line_3: e.target.value })
          }
        />

        <textarea
          rows={4}
          value={hero.subtitle || ''}
          placeholder="Subtítulo"
          onChange={(e) =>
            setHero({ ...hero, subtitle: e.target.value })
          }
        />

        <input
          value={hero.cta_primary_label || ''}
          placeholder="CTA Principal"
          onChange={(e) =>
            setHero({ ...hero, cta_primary_label: e.target.value })
          }
        />

        <input
          value={hero.cta_secondary_label || ''}
          placeholder="CTA Secundário"
          onChange={(e) =>
            setHero({ ...hero, cta_secondary_label: e.target.value })
          }
        />

        <input
          value={hero.trust_1_text || ''}
          placeholder="Trust 1"
          onChange={(e) =>
            setHero({ ...hero, trust_1_text: e.target.value })
          }
        />

        <input
          value={hero.trust_2_text || ''}
          placeholder="Trust 2"
          onChange={(e) =>
            setHero({ ...hero, trust_2_text: e.target.value })
          }
        />

        <input
          value={hero.trust_3_text || ''}
          placeholder="Trust 3"
          onChange={(e) =>
            setHero({ ...hero, trust_3_text: e.target.value })
          }
        />

        <input
          value={hero.bg_image_url || ''}
          placeholder="URL da imagem"
          onChange={(e) =>
            setHero({ ...hero, bg_image_url: e.target.value })
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
          Salvar Hero
        </button>
      </div>
    </div>
  )
}