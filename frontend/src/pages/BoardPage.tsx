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
        <div>
            <BoardHeader />
            {board?.items.map((task) => (
                <TaskCard key={task.id} task={task} onSelect={setSelectedTask} />
            ))}
            {selectedTask && <TaskEditor task={selectedTask} onClose={() => setSelectedTask(null)}/>}
            <button onClick={() => setIsAdding(true)}> Add New Task</button>
            {isAdding && <TaskAdd onClose={() => setIsAdding(false)}/>}
        </div>
    )
}

export default BoardPage