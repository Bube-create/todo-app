import React from "react";
import Todo from "./Todo";

const RenderList = ({todos, dragStart, dragEnter, drop})=>{
	return <div>{todos.map((item, index) =><div draggable onDragStart={(e) => dragStart(e, index)} onDragEnter={(e) => dragEnter(e, index)}   onDragEnd={drop}  key={item.id}>  <Todo  todo={item} /> </div>)}</div>
}

export default RenderList;