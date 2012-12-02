!function($) {
	$.fn.blightbox = function (option) {

		var Blightbox = function() {
			var obj = {
				"modal": null,
				"leftBtn": null,
				"rightBtn": null,
				"init": function() {
					if (!$(".blightbox.modal").length) {
						var modalTemplate = [
							'<div class="blightbox modal hide ">',
				    		'<div class="modal-header">',
				    		'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>',
				    		'<h3></h3>',
				    		'</div>',
				    		'<div class="modal-body"><div class="img"><div></div>',
				    		'</div>'
				    	].join("");
				    	$("body").append(modalTemplate);

				    	this.modal = $(".blightbox.modal");
	    				this.leftBtn = $("<div></div>").addClass("blight-btn blight-left");
	    				this.rightBtn = $("<div></div>").addClass("blight-btn blight-right");
				    }
				},
				"fetchImg": function(url) {
					var newImg = new Image();
					newImg.onload = function(newImg, obj) {
						return function() {
							var height = newImg.height;
							var width = newImg.width;

							var imgObj = $("<img width='" + width + "px' height='" + height + "px' src='" + newImg.src + "' />");
							obj.modal.css({"marginLeft": (-1 * (Math.ceil(width/2))) + "px"}).find(".img").html(imgObj);

							var btnWidth = obj.leftBtn.width();
							obj.leftBtn.css({"height": height + "px", "marginLeft": "0px"});
							obj.rightBtn.css({"height": height + "px", "marginLeft": (width - btnWidth) + "px"});
						}
					}(newImg, this);
					newImg.src=url;
					return newImg;
				},
				"show": function(link) {
					var url = $(link).attr("href"), title = $(link).find("img").attr("title");

					if (title && title.length) {
						this.modal.find("h3").html(title);
					} else {
						this.modal.find("h3").html("&nbsp;")
					}

					var img = this.fetchImg(url);

					if (!this.modal.is(":visible")) {
						this.modal.modal("show").unbind("hidden").bind("hidden", function () {
							$(document).off("keydown.blightbox");
						});

						$(document).on("keydown.blightbox", function(obj) {
							return function(e) {
							    if (e.keyCode == 37) { // left
									e.preventDefault(); e.stopPropagation();
									if (obj.leftBtn) obj.leftBtn.trigger("click");
							    }
							    if (e.keyCode == 39) { // right
									e.preventDefault(); e.stopPropagation();
									if (obj.leftBtn) obj.rightBtn.trigger("click");
							    }
							    if (e.keyCode == 27) {
							    	e.preventDefault(); e.stopPropagation();
							    	obj.modal.modal("hide");
							    }
							}
						}(this));
					}

					var index = $(link).data("blightbox-index");
					if (index > 0) {
						var rel = $(link).attr("rel"), relLinks = $("a[rel='" + rel + "']");

						var prevLink = $(relLinks).filter("a[data-blightbox-index='" + (index - 1) + "']");
						if (!prevLink.length) prevLink = $(relLinks).last();

						var nextLink = $(relLinks).filter("a[data-blightbox-index='" + (index + 1) + "']");
						if (!nextLink.length) nextLink = $(relLinks).first();

						this.showControls(prevLink, nextLink);
					}
				},
				"showControls": function(prevLink, nextLink) {
					this.modal.find(".modal-body").prepend(this.leftBtn).prepend(this.rightBtn);

					$(this.leftBtn).unbind("click").on("click", function(e) {
						e.preventDefault();
						$(prevLink).trigger("click");
					});
					$(this.rightBtn).unbind("click").on("click", function(e) {
						e.preventDefault();
						$(nextLink).trigger("click");
					});
				}

			}

			return obj;
		}

	    blightbox = new Blightbox();
		blightbox.init();

		var rels = {};
		for (var x=0,max=$(this).length;x<max;x++) {
			var link = this[x];
			var rel = $(link).attr("rel"); rels[rel]=true;
			$(link).unbind("click").on("click", function(e) {
				e.preventDefault();
				blightbox.show(this);
			});
		}

		for(var rel in rels) {
			imgs = $("a[rel='" + rel + "']").each(function(index, obj) {
				$(obj).attr("data-blightbox-index", index+1);
			});
		}

	};
}(window.jQuery);

$(function() {
	$("a[data-blightbox]").blightbox();
})