$("#ShowCreate, #CreateAccountButton").click(function(){
    $("#DropDownCreate").toggleClass("show")
    $("#ShowCreate").toggleClass("hide")
})


$("#SignInButton").click(function(){
    Login()
})


// async function Login(){
//     let data = {
//     userName :$("#UserName").val(),
//     password : $("#Password").val()
//     }
//     $.post(""), data, function ()



// }