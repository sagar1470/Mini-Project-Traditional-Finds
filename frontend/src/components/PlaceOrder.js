// import React, { useEffect, useState } from 'react'
// import { CgClose } from "react-icons/cg";
// import productCategory from '../helpers/productCategory.js';
// import { FaCloudUploadAlt } from "react-icons/fa";
// import uploadImage from '../helpers/uploadImage.js';
// import DisplayImage from './DisplayImage.js';
// import { MdDelete } from "react-icons/md";
// import SummaryApi from '../common/index.js';
// import { toast } from 'react-toastify';
// import location from '../helpers/location.js';
// import CartProduct from '../pages/CartProduct.js';




// const PlaceOrer = ({
//     onClose,
//     totalPrice,
//     totalQty,

// }) => {

//     const [orderDetails, setOrderDetails] = useState([])
//     const [orderSuccess, setOrderSuccess] = useState(false)

//     const [isUploading, setIsUploading] = useState(false)

//     const [qty1, setQty] = useState(0)



//     const [phoneError, setPhoneError] = useState('');

//     const [data, setData] = useState({
//         name: "",
//         email: "",
//         phone_no: '',
//         address: "",
//         city: "",
//         totalPrice: totalPrice,
//         totalQty: totalQty,
//     })

//     const handleOnChange = (e) => {
//         const { name, value } = e.target

//         setData((perve) => {
//             return {
//                 ...perve,
//                 [name]: value
//             }
//         })

//     }
//     const handleOnChangePhone = (e) => {
//         const { name, value } = e.target;

//         if (name === 'phone_no') {
//             if (/^\d{0,10}$/.test(value)) {
//                 setData((prev) => ({ ...prev, [name]: value }));
//                 setPhoneError(''); // clear error as user types
//             }
//         } else {
//             setData((prev) => ({ ...prev, [name]: value }));
//         }

//         e.preventDefault();
//         if (data.phone_no.length !== 10) {
//             setPhoneError('Please enter a valid 10-digit phone number');
//             return;
//         }
//     };

//     const fetchData = async () => {

//         const response = await fetch(SummaryApi.DisplayingAddedCartProduct.url, {
//             method: SummaryApi.DisplayingAddedCartProduct.method,
//             credentials: 'include',
//             headers: {
//                 "content-type": 'application/json'
//             },
//         })


//         const responseData = await response.json()

//         if (responseData.success) {
//             setOrderDetails(responseData.data)
//         }
//     }

//     console.log("setorderdetail", orderDetails);

//     useEffect(() => {
//         fetchData()

//     }, [])


//     const handleSubmit = async(e)=>{
//          e.preventDefault()

//          setIsUploading(true)
//          setOrderSuccess(false)
//         const response = await fetch(SummaryApi.OrderRequest.url, {
//             method: SummaryApi.OrderRequest.method,
//             credentials: "include",
//             headers: {
//                 "content-type" : "application/json"
//             },
//             body: JSON.stringify({
//                 data,
//                 orderDetails
//             })

//         })

//         const responseData = await response.json();
//         console.log(responseData);


//         if(responseData.success){
//             toast.success("Your order has been successfully placed")
//             setIsUploading(false)

//             setOrderSuccess(true)
//             setQty(responseData.data.orderQty)


//         }

//         if(responseData.error){
//             toast.error("OrderRequest Api fetching fail..")
//             setIsUploading(false)
//             setOrderSuccess(true)
//         }
//     }

//         orderSuccess && (
//            <CartProduct  onClose={()=>{setOrderSuccess(true)}} qty1 />
//         )

//     console.log("qty", qty1)

//     return (

//         <div className='fixed inset-0 w-full h-full bg-gradient-to-br from-black/30 via-black/20 to-black/30 backdrop-blur-xl flex justify-center items-center z-50 px-4'>
//             <div className='bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl w-full max-w-4xl h-[90vh] overflow-hidden flex flex-col'>

