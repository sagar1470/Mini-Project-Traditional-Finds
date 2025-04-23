import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalProductCard'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>

      <HorizontalCardProduct category={"utensils"} heading={"Metal & Copper Utensils"}/>
      <HorizontalCardProduct category={"farming"} heading={"Traditional Farming Tools"}/>

      <VerticalCardProduct category={"basket"} heading={"Handwoven Basket & Storage"} />
      <VerticalCardProduct category={"kitchenware"} heading={"Ethnic Kitchenware & Utensils"} />
      <VerticalCardProduct category={"clothing"} heading={"Traditional Clothing & Accessories"} />
      <VerticalCardProduct category={"art"} heading={"Cultural Art & Paintings"} />
      <VerticalCardProduct category={"herbal"} heading={"Herbal & Organic Products"} />
      <VerticalCardProduct category={"wool"} heading={"Wool & Cotton Products~"} />
      <VerticalCardProduct category={"handwoven"} heading={"Wool & Cotton Handwoven Items"} />
      <VerticalCardProduct category={"homedecor"} heading={"Handmade Home Decor"} />
      <VerticalCardProduct category={"musical"} heading={"Handcrafted Musical Instruments"} />
      <VerticalCardProduct category={"wooden_crafts"} heading={"Wooden & Bamboo Crafts"} />
    </div>
  )
}
export default Home