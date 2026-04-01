import { deleteTask } from "../api/tasksApi";
import { useBoardStore } from "../store/boardStore";
import type { Task } from "../types";

interface TaskCardProp {
    task: Task
    onSelect: (task: Task) => void
}

function TaskCard({ task , onSelect}: TaskCardProp) {
    const deleteTaskApi = useBoardStore(state => state.deleteTask);
    const handelDeleteTask = async () => {
        await deleteTaskApi(task.id);
        deleteTask(task.id);
    }


    return (
        <div onClick={() => onSelect(task)}>
            <span>{task.icon}</span>
            <h3>{task.name}</h3>
            <p>{task.status}</p>
            <button onClick={handelDeleteTask}>Delete</button>
        </div>
    )
}

export default TaskCard 