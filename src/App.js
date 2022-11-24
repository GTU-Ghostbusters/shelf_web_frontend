import './App.css';
import React, { useState } from "react"
import Sidebar from './Components/Sidebar/Sidebar';
import HomePage from './Components/HomePage/HomePage';

function App() {
    
    const [selected2 , setSelected2] = useState(0);
    return ( 
        <div className="App">
            <div className="AppGlass"> 
                <Sidebar setSelected2={setSelected2}/>
                {(() => {
                    switch (selected2) {
                    case 1:
                        return <HomePage/>
         
                    default:
                        return null
                    }
                })()}
            </div>    
        </div>
    );
}

export default App;
