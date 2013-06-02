(function(window, document, $, undefined) {
	'use strict';

	// Call function right away passing STAPLES or empty object if not yet initialized
	var CIDC = (function(CIDC) {

		CIDC.Map = (function() {

			var currentfloor = 4;
			var location_num;
			
			// Display info overlay
			// parameters are
			// the id of the name clicked
			// the type of name clicked			
			function displayInfoOverlay(id, type) {
// Patch - to be removed
type = (type == "employees") ? "workspaces" : type;
console.log(type);
				// Get the information for the popup
				// set the url for the JSON feed.
				var url = '/' + type + '/' + id + '.json';
				//get the data for the name clicked
				$.getJSON(url, function(data){
					// after the data is retrieved
					// adjust the map to show the correct floor
					if(data.floor == "4" && $('.map').hasClass('third') ){
						$('.map').removeClass('third').addClass('fourth');
					}
					else if(data.floor == "3" && $('.map').hasClass('fourth')){
						$('.map').removeClass('fourth').addClass('third');
					}
					// populate the overlay
					var strHtml = '<ul>';

					strHtml += '<li class="name">' + data.name + '</li>';
					if(type == 'employees'){
						strHtml += '<li class="title">' + data.title + '</li>';
						strHtml += '<li class="email">' + data.email + '</li>';
					}
					strHtml += '<li class="phone">' + data.phone + '</li>';

					$('.map .overlay .content').html(strHtml);
					
					// position the overlay
					positionInfoOverlay(data.location_num);

					// show the overlay
					$('.map .overlay').show();

				});
				
				// Get the location for where to display the overlay

			}

			// position the info overlay based on location num
			function positionInfoOverlay(location_num){
				var x = 0,
					y = 0;
				
				/* if (data.x && data.y) {
					x = item.x-10 + 'px';
					y = item.y-20 + 'px';
				} */
				$('.overlay').css({'top':y,'left':x});
			}

			// Initialize variables
			function init() {
				//wait for DOM Ready
				$(function(){
					// when a Room or Employee name is clicked
					$('nav .links > li').click(function(e){	
						// get the id of the item clicked
						var id = $(this).attr('class');
						//get the type of the item clicked
						var type = $(this).parents('section').attr('class');
						// display the info overlay
						displayInfoOverlay(id, type);
					});					
					// when the Room category title is clicked
						
						// expand or collapse the data below
						
					// when the Employee category title is clicked
						
						// expand or collapse the data below
					
					// For debug info, 
					// when mouse is click on the map
					$('.map').click(function(e){
						// show the clicked cordinates related to the map
						var x = $(".map").offset().left;
						var y = $(".map").offset().top;
						$('.mouse_cords').html(e.pageX-x +', '+ (e.pageY-y ));
					});
					
					// when the overlay or map is clicked
					$('.map').click( function() { 
						// hide the overlay
						$('.overlay').hide(); 
					});
				});
			}
			
			//return functions and variables that you want accessible outside
			return {
				init : init
			};
		})();

        return CIDC;

    }(window.CIDC || {}));
    
	//update the Global STAPLES name space with new functionality and variables
	window.CIDC = CIDC;
    
	// Run as soon as this file loads
	CIDC.Map.init();

}(window, document, jQuery));




	