//                 {/* Header */}
//                 <div className='flex justify-between items-center p-4 md:p-6 border-b border-gray-300'>
//                     <h2 className='text-2xl md:text-3xl font-bold text-gray-900 tracking-tight'>Buyer Information</h2>
//                     <button
//                         onClick={onClose}
//                         className='p-2 hover:bg-gray-200 rounded-full transition-colors'
//                     >
//                         <CgClose className='text-2xl text-gray-500 hover:text-red-600' />
//                     </button>
//                 </div>

//                 {/* Form Container */}
//                 <form onSubmit={(e)=>{handleSubmit(e)}} className='flex-1 overflow-y-auto p-4 md:p-6 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100'>
//                     <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8'>

//                         {/* Left Column */}
//                         <div className='space-y-5'>
//                             {/* Product Name */}
//                             <div className='space-y-2'>
//                                 <label className='block text-sm md:text-base font-semibold text-gray-700'>Name</label>
//                                 <input
//                                     type='text'
//                                     name='name'
//                                     placeholder='Enter your name'
//                                     value={data.name}
//                                     onChange={handleOnChange}
//                                     className='w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/60 backdrop-blur focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
//                                     required
//                                 />
//                             </div>

//                             {/* Brand Name */}
//                             <div className='space-y-2'>
//                                 <label className='block text-sm md:text-base font-semibold text-gray-700'>Email</label>
//                                 <input
//                                     type='text'
//                                     name='email'
//                                     placeholder='Enter email'
//                                     value={data.email}
//                                     onChange={handleOnChange}
//                                     className='w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/60 backdrop-blur focus:ring-2 focus:ring-blue-500'
//                                     required
//                                 />
//                             </div>

//                             {/* Category */}
//                             <div className='space-y-2'>
//                                 <label className='block text-sm md:text-base font-semibold text-gray-700'>Delivery Location</label>
//                                 <select
//                                     name='address'
//                                     value={data.address}
//                                     onChange={handleOnChange}
//                                     className='w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/60 backdrop-blur focus:ring-2 focus:ring-blue-500 cursor-pointer'
//                                     required
//                                 >
//                                     <option value="">Address </option>
//                                     {location.map((el) => (
//                                         <option key={el.value} value={el.value}>{el.label}</option>
//                                     ))}
//                                 </select>
//                             </div>

//                             {/* Pricing */}
//                             <div className='space-y-2'>

//                                 <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
//                                     <label className='block text-sm md:text-base font-semibold text-gray-700'>Total Quantity</label>
//                                     <div className='w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/60 backdrop-blur focus:ring-2 focus:ring-blue-500'>
//                                         {totalQty}
//                                     </div>

//                                     <label className='block text-sm md:text-base font-semibold text-gray-700'>Total Price</label>
//                                     <div className='w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/60 backdrop-blur focus:ring-2 focus:ring-blue-500'>
//                                         Rs.{totalPrice}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Right Column */}
//                         <div className='space-y-5'>


//                             {/* Shop Name */}
//                             <div className='space-y-2 '>
//                                 <label className='block text-sm md:text-base font-semibold text-gray-700'>Phone no.</label>
//                                 <input
//                                     type="tel"
//                                     name="phone_no"
//                                     placeholder="Enter Phone Number"
//                                     value={data.phone_no}
//                                     onChange={handleOnChangePhone}
//                                     inputMode="numeric"
//                                     maxLength={10}
//                                     className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/60 backdrop-blur focus:ring-2 focus:ring-blue-500"
//                                     required
//                                 />
//                                 <label className='block text-sm md:text-base font-semibold text-gray-700'>Your City</label>
//                                 <input
//                                     type="string"
//                                     name="city"
//                                     placeholder="Enter your city Name"
//                                     value={data.city}
//                                     onChange={handleOnChange}
//                                     className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/60 backdrop-blur focus:ring-2 focus:ring-blue-500"

