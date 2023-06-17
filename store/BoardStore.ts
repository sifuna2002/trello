import { database, storage } from "@/appwrite";
import { getTodosGroupedByColumn } from "@/lib/getTodosGroupedByColumn";
import { create } from "zustand"

interface BoardState{
    board: Board;
    getBoard: () => void;
    setBoardState: (board: Board) => void;
    updateTodoInDb: (todo: Todo, columnId:TypedColumn) => void;
    searchString: string;
    setSearchString: (searchString: string) => void;
    deleteTask: (taskIndex:number, todoId:Todo,id:TypedColumn) => void;
}

export const useBoardStore = create<BoardState>((set,get) => ({
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
    },
    deleteTask: async (taskIndex:number, todo:Todo, id:TypedColumn) => {
        const newColumns = new Map(get().board.columns);

        //delete task from column
        newColumns.get(id)?.todos.splice(taskIndex, 1);

        set({board: {columns: newColumns}});

        if(todo.image){
            //await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
        }

        //delete task from database
        await database.deleteDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_ID!,
            todo.$id
        );
    },
}));