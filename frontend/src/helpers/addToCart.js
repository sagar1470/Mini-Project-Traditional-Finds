
import SummaryApi from "../common"
import { toast } from "react-toastify"


const addToCart = async (e, id) => {
  e.stopPropagation()
  e?.preventDefault()


  const response = await fetch(SummaryApi.addToCartProduct.url, {
     method: SummaryApi.addToCartProduct.method,
     credentials : 'include',
     headers: {
      "content-type": "application/json",
     },
     body: JSON.stringify({
      productId: id,
     })
  })
  const data = await response.json()
  if(data?.success){
    toast.success(data?.message); 
}
  if(data?.error){
    toast.error(data?.message);
  }

}

export default addToCart
