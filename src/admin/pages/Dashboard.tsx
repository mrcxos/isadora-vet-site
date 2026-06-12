export function Dashboard() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1
        style={{
          fontSize: '2rem',
          marginBottom: '0.5rem',
        }}
      >
        Painel Administrativo
      </h1>

      <p
        style={{
          color: '#78716C',
          marginBottom: '2rem',
        }}
      >
        Gerencie todo o conteúdo do site.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
        }}
      >
        <div style={cardStyle}>
          <h3>Hero</h3>
          <p>Banner principal do site</p>
        </div>

        <div style={cardStyle}>
          <h3>Contato</h3>
          <p>WhatsApp, email e Instagram</p>
        </div>

        <div style={cardStyle}>
          <h3>Serviços</h3>
          <p>Gerencie os serviços exibidos</p>
        </div>

        <div style={cardStyle}>
          <h3>Depoimentos</h3>
          <p>Gerencie avaliações dos clientes</p>
        </div>
      </div>
    </div>
  )
}

const cardStyle: React.CSSProperties = {
  background: 'white',
  borderRadius: '12px',
  padding: '1rem',
  border: '1px solid rgba(0,0,0,0.08)',
}