// document.addEventListener("DOMContentLoaded", ()=>{
//     $("#DropDownCreate").fadeToggle()
// })
Username = []

$("#ShowCreate, #CreateAccountButton").click(function(){
    $("#DropDownCreate").fadeToggle(100)
    $("#ShowCreate").fadeToggle(100)
})


$("#SignInButton").click(function(){
    Login()
})

async function Login() {
    let data = {
        UserName: $('#UserName').val(),
        Password: $("#Password").val()
    };

    await $.ajax({
        url: "https://stat-tracker-ea187a1f2816.herokuapp.com/api/Login/Login",
        type: "POST", // HTTP method
        data: JSON.stringify(data), // Convert data to JSON string
        contentType: "application/json", // Set the content type to JSON
        success: function (response) {
            window.open("home.html", "_self")
            console.log("Success:", response); // Handle success
            Username = response
            console.log(Username)
            sessionStorage.setItem("user", JSON.stringify(Username))

        }
    });
}






  