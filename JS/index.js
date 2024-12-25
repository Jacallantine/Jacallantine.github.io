
let User = JSON.parse(sessionStorage.getItem("user")) || []

$("#signInSpan").text(User.userName)




$("#signIn").click(function(){
 
    if(User.length === 0)
        {
            window.open("./HTML/signIn.html", "_self")
        }
        else{
            window.open("./HTML/home.html", "_self")
        }
})