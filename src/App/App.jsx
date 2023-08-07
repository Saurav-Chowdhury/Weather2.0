import { useState } from "react";
import './App/App.css';
import axios from "axios";

function App() {
    const [state,setState]=useState("");
    const [name,setname]=useState("");
    const [temp,settemp]=useState("");
    const [icon,seticon]=useState("");
    const [wind,setwind]=useState("");
    const [inch,setinch]=useState("")
    const [cont,setCont]=useState("");
    const [cond,setCond]=useState("");
    const [date,setDate]=useState("")

    const changeVal=(e)=>{
        if(state===""){
            
        }
        setState(e.target.value)
    }

    const changeSize=()=>{
            document.getElementById('error').style.display="none";
            document.getElementById('Location').style.display="none";
            document.getElementById('container').style.height='9vh';
    }
    const changePro=async ()=>{
        document.getElementById('Location').style.display="flex";
        document.getElementById('container').style.height='60vh';
        // document.getElementById('sizeI').style.height='18vh';
        document.getElementById('icon').style.display='block';
        // document.getElementById('stats').style.display='flex';



        const res=await fetch(`https://api.weatherapi.com/v1/current.json?key=585335c13b614715ad4122026230503 &q=${state}&aqi=no`)
        const res1=await res.json()

        if(res1.hasOwnProperty("error")){
            document.getElementById('Location').style.display="none";
            document.getElementById('error').style.display="flex";
        }
        else{
            setname(await res1.location.name)
            settemp(await res1.current.temp_c+"°c")
            seticon(await res1.current.condition.icon)
            setwind(await res1.current.wind_kph+" kmph")
            setinch(await res1.current.precip_mm+" mm")
            setCont(await res1.location.country)
            setCond(await res1.current.condition.text)
            setDate(await new Date(res1.location.localtime))
        }
    }
    return ( <>
        <div className="block">
            <div id="container" className="container">
                <div className="search-bar">
                    <input onChange={changeVal} onClick={changeSize} value={state} className="search" type="text" placeholder="Search"/>
                    <button onClick={changePro} className="bt"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg></button>
                </div>

                <div id="Location" className="Location">
                    <div className="place">{name}</div>
                    <div className="temp">{temp}</div>
                    <div id="icon" className="icon">
                        <img src={icon} alt="" />
                    </div>
                    <div className="cond">
                        {cond}
                    </div>
                    <div className="country">
                        {cont}
                    </div>

                    <div className="date">
                        {date.toString().slice(0,23)}
                    </div>
                </div>

                <div id="error" className="error">
                    <img src="https://static.thenounproject.com/png/571584-200.png" alt="" />
                    <h1>No Such Location Found !!</h1>
                </div>

               
            </div>
        </div>
    </> );
}

export default App;