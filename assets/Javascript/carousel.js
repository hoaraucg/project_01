$(document).ready(function(){
    // init carousel
  $('.carousel').carousel()
  });

  // $(document).ready(function(){
  //   // init carousel
  // $('.carousel.carousel-slider').carousel({fullwidth : true})
  // });




  function btnClick()
  {
      //    button click
      $("#btnSubmit").button().click(function(showForm){
          alert("button");
      });    
  }