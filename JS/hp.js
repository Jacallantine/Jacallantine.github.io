$("#arrow, #map").click(function(){
$("#arrow").toggleClass("arrowClicked")
$("#dropdown").toggleClass("show")
$("#HPForm").toggleClass("hide")
})

document.getElementById("arrow").addEventListener("click", ()=>{
    
})




$("#advancedArrow, #Advanced").click(function(){
$("#advancedArrow").toggleClass("arrowClicked")
$("#advancedDropdown").toggleClass("show")
})


maplist = ["Hacienda", "Vault", "Skyline", "Redcard", "Rewind"]

maplist.forEach(map => {
    let container = document.getElementById("dropdown")
    let mapButton = document.createElement("button")
    mapButton.classList.add("blockButton")
    mapButton.textContent = map

    $(mapButton).click(function() {
        $("#arrow").toggleClass("arrowClicked")
        $("#dropdown").toggleClass("show");
        $("#HPForm").toggleClass("hide")
        $("#mapChosen").text(map)

    });
    container.appendChild(mapButton)  
    
    
});



