import React, { useContext, useState, useRef } from "react";
import RenderList from "./RenderList";
import { TodoDispatch, TodoState } from "./TodoContext";
import styled from "styled-components";
//drag and drop functionality copied form: 
//https://www.aurigait.com/blog/drag-and-drop-in-react/
const initialState = {
	all:false,
	active: false,
	completed: false
}
const TodoRender = ()=>{
	const [renderState, setRenderState] = useState({...initialState, all: true});
	const todos = useContext(TodoState)
	const todoDispatch = useContext(TodoDispatch)


	const dragItem = useRef();
	const dragOverItem = useRef(); 
	const dragStart = (e, position) => {
		dragItem.current = position;
	  };
	const dragEnter = (e, position) => {
		dragOverItem.current = position;
	  };

	function render(state){
		setRenderState({...initialState, [state]: true})
	} 

	const drop = (e) => {
		const copyListItems = [...todos];
		const dragItemContent = copyListItems[dragItem.current];
		copyListItems.splice(dragItem.current, 1);
		copyListItems.splice(dragOverItem.current, 0, dragItemContent);
		dragItem.current = null;
		dragOverItem.current = null;
		 todoDispatch({type: "reshuffle", payload: copyListItems}) 
	  };
	  

	return (<StyledDiv><div  className="todo-render">{renderState.all ? <RenderList todos={todos} dragStart={dragStart} dragEnter={dragEnter} drop={drop}/> : null}
	{renderState.active ?  
		 <RenderList  todos={todos.filter(item => !item.isCompleted)} dragStart={dragStart} dragEnter={dragEnter} drop={drop}/>: null}
	{renderState.completed ? <RenderList  todos={todos.filter((item)=>item.isCompleted)} dragStart={dragStart} dragEnter={dragEnter} drop={drop} /> : null}

	
	<Controls><p>{todos.length} items left</p>

		<div className="filter-desktop">
		
		<button onClick={()=>render("all")} style={{color: renderState.all ? "blue": null}}>All</button> 
		<button onClick={()=>render("active")} style={{color: renderState.active ? "blue": null}}>Active</button>
		<button onClick={()=>render("completed")} style={{color: renderState.completed ? "blue": null}}>Completed</button>
		</div>
		<button onClick={()=> todoDispatch({type: "deleteCompleted"})} className="clear">Clear Completed</button>

	
		
		</Controls>
	</div>
		<div className="filter-mobile">
		<button onClick={()=>render("all")} style={{color: renderState.all ? "blue": null}}>All</button> 
		<button onClick={()=>render("active")} style={{color: renderState.active ? "blue": null}}>Active</button>
		<button onClick={()=>render("completed")} style={{color: renderState.completed ? "blue": null}}>Completed</button>
		</div>
	</StyledDiv>
	)
}  

export default TodoRender;

const StyledDiv = styled.div`
& > div{
	border-radius: 8px;
}


.filter-mobile{
	

	display: flex;
	justify-content: space-around;
	max-width: 450px;
	padding: 16px;
	border-radius: 8px;
	margin: 32px auto 0;
	button {
		background: none;
		border: 0;
		cursor: pointer;
		padding: 0;
		
	}

	button:active,  button:focus{
		color: blue;
	}
}

.filter-desktop {
	display: none;
}

@media (min-width: 900px){
	.filter-mobile{
		display:none;
	}
	
	.filter-desktop {
		display: revert;
		padding: 0 16px;
	}
}
`

const Controls = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 16px;
position:relative;
border-radius: 8px;

button {
	background: none;
	border: 0;
	cursor: pointer;
	padding: 0;
	margin: 8px;
}

button:active,  button:focus{
	color: blue;
}

button.clear{
	margin: 0;
}
`