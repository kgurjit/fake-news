$(document).ready(function(){
	var currIndex = 0;
	var newsData = JSON.parse($("#data").html());

	var displayNews = function(){
		$("#newsHolder h3").html(newsData[currIndex].title);
		$("#newsHolder p.lead").html(newsData[currIndex].body);

		if(currIndex === 0) {
			$("#prev").hide();
		} else {
			$("#prev").show();
		}
		if(currIndex >= newsData.length) {
			$("#next").hide();
		} else {
			$("#next").show();
		}
	};

	$("#next").on("click", function(e){
		e.preventDefault();
		if(currIndex < newsData.length - 1){
			currIndex++;
		}
		displayNews();
	});

	$("#prev").on("click", function(e){
		e.preventDefault();
		if(currIndex > 0){
			currIndex--;
		}
		displayNews();
	});



	displayNews();
});