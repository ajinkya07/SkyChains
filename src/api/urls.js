
var url = "http://jewel.jewelmarts.in/webservices/"

export const urls = {
    baseUrl: "http://jewel.jewelmarts.in/webservices/",

    Login: {
        url: url + "User_registration/userLogin",
    },
    SendOtp: {
        url: url + "User_registration/send_otp",
    },
   //change_password  or FP
    ChangePassword: {
        url: url + "User_registration/change_password",
    },
    Register:{
        url: url + "User_registration",

    }

}
