import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getBoard } from "../api/boardsApi"
import { useBoardStore } from "../store/boardStore"
import BoardHeader from "../components/BoardHeader"
import TaskCard from "../components/TaskCard"
import type { Task } from "../types"
import TaskEditor from "../components/TaskEditor"
import TaskAdd from "../components/TaskAdd"


function BoardPage() {
    const setBoard = useBoardStore(state => state.setBoard)
    const board = useBoardStore(state => state.board)
    const { boardId } = useParams()
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)
    const [isAdding, setIsAdding] = useState(false)
    useEffect(() => {
        const fetchBoard = async () => {
            const board = await getBoard(boardId!)
            setBoard(board)
        }
        fetchBoard()
    }, [])

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-8">
            <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-8 w-full max-w-2xl">

                <BoardHeader />
                {board?.items.map((task) => (
                    <TaskCard key={task.id} task={task} onSelect={setSelectedTask} />
                ))}
                {selectedTask && <TaskEditor task={selectedTask} onClose={() => setSelectedTask(null)} />}
                <button
                    onClick={() => setIsAdding(true)}
                    className="w-full mt-4 p-4 rounded-xl bg-slate-800 text-slate-400 hover:bg-blue-900 hover:text-blue-300 transition-all text-left flex items-center gap-3 font-medium border border-slate-700"
                >
                    <span className="text-xl bg-amber-400 text-white rounded-lg w-8 h-8 flex items-center justify-center">+</span>
                    Add new task
                </button>
                {isAdding && <TaskAdd onClose={() => setIsAdding(false)} />}

            </div>
        </div>
    )
}

export default BoardPage