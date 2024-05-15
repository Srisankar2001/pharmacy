export default function validate(state){
    let error = {
        name : "",
        category : "",
        quantity : "",
        description : "",
        manufaturedDate : "",
        expiryDate : "",
        buyingPrice : "",
        sellingPrice : "",
        stock : "",
        company : "",
        image : ""
    }

    if(state.name.trim() === ""){
        error.name = "Firstname field is empty"
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

    if(state.description.trim() === ""){
        error.description = "Description field is empty"
    }else{
        error.description = ""
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

    return error;
}