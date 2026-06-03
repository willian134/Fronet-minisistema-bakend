import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Task } from '../types/task';

export default function Stats() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Consultar la base de datos al entrar a la sección de estadísticas
  useEffect(() => {
    const fetchTasksForStats = async () => {
      try {
        setLoading(true);
        const response = await api.get('/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error al cargar estadísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasksForStats();
  }, []);

  // Calcular contadores dinámicos basados en la respuesta real de la API
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  if (loading) {
    return (
      <p style={{ textAlign: 'center', marginTop: '40px', color: '#6c757d' }}>
        Calculando estadísticas...
      </p>
    );
  }

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', color: '#fff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
        Estadísticas de Tareas
      </h2>
      
      <div style={{ borderBottom: '1px solid #444', padding: '10px 0', display: 'flex', justifyContent: 'space-between' }}>
        <span>Total de tareas:</span>
        <strong style={{ fontSize: '1.2em' }}>{totalTasks}</strong>
      </div>

      <div style={{ borderBottom: '1px solid #444', padding: '10px 0', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: '#28a745' }}>Tareas completadas:</span>
        <strong style={{ fontSize: '1.2em', color: '#28a745' }}>{completedTasks}</strong>
      </div>

      <div style={{ padding: '10px 0', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: '#ffc107' }}>Tareas pendientes:</span>
        <strong style={{ fontSize: '1.2em', color: '#ffc107' }}>{pendingTasks}</strong>
      </div>
    </div>
  );
}