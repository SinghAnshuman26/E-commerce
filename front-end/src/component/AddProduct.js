import React from 'react';
const AddProduct =()=>{
    const [name,setName] = React.useState('');
    const [price,setPrice] = React.useState('');
    const [category,setCategory] = React.useState('');
    const [company,setCompany] = React.useState('');
    const [error,setError]=React.useState(false)

    const addProduct = async()=>{
        console.log(!name);
        if(!name || !price || !category || !company){
            setError(true)
            return false;
        }
        console.log(name,price,category,company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5020/add-product",{
            method :'post',
            body:JSON.stringify({name,price,category,company,userId}),
            headers:{
                "Content-Type":"application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }    
        })
        result = await result.json();
        console.log(result)
        {
            setName('');
            setPrice('');
            setCategory('');
            setCompany('');
            setError(false);
          }
    }   


    return(
    <div className='product'>
        <h1 className='addproduct'>Add Product</h1>
        <input className='inputBox' type ='text' placeholder='Enter Product Name'
        value={name} onChange={(e)=>{setName(e.target.value)}}/>
        {error && !name && <span className='invalid-input'>Enter valid input</span>}
        <input className='inputBox' type ='text' placeholder='Enter Product Price'
        value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
        {error && !price && <span className='invalid-input'>Enter valid input</span>}
        <input className='inputBox' type ='text' placeholder='Enter Product Category'
        value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
        {error && !category && <span className='invalid-input'>Enter valid input</span>}
        <input className='inputBox' type ='text' placeholder='Enter Product Company'
        value={company} onChange={(e)=>{setCompany(e.target.value)}}/>
        {error && !company && <span className='invalid-input'>Enter valid input</span>}
        <button onClick={addProduct} className='appButton'>Add Product</button>
    </div>
)}

export default AddProduct;