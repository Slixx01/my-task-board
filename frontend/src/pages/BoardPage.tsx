import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getBoard } from "../api/boardsApi"
import { useBoardStore } from "../store/boardStore"
import BoardHeader from "../components/BoardHeader"


function BoardPage() {
    const setBoard = useBoardStore(state => state.setBoard)

    const { boardId } = useParams()
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
        </div>
    )
}

export default BoardPage