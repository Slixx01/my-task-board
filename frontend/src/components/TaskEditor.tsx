import { useState } from "react";
import type { Task, TaskStatus } from "../types";
import { updateTask } from "../api/tasksApi";
import { useBoardStore } from "../store/boardStore";



interface TaskEditorProps {
    task: Task
    onClose: () => void
}



function TaskEditor({ task, onClose }: TaskEditorProps) {
    const updatedTaskStore = useBoardStore(state => state.updateTask)
    const handelUpdate = async () => {
        const update = await updateTask(task.id!, name, description, status, icon)
        updatedTaskStore(update)
        onClose()
    }

    const [name, setName] = useState(task.name)
    const [description, setDescription] = useState(task.description)
    const [icon, setIcon] = useState(task.icon)
    const [status, setStatus] = useState(task.status)

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-white text-lg font-semibold">Task details</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <label className="text-slate-400 text-sm mb-1 block">Task name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-800 text-white rounded-lg p-3 mb-4 outline-none border border-slate-700 focus:border-blue-500"
                />

                <label className="text-slate-400 text-sm mb-1 block">Description</label>
                <textarea
                    value={description || ''}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-slate-800 text-white rounded-lg p-3 mb-4 outline-none border border-slate-700 focus:border-blue-500 h-24 resize-none"
                    placeholder="Enter a short description"
                />

                <label className="text-slate-400 text-sm mb-1 block">Icon</label>
                <div className="flex gap-2 mb-4 flex-wrap">
                    {['📋', '⏰', '🎯', '💡', '🔥', '✅', '❌', '🚀', '⭐', '🎨'].map((emoji) => (
                        <button
                            key={emoji}
                            onClick={() => setIcon(emoji)}
                            className={`text-2xl p-2 rounded-lg border transition-all ${icon === emoji
                                    ? 'border-blue-500 bg-blue-900'
                                    : 'border-slate-700 hover:border-slate-500'
                                }`}
                        >
                            {emoji}
                        </button>
                    ))}
                </div>

                <label className="text-slate-400 text-sm mb-1 block">Status</label>
                <div className="flex gap-2 mb-6">
                    {(['InProgress', 'Completed', 'WontDo'] as TaskStatus[]).map((s) => (
                        <button
                            key={s}
                            onClick={() => setStatus(s)}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${status === s
                                    ? 'border-blue-500 bg-blue-900 text-blue-300'
                                    : 'border-slate-700 text-slate-400 hover:border-slate-500'
                                }`}
                        >
                            {s === 'InProgress' ? 'In Progress' : s === 'Completed' ? 'Completed' : "Won't Do"}
                        </button>
                    ))}
                </div>

                <button
                    onClick={handelUpdate}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 font-medium transition-all"
                >
                    Save
                </button>
            </div>
        </div>
    )
}

export default TaskEditor