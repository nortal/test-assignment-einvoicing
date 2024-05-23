/* IE6 flicker fix
-------------------------------------------------- */
/*@cc_on
try {
	document.execCommand("BackgroundImageCache", false, true);
} catch(err) {}
@*/

/* Dialog
-------------------------------------------------- */
var openModalContent = null;

function showModal(target, size){
	if ($("#overlay").length == 0) {
		$("#wrap").after("<div id='overlay'></div>");
	}
	if (openModalContent != null){
		$("#" + openModalContent).hide();
	}
	openModalContent = target;

	$("#overlay").css("display","block");
	$("#" + target).css("display","block");
	$("#modalwrap").fadeIn(150);

	if(size == 'big'){
		$("#modalwrap").addClass("modalpopup-large");
	} else {
		$("#modalwrap").removeClass("modalpopup-large");
	}

	if (typeof document.body.style.maxHeight === "undefined") {//if IE 6
		$("html").css("overflow","hidden");
	} else {
		$("#modalwrap").css("margin-top","-" + $("#modalwrap").height() / 2 + "px");
	}

	$("#overlay").bgiframe({ src: "javascript:'<html></html>';" });

	escape();
	return false;
}

$(document).ready(function(){
	$("#modalwrap").click(function(){ positionDialog() });
	$("#modalwrap input:radio, #modalwrap input:checkbox, #modalwrap select").change(function(){ positionDialog() });
});

function positionDialog(){
	if( $("#modalwrap").css("position") == "absolute" ){
		return false;
	} else {
		$("#modalwrap").animate({ 
			marginTop: "-" + $("#modalwrap").height() / 2 + "px"
		}, "normal" );
	}
}

function hideModal(){
	if (openModalContent != null){
		$("#" + openModalContent).fadeOut(150);
	}
	if (typeof document.body.style.maxHeight == "undefined") {//if IE 6
		$("html").css("overflow","");
	}
	$("#modalwrap").fadeOut(150, function(){
		$("#overlay").css("display","none");
	});
	$("#" + openModalContent).removeClass("modalpopup-large");

	return false;
}

function escape(){
	document.onkeyup = function(e) {
		var code;
		if (!e) var e = window.event;
		if (e.keyCode) code = e.keyCode;
		else if (e.which) code = e.which;
		if (code == 27){
			hideModal();
		}
	}
}

/* jQuery
-------------------------------------------------- */
var toggleH2boxes = {
	init : function(){
		$("h2.toggle a").click(this.clickIt);
	},
	clickIt : function(){
		$(this).parents("h2").toggleClass("toggle-open");
		$(this).parents("h2").nextAll("div.toggle-wrap:first").slideToggle("fast");
		return false;
	}
};
function headingHover() {
	$("h2.toggle a").hover(
		function(){
			$(this).parents("h2").css("border-color","#ff9000");
		},
		function(){
			$(this).parents("h2").css("border-color","#ff9000");
		}
	);
}
var toggle = {
		init : function(){
		$("a.more").click(this.clickIt);
	},
	clickIt : function(){
		$(this).parents().parents().parents().prev("div.toggle-wrap").toggle();
		
			if (typeof document.body.style.maxHeight === "undefined") {//if IE 6
		$("html").css("overflow","hidden");
	} else {
		$("#modalwrap").css("margin-top","-" + $("#modalwrap").height() / 2 + "px");
	}

		$(this).toggleClass("more-open");

		if ($(this).hasClass("more-open")) {
			$(this).text("Peida arve fail");
		}
		else {
			$(this).text("Näita arve faili");
		}
		return false;
	}
};
var toggleHeadingForm = {
	init : function(){
		$("ul.heading-action li.toggle a").click(this.clickIt);
	},
	clickIt : function(){
		$(this).toggleClass("open");
		$(this).parents("ul").nextAll("div.heading-form:first").slideToggle("fast");
		return false;
	}
};
function closeHeadingForm() {
	$("ul.heading-action:first li.toggle a").removeClass("open");
}
function navInit() {
	if($("#nav").length > 0){
		$("#nav ul").supersubs({
			minWidth: 12,	// minimum width of sub-menus in em units 
			maxWidth: 24,	// maximum width of sub-menus in em units 
			extraWidth: 1	// extra width can ensure lines don't sometimes turn over 
							// due to slight rounding differences and font-family 
		}).superfish({
			animation: {opacity:'show',height:'show'},
			speed: 100,
			delay: 600,
			dropShadows: false
		});
		if($.browser.msie && ($.browser.version < 7) ){
		$("ul.menu div").bgiframe({ src: "javascript:'<html></html>';" });
	}
	}
}

