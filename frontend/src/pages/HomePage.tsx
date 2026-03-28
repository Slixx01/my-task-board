import { useNavigate } from "react-router-dom";
import { createBoard } from "../api/boardsApi";
import { useEffect } from "react";

function HomePage() {
    const navigate = useNavigate();
    useEffect(() => {
        const create = async () =>{
            const board = await createBoard('My Board')
            navigate(`/board/${board.id}`)
        }
        create()
    }, [])
    
    return <div>Creating your board...</div>
}

export default HomePage;