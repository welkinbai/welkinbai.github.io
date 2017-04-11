$(document).ready(function($) {
	"use strict";
	var searchKey = $.cookie('dawn-search');
	var result = [];
	$.getJSON('/search.json', function(dataArr) {
		if (typeof searchKey == 'undefined' || searchKey === '') {
			return;
		}
		searchData(dataArr);
		if (result.length !== 0) {
			showResult(result);
		}
	});

	function searchData(dataArr) {
		var testReg = new RegExp(searchKey, "i");
		$.each(dataArr, function(index, data) {
			var title = data.title;
			var content = data.content;
			var url = data.url;
			if (testReg.test(title)) {
				title = title.replace(testReg, '<font class="hitword">' + searchKey + '</font>');
				console.log('hit title:' + title);
				addResultList(title, content.substring(0, 200) + '<font>……</font>', url);
			} else if (testReg.test(content)) {
				content = content.replace(testReg, '<font class="hitword">' + searchKey + '</font>');
				var index = content.search(testReg);
				console.log('hit content:' + content.substring(index - 100, index + 100));
				if (index === 0) {
					content = content.substring(index - 100, index + 100) + '……';
				} else {
					content = '<font>……</font>' + content.substring(index - 100, index + 100) + '<font>……</font>';
				}
				addResultList(title, content, url);
			}
		})
	}

	function addResultList(title, content, url) {
		var hitPost = {
			title: title,
			content: content,
			url: url
		};
		result.push(hitPost);
	}

	function showResult(result) {
		var container = $('.st-search-container');
		$.each(result, function(index, hitPost) {
			container.append('<div class="row"></div>');
			var row = container.children('.row').last().append('<div class="col-md-4"></div>');
			var title = row.children('.col-md-4').append('<h3><a href="' + hitPost.url + '">' + hitPost.title + '</a></h3>');
			row.append('<div class="col-md-8">');
			var content = row.children('.col-md-8').append(hitPost.content);
			content.append('<p class="pull-right readMore"><a href="' + hitPost.url + '"> 戳进去看看... </a></p>');
			row.append('<div class="clearfix"></div>');
			row.append('<hr class="nogutter">');
		});
	}

});