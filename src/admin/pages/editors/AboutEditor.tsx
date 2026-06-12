import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

export const AboutEditor = () => {
  const [about, setAbout] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  async function loadData() {
    const { data, error } = await supabase
      .from('about')
      .select('*')
      .single()

    console.log('ABOUT DATA:', data)
    console.log('ABOUT ERROR:', error)

    if (data) setAbout(data)

    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  async function save() {
    if (!about) return

    const { data, error } = await supabase
      .from('about')
      .update({
        name: about.name,
        role_title: about.role_title,
        credentials_line: about.credentials_line,
        bio_paragraph_1: about.bio_paragraph_1,
        bio_paragraph_2: about.bio_paragraph_2,
        photo_url: about.photo_url,

        credential_1_label: about.credential_1_label,
        credential_1_sub: about.credential_1_sub,

        credential_2_label: about.credential_2_label,
        credential_2_sub: about.credential_2_sub,

        credential_3_label: about.credential_3_label,
        credential_3_sub: about.credential_3_sub,

        credential_4_label: about.credential_4_label,
        credential_4_sub: about.credential_4_sub,
      })
      .eq('id', about.id)
      .select()

    console.log('SAVE DATA:', data)
    console.log('SAVE ERROR:', error)

    if (error) {
      alert('Erro ao salvar')
      return
    }

    alert('Sobre salvo com sucesso!')
  }

  if (loading) {
    return <div style={{ padding: '2rem' }}>Carregando...</div>
  }

  if (!about) {
    return <div style={{ padding: '2rem' }}>Nenhum registro encontrado.</div>
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '900px' }}>
      <h1>About Editor</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

        <input
          value={about.name || ''}
          placeholder="Nome"
          onChange={(e) =>
            setAbout({ ...about, name: e.target.value })
          }
        />

        <input
          value={about.role_title || ''}
          placeholder="Cargo"
          onChange={(e) =>
            setAbout({ ...about, role_title: e.target.value })
          }
        />

        <input
          value={about.credentials_line || ''}
          placeholder="Credenciais"
          onChange={(e) =>
            setAbout({ ...about, credentials_line: e.target.value })
          }
        />

        <textarea
          rows={5}
          value={about.bio_paragraph_1 || ''}
          placeholder="Bio 1"
          onChange={(e) =>
            setAbout({ ...about, bio_paragraph_1: e.target.value })
          }
        />

        <textarea
          rows={5}
          value={about.bio_paragraph_2 || ''}
          placeholder="Bio 2"
          onChange={(e) =>
            setAbout({ ...about, bio_paragraph_2: e.target.value })
          }
        />

        <input
          value={about.photo_url || ''}
          placeholder="URL da foto"
          onChange={(e) =>
            setAbout({ ...about, photo_url: e.target.value })
          }
        />

        <h3>Credencial 1</h3>

        <input
          value={about.credential_1_label || ''}
          placeholder="Título"
          onChange={(e) =>
            setAbout({ ...about, credential_1_label: e.target.value })
          }
        />

        <input
          value={about.credential_1_sub || ''}
          placeholder="Subtítulo"
          onChange={(e) =>
            setAbout({ ...about, credential_1_sub: e.target.value })
          }
        />

        <h3>Credencial 2</h3>

        <input
          value={about.credential_2_label || ''}
          placeholder="Título"
          onChange={(e) =>
            setAbout({ ...about, credential_2_label: e.target.value })
          }
        />

        <input
          value={about.credential_2_sub || ''}
          placeholder="Subtítulo"
          onChange={(e) =>
            setAbout({ ...about, credential_2_sub: e.target.value })
          }
        />

        <h3>Credencial 3</h3>

        <input
          value={about.credential_3_label || ''}
          placeholder="Título"
          onChange={(e) =>
            setAbout({ ...about, credential_3_label: e.target.value })
          }
        />

        <input
          value={about.credential_3_sub || ''}
          placeholder="Subtítulo"
          onChange={(e) =>
            setAbout({ ...about, credential_3_sub: e.target.value })
          }
        />

        <h3>Credencial 4</h3>

        <input
          value={about.credential_4_label || ''}
          placeholder="Título"
          onChange={(e) =>
            setAbout({ ...about, credential_4_label: e.target.value })
          }
        />

        <input
          value={about.credential_4_sub || ''}
          placeholder="Subtítulo"
          onChange={(e) =>
            setAbout({ ...about, credential_4_sub: e.target.value })
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
          Salvar Sobre
        </button>

      </div>
    </div>
  )
}