import {useContext, useReducer, createContext} from 'react'

export const TodoState = createContext(null)
export const TodoDispatch = createContext(null);




export function TodoListProvider ({children}){

	const todos = localStorage.getItem("todos");	
	console.log(todos)
	
	const [todoState, dispatch] = useReducer(todolistReducer, JSON.parse(todos) || []);


	return <TodoState.Provider value={todoState}>
		<TodoDispatch.Provider value={dispatch}>
			{children}
		</TodoDispatch.Provider>
	</TodoState.Provider>
}


function todolistReducer(state, action){
	switch (action.type) {
		case "add":
			const {content, id, isCompleted} = action.payload;
			localStorage.setItem("todos", JSON.stringify([...state, {id: id,content:  content, isCompleted: isCompleted}]))
			return [...state, {id: id,content:  content, isCompleted: isCompleted}]
		case "checked"	:
			const res = state.map(item=>{
				if(item.id === action.payload.id){
					return {...item, isCompleted: action.payload.isCompleted};
				}
				return item
			})
			localStorage.setItem("todos", JSON.stringify(res))
			return res;
		case "delete":
			localStorage.setItem("todos", JSON.stringify([...state.filter(item=> item.id !== action.payload.id)]))
			return [...state.filter(item=> item.id !== action.payload.id)]
		case "deleteCompleted":
			localStorage.setItem("todos", JSON.stringify([...state.filter(item=> !item.isCompleted)]))
			return [...state.filter(item=> !item.isCompleted)];
		case "reshuffle":
			localStorage.setItem("todos", JSON.stringify([...action.payload])) 
			return [...action.payload];
			
		default:
			throw Error('Unknown action: ' + action.type);
	}
}