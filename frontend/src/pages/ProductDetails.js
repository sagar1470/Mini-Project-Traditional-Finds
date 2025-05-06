import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IoStar } from "react-icons/io5";
import { IoStarHalf } from "react-icons/io5";
import SummaryApi from '../common'
import displayNPRCurrency from '../helpers/displayCurrency';
import RecomamandedProduct from '../components/RecommandedProduct';
import Context from '../context';
import addToCart from '../helpers/addToCart';


const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    sellerName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
    shopName: "",
  })

  const { fetchUserAddToCart } = useContext(Context)
  const navigate = useNavigate()

  const handleAddToCart = async(e, id)=>{
    await addToCart(e, id)
    await fetchUserAddToCart()
  }
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const productImListLoading = new Array(4).fill(null)
  const [activeImage, setActiveImage] = useState("")

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0
  })

  const [zoomImage, setZoomImage] = useState(false)

  console.log("product id", params.id)

  const fetchProductDetails = async () => {
    setLoading(true)
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        productId: params?.id
      })
    })
    setLoading(false)
    const dataResponse = await response.json()

    setData(dataResponse?.data)
    setActiveImage(dataResponse?.data?.productImage[0])
  }

  useEffect(() => {
    fetchProductDetails()
  }, [params])

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL)
  }

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true)
    const { left, top, width, height } = e.target.getBoundingClientRect()
    console.log("coordinate", left, top, width, height)

    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomImageCoordinate({
      x,
      y
    })
  }, [zoomImageCoordinate])

  const handleLeaveImageZoom = () => {
    setZoomImage(false)
  }

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id)
    await fetchUserAddToCart()
    navigate("/cart-product")
  }
    

  
  return (
    <div className=' p-4 mx-auto mt-20'>
      

        <div className=' min-h-[200px] flex flex-col lg:flex-row gap-4 mb-20'>

          {/* product image */}
          <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

            <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-300 relative'>
              <img src={activeImage} alt={data.productName} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom} />

              {/* product zoom */}
              {
                zoomImage && (
                  <div className='hidden lg:block absolute min-w-[500px] min-h-[400px] overflow-hidden bg-slate-300 shadow-lg rounded-md border border-gray-200 -right-[510px] top-0 '>
                    <div className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-125'
                      style={{
                        backgroundImage: `url(${activeImage})`,
                        backgroundRepeat: `no-repeat`,
                        backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`

                      }}
                    >
                    </div>
                  </div>
                )
              }

            </div>

            <div className='h-full'>
              {
                loading ? (
                  <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                    {
                      productImListLoading.map(el => {
                        return (
                          <div className='h-20 w-20 bg-slate-300 rounded animate-pulse' key={"loadingImage"}>

                          </div>
                        )
                      })
                    }
                  </div>
                ) : (
                  <div>
                    <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                      {
                        data?.productImage?.map((imageURL, index) => {
                          return (
                            <div className='h-20 w-20 bg-slate-300 rounded border hover:border-red-500 cursor-pointer transition duration-200' key={imageURL}>
                              <img src={imageURL} className='w-full h-full object-scale-down mix-blend-multiply' alt={imageURL} onMouseEnter={() => { handleMouseEnterProduct(imageURL) }} onClick={() => { handleMouseEnterProduct(imageURL) }} />

                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                )
              }
            </div>
          </div>
          {/* product details */}
          {
            loading ? (
              <div className='grid gap-1 w-full'>
                <p className='bg-slate-300 animate-pulse  h-6 lg:h-8 w-full rounded-full inline-block'></p>
                <h2 className='text-2xl lg:text-4xl font-medium h-6 lg:h-8  bg-slate-300 animate-pulse w-full'></h2>
                <p className='capitalize text-slate-400 bg-slate-300 min-w-[100px] animate-pulse h-6 lg:h-8  w-full'></p>

                <div className='text-red-600 bg-slate-300 h-6 lg:h-8  animate-pulse flex items-center gap-1 w-full'>

                </div>

                <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8  animate-pulse w-full'>
                  <p className='text-red-600 bg-slate-300 w-full'></p>
                  <p className='text-slate-400 line-through bg-slate-300 w-full'></p>
                </div>

                <div className='flex items-center gap-3 my-2 w-full'>
                  <button className='h-6 lg:h-8  bg-slate-300 rounded animate-pulse w-full'></button>
                  <button className='h-6 lg:h-8  bg-slate-300 rounded animate-pulse w-full'></button>
                </div>

                <div className='w-full'>
                  <p className='text-slate-600 font-medium my-1 h-6 lg:h-8   bg-slate-300 rounded animate-pulse w-full'></p>
                  <p className=' bg-slate-300 rounded animate-pulse h-10 lg:h-12  w-full'></p>
                </div>
              </div>
            ) : (
              <div className='flex flex-col  gap-1'>
                <p className='bg-red-200 text-red-600 px-2 rounded-full w-fit'>{data?.sellerName}</p>
                <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
                <p className='captalize text-slate-500'>{data.category}</p>

                <div className='text-red-600 flex items-center gap-1'>
                  <IoStar />
                  <IoStar />
                  <IoStar />
                  <IoStar />
                  <IoStarHalf />
                </div>

                <div className='flex items-center gap-5 text-2xl lg:text-3xl font-medium my-2'>
                  <p className='text-red-600'>{displayNPRCurrency(data?.sellingPrice)}</p>
                  <p className='text-slate-500 line-through'>{displayNPRCurrency(data?.price)}</p>
                </div>

                <div className='flex items-center gap-3 '>
                <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white transition duration-200'
                onClick={(e)=>{handleBuyProduct(e, data?._id)}}
                >Buy</button>
                  {/* <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white'>Buy</button> */}
                  <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px]  font-medium bg-red-600 text-white hover:bg-white
                   hover:text-red-600 transition duration-200'
                   onClick={(e)=>{
                    e.preventDefault();
                    handleAddToCart(e, data?._id)
                   }}
                   >
                    Add to Cart
                    </button>
                </div>

                <div>
                  <p className='text-slate-600 font-medium my-1'>Description : </p>
                  <p>{data?.description}</p>
                </div>

              </div>
            )
          }

        </div>

        {
            data?.category && (
              <RecomamandedProduct
            category={data?.category}
            heading="Recomanded Product"
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            hideHeader
          />
            )
            
          }

      </div>
    
  )
}

export default ProductDetails


