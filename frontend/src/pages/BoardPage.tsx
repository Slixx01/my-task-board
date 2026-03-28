import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getBoard } from "../api/boardsApi"
import { useBoardStore } from "../store/boardStore"


function BoardPage() {

    const board = useBoardStore(state => state.board)
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
            <h1>{board?.name}</h1>
            <p>{board?.description}</p>
        </div>
    )
}

export default BoardPage