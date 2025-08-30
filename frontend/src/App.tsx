import  { useState, useEffect } from 'react';
import axios from 'axios';
import {Button} from "./components/ui/button";

const App = () => {
  const [message, setMessage] = useState("");
    // Define your state properties here

    useEffect(()=>{
      axios.get("http://localhost:5000/")
        .then((res)=>{
          setMessage(res.data)
        
        })
        .catch((err)=>{
          console.error("Error fetching data:", err.message);
        });
      
    })

  
  return (
    <div className='text-center bg-blue-400' >
       <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
      </div>
      
      <h1>frontend is running</h1>
      <p>Backend says {message}</p>
    </div>
  )
}

export default App


