export default function NotFound() {
    return (
        <main style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#070b12',
            color: '#eff4ff',
            fontFamily: 'sans-serif',
            gap: '1rem',
        }}>
            <h1 style={{ fontSize: '4rem', margin: 0, color: '#f3c74d' }}>404</h1>
            <p style={{ color: '#9eb2cf' }}>Sayfa bulunamadı.</p>
            <a href="/" style={{ color: '#f3c74d', textDecoration: 'underline' }}>Ana sayfaya dön</a>
        </main>
    )
}
