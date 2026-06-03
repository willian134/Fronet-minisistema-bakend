import type { Task } from '../types/task';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TaskList({ tasks, onToggleComplete, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return <p style={{ textAlign: 'center', color: '#6c757d' }}>No hay tareas registradas. ¡Añade una!</p>;
  }
// Componente para mostrar la lista de tareas
// Recibe la lista de tareas y funciones para marcar como completada o eliminar cada tarea
  return (
    <div>
      {tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onToggleComplete={onToggleComplete} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
}