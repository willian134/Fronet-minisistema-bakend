import { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { api } from '../services/api'; 
import type { Task } from '../types/task';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 1. CARGAR TAREAS DEL BACKEND AL ENTRAR A LA PÁGINA
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await api.get('/tasks'); // GET a http://localhost:4000/tasks
      setTasks(response.data);
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
    } finally {
      setLoading(false);
    }
  };

  // 2. CREAR UNA NUEVA TAREA
  const handleAddTask = async (title: string, priority: 'Alta' | 'Media' | 'Baja') => {
    try {
      // Mapeamos los strings del formulario al formato estricto que espera la BD (MAYÚSCULAS)
      const priorityMapper: Record<string, string> = {
        'Alta': 'ALTA',
        'Media': 'MEDIA',
        'Baja': 'BAJA'
      };

      // Mandamos la estructura plana exacta que tu DTO valida sin fallar
      const taskData = {
        title: title,
        priority: priorityMapper[priority] || 'MEDIA',
        userId: 2 // El ID verificado de tu usuario 'william' en Prisma Studio
      };

      const response = await api.post('/tasks', taskData);

      // Si todo sale bien, agregamos la tarea devuelta por el servidor al estado de la pantalla
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error: any) {
      console.error('Error al crear la tarea:', error);
      
      // Si el servidor responde con un error estructurado, lo mostramos detalladamente
      if (error.response && error.response.data) {
        alert(`Error del Servidor: ${JSON.stringify(error.response.data.message || error.response.data)}`);
      } else {
        alert('Error al guardar la tarea en el servidor.');
      }
    }
  };

  // 3. MARCAR COMO COMPLETADA / DESCOMPLETADA (TOGGLE)
  const handleToggleComplete = async (id: number) => {
    try {
      const taskToToggle = tasks.find(t => t.id === id);
      if (!taskToToggle) return;

      const response = await api.patch(`/tasks/${id}`, {
        completed: !taskToToggle.completed
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? response.data : task))
      );
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
    }
  };

  // 4. ELIMINAR UNA TAREA
  const handleDeleteTask = async (id: number) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta tarea?')) return;

    try {
      await api.delete(`/tasks/${id}`);
      // La quitamos visualmente de la pantalla de inmediato
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
      alert('No se pudo eliminar la tarea en el servidor.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#fff' }}>
        Mis Tareas
      </h2>
      
      <TaskForm onAddTask={handleAddTask} />

      {loading ? (
        <p style={{ textAlign: 'center', color: '#6c757d' }}>Cargando tareas desde el servidor...</p>
      ) : (
        <TaskList 
          tasks={tasks} 
          onToggleComplete={handleToggleComplete} 
          onDelete={handleDeleteTask} 
        />
      )}
    </div>
  );
}