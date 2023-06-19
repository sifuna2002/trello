import { ID, database, storage } from "@/appwrite";
import { getTodosGroupedByColumn } from "@/lib/getTodosGroupedByColumn";
import uploadImage from "@/lib/uploadImage";
import { create } from "zustand"

interface BoardState{
    board: Board;
    getBoard: () => void;
    setBoardState: (board: Board) => void;
    updateTodoInDb: (todo: Todo, columnId:TypedColumn) => void;
    searchString: string;
    newTaskInput: string;
    newTaskType:TypedColumn;
    image: File | null;
    setImage: (image: File | null) => void;

  addTask: (todo: string, columnId: TypedColumn, image?: File | null) => void;
    setNewTaskType:(columnId:TypedColumn)=>void;
    setNewTaskInput: (input: string) => void;
    setSearchString: (searchString: string) => void;
    deleteTask: (taskIndex:number, todoId:Todo,id:TypedColumn) => void;
}

export const useBoardStore = create<BoardState>((set,get) => ({
    image: null,
    setImage: (image) => set({ image }),
    newTaskType:"todo",
    setNewTaskType: (columnId:TypedColumn)=>set({newTaskType:columnId}),
    searchString: "",
    setSearchString: (searchString) => set({ searchString }),
    newTaskInput: "",
    setNewTaskInput: (input:string) => set({ newTaskInput: input }),
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
            await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
        }

        //delete task from database
        await database.deleteDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_ID!,
            todo.$id
        );
    },

  addTask: async (todo, columnId, image = null) => {
    let file: Image | undefined;

    if (image) {
      const fileUploaded = await uploadImage(image);
      if (fileUploaded) {
        file = {
          bucketId: fileUploaded.bucketId,
          fileId: fileUploaded.$id,
        };
      }
    }
    const { $id } = await database.createDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_TODOS_ID!,
        ID.unique(),
        {
          title: todo,
          status: columnId,
          ...(file && { image: JSON.stringify(file) }),
        }
      );
          // update board
    set({ newTaskInput: "" });
    set((state) => {
      const newColumns = new Map(state.board.columns);

      const newTodo: Todo = {
        $id,
        $createdAt: new Date().toISOString(),
        title: todo,
        status: columnId,
        ...(file && { image: file }),
        // $collectionId: "",
        // $databaseId: "",
        // $updatedAt: "",
        // $permissions: [],
      };

      const column = newColumns.get(columnId);

      if (!column) {
        newColumns.set(columnId, {
          id: columnId,
          todos: [newTodo],
        });
      } else {
        newColumns.get(columnId)?.todos.push(newTodo);
      }

      return {
        board: {
          columns: newColumns,
        },
      };
    });
    }
}));