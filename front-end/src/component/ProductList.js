import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const ProductList = () => {
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch('http://localhost:5020/products',{
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    setProducts(result);
  }

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5020/product/${id}`,{
        method:"Delete",
        headers:{
          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    });
    result = await result.json();
    if(result){
        getProducts();
    }
  };
const searchHandle =async (event)=>{
  let key = event.target.value;
  if(key){
    let result = await fetch(`http://localhost:5020/search/${key}`,{
            headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    result = await result.json();
    if(result){
      setProducts(result);
    }
  }else{
    getProducts();
  }
}
  return (
    <div className="product-list">
      <h1>Product List</h1>
      <input type="text" className="search-product-Box"  placeholder="Search Product" 
      onChange={searchHandle}
      />
      <ul>
        <li>S.No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operation</li>
      </ul>

      {
      Products.length>0 ? Products.map((item, index) => 
        <ul key={item._id}>
          <li>{index + 1}</li>
          <li>{item.name}</li>
          <li>${item.price}</li>
          <li>{item.category}</li>
          <li><button className="deletebutton" onClick={() => deleteProduct(item._id)}>Delete</button>
          <Link to={"/update/"+item._id}style={{ textDecoration: 'none', color: '#8f8380', marginLeft: '9px'}}>Update</Link>
          </li>
        </ul>
      )
      : <h1> NO Result Found !</h1>
    }
    </div>
  );
}

export default ProductList;
