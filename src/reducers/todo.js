const init = [
    {
        id: 1,
        content: "Công việc 1",
        completed: false
    },
    {
        id: 2,
        content: "Công việc 2",
        completed: true
    },
    {
        id: 3,
        content: "Công việc 3",
        completed: false
    },
]
const todoReduces = (state = init, action) => {
    let newState = [...state];
    switch (action.type) {
        case "CREATE_TODO":
            if (action.content !== "") {
                state = [...state, {
                    id: Date.now(),
                    content: action.content,
                    completed: false
                }]
            }
            return state;
        case "COMPLETE_TODO":

            const index = state.findIndex(index => index.id === action.id);
            newState[index].completed = true;
            // console.log(state);
            return newState;
        case "UNDO_TODO":

            const index1 = state.findIndex(index => index.id === action.id);
            newState[index1].completed = false;
            // console.log(state);
            return newState;
        case "DELETE_TODO":

            const newState1= state.filter(index => index.id !== action.id);
            console.log(newState1);
            return newState1;
        default:
            return state;

    }


}
export default todoReduces