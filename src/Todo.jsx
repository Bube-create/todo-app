import React, { useContext, useState } from "react";
// import CheckBox from "./CheckBox";
import { TodoDispatch } from "./TodoContext";
import styled from "styled-components";



const Todo =({todo})=>{
	const [check, setChecked] = useState(false)

	const tododispatch = useContext(TodoDispatch);

	function handleCheck(){
		setChecked(!check)
		tododispatch({type: "checked", payload: {id: todo.id, isCompleted: !todo.isCompleted}})
	}

	return <StyledTodoInput >
	<StyledCheckBox>
		<input type="checkbox" value={todo.isCompleted} onChange={handleCheck} />
		<span className={todo.isCompleted ? "checked": null}></span>
	</StyledCheckBox>
		<div className="content" style={{textDecoration : todo.isCompleted ? "line-through" : null, color : todo.isCompleted ? "hsl(234, 11%, 52%)" : null}}>{todo.content}</div>

		<div onClick={() =>tododispatch({type: "delete", payload : {id: todo.id}})} className="delete-btn"><img src="./images/icon-cross.svg"/></div>
	</StyledTodoInput>
}
 
export default Todo;


const StyledTodoInput = styled.div`
display: flex;
gap: 32px;
padding: 16px 0;
align-items: center;
border-bottom: 1px solid grey;
padding: 16px;
.content {
	flex: 2;
	font-size: 1.2rem;
}

.delete-btn {
cursor: pointer;
}
`
const StyledCheckBox = styled.label`
 
input[type="checkbox"] {
	display: none;
}

span {
	height: 30px;
	width: 30px;
	border-radius: 50%;
	border: 1px solid grey;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
}

span:hover, span:focus {
	cursor: pointer; 
	border: 3px solid hsl(220, 98%, 61%);
}
// input[type="checkbox"]:checked + span {
// 	background-color: hsl(220, 98%, 61%);
// }
// input[type="checkbox"]:checked + span:before{
	
// 	background-image: url("./images/icon-check.svg");
// 	background-repeat: no-repeat;
// 	background-size: cover;
// 	background-position: center;
//     display: inline-block;
//     width: 15px; 
// 	height: 15px;
//     content:"";
// }

span.checked {
	background-color: hsl(220, 98%, 61%);
}

span.checked:before{
	
	background-image: url("./images/icon-check.svg");
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
    display: inline-block;
    width: 15px; 
	height: 15px;
    content:"";
}



`