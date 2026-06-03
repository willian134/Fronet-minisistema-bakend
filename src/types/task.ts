export interface Task {
  id: number;
  title: string;
  priority: 'Alta' | 'Media' | 'Baja';
  completed: boolean;
}