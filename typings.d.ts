interface Board{
    columns:Map<TypedColumn,Column>;
}

type TypedColumn = "todo" | "inprogress" | "done";

interface Column{
    id:TypedColumn;
    todos:Todo[];   
}

interface Todo{
    $id:string;
    $createdAt:string;
    title:string;
    status:TypedColumn;
    image?:image;
}

interface Image {
    bucketId: string,
    fileId: string,
}

interface TaskType {
    id: TypedColumn,
    name: string,
    description: string,
    color: string,
    ringColor: string,
}