

function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();

    var address = streetStr +','+ cityStr; //`extra space breaks code
    console.log(address);
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location='+ address + '';
    console.log(streetviewUrl);
    //integrate nyt api
    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=f723564a5d5f430fb03f3e4f289d7b13'
	$.getJSON( "ajax/nytimesUrl", function( data ) {

  		$nytHeaderElem.text('New York Times Articles About' + cityStr );
  		//why global var (articles)?
  		articles = data.response.docs;
  		var l =  articles.length;
  		for (var i=0; i< l; i++){
  			var article = articles[i];
  			$nytElem.append('<li class="article">'+'<a href="'+article.web_url+'">'+article.headline.main+'</a>'
  			+'<p>' + article.snippet +'</p>'+'</li>');
  			};
  		})

	/*$.ajax({
  		url: nytimesUrl,
  		method: 'GET',
		}).done(function(result) {
			//returns an array of objects (articles)
  			console.log(result);
			}).fail(function(err) {
  				throw err;
				});
	*/

    $('#greeting').text(`So, you want to live at ${streetStr}, ${cityStr[0].toUpperCase()}${cityStr.slice(1)}?`);
    $('body').append('<img class="bgimg" src="' +streetviewUrl + '">');
    return false;
};

$('#form-container').submit(loadData);
