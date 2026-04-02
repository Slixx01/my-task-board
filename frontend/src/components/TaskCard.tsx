import { deleteTask } from "../api/tasksApi";
import { useBoardStore } from "../store/boardStore";
import type { Task } from "../types";

interface TaskCardProp {
    task: Task
    onSelect: (task: Task) => void
}

function TaskCard({ task, onSelect }: TaskCardProp) {
    const deleteTaskApi = useBoardStore(state => state.deleteTask);
    const handelDeleteTask = async () => {
        await deleteTask(task.id);
        deleteTaskApi(task.id);
    }


    return (
        <div onClick={() => onSelect(task)} className={`flex items-center justify-between p-4 rounded-xl mb-3 cursor-pointer transition-all border ${task.status === 'InProgress' ? 'bg-blue-950 border-yellow-400' :
                task.status === 'Completed' ? 'bg-green-950 border-green-400' :
                    'bg-red-950 border-red-400'
            }`}>
            <div className="flex items-center gap-3">
                <span className="text-2xl">{task.icon}</span>
                <div>
                    <h3 className="font-semibold text-white">{task.name}</h3>
                    <p className="text-sm text-slate-400">{task.description}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${task.status === 'InProgress' ? 'bg-yellow-400 text-yellow-900' :
                    task.status === 'Completed' ? 'bg-green-400 text-green-900' :
                        'bg-red-400 text-red-900'
                    }`}>{task.status === 'InProgress' ? 'In Progress' : task.status === 'Completed' ? 'Completed' : "Won't Do"}</span>
                <button onClick={(e) => { e.stopPropagation(); handelDeleteTask(); }} className="text-red-400 hover:text-red-600">✕</button>
            </div>
        </div>
    )
}

export default TaskCard 