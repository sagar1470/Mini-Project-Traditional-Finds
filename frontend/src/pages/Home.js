import React, { useState } from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalProductCard'
import '../App.css'
import herobg from '../assest/herobg.jpeg'
import { useLocation, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


const Home = () => {

  const navigate = useNavigate()
  const searchInput = useLocation()
  const [search, setSearch] = useState([searchInput.search.split("=")[1] || ""])

  // const handleSearch = (e)=>{
  //   const { value } = e.target
   
  //   setSearch(value)

  //   if(value){
  //     navigate(`/search?q=${value}`)
  //   }else{
  //     navigate("/search")
  //   }
  // }
  const handleSearch = () => {
    if (search) {
      navigate(`/search?q=${search}`)
    } else {
      navigate("/search")
    }
  }
  const handleInputChange = (e) => {
    setSearch(e.target.value)
    console.log(e.target.value)
  }

  return (
    // <div>
    //   <BannerProduct/>

    //   <HorizontalCardProduct category={"utensils"} heading={"Metal & Copper Utensils"}/>
    //   <HorizontalCardProduct category={"farming"} heading={"Traditional Farming Tools"}/>
    //   <CategoryList/>

    //   <VerticalCardProduct category={"basket"} heading={"Handwoven Basket & Storage"} />
    //   <VerticalCardProduct category={"kitchenware"} heading={"Ethnic Kitchenware & Utensils"} />
    //   <VerticalCardProduct category={"clothing"} heading={"Traditional Clothing & Accessories"} />
    //   <VerticalCardProduct category={"art"} heading={"Cultural Art & Paintings"} />
    //   <VerticalCardProduct category={"herbal"} heading={"Herbal & Organic Products"} />
    //   <VerticalCardProduct category={"wool"} heading={"Wool & Cotton Products~"} />
    //   <VerticalCardProduct category={"handwoven"} heading={"Wool & Cotton Handwoven Items"} />
    //   <VerticalCardProduct category={"homedecor"} heading={"Handmade Home Decor"} />
    //   <VerticalCardProduct category={"musical"} heading={"Handcrafted Musical Instruments"} />
    //   <VerticalCardProduct category={"wooden_crafts"} heading={"Wooden & Bamboo Crafts"} />
    // </div>


    <div className=" min-h-screen p-4">

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm fixed w-full z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-amber-700 font-serif">Traditional Finds</h1>
          <nav className="hidden md:flex gap-8">
            <a href="#" className="text-gray-700 hover:text-amber-800 transition-colors font-medium">Pottery Collection</a>
            <Link to="/myorder" className="text-gray-700 hover:text-amber-800 transition-colors font-medium">My Orders</Link>
            <Link to="/paid-order" className="text-gray-700 hover:text-amber-800 transition-colors font-medium">My Pyment History</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-screen-80 bg-cover bg-center" style={{ backgroundImage: `url(${herobg})` }}>

        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/50 to-stone-900/20" />

        <div className="relative container mx-auto px-4 md:py-32 py-20 text-center">
          <div className="md:max-w-3xl max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 font-serif drop-shadow-4xl">
              Your trusted marketplace for authentic traditional treasures
            </h2>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto flex gap-2 mb-6 bg-white/20 backdrop-blur-sm rounded-full p-1 shadow-lg">
              <input
                type="text"
                value={search}
                onChange={handleInputChange}
                placeholder="Search pottery crafts..."
                className="flex-1 md:px-6 px-1 py-3 bg-transparent border-none text-white placeholder-gray-200 focus:ring-0 rounded-full"
              />
              <button 
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 md:px-8 py-3 rounded-full transition-colors flex items-center md:gap-2"
              onClick={handleSearch}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                <span>Explore</span>
              </button>
            </div>

            <p className="text-gray-200 text-lg mt-4 ">
              Discover authentic handwoven textiles, pottery & traditional artifacts
            </p>

            
     
          </div>
        </div>
      
      </div>

      <BannerProduct />

      <CategoryList />

      <HorizontalCardProduct category={"utensils"} heading={"Metal & Copper Utensils"} />
      <HorizontalCardProduct category={"farming"} heading={"Traditional Farming Tools"} />



      {/* vertical product */}

      <div className="bg-gradient-to-b from-amber-200 via-white to-gray-50">
        {/* Featured Banner */}

        {/* Curated Collections */}
        <section className="w-full mx-auto px-4 py-16 relative overflow-hidden">
          <div className="max-w-full mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16 relative z-10">
              <h2 className="text-4xl font-bold text-stone-800 mb-4 font-serif">
                Artisan Collections
              </h2>
              <p className="text-stone-600 text-lg max-w-2xl mx-auto mb-6">
                Discover unique handcrafted items that tell stories of cultural heritage
              </p>
              <div className="h-1 w-24 bg-amber-500 mx-auto rounded-full" />
            </div>

            <div className='mb-14'>
             
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 z-10">
              {/* Basket Collection */}
              <VerticalCardProduct
                category="basket"
                heading="Handwoven Baskets"
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
                imageClassName="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                contentClassName="p-6 bg-gradient-to-b from-white via-amber-50 to-amber-100"
                titleStyle="text-2xl font-bold text-stone-800 mb-2 hover:text-amber-600 transition-colors"
                priceStyle="text-2xl font-bold text-green-600"
                originalPriceStyle="text-stone-400 line-through text-sm"
                badgeClassName="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-stone-700 shadow-sm"
              />
              {/* Add other categories with similar structure */}
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl" />
          </div>
        </section>

        {/* Category Showcase Sections */}
        <section className="bg-gradient-to-br from-blue-100 via-indigo-100 to-white py-16">
          <div className="max-w-full mx-auto max-h-full px-4 space-y-10">
            {[
              { category: "clothing", heading: "Traditional Attire", description: "Authentic cultural garments and accessories" },
              { category: "art", heading: "Cultural Artworks", description: "Paintings and sculptures preserving heritage" },
              { category: "herbal", heading: "Organic Products", description: "Natural remedies and wellness items" },
              { category: "musical", heading: "Organic Products", description: "Natural remedies and wellness items" },
            ].map((section, index) => (
              <div key={index} className="relative overflow-hidden rounded-[3rem] shadow-2xl bg-gradient-to-b from-amber-100  via-white to-amber-200 ">
                <div className="p-8 md:p-12">
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold text-stone-800 mb-2">{section.heading}</h3>
                    <p className="text-stone-600">{section.description}</p>
                  </div>
                  <VerticalCardProduct
                    category={section.category}
                    heading=""
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6"
                    hideHeader
                  />
                </div>
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl" />
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 bg-gradient-to-r from-amber-600 to-amber-700">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Join Our Artisan Community
            </h2>
            <p className="text-amber-100 mb-8 text-lg">
              Preserve traditions while reaching global customers
            </p>
            <button className="bg-white text-amber-700 px-8 py-3 rounded-full font-semibold hover:bg-amber-50 transition-colors">
              Become a Seller
            </button>
          </div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-10" />
        </section>
      </div>




    </div >



  )
}

export default Home