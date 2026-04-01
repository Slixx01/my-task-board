import { useState } from "react";
import { addTask } from "../api/tasksApi";
import { useBoardStore } from "../store/boardStore";
import type { TaskStatus } from "../types";

interface TaskAddProp{
    onClose : () => void
}





function TaskAdd({onClose}: TaskAddProp) {
    const board = useBoardStore(state => state.board)
    const taskAddStore = useBoardStore(state => state.addTask)
    const handleAdd = async () => {
        const taskAdd = await addTask(board?.id!, name, status, description, icon)
        taskAddStore(taskAdd)
        onClose()
    
    }

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [icon, setIcon] = useState('')
    const [status, setStatus] = useState<TaskStatus>("InProgress")

    return (
        <div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Task name"/>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Task description"/>
            <input type="text" value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="Task icon"/>
            <select value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)}>
                <option value="InProgress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="WontDo">Won't Do</option>
            </select>
            <button onClick={handleAdd}>Add Task</button>
        </div>
    )
}

export default TaskAdd