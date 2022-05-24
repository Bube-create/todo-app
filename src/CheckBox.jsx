import React from "react";

const CheckBox = ({check, setChecked})=>{
	return <input type="checkbox" value={check} onChange={(e)=>setChecked(!check)}/>
}

export default CheckBox;