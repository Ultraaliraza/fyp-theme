$(document).ready(function(){
	$("#closeBars").click(function(){
		$('#drawer').animate({right:'-300px'});
	});	
	$("#openDrawer").click(function(){
		$("#drawer").animate({right:'0px'});
	});
	$("#openSearch").click(function(){
		$(".searchbox").toggle("slow");
	});
	$("#accountSettingDropdown").click(function(){
		$("#dropdownPicture").toggle(100);
	});
	$("#postQustionPopuopOpener").click(function(){
		$("#postQuestionModel").fadeIn("slow");
		$("#postQuestionModelOverlay").fadeIn("slow");
	});
	$("#closeQuestionModel").click(function(){
		$("#postQuestionModel").fadeOut("slow");
		$("#postQuestionModelOverlay").fadeOut("slow");
	});
	$("#openDonations").click(function(){
		$("#DonationsModel").fadeIn("slow");
		$("#postQuestionModelOverlay").fadeIn("slow");
	});
	$("#closeDonationsModel").click(function(){
		$("#DonationsModel").fadeOut("slow");
		$("#postQuestionModelOverlay").fadeOut("slow");
	});
	$("#postQuestionModelOverlay").click(function(){
		$("#postQuestionModel").fadeOut("slow");
		$("#DonationsModel").fadeOut("slow");
		$("#postQuestionModelOverlay").fadeOut("slow");
		$("#reportModel").fadeOut("slow");
	});
	$("#openReportModel").click(function(){
		$("#reportModel").fadeIn("slow");
		$("#postQuestionModelOverlay").fadeIn("slow");
	});
	$("#closeReportModel").click(function(){
		$("#reportModel").fadeOut("slow");
		$("#postQuestionModelOverlay").fadeOut("slow");
	});
	$("#profileChangeOpener").click(function(){
		$("#changeProfile").click();
	});
});


















