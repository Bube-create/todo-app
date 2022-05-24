import React, {useContext, useState} from "react";
import { TodoDispatch } from "./TodoContext";
import styled from "styled-components";


const TodoInput = ()=>{
	const [todoInput, setTodoInput] = useState("")
	const [check, setChecked] = useState(false)
	const tododispatch = useContext(TodoDispatch);

	function submitHandler(e) {
		e.preventDefault();

		tododispatch({type: "add", payload : {id: Math.floor(Math.random() * 100), content: todoInput, isCompleted: false}})

		setTodoInput("")
		
	}


	return <StyledInputForm className="todo-input">
		<form onSubmit={submitHandler}>
		<span></span>
		<input type="text" value={todoInput} onChange={(e)=>setTodoInput(e.target.value)} placeholder="Create a new todo..."/>
		</form></StyledInputForm>
}
export default TodoInput;


const StyledInputForm = styled.div`
padding: 0 16px;
margin-bottom: 16px;
border-radius: 8px; 


span {
	height: 30px;
	width: 35px;
	border-radius: 50%;
	border: 1px solid grey;
	display: inline-block; 
	position: relative;
}

form {
	display :flex;
	align-items:center;
	gap: 32px;

}

input[type="text"]{
	width: 100%;
	border: 0;
	padding: 16px 16px 16px 0px;
	background: inherit;
	color: inherit;
}

input[type="text"]:focus{
	outline:none;
}
`