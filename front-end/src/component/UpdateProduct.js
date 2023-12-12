import React, { useEffect } from 'react';
import {useParams,useNavigate} from 'react-router-dom';
const UpdateProduct =()=>{
    const [name,setName] = React.useState('');
    const [price,setPrice] = React.useState('');
    const [category,setCategory] = React.useState('');
    const [company,setCompany] = React.useState('');
    const params = useParams();
    const navigate = useNavigate();
    
    useEffect(()=>{
        getProductDetails();
    },[params.id])

    const getProductDetails = async ()=>{
        console.log(params)
        let result = await fetch(`http://localhost:5020/product/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
              }
        });
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const updateProduct = async()=>{
        console.log(name,price,category,company)
        let result = await fetch(`http://localhost:5020/product/${params.id}`,{
            method: 'Put',
            body:JSON.stringify({name,price,category,company}),
            headers:{
                'content-Type':"application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json()
        console.log(result)
        navigate('/');
    }   


    return(
    <div className='product'>
        <h1 className='updatepProduct'>Update Product</h1>
        <input className='inputBox' type ='text' placeholder='Enter Product Name'
        value={name} onChange={(e)=>{setName(e.target.value)}}/>
        
        <input className='inputBox' type ='text' placeholder='Enter Product Price'
        value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
        
        <input className='inputBox' type ='text' placeholder='Enter Product Category'
        value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
       
        <input className='inputBox' type ='text' placeholder='Enter Product Company'
        value={company} onChange={(e)=>{setCompany(e.target.value)}}/>
        
        <button onClick={updateProduct} className='appButton'> Update </button>
    </div>
)}

export default UpdateProduct;