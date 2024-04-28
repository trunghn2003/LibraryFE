export const CreateTodo = (data) => {
    return {
        type: "CREATE_TODO",
        content: data
    }
}
export const completedTodo = (id) => {
    return {
        type: "COMPLETE_TODO",
        id: id
    }
}
export const undoTodo = (id) => {
    return {
        type: "UNDO_TODO",
        id: id
    }
}
export const deleTodo = (id) => {
    return {
        type: "DELETE_TODO",
        id: id
    }
}