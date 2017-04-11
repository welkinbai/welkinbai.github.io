$(document).ready(function($) {
	$(function() {
		var min, max;
		if ($('.blogroll-tagcloud a').size() !== 0) {
			triggerTagCloud($('.blogroll-tagcloud a'));			
		}
		if ($('.cat-tagcloud a').size() !== 0) {
			triggerTagCloud($('.cat-tagcloud a'));
		}
		if ($('.tag-tagcloud a').size() !== 0) {
			triggerTagCloud($('.tag-tagcloud a'));
		}

		function triggerTagCloud(domlist) {
			domlist.each(function(index, item) {
				getMaxAndMin(item);
			});
			setConfig();
			domlist.tagcloud();
		}


		function getMaxAndMin(item) {
			if (typeof min === "undefined") {
				min = item.rel;
			}
			if (typeof max === "undefined") {
				max = item.rel;
			}
			if (min > item.rel) {
				min = item.rel;
			}
			if (max < item.rel) {
				max = item.rel;
			}
		}

		function setConfig() {
			$.fn.tagcloud.defaults = {
				size: {
					start: 10 + Number(min),
					end: 10 + Number(max),
					unit: 'pt'
				},
				color: {
					start: '#AD93FF',
					end: '#9E28F7'
				}
			};
		}
	});
});