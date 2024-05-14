export default function validate(state){
    let error = {
        firstname:"",
        lastname:"",
        dob:"",
        email:"",
        password:"",
        cpassword:"",
    }

    if(state.firstname.trim() === ""){
        error.firstname = "Firstname field is empty"
    }else if(!(/^[a-zA-Z]{2,}$/.test(state.firstname.trim()))){
        error.firstname = "Invalid first name"
    }else{
        error.firstname = ""
    }

    if(state.lastname.trim() === ""){
        error.lastname = "Lastname field is empty"
    }else if(!(/^[a-zA-Z]{2,}$/.test(state.lastname.trim()))){
        error.lastname = "Invalid last name"
    }else{
        error.lastname = ""
    }

    if(state.dob === ""){
        error.dob = "DOB field is empty"
    }else{
        const givenDate = new Date(state.dob);
        const currentDate = new Date();

        const differenceInMilliseconds = currentDate - givenDate;

        const differenceInYears = differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

        if (differenceInYears >= 16) {
            error.dob = ""
        } else {
            error.dob = "Age must be greater than 16 years"
        }
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

    if(state.cpassword.trim() === ""){
        error.cpassword = "Confirm Password field is empty"
    }else if(state.password.trim()!== state.cpassword.trim()){
        error.cpassword = "Password and Confirm password must be same"
    }else{
        error.cpassword = ""
    }

    return error;
}