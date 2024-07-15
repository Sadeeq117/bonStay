exports.validateName = (name) =>{
    if(name.length >= 3){
        return true;
    }else{
        return false;
    }
}

exports.validatePhoneNumber = (phoneNo) =>{
    const regex = /^\d{10}$/;
    if(regex.test(phoneNo)){
        return true;
    }else{
        return false;
    }
}

exports.validatePassword = (password) =>{
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-+]).{8,12}$/
    if(regex.test(password)){
        return true;
    }else{
        return false;
    }
}

exports.validateEmail = (email) =>{
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if(regex.test(email)){
        return true;
    }else{
        return false;
    }
}