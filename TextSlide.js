/*var txtSlide = new TextSlide({
	project:"#switch",
	controller:".icon-small-btn",
	content: ".ele-content li",
	auto: !0
});*/

var TxtSlide = function(options){

	this.project = $(options.project);
	this.controller = this.project.find(options.controller);
	this.content = this.project.find(options.content);
	this.auto = options.auto || !1
}

TxtSlide.prototype = {

	index: function(){

		var cur = 0,
		content = this.content;

		for (var i = content.length - 1; i >= 0; i--) {
			content[i].className.indexOf("current") > -1 && (cur = i);
		};
		return cur;
	},
	register: function(){

		var _this = this;
		this.controller && this.controller.bind("click",function(){
			var cur = _this.index();
			if($(this).hasClass('pre')){
				cur = (cur -1 < 0) ? _this.content.length-1 : cur-1;
			}
			if($(this).hasClass('next')){
				cur = (cur+1 > _this.content.length -1) ? 0 : cur + 1;
			}
			_this.show(cur);
		});
		_this.auto && this.autoRun();
	},
	show :function(cur){

		var _this = this;
		this.content && this.content.filter(".current")
		.fadeOut(300, function(){
			$(this).css({"display":"none"}).removeClass("current");
			_this.content.eq(cur).fadeIn(300,function(){
				$(this).css("display","").addClass("current");
				_this.reset(cur);
			})
		})
	},
	reset: function(cur){
		this.project.find(".ele-control i").html(cur + 1);
	},
	autoRun: function(){
		var cur = this.index(),
		totalNum = this.content.length,
		_this  = this;
		T = setInterval(function(){
			cur >= totalNum -1 ? cur=0 : cur++;
			_this.show(cur);
		},5e3);
	}
}