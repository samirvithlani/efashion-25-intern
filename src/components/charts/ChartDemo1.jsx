import axios from 'axios'
import { ArcElement, BarElement, CategoryScale, Chart, LinearScale } from 'chart.js'
import React, { useEffect, useState } from 'react'
import { Bar, Pie } from 'react-chartjs-2'

Chart.register(CategoryScale,LinearScale,BarElement,ArcElement)
export const ChartDemo1 = () => {

    const [products, setproducts] = useState([])
    const [chartData, setchartData] = useState({
        labels:[],
        datasets:[
            {
                label:"Loading..",
                data:[],
                backgroundColors:[]
            }
        ]
    })

    const getAllProducts = async()=>{
        const res = await axios.get("/get_products")
        console.log(res.data) //[8]
        setproducts(res.data)
        setchartData({
            labels:res.data?.map((product)=>product.name || "N/A"),
            datasets:[
                {
                label:"prodcut data",
                data:res.data?.map((product)=>product.price || 0),
                backgroundColor:["red","green","yellow"],
                borderWidth:15

                }

            ]
        })
    }

    useEffect(()=>{
        getAllProducts()
    })
  return (
    <div>
            <h1>CHART DEMO</h1>
            {/* <Bar data={chartData}></Bar> */}
            <Pie data={chartData}></Pie>
    </div>
  )
}
