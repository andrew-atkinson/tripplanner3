$(function(){
  $.get({
    url: '/api/activities'
  })
  .then(function(responseData){
    $.each(responseData, function(i, activity){
      $("[data-type='activity']").append('<option>'+activity.name+'</option>').data('activity', activity);
    });
  })
  .catch(function(error){
    console.error(error);
  })

  $.get({
    url: '/api/hotels'
  })
  .then(function(responseData){
    $.each(responseData, function(i, hotel){
      $("[data-type='hotel']").append('<option>'+hotel.name+'</option>').data('hotel', hotel);
    });
  })
  .catch(function(error){
    console.error(error);
  })

  $.get({
    url: '/api/restaurants'
  })
  .then(function(responseData){
    $.each(responseData, function(i, restaurant){
      $("[data-type='restaurant']").append('<option>'+restaurant.name+'</option>').data('restaurant', restaurant);
    });
  })
  .catch(function(error){
    console.error(error);
  })

})
