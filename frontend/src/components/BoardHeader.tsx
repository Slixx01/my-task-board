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
        const updatedBoard = await updateBoard(board?.id!, inputValue, board?.description || "Click to add description")
        setBoard(updatedBoard)
        setIsEditing(false)
    }
    return (
        <div className="mb-6">
            {isEditing ? (
                <input className="text-3xl font-bold bg-transparent border-b border-amber-500 text-outline outline-none w-full mb-2"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onBlur={() => handleSaveName()}
                    onKeyDown={(e) => e.key ==="Enter" && handleSaveName()}
                />
            ) : (
                <h1 className="text-3xl font-bold text-white cursor-pointer hover:text-blue-400 mb-2" onClick={() => setIsEditing(true)}>
                    {boardName} ✏️
                </h1>
           
            
            )}

            {
                isEditingDescription ? (
                    <input className="text-sm bg-transparent border-b border-amber-500 text-gray-400 outline-none w-full"
                        value={descriptionInputValue}
                        onChange={(e) => setDescriptionInputValue(e.target.value)}
                        onBlur={() => handleSaveDescription()}
                        onKeyDown={(e) => e.key ==="Enter" && handleSaveDescription()}
                      
                    />
                ) :(
                    <p  className="text-sm text-slate-400 cursor-pointer hover:text-blue-400" onClick={() => setIsEditingDescription(true)}>{boardDescription || "Click to add description"} </p>
                )
            }
        </div>

    )


}



export default BoardHeader