//                                 />
//                                 {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}

//                             </div>


//                         </div>
//                     </div>

//                     {/* Submit Button */}
//                     <div className='mt-8 px-4 md:px-6 pb-6'>
//                         <button
//                             type='submit'
//                             disabled={!data.name || !data.phone_no || !data.email || !data.address}
//                             className='w-full py-3 md:py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-500 cursor-pointer hover:from-blue-700 hover:to-blue-600 disabled:bg-blue-200
//                              text-white rounded-xl font-semibold transition-all disabled:cursor-not-allowed'
//                         >
//                             {isUploading ? 'submitting...' : ' Submit'}
//                         </button>
//                     </div>
//                 </form>


//             </div>      
//         </div>

//     )
// }

// export default PlaceOrer




import React, { useEffect, useState } from 'react'
import { CgClose } from "react-icons/cg"
import { toast } from 'react-toastify'
import SummaryApi from '../common'
import location from '../helpers/location'
import CartProduct from '../pages/CartProduct'

const PlaceOrder = ({
    onClose,
    totalPrice,
    totalQty,
    onConfirmOrder,

}) => {
    const [orderSuccess, setOrderSuccess] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [phoneError, setPhoneError] = useState('')
    const [orderDetails, setOrderDetails] = useState([])

    const [data, setData] = useState({
        name: "",
        email: "",
        phone_no: '',
        address: "",
        city: "",
        totalPrice: totalPrice,
        totalQty: totalQty,
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData(prev => ({ ...prev, [name]: value }))
    }

    const validatePhoneNumber = (phone) => {
        const regex = /^\d{10}$/
        return regex.test(phone)
    }

    const handleOnChangePhone = (e) => {
        const { value } = e.target
        if (/^\d{0,10}$/.test(value)) {
            setData(prev => ({ ...prev, phone_no: value }))
            setPhoneError(validatePhoneNumber(value) ? '' : 'Please enter a valid 10-digit phone number')
        }
    }

    const fetchData = async () => {

        const response = await fetch(SummaryApi.DisplayingAddedCartProduct.url, {
            method: SummaryApi.DisplayingAddedCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
        })


        const responseData = await response.json()

        if (responseData.success) {
            setOrderDetails(responseData.data)
        }
    }

    console.log("setorderdetail", orderDetails);

    useEffect(() => {
        fetchData()

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validatePhoneNumber(data.phone_no)) {
            setPhoneError('Please enter a valid 10-digit phone number')
            return
        }

        setIsUploading(true)

        try {
            console.log("orderdetails", orderDetails)
            console.log("data", data)
            const response = await fetch(SummaryApi.OrderRequest.url, {
                method: SummaryApi.OrderRequest.method,
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    data,
                    orderDetails
                })
            })

            const responseData = await response.json()

            if (responseData.success) {
                toast.success("Order placed successfully!")
                setOrderSuccess(true)
                onConfirmOrder({
                    confirmedQty: totalQty,
                    confirmedPrice: totalPrice
                })
            } else {
                toast.error(responseData.message || "Order placement failed")
            }
            
        } catch (error) {
            toast.error("Failed to place order")
            console.error("Order error:", error)
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <>
            {!orderSuccess ? (
                <div className='fixed inset-0 w-full h-full bg-black/30 backdrop-blur-xl flex justify-center items-center z-50 px-4'>
                    <div className='bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl w-full max-w-4xl h-[90vh] overflow-hidden flex flex-col'>
                        {/* Header */}
                        <div className='flex justify-between items-center p-4 md:p-6 border-b border-gray-300'>
                            <h2 className='text-2xl md:text-3xl font-bold text-gray-900'>Order Details</h2>
                            <button onClick={onClose} className='p-2 hover:bg-gray-200 rounded-full'>
                                <CgClose className='text-2xl text-gray-500 hover:text-red-600' />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className='flex-1 overflow-y-auto p-4 md:p-6'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8'>

                                {/* Left Column */}
                                <div className='space-y-5'>
                                    <div className='space-y-2'>
                                        <label className='block font-semibold text-gray-700'>Name</label>
                                        <input
                                            type='text'
                                            name='name'
                                            value={data.name}
                                            onChange={handleOnChange}
                                            className='w-full px-4 py-3 rounded-xl border border-gray-300'
                                            required
                                        />
                                    </div>

                                    <div className='space-y-2'>
                                        <label className='block font-semibold text-gray-700'>Email</label>
                                        <input
                                            type='email'
                                            name='email'
                                            value={data.email}
                                            onChange={handleOnChange}
                                            className='w-full px-4 py-3 rounded-xl border border-gray-300'
                                            required
                                        />
                                    </div>

                                    <div className='space-y-2'>
                                        <label className='block font-semibold text-gray-700'>Delivery Address</label>
                                        <select
                                            name='address'
                                            value={data.address}
                                            onChange={handleOnChange}
                                            className='w-full px-4 py-3 rounded-xl border border-gray-300'
                                            required
                                        >
                                            <option value="">Select Address</option>
                                            {location.map(el => (
                                                <option key={el.value} value={el.value}>{el.label}</option>
                                            ))}
                                        </select>
                                    </div>



                                    <div className='space-y-2 '>

                                        <div className='grid grid-cols-1 sm:grid-cols-2 mt-10 gap-4'>
                                            <label className='block font-semibold mt-4 text-gray-700'>Total Quantity</label>
                                            <div className='px-1 py-3 rounded-xl border border-gray-300'>
                                                {totalQty}
                                            </div>

                                            <label className='block mt-4 font-semibold text-gray-700'>Total Price</label>
                                            <div className='px-1 py-3 rounded-xl border border-gray-300'>
                                                ₹{totalPrice}
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {/* Right Column */}
                                <div className='space-y-5'>
                                    <div className='space-y-2'>
                                        <label className='block font-semibold text-gray-700'>Phone Number</label>
                                        <input
                                            type='tel'
                                            name='phone_no'
                                            value={data.phone_no}
                                            onChange={handleOnChangePhone}
                                            className='w-full px-4 py-3 rounded-xl border border-gray-300'
                                            required
                                        />
                                        {phoneError && <p className='text-red-500 text-sm'>{phoneError}</p>}
                                    </div>

                                    <div className='space-y-2'>
                                        <label className='block font-semibold text-gray-700'>City</label>
                                        <input
                                            type='text'
                                            name='city'
                                            value={data.city}
                                            onChange={handleOnChange}
                                            className='w-full px-4 py-3 rounded-xl border border-gray-300'
                                            required
                                        />
                                    </div>

                                    {/* <div className='space-y-2'>
                                        <div className='grid grid-cols-2 gap-4'>
                                            <div>
                                                <label className='block font-semibold text-gray-700'>Total Quantity</label>
                                                <div className='px-4 py-3 rounded-xl border border-gray-300'>
                                                    {totalQty}
                                                </div>
                                            </div>
                                            <div>
                                                <label className='block font-semibold text-gray-700'>Total Price</label>
                                                <div className='px-4 py-3 rounded-xl border border-gray-300'>
                                                    ₹{totalPrice}
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className='mt-8 px-4 pb-6'>
                                <button
                                    type='submit'
                                    disabled={isUploading || !!phoneError}
                                    className={`w-full py-4 px-6 text-white rounded-xl font-semibold transition-all ${isUploading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                        }`}
                                >
                                    {isUploading ? 'Processing...' : 'Confirm Order'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <CartProduct
                    onClose={onClose}
                    confirmedQty={totalQty}
                    confirmedPrice={totalPrice}
                />
            )}
        </>
    )
}

export default PlaceOrder