/* tooltip */
var tooltip = {
	init : function(){
		$("[data-tooltip]").hover(this.showIt, this.hideIt);
	},
	showIt : function(){
		if($($(this).attr('data-tooltip')).length) {
			$($(this).attr('data-tooltip'))
				.css({
					'top' : $(this).position().top + $(this).outerHeight() + 5,
					'left' :  $(this).position().left
				})
				.show();
		}
	},
	hideIt : function(){
		if($($(this).attr('data-tooltip')).length) {
			$($(this).attr('data-tooltip')).hide();
		}
	}
};

/* data tables */

function dataHover() {
	$("table.data tbody:not(.form) tr").hover(
		function(){
			$(this).addClass("hover");
		},
		function(){
			$(this).removeClass("hover");
		}
	);
}
var toggleSubrow = {
	init : function(){
		$("table.data tbody a.toggle-subrow").click(this.clickIt);
	},
	clickIt : function(){
		if($(this).parents("tr").next("tr.subrow").css("display") == "none") {
			$(this).parents("tr").addClass("toggler");
			$(this).parents("tr").next("tr.subrow").css("display","");
		} else {
			$(this).parents("tr").removeClass("toggler");
			$(this).parents("tr").removeClass("marked");
			$(this).parents("tr").next("tr.subrow").css("display","none");
		}
		return false;
	}
};
var toggleSubtable = {
	init : function(){
		$("table.data tbody a.toggle-subtable").click(this.clickIt);
	},
	clickIt : function(){
		if($(this).parents("tr").next("tr.subtable").css("display") == "none") {
			$(this).parents("tr").addClass("toggler");
			$(this).parents("tr").next("tr.subtable").css("display","");
		} else {
			$(this).parents("tr").removeClass("toggler");
			$(this).parents("tr").removeClass("marked");
			$(this).parents("tr").next("tr.subtable").css("display","none");
		}
		return false;
	}
};
var toggleHybrid = {
	init : function(){
		$("div.hybrid ul li p.toggle").click(this.clickIt);
	},
	clickIt : function(){
		$(this).parent("li").children("ul").slideToggle(200);
		$(this).toggleClass("toggle-open");
		return false;
	}
};
function fixIEoverflow() {
	if (!/*@cc_on!@*/0) return;

	var all = document.getElementsByTagName('*'), i = all.length;
	while (i--) {
		// adding a class match just to show the difference
		if (all[i].className.match(/scroll/) && all[i].scrollWidth > all[i].offsetWidth) {
			all[i].style['overflowY'] = 'hidden';
			all[i].style['paddingBottom'] = '17px';
		}
	}
}
var headingSort = {
	init : function(){
		$("table.data thead th.sort a").click(this.clickIt);
	},
	clickIt : function(){
		if($(this).parent().is(".ascending")) {
			$(this).parents("thead").find("th").removeClass("ascending");
			$(this).parents("thead").find("th").removeClass("descending");
			$(this).parent().removeClass("ascending");
			$(this).parent().addClass("descending");
		}
		else if ($(this).parent().is(".descending")) {
			$(this).parents("thead").find("th").removeClass("ascending");
			$(this).parents("thead").find("th").removeClass("descending");
			$(this).parent().removeClass("descending");
			$(this).parent().addClass("ascending");
		}
		else {
			$(this).parents("thead").find("th").removeClass("ascending");
			$(this).parents("thead").find("th").removeClass("descending");
			$(this).parent().addClass("ascending");
		}
		return false;
	}
};

