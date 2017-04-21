//拖拽插件

$().extend('drag',function(){
	var tags=arguments;
	for(var i=0;i<this.elements.length;i++){

		addEvent(this.elements[i],'mousedown',function(e){
			//preDef(e);           //阻止火狐默认功能（无法拖拽空的div）
			if(trim(this.innerHTML).length==0)e.preventDefault();  //当div为空时才阻止浏览器默认行为,否则阻止默认行为会一并阻止了输入框的输入
			
			var _this=this;    
			var diffX=e.clientX-_this.offsetLeft;
			var diffY=e.clientY-_this.offsetTop;
			
			//自定义拖拽区域
			var flag = false;
			
			for (var i = 0; i < tags.length; i ++) {
				if (e.target == tags[i]) {
					flag = true;					//只要有一个是true，就立刻返回
					break;
				}
			}

			if(flag){          // 当tags=‘H2’时，当鼠标点击在H2区域时才可以移动，其他区域不可以移动，可以选中（比如复制文字等）
				addEvent(document,'mousemove',move);
				addEvent(document,'mouseup',up);
			}else{
				removeEvent(document,'mousemove',move);
				removeEvent(document,'mouseup',up);
			}
			

			function move(e){                   //重定义鼠标移动所要执行的函数，否则不能删除事件（无法删除匿名函数）
				var left=e.clientX-diffX;
				var top=e.clientY-diffY;

					//防止拖拽超出屏幕范围
					if(left<0){
						left=0;
					}else if(left<=getScroll().left){
						left = getScroll().left;
					}else if(left>getInner().width + getScroll().left - _this.offsetWidth){
						left=getInner().width + getScroll().left - _this.offsetWidth;
					}
					if(top<0){
						top=0;
					}else if(top<=getScroll().top){
						top=getScroll().top;
					}else if(top>getInner().height + getScroll().top - _this.offsetHeight){
						top=getInner().height + getScroll().top - _this.offsetHeight;
					}
					_this.style.left=left+'px';
					_this.style.top=top+'px';

					if(typeof _this.setCapture!='undefined'){  //禁止IE bug
						_this.setCapture();
					}
			}
			function up(){                       //重定义鼠标抬起所要执行的函数
				removeEvent(document,'mousemove',move);
				removeEvent(document,'mouseup',up);
					if(typeof _this.releaseCapture!='undefined'){  //禁止IE bug
					_this.releaseCapture();
					}
			}
			
	
		});
    }
	return this;	
});

