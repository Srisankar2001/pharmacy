export default function validate(state){
    let error = {
        name : "",
        category : "",
        quantity : "",
        description : "",
        manufacturedDate : "",
        expiryDate : "",
        buyingPrice : "",
        sellingPrice : "",
        stock : "",
        company : ""
    }

    if(state.name.trim() === ""){
        error.name = "Name field is empty"
    }else if(!(/^[a-zA-Z]{2,}$/.test(state.name.trim()))){
        error.name = "Invalid name"
    }else{
        error.name = ""
    }

    if(state.category === ""){
        error.category = "Category not selected"
    }else{
        error.category = ""
    }

    if(state.quantity === ""){
        error.quantity = "Quantity field is empty"
    }else{
        error.quantity = ""
    }
    

    if(state.description.trim() === ""){
        error.description = "Description field is empty"
    }else{
        error.description = ""
    }

   if(state.manufacturedDate === ""){
        error.manufacturedDate = "Manufactured Date field is empty"
   }else{
    const currentDate = new Date()
    const manufacturedDate = new Date(state.manufacturedDate)
    if (manufacturedDate > currentDate) {
        error.manufacturedDate = "Invalid manufactured date"
    }else{
        error.manufacturedDate = ""
    }
   }

   
    if(state.expiryDate === ""){
        error.expiryDate = "Expiry Date field is empty"
    }else{
        const manufacturedDate = new Date(state.manufacturedDate)
        const expiryDate = new Date(state.expiryDate)
        if (expiryDate < manufacturedDate) {
            error.expiryDate = "Invalid expiry date"
        }else{
            error.expiryDate = ""
        }
    }

    if(state.buyingPrice === ""){
        error.buyingPrice = "Buying price field is empty"
    }else if(Number(state.buyingPrice) <= 0){
        error.buyingPrice = "Invalid buying price"
    }else{
        error.buyingPrice = ""
    }

    if(state.sellingPrice === ""){
        error.sellingPrice = "Selling price field is empty"
    }else if(Number(state.sellingPrice) <= 0){
        error.sellingPrice = "Invalid selling price"
    }else if(state.buyingPrice !== "" && Number(state.buyingPrice) > Number(state.sellingPrice)){
        error.sellingPrice = "Wrong selling price"
    }else{
        error.sellingPrice = ""
    }

    if(state.stock === ""){
        error.stock = "Stock field is empty"
    }else if(Number(state.stock) < 0){
        error.stock = "Invalid stock count"
    }else{
        error.stock = ""
    }

    if(state.company.trim() === ""){
        error.company = "Company field is empty"
    }else{
        error.company = ""
    }

   
    return error;
}