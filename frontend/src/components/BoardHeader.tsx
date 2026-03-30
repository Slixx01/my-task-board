import { useState } from "react";
import { useBoardStore } from "../store/boardStore";
import { updateBoard } from "../api/boardsApi";


function BoardHeader() {
    const board = useBoardStore(state => state.board)
    const boardName = board?.name
    const boardDescription = board?.description
    const setBoard = useBoardStore(state => state.setBoard)

    // State to manage the editing of the name 
    const [isEditing, setIsEditing] = useState(false)
    const [inputValue, setInputValue] = useState(board?.name || "")

    //State to manage the editing of the description
    const [isEditingDescription, setIsEditingDescription] = useState(false)
    const [descriptionInputValue, setDescriptionInputValue] = useState(board?.description || "")

    const handleSaveDescription = async () => {
        const updatedBoardDescription = await updateBoard(board?.id!, inputValue, descriptionInputValue)
        setBoard(updatedBoardDescription)
        setIsEditingDescription(false)
    }


    const handleSaveName = async () => {
        const updatedBoard = await updateBoard(board?.id!, inputValue, board?.description || "")
        setBoard(updatedBoard)
        setIsEditing(false)
    }
    return (
        <div>
            {isEditing ? (
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onBlur={() => handleSaveName()}
                />
            ) : (
                <h1 onClick={() => setIsEditing(true)}>{boardName}</h1>

            )}

            {
                isEditingDescription ? (
                    <input
                        value={descriptionInputValue}
                        onChange={(e) => setDescriptionInputValue(e.target.value)}
                        onBlur={() => handleSaveDescription()}
                    />
                ) :(
                    <p onClick={() => setIsEditingDescription(true)}>{boardDescription}</p>
                )
            }
        </div>

    )


}



export default BoardHeader