/* radio, checkbox */
var markRows = {
	init : function(){
		$("table.data tbody:not(.form) tr").dblclick(this.clickIt);
	},
	clickIt : function(){
		$(this).toggleClass("marked");
	}
};
var markCheck = {
	init : function(){
		$("div.sub-action a.check").click(this.clickIt);
	},
	clickIt : function(){
		if($(this).is(".mark-all")) {
			$(this).parents("div.sub-action").nextAll("table.data:first").find("tbody tr td.check input:checkbox").attr("checked","checked");
			$(this).parents("div.sub-action").nextAll("table.data:first").find("tbody tr td.check input:checked").parents("tr").addClass("checked");
			$("div.sub-action a.check").addClass("mark-none").removeClass("mark-all").text("Eemalda kõik");
		}
		else if($(this).is(".mark-none")) {
			$(this).parents("div.sub-action").nextAll("table.data:first").find("tbody tr td.check input:checkbox").removeAttr("checked");
			$(this).parents("div.sub-action").nextAll("table.data:first").find("tbody tr td.check input").not(":checked").parents("tr").removeClass("checked");
			$("div.sub-action a.check").addClass("mark-all").removeClass("mark-none").text("Vali kõik");
		}
	}
};
var setCheckbox = {
	init : function(){
		$("table.data tr td.check input:checkbox").click(this.clickIt);
	},
	clickIt : function(){
		if($(this).is(":checked")) {
			$(this).parents("tr").addClass("checked");
		} else {
			$(this).parents("tr").removeClass("checked");
		}
	}
};
var setRadio = {
	init : function(){
		$("table.data tr td.check input:radio").click(this.clickIt);
	},
	clickIt : function(){
		$(this).parents("table").find("tr.checked").removeClass("checked");
		$(this).parents("tr").addClass("checked");
	}
};
function controlCheckbox() {
	$("table.data tbody tr td.check input:checkbox:checked").parents("tr").addClass("checked");
}
function controlRadio() {
	$("table.data tbody tr td.check input:radio:checked").parents("tr").addClass("checked");
}

var toggleCheckbox = {
	init : function() {
		$("input:checkbox[data-toggle]").click(this.clickIt);
	},
	clickIt : function(){
		if($(this).is(':checked')) $( $(this).attr('data-toggle') ).slideDown();
		else $( $(this).attr('data-toggle') ).slideUp();
	}
};
function controlToggleCheckbox() {
	$("input:checkbox[data-toggle]").each(function() {
		if($(this).is(':checked')) $($(this).attr('data-toggle')).show();
		else $($(this).attr('data-toggle')).hide();
	});
}


function tableMenu() {
	if( $("ul.menu").length > 0 ) {
		var config = {
			interval: 200,
			over: tableMenuOver,
			timeout: 200,
			out: tableMenuOut
		};
		$("td.action-menu").find("ul.menu > li").hoverIntent(config);
	}
}
function tableMenuOver(){
	var menu = $(this).parent();
	$(this).children("div").css({
		display: "block",
		top: menu.position().top,
		marginLeft: "-" + $(this).children("div").outerWidth() + "px"
	});
	$(this).children("a").addClass("open");
	if($.browser.msie && ($.browser.version < 7) ){
		$("ul.menu div").bgiframe({ src: "javascript:'<html></html>';" });
	}
}
function tableMenuOut(){
	$(this).children("div").css("display","none");
	$(this).children("a").removeClass("open");
}
var formTabs = {
	init : function(){
		$("div.form-tabs-heading ul").find('LI').not('LI.toggler').children('A').not('A.new-win').click(this.clickIt);
		$("div.form-tabs-heading ul li.toggler").addClass("disabled");
		//$("div.form-tabs-heading ul li:first-child").addClass("active");
		//$("div.form-tabs-wrap div.form-tabs-content:first").css("display","block");
	},
	clickIt : function(){
		var target = $(this).attr("class");

		$("div.form-tabs-heading ul li.disabled").removeClass("disabled");
		$("div.form-tabs-heading ul").find('LI.toggler').children('A').addClass('toggle-open');

		$(this).parents("ul").children("li").removeClass("active");
		$(this).parents("div.form-tabs-wrap").find("div.form-tabs-content:visible").css("display","none");

		$(this).parent("li").addClass("active");
		$("#" + target).css("display","block");

		return false;
	}
};

function newElement() {
	$('a[href="#add-new"]').click(function(e) {
	
		e.preventDefault();
		
		if($(this).attr('data-template') && $($(this).attr('data-template')).length) {
			
			var template = $($(this).attr('data-template')).find('p').clone().hide();
			template.appendTo($(this).prev('.addable'));
			template.slideDown('fast');
			
		}
	});
}
function deleteElement() {
	$('.addable .remove').live('click', function(e) {
		e.preventDefault();
		$(this).closest('p').slideUp('fast', function() { $(this).remove(); });
	});
}

function formTabsToggle() {
	$("div.form-tabs-heading ul").find('LI.toggler').children("A").click(function(){
		if (!($(this).parent().hasClass('disabled'))){
			var target = $("#" + $("div.form-tabs-heading ul li.active").children('A:eq(0)').attr("class"));
			if (target.is(':visible')){
				target.slideUp(100);
				$(this).removeClass('toggle-open')
			}
			else {
				target.slideDown(100);
				$(this).addClass('toggle-open')
			}
		}
		return false;
	});
}

