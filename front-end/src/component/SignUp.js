import React,{useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom'
const SignUp =()=>{
    const[name,setName]=useState("");
    const[password,setPassword]=useState("");
    const[email,setEmail]=useState("");
    const navigate = useNavigate();
    const [error,setError]=React.useState(false)

    useEffect(()=>{
        const auth= localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    })
    const collectData= async ()=>{
        if(!name || !email || !password){
            setError(true)
            return false;
        }
            console.warn(name,email,password);
            let result = await fetch('http://localhost:5020/register',{
                method:'post',
                body :JSON.stringify({name,email,password}),
                headers:{
                    'Content-Type':'application/json'
                },
            })
            result = await result.json()
            console.log(result);
            localStorage.setItem("user",JSON.stringify(result.result)); 
            localStorage.setItem("token",JSON.stringify(result.auth)); 
            if(result){
                navigate('/')
            }
    }
    return(
        <div className='Register'>
            <h1 className='headtext'>Register</h1>
            <input className='inputBox' type="text" 
            value ={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Name'/>
            {error && !name && <span className='invalid-input'>Enter valid input</span>}
            <input className='inputBox' type="text"
            value ={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter E-mail'/>
            {error && !email && <span className='invalid-input'>Enter valid input</span>}
            <input className='inputBox' type="password"
            value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password'/>
            {error && !password && <span className='invalid-input'>Enter valid input</span>}
            <button onClick={collectData} className='appButton' type='button'>Sign Up</button>
        </div>
    )
};
export default SignUp;


