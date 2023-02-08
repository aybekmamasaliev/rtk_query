import React, { useState } from "react";
import "./App.css";
import { useGetGoodsQuery, useDeleteProductMutation, useAddProductsMutation } from "./redux/goodsApi";

function App() {
  const { data = [], isLoading, error } = useGetGoodsQuery();
  const [newProduct, setNewProduct]=useState("")
  // const [count, setCount]=useState("")
  const [addProduct, {isError}]=useAddProductsMutation();
  const [deleteProduct]=useDeleteProductMutation();
  const [name , setName] = useState("")
  const [price , setPrice] = useState("")
  const [img_url , setImgUrl] = useState("")
  const [desc , setDesc] = useState("")

  console.log(data);

  let dataNew={
    name,description:desc, type:"rewievs", date:"21.10.2022", _v:0
  };

  const handleProduct = async (e)=>{
    e.preventDefault()
    if(dataNew){
      await addProduct({name : name, description:desc, type:"rewievs", date:"21.10.2022" }).unwrap();
      setDesc("")
      setName("")
    }
  }


  

  const handleDeleteProduct = async (id)=>{
    await deleteProduct(id).unwrap();
  }
  
  if (isLoading) {
    return <h1>Loading...</h1>;
  } else if (error) {
    return <h1>error</h1>;
  }
  return (
    <div>
      <h1>it works</h1>
      {/* <div>
        <input type="text" value={newProduct} onChange={(e)=>setNewProduct(e.target.value)} />
        <button onClick={handleProduct}>Add Product</button>
      </div> */}

      <form className='form' >
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={name} onChange={(e)=>setName(e.target.value)} />
          </div>

     
        
          <div>
            <label htmlFor="desc">Description</label>
            <textarea id="desc" value={desc} onChange={(e)=>setDesc(e.target.value)}></textarea>
          </div>
          <div>
            <button onClick={handleProduct}>Add</button>
          </div>
        </form>
      <div>
        {data.map((item) => (
          <p key={item._id} onClick={()=>handleDeleteProduct(item._id)}>{item.name}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
