import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory.js';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage.js';
import DisplayImage from './DisplayImage.js';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common/index.js';
import { toast } from 'react-toastify';


const UploadProduct = ({
  onClose,
  productData,
  fetchdata,
}) => {

  const [data, setData] = useState({
    ...productData,
    productName: productData?.productName,
    brandName: productData?.brandName,
    category: productData?.category,
    productImage: productData?.productImage || [],
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice,
    shopName: productData?.shopName,
  })

  const [fullScreenImage, setFullScreenImage] = useState("");
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false)


  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((perve) => {
      return {
        ...perve,
        [name]: value
      }
    })

  }

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0]

    if (!file) return;

    const uploadImageCloudinary = await uploadImage(file)
    setData((perve) => {
      return {
        ...perve,
        productImage: [...perve.productImage, uploadImageCloudinary.url],

      }
    })
  }

  const handleDeleteProductImage = async (index) => {

    const newProductImage = [...data.productImage]
    newProductImage.splice(index, 1)

    setData((perve) => {
      return {
        ...perve,
        productImage: [...newProductImage],

      }
    })
  }

  // upload product
  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch(SummaryApi.updateProduct.url, {
      method: SummaryApi.updateProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const responseData = await response.json()
    console.log("update product", responseData);
   
    if (responseData.success) {
      toast.success(responseData?.message)
      fetchdata()
      onClose()
    }

    if (responseData.error) {
      toast.error(responseData?.message)
    }
  }

  return (
    <div className='w-full h-full fixed bg-slate-200 bg-opacity-60 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <div className='bg-white p-4 rounded w-full max-w-3xl h-full max-h-[85%] overflow-hidden pb-5'>

        <div className='flex justify-between items-center mt-4 mb-2'>
          <h2 className='text-lg font-bold'> Edit Product</h2>
          <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer ' onClick={onClose}>
            <CgClose />
          </div>
        </div>


        {/* upload section */}

        <form onSubmit={handleSubmit} className='grid p-5 gap-2 overflow-y-scroll h-full scrollbar scrollbar-thick scrollbar-thumb-gray-500 scrollbar-track-gray-300 '>
          <label htmlFor='productName' className='mt-2' >Product Name :</label>
          <input
            type='text'
            id='productsName'
            name='productName'
            placeholder='Enter product name'
            value={data.productName}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded '
            required
          />

          <label htmlFor='brandName' className='mt-4' >Brand Name :</label>
          <input
            type='text'
            id='brandsName'
            name='brandName'
            placeholder='Enter brand name'
            value={data.brandName}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded '
            required
          />

          <label htmlFor='category' className='mt-4 ' >Category :</label>
          <select
            required
            value={data.category}
            name='category'
            onChange={handleOnChange}
            className='p-2 cursor-pointer bg-slate-100 border rounded '>

            <option value={""} >Select Category</option>
            {
              productCategory.map((el, index) => {
                return (
                  <option value={el.value} key={el.value + index}>{el.label}</option>
                )
              })
            }
          </select>


          {/* upload product image */}
          <label htmlFor='productImage' className='mt-3' >Product Image :</label>

          <label htmlFor='uploadImageInput'>
            <div className='p-2 bg-slate-100 border rounded h-72 w-full flex justify-center items-center cursor-pointer'>

              <div className='text-slate-500 flex justify-center items-center flex-col gap-1'>
                <span className='text-7xl'> <FaCloudUploadAlt /> </span>
                <p className='text-sm text-red-400'>Upload Product image</p>
                <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
              </div>

            </div>
          </label>
          <div>
            {
              data?.productImage[0] ? (
                <div className='flex items-center gap'>
                  {
                    data.productImage.map((el, index) => {
                      return (
                        <div key={`product-img-${index}`} className='relative group '>
                          <img                           
                            src={el}
                            width={120}
                            height={120}
                            alt={el}
                            className='bg-slate-100 border m-1 cursor-pointer'
                            onClick={() => {
                              setOpenFullScreenImage(true)
                              setFullScreenImage(el)
                            }} />

                          <div className='absolute bottom-1 right-1 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={() => handleDeleteProductImage(index)}>
                            <MdDelete />
                          </div>
                        </div>

                      )
                    })
                  }
                </div>

              ) : (
                <p className='text-red-600 text-xs'>"Update product Image</p>
              )
            }

          </div>


          <label htmlFor='price' className='mt-4 ' >Price :</label>
          <input
            type='number'
            id='Price'
            name='price'
            placeholder='Enter price'
            value={data.price}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded '
            required
          />


          <label htmlFor='sellingPrice' className='mt-4 ' >sellingPrice :</label>
          <input
            type='number'
            id='SellingPrice'
            name='sellingPrice'
            placeholder='Enter selling price'
            value={data.sellingPrice}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded '
          />


          <label htmlFor='shopName' className='mt-4 ' >Shop Name :</label>
          <input
            type='text'
            id='ShopName'
            name='shopName'
            placeholder='Enter shop Name'
            value={data.shopName}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded '
            required
          />

          <label htmlFor='description' className='mt-4 ' >Description :</label>
          <textarea
            className='h-40 bg-slate-100 border p-1 '
            placeholder='You can write product description here'
            rows={3}
            onChange={handleOnChange}
            name='description'
            value={data.description}
          />



          <button
            className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700 disabled:bg-gray-400'
            disabled={!data.productName || !data.category || !data.price || !data.shopName}>
            Update Product
          </button>
        </form>


      </div>

      {/* *** Display image full screen */}
      {
        openFullScreenImage && (
          <DisplayImage onClose={() => { setOpenFullScreenImage(false) }} imgUrl={fullScreenImage} />
        )

      }


    </div>
  )
}

export default UploadProduct