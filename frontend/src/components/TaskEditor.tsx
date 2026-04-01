import { useState } from "react";
import type { Task, TaskStatus } from "../types";
import { updateTask } from "../api/tasksApi";
import { useBoardStore } from "../store/boardStore";



interface TaskEditorProps{
    task : Task
    onClose : () => void
}



function TaskEditor({task , onClose}: TaskEditorProps) {
   const updatedTaskStore = useBoardStore(state => state.updateTask)
    const handelUpdate = async () =>{
      const update =  await updateTask(task.id!, name, description, status, icon )
        updatedTaskStore(update)
        onClose()
    }

    const [name, setName] = useState(task.name)
    const [description, setDescription] = useState(task.description)
    const [icon, setIcon] = useState(task.icon)
    const [status, setStatus] = useState(task.status)

    return (
        <div >
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
            <input type="text" value={icon} onChange={(e) => setIcon(e.target.value)} />
            <select value={status} onChange={(e)=> setStatus(e.target.value as TaskStatus)}>
                <option value="InProgress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="WontDo">Won't Do</option>
            </select>
            <button onClick={handelUpdate}>Update</button>
        </div>
        
    )
}

export default TaskEditor