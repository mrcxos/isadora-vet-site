import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

export const ImagesEditor = () => {
  const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  async function loadData() {
    const { data, error } = await supabase
      .from('images')
      .select('*')

    console.log('IMAGES DATA:', data)
    console.log('IMAGES ERROR:', error)

    if (data) setImages(data)

    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  async function save(image: any) {
    const { data, error } = await supabase
      .from('images')
      .update({
        public_url: image.public_url,
        alt_text: image.alt_text,
      })
      .eq('id', image.id)
      .select()

    console.log('SAVE DATA:', data)
    console.log('SAVE ERROR:', error)

    if (error) {
      alert('Erro ao salvar')
      return
    }

    alert('Imagem salva com sucesso!')
  }

  if (loading) {
    return <div style={{ padding: '2rem' }}>Carregando...</div>
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Images Editor</h1>

      {images.map((image, index) => (
        <div
          key={image.id}
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '2rem',
          }}
        >
          <h3>
            {image.section_id} / {image.key}
          </h3>

          <input
            style={{ width: '100%' }}
            value={image.public_url || ''}
            placeholder="URL da imagem"
            onChange={(e) => {
              const copy = [...images]
              copy[index].public_url = e.target.value
              setImages(copy)
            }}
          />

          <br />
          <br />

          <input
            style={{ width: '100%' }}
            value={image.alt_text || ''}
            placeholder="Texto alternativo"
            onChange={(e) => {
              const copy = [...images]
              copy[index].alt_text = e.target.value
              setImages(copy)
            }}
          />

          <br />
          <br />

          {image.public_url && (
            <img
              src={image.public_url}
              alt={image.alt_text}
              style={{
                maxWidth: '300px',
                borderRadius: '8px',
                display: 'block',
                marginBottom: '1rem',
              }}
            />
          )}

          <button onClick={() => save(image)}>
            Salvar Imagem
          </button>
        </div>
      ))}
    </div>
  )
}