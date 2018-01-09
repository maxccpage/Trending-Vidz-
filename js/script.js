
//Searchbar Handler 
$(function() {
	var searchField = $('#query'); 
	var icon = $('#search-button');

	//Focus Handler 
	$(searchField).on('focus', function () {
		$(this).animate({ 
			width: '100%'
		}, 400);
		$('icon').animate({ 
			right: '10px'
		},400);
	});

	//Blur Handler
	$(searchField).on('blur', function () {
		if (searchField.val() == "") {
			$('searchField').animate({
				width: '45%'
			}, 400, function() {});
			$('icon').animate({
				right: '360px'
			}, 400, function() {});
		} else {
			
		}
	});

	$('#search-form').submit(function(e) {
		e.preventDefault(); 
	});
});


function search() {
	// Clear Results 
	$('#results').html(''); 
	$('#buttons').html('');

	//Get Form Input 
	q = $('#query').val();

	//Run GET Request 
	
	$.get(
		"https://www.googleapis.com/youtube/v3/search", {
			part: 'snippet, id',
			q: q, 
			type: 'video',
			key: 'AIzaSyD-KyvVbwh0RUVGaErvFF7yfL5GS9UaZwE'}, 
			function (data) {
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;

				//Log Data
				console.log(data);

				$.each(data.items, function(i, item){
					//Get Output 
					var output = getOutput(item);

					//Display Results
					$('#results').append(output);

				});
					var haha = getButtons(prevPageToken, nextPageToken);
					$('#results').append(haha);
			}
	);


	
}


//NextPage Function 
function nextPage() {
	var token = $('#next-button').data('token');
	var q = $('#next-button').data('query'); 

	// Clear Results 
	$('#results').html(''); 
	$('#buttons').html('');

	//Get Form Input 
	q = $('#query').val();

	//Run GET Request 
	
	$.get(
		"https://www.googleapis.com/youtube/v3/search", {
			part: 'snippet, id',
			q: q, 
			pageToken: token,
			type: 'video',
			key: 'AIzaSyD-KyvVbwh0RUVGaErvFF7yfL5GS9UaZwE'}, 
			function (data) {
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;

				//Log Data
				console.log(data);

				$.each(data.items, function(i, item){
					//Get Output 
					var output = getOutput(item);

					//Display Results
					$('#results').append(output);

				});

					$('#results').append(getButtons(prevPageToken, nextPageToken));
			}
	);


	
}

function getOutput(item) {
	var videoId = item.id.videoId;
	var title = item.snippet.title;
	var description = item.snippet.description;
	var thumb = item.snippet.thumbnails.high.url;
	var channelTitle = item.snippet.channelTitle;
	var date = item.snippet.publishedAt;

	//Building Output String 
	var output = '<li>' +
	'<div class=list-left>' +
	'<img onclick="openModal();" src='+ thumb +' />' +
	'</div>' + 
	'<div class=list-right>' +
	'<h3 onclick="openModal();">' + title +'</h3>' + 
	'<small> Published by <span class="cTitle"> '+ channelTitle +' </span> | '+ date +' </small>' +
	'</div>' + '</li>' +
	'<div class="clearfix"> </div>' + '';

	return output; 
}

//Building buttons 
function getButtons(prevPageToken, nextPageToken) {
		var btnprevput = '<div class="button-container">' + '<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+q+'" onclick="nextPage();">Prev Page </button></div>';
		var btnoutput = '<div class="button-container">' + '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'" onclick="nextPage();">Next Page </button></div>';
		var btns = btnprevput + btnoutput;
	return btnoutput;
} 


function openModal() {

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

}


