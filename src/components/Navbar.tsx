//
import { Link } from 'react-router-dom';
// Componente de navegación para la aplicación
export default function Navbar() {
// Renderiza un menú de navegación con enlaces a las diferentes secciones de la aplicación
  return (
    <nav style={styles.nav}>
      <h2>Gestor de Tareas</h2>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Inicio</Link>
        <Link to="/tasks" style={styles.link}>Tareas</Link>
        <Link to="/stats" style={styles.link}>Estadísticas</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', backgroundColor: '#282c34', color: 'white' },
  links: { display: 'flex', gap: '15px' },
  link: { color: '#61dafb', textDecoration: 'none', fontWeight: 'bold' }
};