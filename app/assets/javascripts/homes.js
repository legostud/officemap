(function(window, document, $, undefined) {
	'use strict';

	// Call function right away passing STAPLES or empty object if not yet initialized
	var CIDC = (function(CIDC) {

		CIDC.Map = (function() {

			var currentfloor = 4;
			
			// Display info overlay
			// parameters are
			// the id of the name clicked
			// the type of name clicked			
			function displayInfoOverlay(id, type) {
console.log('display ' + id + ' ' + type);
				// Get the information for the popup
				// set the url for the JSON feed.
				var url = '/' + type + '/' + id + '.json';
				//get the data for the name clicked
				$.getJSON(url, function(data){
					// after the data is retrieved
					// adjust the map to show the correct floor
					if(data.floor == "4" && $('.map').hasClass('third') ){
						$('.map').removeClass('third').addClass('forth');
					}
					else if(data.floor == "3" && $('.map').hasClass('fourth')){
						$('.map').removeClass('fourth').addClass('third');
					}
					// populate the overlay
					$('.map .overlay .data').html('<ul></ul>').
						append('<li class="name">'+data.name+'</li>');
						//<br />'+item.title+'<br />'+item.email+'<br />'+item.phone+'<br />Office#'+item.office);
					
					// save the location_number
					
				});
				
				// Get the location for where to display the overlay

			}

			function getOffices(sortby) {
				var sorted;
				//Get the JSON string and pass it to the cb function
				$.getJSON("office.php", function(data){
					if (sortby == "name"){
						sorted = $(data).sort(sortName);
					}
					if (sortby == "office"){
						sorted = $(data).sort(sortOffice);
					}
					$.each(sorted, function(i,item){
						var code = '<p id="'+item.office+'" class="name">'+item.name+'</p>';
						if(item.category == "employee") {
							$(code).appendTo("#employees");
						}
						else if (item.category == "conference") {
							$(code).appendTo("#conferences");
						}
						else {
							$(code).appendTo("#other");
						}
					});
					showResults();
				});		
			}
			function getOffice(office) {
				//Get the JSON string and pass it to the cb function
				if(office.charAt(0)==3 && office.charAt(0)!=currentfloor) { 
					$('#map').css("background-position","left -604px");
					$('#map-name .floor3').show();
					$('#map-name .floor4').hide();
					currentfloor = 3;
				}
				if(office.charAt(0)==4 && office.charAt(0)!=currentfloor) { 
					$('#map').css("background-position","left top");
					$('#map-name .floor3').hide();
					$('#map-name .floor4').show();
					currentfloor = 4;
				}
				
				$.getJSON("office.php?office="+office, function(item){
					if(item.category == "employee") {
						$('#result').html('<span class="name">'+item.name+'</span><br />'+item.title+'<br />'+item.email+'<br />'+item.phone+'<br />Office#'+item.office);
					}
					else if (item.category == "conference") {
						$('#result').html('<span class="name">'+item.name+'</span><br />'+item.phone+'<br />Room#'+item.office);
					}
					else {
						$('#result').html('<span class="name">'+item.name+'</span>');
					}
					x = 0;
					y = 0;
					if (item.x && item.y) {
						x = item.x-10 + 'px';
						y = item.y-20 + 'px';
					}
					$('#result-wrapper').css({'top':y,'left':x}).show();
				});	
			}
			function showResults () {
				$('#offices p').click(function() {
					var office = $(this).attr("id");
					getOffice(office);
				});
			}
			function update() {
				//implements the JSON.org parser
				mySerializedOffice = JSON.stringify(myOffice);
				$.post("office.php",{office_number: 1234, obj: mySerializedOffice});
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
					
					// when the info popup is clicked
					$('.result-wrapper').click( function() { 
						// hide it
						$(this).hide(); 
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




	
