$("#teams, #TeamArrow").click(function(){
    $("#c3").fadeToggle(400)
    $("#TeamArrow").toggleClass("arrowTransform")
})


$("#players, #PlayerArrow").click(function(){
    $("#c4").fadeToggle(400)
    $("#PlayerArrow").toggleClass("arrowTransform")
})

$("#createPlayer").click(function(){
    $("#playerForm").fadeToggle(400)
})

$("#createTeam").click(function(){
    $("#teamForm").fadeToggle(400)
})