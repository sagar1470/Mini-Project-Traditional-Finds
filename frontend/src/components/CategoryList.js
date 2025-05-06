import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { Link } from 'react-router-dom'
import "../App.css"

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const categoryLoading = new Array(15).fill(null)

  const fetchCategoryProduct = async () => {
    setLoading(true)
    try {
      const response = await fetch(SummaryApi.categoryProduct.url)
      const dataResponse = await response.json()
      setCategoryProduct(dataResponse.data)
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
    setLoading(false)
  }

  const handleDotClick = (index) => {
    setCurrentIndex(index)
    // Add scroll logic here if using manual navigation
  }

  useEffect(() => {
    fetchCategoryProduct()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % (categoryProduct.length || 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [categoryProduct.length])

  return (
    <div className='mx-auto mt-16 relative px-4'>
      {/* Navigation Dots */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {!loading && categoryProduct.map((_, index) => {
          const isActive = currentIndex % categoryProduct.length === index
          return (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`relative h-2 transition-all duration-300 ${
                isActive 
                  ? 'w-8 bg-gradient-to-r from-amber-500 to-orange-600' 
                  : 'w-4 bg-gray-300 hover:bg-gray-400'
              } rounded-full`}
            >
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 animate-progress-bar rounded-full" />
              )}
            </button>
          )
        })}
      </div>

      {/* Categories Container */}
      <div className="relative overflow-hidden py-4">
        <div className="flex gap-8 w-[200%] animate-slide-infinite">
          {(loading ? [...categoryLoading] : [...categoryProduct, ...categoryProduct]).map((item, index) => (
            <div 
              key={index}
              className="flex-shrink-0 space-y-2 mx-2"
              style={{ width: `${100 / (categoryProduct.length * 2)}%` }}
            >
              {loading ? (
                <div className="w-16 h-16 md:w-28 md:h-28 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse mx-auto" />
              ) : (
                <Link
                  to={'/product-category?category='+item?.category}
                  className="block space-y-2 transform transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative w-16 h-16 md:w-28 md:h-28 bg-white rounded-full overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group mx-auto">
                    <img 
                      src={item?.productImage?.[0]}
                      alt={item?.category || "Category"}
                      className="h-full w-full object-cover transform transition-all duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                  </div>
                  <p className="text-sm md:text-base font-medium text-center capitalize text-black hover:text-orange-600 transition-colors">
                    {item?.category}
                  </p>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryList