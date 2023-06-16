import { database } from "@/appwrite";
import { getTodosGroupedByColumn } from "@/lib/getTodosGroupedByColumn";
import { create } from "zustand"

interface BoardState{
    board: Board;
    getBoard: () => void;
    setBoardState: (board: Board) => void;
    updateTodoInDb: (todo: Todo, columnId:TypedColumn) => void;
    searchString: string;
    setSearchString: (searchString: string) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
    searchString: "",
    setSearchString: (searchString) => set({ searchString }),
    board: {
        columns: new Map<TypedColumn, Column>()
    },
    getBoard: async() => {
        const board = await getTodosGroupedByColumn();
        set({ board });
    },
    setBoardState: (board) => set({ board }),

    updateTodoInDb: async (todo, columnId) => {
        await database.updateDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_ID!,
            todo.$id,
            {
                status: columnId,
            }
        );
    }
}));