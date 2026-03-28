import { useEffect, useState } from "react";
import { useBoardStore } from "../store/boardStore";


function BoardHeader() {
    const board = useBoardStore(state => state.board)
    const boardName = board?.name
    const boardDescription = board?.description
    
    const [isEditing, setIsEditing] = useState(false)
    const [inputValue, setInputValue] = useState(board?.name || "")

    
    useEffect(() => {
       
    }, []);

    useState(() => {

    });

    return (
        <div>
            <h1>{boardName}</h1>
            <p>{boardDescription}</p>
        </div>
    )
}

export default BoardHeader