import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SummaryApi from '../common'

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
    shopName: "",
  })

  const params = useParams()
  const [loading, setLoading] = useState(false)

  console.log("product id", params.id)

  const fetchProductDetails = async()=>{
    setLoading(true)
     const response = await fetch(SummaryApi.productDetails.url, {
        method : SummaryApi.productDetails.method,
        headers: {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            productId : params?.id
        })
     })
    setLoading(false)
     const dataResponse = await response.json()
    
     setData(dataResponse?.data)
  }

  useEffect(()=>{
    fetchProductDetails()
  },[])

  console.log("data", data)
  return(
    <div>ProductionDetails</div>
  )
}

export default ProductDetails