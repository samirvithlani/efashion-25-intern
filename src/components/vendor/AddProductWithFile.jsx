import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export const AddProductWithFile = () => {
    const [categories, setcategories] = useState([])
      const [subCategories, setsubCategories] = useState([])

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
    const {register,handleSubmit} = useForm()
    const submitHandler = async(data) => {
        console.log(data)
        console.log(data.image[0])

        const formData = new FormData()
        formData.append("name",data.name)
        formData.append("price",parseFloat(data.price))
        formData.append("category_id",data.category_id)
        formData.append("sub_category_id",data.sub_category_id)
        formData.append("image",data.image[0])
        formData.append("vendor_id",localStorage.getItem("id"))

        const res = await axios.post("/create_product_file",formData,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        console.log(res.data)//axios variable....




    }
  return (
    <div style={{textAlign: 'center'}}>
        <h1>ADD PRODUCT</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
            <div>
                <label htmlFor="name">name</label>
                <input type="text" {...register("name")} />
            </div>
            <div>
                <label htmlFor="price">price</label>
                <input type="text" {...register("price")} />
            </div>
            <div>
                <label>CATEOGRY</label>
                <select {...register("category_id")} onChange={(event)=>{getSubCategories(event.target.value)}}>
                    <select>SELECT CATEGORY</select>
                    {
                        categories?.map((category)=>{
                            return <option value={category._id}>{category.name}</option>
                        })
                    }
                </select>
            </div>
            <div>
                <label>SUB CATEGORY</label>
                <select {...register("sub_category_id")}>
                    <select>SELECT SUB CATEGORY</select>
                    {
                        subCategories?.map((subCategory)=>{
                            return <option value={subCategory._id}>{subCategory.name}</option>
                        })
                    }
                </select>
            </div>
            <div>
                <label>SELECT FILE</label>
                <input type="file" {...register("image")}/>
            </div>
            <div>
                <input type="submit" value="ADD PRODUCT"/>
            </div>
        </form>
    </div>
  )
}
