import styled from "styled-components";
import { TodoListProvider } from "./TodoContext";
import TodoRender from "./TodoRender";
import TodoInput from "./TodoInput";
import { useState } from "react";
import { useEffect } from "react";


function App() {

  const [lightDark,setLightDark]= useState(false);

  useEffect(()=>{
    let tt = JSON.parse(localStorage.getItem("darktoggle"))
    tt = tt === null ? false : tt;

    setLightDark(JSON.parse(!tt));

  }, [])


  function lightToggle(){
    setLightDark(!lightDark);
    localStorage.setItem("darktoggle", JSON.stringify(lightDark))
  }

  return (
    <TodoListProvider>
  <TextStyle className={lightDark ? "dark-text": "light-text"}>
      <StyledHeader className={lightDark ? "dark": "light"}>
      <div className="header">
        <h1>TODO</h1> 
      <div onClick={lightToggle}> {lightDark ? <img src="./images/icon-sun.svg"/> : <img src="./images/icon-moon.svg"/> }</div>
      </div>


      </StyledHeader>
      
      <StyledDiv className="main-content">
        <TodoInput />
        <TodoRender />
      </StyledDiv>
      <p className="dragdesc">Drag and drop to reorder list</p>
    
  </TextStyle>

  </TodoListProvider>
  ) 
} 

export default App;
  
const TextStyle = styled.div`
min-height: 120vh;

h1 {
  letter-spacing: 16px;
  color: white;
}
.dragdesc {
  text-align: center;
  margin: 32px 0 ;

  @media(min-width: 900px){
  margin: 150px 0 ;

  }
}

&.light-text {
  color:hsl(235, 19%, 35%);
  background-color: white;
  .main-content {

    .todo-input {
        background-color: white; 
        box-shadow: rgba(91, 164, 164, 0.22) 0px 4px 15px;

    }
    .todo-render {
        background-color: white; 
        box-shadow: rgba(91, 164, 164, 0.22) 0px 4px 15px;

    }

    .filter-mobile {
        background-color: white; 
        box-shadow: rgba(91, 164, 164, 0.22) 0px 4px 15px;
    }
    button {
      color : hsl(236, 9%, 61%);
    }
    button:hover {
      color: hsl(235, 19%, 35%);
    }
    p {
      color : hsl(236, 9%, 61%);

    }
    .filter-desktop {  
      button {
        color : hsl(236, 9%, 61%);
      }

      button:hover {
        color: hsl(235, 19%, 35%);
      }
    }

  }
}

&.dark-text {
  color: hsl(234, 39%, 85%);
  background-color: hsl(235, 21%, 11%);
  .main-content {

    .todo-input {
         background-color: hsl(235, 24%, 19%) ;
      box-shadow: rgba(91, 164, 164, 0.22) 0px 4px 15px;

    }
    .todo-render {
         background-color:hsl(235, 24%, 19%);
      box-shadow: rgba(91, 164, 164, 0.22) 0px 4px 15px;

    }

    .filter-mobile {
         background-color:hsl(235, 24%, 19%);
      box-shadow: rgba(91, 164, 164, 0.22) 0px 4px 15px;
    }

    button {
      color :  hsl(234, 11%, 52%);
    }
    button:hover {
      color: hsl(236, 33%, 92%);
    }
    p {
      color :hsl(234, 11%, 52%);

    }
    .filter-desktop {  
      button {
          color :hsl(234, 11%, 52%);
      }

      button:hover {
        color: hsl(236, 33%, 92%);
      }
    }


    
  }
}
`

const StyledHeader = styled.div`
height: 40vh;
.header{
  display: flex;
  align-items:center;
  justify-content: space-between;
  margin: 0 16px;
  padding-top: 32px;
  @media(min-width: 900px){
    max-width: 550px;
    margin: 0 auto;
    padding-top: 52px;
  }
}
&.dark {
  background: url("./images/bg-mobile-dark.jpg") ;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  @media (min-width: 900px){
    background: url("./images/bg-desktop-dark.jpg") ;

  }
}

&.light {
    background: url("./images/bg-mobile-light.jpg") ;
    background-repeat: no-repeat ;
    background-size: cover;
    background-position: center;
  @media (min-width: 900px){
    background: url("./images/bg-desktop-light.jpg") ;

  }

}
`

const StyledDiv = styled.div`


&.main-content{
  margin: 0 16px;
  margin-top: -110px;
  

  @media (min-width: 900px){
    max-width: 550px;
    margin: -120px auto;
  }

}


`