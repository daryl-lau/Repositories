$(document).ready(function() {
	//選單搜尋列顯示隱藏控制
	$(".search-icon").on('click', function() {
		$(".header-bottom-search").slideToggle();
		$(".first-currencies").css("display", "none");
		$(".first-languages").css("display", "none");
	});
});