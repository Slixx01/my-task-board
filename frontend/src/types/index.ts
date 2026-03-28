export type TaskStatus = 'InProgress' | 'Completed' | 'WontDo';

export interface Task{
    id: string;
    name: string;
    description?: string;
    icon: string; 
    status: TaskStatus;
    displayOrder: number;
    createdAt: string;
    attatchmentsUrl?: string;
}

export interface Board{
    id: string;
    name: string;
    description?: string;
    createdAt: Date;
    items: Task[];
}