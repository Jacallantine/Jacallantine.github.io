$(document).ready(function () {
    // Select the elements to observe
    // const $containers = $('.ContentContainer, .card');
    const $items = $('h1, h2, p, li, h3, img, svg')

    // Create the Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add 'visible' class when the element is in view
          $(entry.target).addClass('SlideUp');
        } 
        
      });
    }, {
      root: null, // Observe relative to the viewport
      rootMargin: '0px',
      threshold: 0.8 // Trigger when 50% of the element is visible
    });

    // Observe each box
    // $containers.each(function () {
    //   observer.observe(this);
    // });
    $items.each(function () {
      observer.observe(this);
    });
  });



  $("#MobileMenu, #MobileClose").click(function () {
    const $mobileDrop = $("#MobileDrop");
  
    if ($mobileDrop.hasClass("HiddenMobile")) {
        // Slide down (show)
        $mobileDrop.removeClass("HiddenMobile").addClass("ShowMobile");
    } else if ($mobileDrop.hasClass("ShowMobile")) {
        // Slide up (hide)
        $mobileDrop.removeClass("ShowMobile").addClass("HideMobile");
  
        // After animation ends, reset to HiddenMobile
        $mobileDrop.one("animationend", function () {
            $mobileDrop.removeClass("HideMobile").addClass("HiddenMobile");
        });
    }
  });

  $("#ContactMe, #AboutMe").click(function(e) {
    e.preventDefault();
    
    const $mobileDrop = $("#MobileDrop");
    const targetId = $(this).attr("href");
    
    if ($mobileDrop.hasClass("ShowMobile")) {
        $mobileDrop.removeClass("ShowMobile").addClass("HideMobile");
        
        // Wait for slide up animation
        $mobileDrop.one("animationend", function() {
            $mobileDrop.removeClass("HideMobile").addClass("HiddenMobile");
            
            // Add a small delay to ensure the mobile menu is fully transformed away
            setTimeout(() => {
                const targetElement = $(targetId);
                
                // Get element that was actually clicked (the anchor)
                const clickedElement = $(targetId);
                
                // Find the corresponding section instead of the anchor
                const targetSection = $(`section${targetId}, div${targetId}, article${targetId}`);
                
                const headerHeight = $('header').outerHeight() || 0;
                const scrollTarget = targetSection.length ? targetSection : clickedElement;
                const scrollPosition = scrollTarget.offset().top - headerHeight;
                
                $('html, body').animate({
                    scrollTop: scrollPosition
                }, 500);
            }, 100); // Small delay to ensure everything is repositioned
        });
    }
});

// $(document).ready(function () {

// $(window).on('scroll', function(){
//   if($(this).scrollTop()>50)
//     {
//       $('nav').addClass("bg-transparent backdrop-blur-lg")
//       .removeClass("bg-white")
//     }
//     else{
//       $("nav").addClass("bg-white")
//       .removeClass('bg-transparent backdrop-blur-lg')
//     }
//     // else{
//     //   $("nav").addClass("bg-transparent text-black")
//     //   .removeClass('bg-white text-black')
//     // }
// })

// })


$(document).ready(function(){
  $(".toggle-ul").click(function(){
  $(this).next("ul").toggleClass("max-md:hidden")
})

})
