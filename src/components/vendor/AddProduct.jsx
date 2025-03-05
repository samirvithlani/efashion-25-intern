import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export const AddProduct = () => {
  const {register,handleSubmit} = useForm()
  const [categories, setcategories] = useState([])
  const [subCategories, setsubCategories] = useState([])
  const submitHandler = async(data) => {

    data.vendor_id = localStorage.getItem("id")
    data.price = parseFloat(data.price)
    console.log(data)
    const res = await axios.post("/create_product",data)
    console.log(res.data)
    //post
  }

  const getAllCategories = async() => {

    const res = await axios.get("/getAllCategories")
    console.log(res.data)
    setcategories(res.data)


  }

  const getSubCategories = async(category_id) => {
    const res = await axios.get("/getSubCategoryByCategoryId/"+category_id)
    console.log(res.data)
    setsubCategories(res.data)
  }

  useEffect(()=>{
    getAllCategories()
  },[])



  return (
    <div style={{textAlign: 'center'}}>
      <h1>ADD PRODUCT</h1>

      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label>NAME</label>
          <input type='text' {...register("name")}/>
        </div>
        <div>
          <label>PRICE</label>
          <input type='text' {...register("price")}/>
        </div>
        <div>
          <label>IMAGE URL</label>
          <input type='text' {...register("image_url")}/>
        </div>
        <div>
          <label>CATEGORY</label>
          <select {...register("category_id")} onChange={(event)=>{getSubCategories(event.target.value)}}>
            <option value="">Select Category</option>
            {
              categories?.map((cat)=>{
                return <option value={cat._id}>{cat.name}</option>
              })
            }
          </select>
        </div>
        <div>
          <label>SUB CATEGORY</label>
          <select {...register("sub_category_id")}>
            <option value="">Select Sub Category</option>
            {
              subCategories?.map((subCat)=>{
                return <option value={subCat._id}>{subCat.name}</option>
              })
            }
          </select>
        </div>
        <div>
          <input type='submit' value='ADD PRODUCT'/>
        </div>
      </form>
    </div>
  )
}
