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
  const [isUploading, setIsUploading] = useState(false)


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
    setIsUploading(true)

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
    setIsUploading(false)
  }

  return (
    // <div className='w-full h-full fixed bg-slate-200 bg-opacity-60 top-0 left-0 right-0 bottom-0 flex justify-center z-10 items-center'>
    //   <div className='bg-white p-4 rounded w-full max-w-3xl h-full max-h-[85%] overflow-hidden pb-5'>

    //     <div className='flex justify-between items-center mt-4 mb-2'>
    //       <h2 className='text-lg font-bold'> Edit Product</h2>
    //       <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer ' onClick={onClose}>
    //         <CgClose />
    //       </div>
    //     </div>

    //     {/* upload section */}

    //     <form onSubmit={handleSubmit} className='grid p-5 gap-2 overflow-y-scroll h-full scrollbar scrollbar-thick scrollbar-thumb-gray-500 scrollbar-track-gray-300 '>
    //       <label htmlFor='productName' className='mt-2' >Product Name :</label>
    //       <input
    //         type='text'
    //         id='productsName'
    //         name='productName'
    //         placeholder='Enter product name'
    //         value={data.productName}
    //         onChange={handleOnChange}
    //         className='p-2 bg-slate-100 border rounded '
    //         required
    //       />

    //       <label htmlFor='brandName' className='mt-4' >Brand Name :</label>
    //       <input
    //         type='text'
    //         id='brandsName'
    //         name='brandName'
    //         placeholder='Enter brand name'
    //         value={data.brandName}
    //         onChange={handleOnChange}
    //         className='p-2 bg-slate-100 border rounded '
    //         required
    //       />

    //       <label htmlFor='category' className='mt-4 ' >Category :</label>
    //       <select
    //         required
    //         value={data.category}
    //         name='category'
    //         onChange={handleOnChange}
    //         className='p-2 cursor-pointer bg-slate-100 border rounded '>

    //         <option value={""} >Select Category</option>
    //         {
    //           productCategory.map((el, index) => {
    //             return (
    //               <option value={el.value} key={el.value + index}>{el.label}</option>
    //             )
    //           })
    //         }
    //       </select>


    //       {/* upload product image */}
    //       <label htmlFor='productImage' className='mt-3' >Product Image :</label>

    //       <label htmlFor='uploadImageInput'>
    //         <div className='p-2 bg-slate-100 border rounded h-72 w-full flex justify-center items-center cursor-pointer'>

    //           <div className='text-slate-500 flex justify-center items-center flex-col gap-1'>
    //             <span className='text-7xl'> <FaCloudUploadAlt /> </span>
    //             <p className='text-sm text-red-400'>Upload Product image</p>
    //             <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
    //           </div>

    //         </div>
    //       </label>
    //       <div>
    //         {
    //           data?.productImage[0] ? (
    //             <div className='flex items-center gap'>
    //               {
    //                 data.productImage.map((el, index) => {
    //                   return (
    //                     <div key={`product-img-${index}`} className='relative group '>
    //                       <img                           
    //                         src={el}
    //                         width={120}
    //                         height={120}
    //                         alt={el}
    //                         className='bg-slate-100 border m-1 cursor-pointer h-full object-cover'
    //                         onClick={() => {
    //                           setOpenFullScreenImage(true)
    //                           setFullScreenImage(el)
    //                         }} />

    //                       <div className='absolute bottom-1 right-1 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={() => handleDeleteProductImage(index)}>
    //                         <MdDelete />
    //                       </div>
    //                     </div>

    //                   )
    //                 })
    //               }
    //             </div>

    //           ) : (
    //             <p className='text-red-600 text-xs'>"Update product Image</p>
    //           )
    //         }

    //       </div>


    //       <label htmlFor='price' className='mt-4 ' >Price :</label>
    //       <input
    //         type='number'
    //         id='Price'
    //         name='price'
    //         placeholder='Enter price'
    //         value={data.price}
    //         onChange={handleOnChange}
    //         className='p-2 bg-slate-100 border rounded '
    //         required
    //       />


    //       <label htmlFor='sellingPrice' className='mt-4 ' >sellingPrice :</label>
    //       <input
    //         type='number'
    //         id='SellingPrice'
    //         name='sellingPrice'
    //         placeholder='Enter selling price'
    //         value={data.sellingPrice}
    //         onChange={handleOnChange}
    //         className='p-2 bg-slate-100 border rounded '
    //       />


    //       <label htmlFor='shopName' className='mt-4 ' >Shop Name :</label>
    //       <input
    //         type='text'
    //         id='ShopName'
    //         name='shopName'
    //         placeholder='Enter shop Name'
    //         value={data.shopName}
    //         onChange={handleOnChange}
    //         className='p-2 bg-slate-100 border rounded '
    //         required
    //       />

    //       <label htmlFor='description' className='mt-4 ' >Description :</label>
    //       <textarea
    //         className='h-40 bg-slate-100 border p-1 '
    //         placeholder='You can write product description here'
    //         rows={3}
    //         onChange={handleOnChange}
    //         name='description'
    //         value={data.description}
    //       />



    //       <button
    //         className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700 disabled:bg-gray-400'
    //         disabled={!data.productName || !data.category || !data.price || !data.shopName}>
    //         Update Product
    //       </button>
    //     </form>


    //   </div>

    //   {/* *** Display image full screen */}
    //   {
    //     openFullScreenImage && (
    //       <DisplayImage onClose={() => { setOpenFullScreenImage(false) }} imgUrl={fullScreenImage} />
    //     )

    //   }


    // </div>


    <div className='w-full h-full fixed inset-0 bg-gradient-to-br from-black/30 via-black/20 to-black/30 backdrop-blur-xl flex justify-center items-center z-50'>
  <div className='bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl w-full max-w-4xl mx-4 h-[90vh] overflow-hidden flex flex-col'>

    {/* Header */}
    <div className='flex justify-between items-center p-6 border-b border-gray-300'>
      <h2 className='text-3xl font-bold text-gray-900 tracking-tight'>Edit Product</h2>
      <button
        onClick={onClose}
        className='p-2 hover:bg-gray-200 rounded-full transition-colors'
      >
        <CgClose className='text-2xl text-gray-500 hover:text-red-600' />
      </button>
    </div>

    {/* Form */}
    <form onSubmit={handleSubmit} className='flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>

        {/* Left Column */}
        <div className='space-y-5'>
          {/* Product Name */}
          <div className='space-y-2'>
            <label htmlFor='productName' className='block text-sm font-semibold text-gray-700'>Product Name</label>
            <input
              type='text'
              id='productsName'
              name='productName'
              placeholder='Enter product name'
              value={data.productName}
              onChange={handleOnChange}
              className='w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/60 backdrop-blur focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
              required
            />
          </div>

          {/* Brand Name */}
          <div className='space-y-2'>
            <label htmlFor='brandName' className='block text-sm font-semibold text-gray-700'>Brand Name</label>
            <input
              type='text'
              id='brandsName'
              name='brandName'
              placeholder='Enter brand name'
              value={data.brandName}
              onChange={handleOnChange}
              className='w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/60 backdrop-blur focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          {/* Category */}
          <div className='space-y-2'>
            <label htmlFor='category' className='block text-sm font-semibold text-gray-700'>Category</label>
            <select
              required
              value={data.category}
              name='category'
              onChange={handleOnChange}
              className='w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/60 backdrop-blur focus:ring-2 focus:ring-blue-500 cursor-pointer'
            >
              <option value={""}>Select Category</option>
              {productCategory.map((el, index) => (
                <option value={el.value} key={el.value + index}>{el.label}</option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className='space-y-2'>
            <label htmlFor='price' className='block text-sm font-semibold text-gray-700'>Price</label>
            <input
              type='number'
              id='Price'
              name='price'
              placeholder='Enter price'
              value={data.price}
              onChange={handleOnChange}
              className='w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/60 backdrop-blur focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          {/* Selling Price */}
          <div className='space-y-2'>
            <label htmlFor='sellingPrice' className='block text-sm font-semibold text-gray-700'>Selling Price</label>
            <input
              type='number'
              id='SellingPrice'
              name='sellingPrice'
              placeholder='Enter selling price'
              value={data.sellingPrice}
              onChange={handleOnChange}
              className='w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/60 backdrop-blur focus:ring-2 focus:ring-blue-500'
            />
          </div>
        </div>

        {/* Right Column */}
        <div className='space-y-5'>
          {/* Upload Image */}
          <div className='space-y-2'>
            <label htmlFor='productImage' className='block text-sm font-semibold text-gray-700'>Product Image</label>
            <label htmlFor='uploadImageInput' className='group relative block w-full h-48 border-2 border-dashed border-gray-300 rounded-2xl hover:border-blue-400 transition-colors cursor-pointer'>
              <div className='absolute inset-0 flex flex-col items-center justify-center p-4 text-center'>
                <FaCloudUploadAlt className='w-14 h-14 text-gray-400 mb-3 group-hover:text-blue-500 transition-colors' />
                <p className='text-sm text-gray-600'>
                  <span className='font-semibold text-blue-600'>Click to upload</span> or drag and drop
                </p>
                <p className='text-xs text-gray-400 mt-1'>PNG, JPG up to 10MB</p>
              </div>
              <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
            </label>

            {/* Image Preview */}
            {data?.productImage?.length > 0 ? (
              <div className='grid grid-cols-3 gap-3'>
                {data.productImage.map((el, index) => (
                  <div key={`product-img-${index}`} className='relative group aspect-square'>
                    <img
                      src={el}
                      alt={`Preview ${index}`}
                      className='w-full h-full object-cover rounded-xl border cursor-pointer'
                      onClick={() => {
                        setOpenFullScreenImage(true)
                        setFullScreenImage(el)
                      }}
                    />
                    <button
                      type='button'
                      onClick={() => handleDeleteProductImage(index)}
                      className='absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors'
                    >
                      <MdDelete className='w-4 h-4' />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-red-600 text-xs mt-2'>Update product image</p>
            )}
          </div>

          {/* Shop Name */}
          <div className='space-y-2'>
            <label htmlFor='shopName' className='block text-sm font-semibold text-gray-700'>Shop Name</label>
            <input
              type='text'
              id='ShopName'
              name='shopName'
              placeholder='Enter shop Name'
              value={data.shopName}
              onChange={handleOnChange}
              className='w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/60 backdrop-blur focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          {/* Description */}
          <div className='space-y-2'>
            <label htmlFor='description' className='block text-sm font-semibold text-gray-700'>Description</label>
            <textarea
              className='w-full h-40 px-4 py-3 rounded-xl border border-gray-300 bg-white/60 backdrop-blur focus:ring-2 focus:ring-blue-500 resize-none'
              placeholder='You can write product description here'
              rows={4}
              name='description'
              value={data.description}
              onChange={handleOnChange}
            />
          </div>
        </div>

      </div>

      {/* Submit Button */}
      <div className='mt-8 px-6 pb-6'>
        <button
          type='submit'
          disabled={!data.productName || !data.category || !data.price || !data.shopName}
          className='w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:bg-gray-400 text-white rounded-xl font-semibold transition-all disabled:cursor-not-allowed'
        >
          {isUploading ? 'Updating...' : 'Update Product'}
        </button>
      </div>

    </form>

    {/* Fullscreen Image */}
    {openFullScreenImage && (
      <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
    )}
  </div>
</div>

  )
}

export default UploadProduct