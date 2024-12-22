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


    if(!data.UserName || !data.Password)
    {
       
        return
    }
else{
    await $.ajax({
        url: "https://stat-tracker-ea187a1f2816.herokuapp.com/api/Login/Login",
        type: "POST", // HTTP method
        data: JSON.stringify(data), // Convert data to JSON string
        contentType: "application/json", // Set the content type to JSON
        success: function (response) {
            
            console.log("Success:", response); // Handle success
            Username = response
            console.log(Username)
            if(Username === undefined)
                {
                    alert("Invalid Username and password")
                    return
                }
                else{
                    sessionStorage.setItem("user", JSON.stringify(Username))
                    window.open("home.html", "_self")
                }
           
        }


    });}
}


$("#CreateAccountButton").click(function(){
    CreateAccount()
})

async function CreateAccount(){
    let data = {
        UserName : $("#UserNameC").val(),
        Password : $("#PasswordC").val(),
        AccountID : UniqueID()
    }
    console.log(data.AccountID)

    const response = await fetch("https://stat-tracker-ea187a1f2816.herokuapp.com/api/Account", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    if(!response.ok)
    {
        alert("Please choose a different user name")
    }

    
}

function UniqueID()
{
    return Math.floor(10000 + Math.random() * 90000);
}



  