import type { Task } from '../types/task';
import { Check, Trash2 } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TaskItem({ task, onToggleComplete, onDelete }: TaskItemProps) {
  return (
    <div style={{
      ...styles.item,
      backgroundColor: task.completed ? '#e2e3e5' : '#ffffff',
      borderLeft: `5px solid ${task.priority === 'Alta' ? 'red' : task.priority === 'Media' ? 'orange' : 'green'}`
    }}>
      <span style={{ 
        textDecoration: task.completed ? 'line-through' : 'none',
        color: task.completed ? '#6c757d' : '#000',
        flex: 1 
      }}>
        {task.completed ? '✔ ' : ''} {task.title} - <strong>{task.priority}</strong>
      </span>
      
      <div style={{ display: 'flex', gap: '5px' }}>
        <button onClick={() => onToggleComplete(task.id)} style={styles.completeBtn} title="Marcar completada">
          <Check size={16} />
        </button>
        <button onClick={() => onDelete(task.id)} style={styles.deleteBtn} title="Eliminar">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

const styles = {
  item: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', marginBottom: '10px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', color: '#000' },
  completeBtn: { backgroundColor: '#28a745', color: 'white', border: 'none', padding: '5px 8px', borderRadius: '4px', cursor: 'pointer' },
  deleteBtn: { backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 8px', borderRadius: '4px', cursor: 'pointer' }
};