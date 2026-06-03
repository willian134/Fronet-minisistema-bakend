// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Stats from './pages/Stats';

export default function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <Routes>
          {/* Ruta Principal (/) y Ruta de Gestión (/tasks):
            Ambas apuntarán al componente Home, ya que este lee de la base de datos
            real, maneja el formulario y actualiza la lista mediante la API de NestJS.
          */}
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Home />} />
          
          {/* Ruta de Estadísticas (/stats):
            Ya no necesita recibir "tasks" como propiedad local por parámetro, 
            ahora Stats consultará directamente el backend de forma dinámica.
          */}
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </div>
    </Router>
  );
}