/* Suggest */

function indexSuggest() {
	$("input:text.suggest-index").autocomplete("search-index.php", {
		max: 12,
		selectFirst: false,
		cacheLength: 10,
		formatItem: formatItem
	});
}
function formatItem(row) {
	return row[0] + "<em>" + row[1] + "</em>";
}

/* toggleFilter */

var toggleFilter = {
		init : function(){
		$("div.filter p.toggle a").click(this.clickIt);
	},
	clickIt : function(){
		$(this).parent().toggleClass("toggle2");

		if ($(this).parent().hasClass("toggle2")) {
			$(this).text("Tavaline filter");
			$(this).parent().prev().css("display","none");
		}
		else {
			$(this).text("Laiendatud filter");
			$(this).parent().prev().css("display","");
		}
		$(this).parent().parent().next("div.wrap-toggle").toggle();
	}
};

/* Date range (requires jquery) */
function initDateRange() {
	var elements = $('[data-date-range-set]');
	
	// defining constants
	var con = {'CURRENT_WEEK': 0,
			'CURRENT_MONTH' : 1,
			'DAYS_30': 2,
			'LAST_MONTH': 3
		};
	
	if (elements.length === 0) {
		return;
	}
	elements.click(function(e) {
		conf = $(this).attr('data-date-range-set');
		var from = new Date();
		var to = new Date();
		switch(con[conf]) {
			case con.CURRENT_WEEK:
				from.setDate(from.getDate() - from.getDay() + 1);
				$($(this).attr('data-date-range-input-from')).val(dateToString(from));
				$($(this).attr('data-date-range-input-to')).val(dateToString());
				break;
			case con.CURRENT_MONTH:
				from.setDate(1);
				$($(this).attr('data-date-range-input-from')).val(dateToString(from));
				$($(this).attr('data-date-range-input-to')).val(dateToString());
				break;
			case con.DAYS_30:
				from.setDate(from.getDate() - 30);
				$($(this).attr('data-date-range-input-from')).val(dateToString(from));
				$($(this).attr('data-date-range-input-to')).val(dateToString());
				break;
			case con.LAST_MONTH:
				from.setMonth(from.getMonth() - 1);
				from.setDate(1);
				$($(this).attr('data-date-range-input-from')).val(dateToString(from));
				
				to.setDate(0);
				$($(this).attr('data-date-range-input-to')).val(dateToString(to));
				break;
			default:
				break;
		}
	});
}

function dateToString(d) {
	if (typeof d === 'undefined') {
		d = new Date();
	}
	var day = String(d.getDate());
	day = (day.length === 1) ? '0' + day : day; //adding leading zero if needed
	var month = String((d.getMonth() + 1));
	month = (month.length === 1) ? '0' + month : month; //adding leading zero if needed
	return day + '.' + month + '.' + d.getFullYear();
}

/* document ready */

$(document).ready(function(){

	navInit();
	
	indexSuggest();

	markRows.init();
	markCheck.init();
	controlRadio();
	controlCheckbox();
	setCheckbox.init();
	setRadio.init();
	formTabs.init();
	formTabsToggle();
	toggle.init();

	toggleFilter.init();
	$("div.wrap-toggle").hide();

	tableMenu();
	headingSort.init();
	toggleHeadingForm.init();

	$("div.hybrid ul p.title:not(.toggle-open)").parent("li").children("ul").css("display","none");
	toggleHybrid.init();

	$("table.data tr.subrow").css("display","none");
	toggleSubrow.init();
	
	$("table.data tr.subtable").css("display","none");
	toggleSubtable.init();

	toggleH2boxes.init();
	$("div.toggle-wrap").css("display","none");
	
	controlToggleCheckbox();
	toggleCheckbox.init();
	
	newElement();
	deleteElement();
	
	tooltip.init();
	
	initDateRange();
	
	fixIEoverflow();

	$("td.action-menu").find("ul.menu > li > a").click(function() { return false; });
	
	/* FF */
	if($.browser.mozilla){
		$("table.data").css("margin-left","1px");
	}

	if($.browser.mozilla && parseFloat($.browser.version) >= 1.9){
		$("input.button, input.button2, ul.menu > li > a").addClass("border-radius");
	}

	/* IE */
	if($.browser.msie){
	}

	/* IE6 */
	if($.browser.msie && ($.browser.version < 7) ){
		dataHover();
	}

});