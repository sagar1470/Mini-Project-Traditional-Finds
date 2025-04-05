const displayNPRCurrency = (num) => {
//   const formatter = new Intl.NumberFormat('en-NP', {
//     style : "currency", 
//     currency : "NPR",
//     currencyDisplay: "narrowSymbol",
//     minimumFractionDigits : 2,
//   })

return `रु ${Number(num).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
  
//   return formatter.format(num)
}

export default displayNPRCurrency