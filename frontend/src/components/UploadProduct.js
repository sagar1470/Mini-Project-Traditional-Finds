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
  fetchdata,
}) => {

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

    try {
      const response = await fetch(SummaryApi.uploadProduct.url, {
        method: SummaryApi.uploadProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      })

      const responseData = await response.json()

      if (responseData.success) {
        toast.success(responseData?.message)
        fetchdata()
        onClose()
      }

      if (responseData.error) {
        toast.error(responseData?.message)
      }
    } catch (error) {
      toast.error("Failed to upload product")
    } finally {
      setIsUploading(false) // End loading regardless of success/error
    }
  }

  return (
    // <div className='w-full h-full fixed bg-slate-200 bg-opacity-60 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
    //   <div className='bg-white p-4 rounded w-full max-w-3xl h-full max-h-[85%] overflow-hidden pb-5'>

    //     <div className='flex justify-between items-center mt-4 mb-2'>
    //       <h2 className='text-lg font-bold'> Upload Product</h2>
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
    //         <div className='p-2 bg-slate-100 border rounded h-36 w-full flex justify-center items-center cursor-pointer'>

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
    //                         className='bg-slate-100 border m-1 cursor-pointer'
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
    //             <p className='text-red-600 text-xs'>"Please upload product Image</p>
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
    //         className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700 disabled:bg-red-400'
    //         disabled={!data.productName || !data.category || !data.price || !data.shopName}>
    //         Upload Product
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
    <div className='fixed inset-0 w-full h-full bg-gradient-to-br from-black/30 via-black/20 to-black/30 backdrop-blur-xl flex justify-center items-center z-50 px-4'>
      <div className='bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl w-full max-w-4xl h-[90vh] overflow-hidden flex flex-col'>

        {/* Header */}
        <div className='flex justify-between items-center p-4 md:p-6 border-b border-gray-300'>
          <h2 className='text-2xl md:text-3xl font-bold text-gray-900 tracking-tight'>Upload New Product</h2>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-200 rounded-full transition-colors'
          >
            <CgClose className='text-2xl text-gray-500 hover:text-red-600' />
          </button>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className='flex-1 overflow-y-auto p-4 md:p-6 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8'>

            {/* Left Column */}
            <div className='space-y-5'>
              {/* Product Name */}
              <div className='space-y-2'>
                <label className='block text-sm md:text-base font-semibold text-gray-700'>Product Name</label>
                <input
                  type='text'
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
                <label className='block text-sm md:text-base font-semibold text-gray-700'>Seller Name</label>
                <input
                  type='text'
                  name='sellerName'
                  placeholder='Enter brand name'
                  value={data.sellerName}
                  onChange={handleOnChange}
                  className='w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/60 backdrop-blur focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>

              {/* Category */}
              <div className='space-y-2'>
                <label className='block text-sm md:text-base font-semibold text-gray-700'>Category</label>
                <select
                  name='category'
                  value={data.category}
                  onChange={handleOnChange}
                  className='w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/60 backdrop-blur focus:ring-2 focus:ring-blue-500 cursor-pointer'
                  required
                >
                  <option value="">Select Category</option>
                  {productCategory.map((el) => (
                    <option key={el.value} value={el.value}>{el.label}</option>
                  ))}
                </select>
              </div>

              {/* Pricing */}
              <div className='space-y-2'>
                <label className='block text-sm md:text-base font-semibold text-gray-700'>Pricing</label>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <input
                    type='number'
                    name='price'
                    placeholder='Cost Price'
                    value={data.price}
                    onChange={handleOnChange}
                    className='w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/60 backdrop-blur focus:ring-2 focus:ring-blue-500'
                    required
                  />
                  <input
                    type='number'
                    name='sellingPrice'
                    placeholder='Selling Price'
                    value={data.sellingPrice}
                    onChange={handleOnChange}
                    className='w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/60 backdrop-blur focus:ring-2 focus:ring-blue-500'
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className='space-y-5'>
              {/* Upload Image */}
              <div className='space-y-2'>
                <label className='block text-sm md:text-base font-semibold text-gray-700'>Product Images</label>
                <label
                  htmlFor='uploadImageInput'
                  className='group relative block w-full h-48 sm:h-56 border-2 border-dashed border-gray-300 rounded-2xl hover:border-blue-400 transition-colors cursor-pointer'
                >
                  <div className='absolute inset-0 flex flex-col items-center justify-center p-4 text-center'>
                    <FaCloudUploadAlt className='w-12 h-12 md:w-14 md:h-14 text-gray-400 mb-3 group-hover:text-blue-500 transition-colors' />
                    <p className='text-sm text-gray-600'>
                      <span className='font-semibold text-blue-600'>Click to upload</span> or drag and drop
                    </p>
                    <p className='text-xs text-gray-400 mt-1'>PNG, JPG up to 10MB</p>
                  </div>
                  <input
                    type='file'
                    id='uploadImageInput'
                    className='hidden'
                    onChange={handleUploadProduct}
                    multiple
                  />
                </label>

                {/* Image Previews */}
                {data?.productImage?.length > 0 && (
                  <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
                    {data.productImage.map((el, index) => (
                      <div key={index} className='relative group aspect-square'>
                        <img
                          src={el}
                          alt={`Preview ${index + 1}`}
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
                )}
              </div>

              {/* Shop Name */}
              <div className='space-y-2'>
                <label className='block text-sm md:text-base font-semibold text-gray-700'>Shop Name</label>
                <input
                  type='text'
                  name='shopName'
                  placeholder='Enter shop name'
                  value={data.shopName}
                  onChange={handleOnChange}
                  className='w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/60 backdrop-blur focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>

              {/* Description */}
              <div className='space-y-2'>
                <label className='block text-sm md:text-base font-semibold text-gray-700'>Description</label>
                <textarea
                  name='description'
                  placeholder='Product description...'
                  value={data.description}
                  onChange={handleOnChange}
                  rows={4}
                  className='w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/60 backdrop-blur focus:ring-2 focus:ring-blue-500 resize-none'
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className='mt-8 px-4 md:px-6 pb-6'>
            <button
              type='submit'
              disabled={!data.productName || !data.category || !data.price || !data.shopName}
              className='w-full py-3 md:py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:bg-gray-400 text-white rounded-xl font-semibold transition-all disabled:cursor-not-allowed'
            >
              {isUploading ? 'Uploading...' : 'Publish Product'}
            </button>
          </div>
        </form>

        {/* Fullscreen Image Viewer */}
        {openFullScreenImage && (
          <DisplayImage
            onClose={() => setOpenFullScreenImage(false)}
            imgUrl={fullScreenImage}
          />
        )}
      </div>
    </div>


  )
}

export default UploadProduct