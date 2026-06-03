import React, { useState } from 'react';

interface TaskFormProps {
  onAddTask: (title: string, priority: 'Alta' | 'Media' | 'Baja') => void;
}
// Componente de formulario para agregar nuevas tareas
// Permite al usuario ingresar el título de la tarea y seleccionar su prioridad antes de agregarla a la lista
export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'Alta' | 'Media' | 'Baja'>('Alta');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert('El nombre de la tarea no puede estar vacío');
    
    onAddTask(title, priority);
    setTitle('');
    setPriority('Alta');
  };

  return (
    // Formulario para agregar nuevas tareas con título y prioridad
    <form onSubmit={handleSubmit} style={styles.form}>
      <input 
        type="text" 
        placeholder="Tarea: ____________" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        style={styles.input}
      />
      <select 
        value={priority} 
        onChange={(e) => setPriority(e.target.value as 'Alta' | 'Media' | 'Baja')} 
        style={styles.select}
      >
        <option value="Alta">Prioridad: Alta ▼</option>
        <option value="Media">Prioridad: Media ▼</option>
        <option value="Baja">Prioridad: Baja ▼</option>
      </select>
      <button type="submit" style={styles.button}>Agregar tarea</button>
    </form>
  );
}

const styles = {
  form: { display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' as const },
  input: { flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' },
  select: { padding: '8px', borderRadius: '4px', border: '1px solid #ccc' },
  button: { padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};