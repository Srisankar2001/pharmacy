export default function validate(state){
    let error = {
        email:"",
        password:""
    }


    if(state.email.trim() === ""){
        error.email = "Email field is empty"
    }else if(!(/^[a-zA-Z][^\s@]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(state.email.trim()))){
        error.email = "Invalid email address"
    }else{
        error.email = ""
    }

    if(state.password.trim() === ""){
        error.password = "Password field is empty"
    }else{
        error.password = ""
    }

    return error;
}