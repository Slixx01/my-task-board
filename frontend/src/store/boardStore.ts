import { create } from 'zustand'
import type { Board, Task } from '../types'

interface BoardStore {
    board: Board | null
    setBoard: (board: Board) => void
    addTask: (task: Task) => void
    updateTask: (task: Task) => void
    deleteTask: (taskId: string) => void
}

export const useBoardStore = create<BoardStore>((set) => ({
    board: null,

    setBoard: (board) => set({ board }),

    addTask: (task) => set((state) => ({
        board: state.board ? {
            ...state.board,
            items: [...state.board.items, task]
        } : null
    })),

    updateTask: (task) => set((state) => ({
        board: state.board ? {
            ...state.board,
            items: state.board.items.map(t => t.id === task.id ? task : t)
        } : null
    })),

    deleteTask: (taskId) => set((state) => ({
        board: state.board ? {
            ...state.board,
            items: state.board.items.filter(t => t.id !== taskId)
        } : null
    })),
}))