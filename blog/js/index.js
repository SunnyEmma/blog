$(function(){
	//个人中心--下拉菜单
	$('#header .member').hover(function(){
		$(this).css('background', 'url(../images/arrow2.png) no-repeat 70px center');
		$('#header .member ul').show().animate({
			t:30,
			step:1,
			mul : {
				o : 100,
				h : 120
			}
		});

	},function(){
		$(this).css('background', 'url(../images/arrow.png) no-repeat 70px center');
		$('#header .member ul').animate({
			t:30,
			step:10,
			mul : {
				o : 0,
				h : 0
			},
			fn : function(){
				$('#header .member ul').hide();
			}
		});
	});

	//画布
	var screem=$('#screem');

	//登录框
	var login=$('#login');
	login.center(350,250).resize(function(){
		
		if(login.css('display')=='block'){
			screem.lock();
		}
	});

	$('#header .login').click(function(){
		login.show();
		login.center(350,250);
		screem.lock().animate({
			attr:'o',
			start:0,
			target:30,
			t:30,
			step:5
		});
	});
	
	$('#login .close').click(function(){
		login.hide();

		//先执行渐变动画，动画完毕后再执行关闭unlock
		screem.animate({
			attr:'o',
			target:0,
			t:30,
			step:5,
			fn:function(){
				screem.unlock();
			}
		});
	});


	//注册框
	var reg=$('#reg');
	reg.center(600,550).resize(function(){
		
		if(reg.css('display')=='block'){
			screem.lock();
		}
	});

	$('#header .reg').click(function(){
		reg.show();
		reg.center(600,550);
		screem.lock().animate({
			attr:'o',
			start:0,
			target:30,
			t:30,
			step:5
		});
	});
	
	$('#reg .close').click(function(){
		reg.hide();

		//先执行渐变动画，动画完毕后再执行关闭unlock
		screem.animate({
			attr:'o',
			target:0,
			t:30,
			step:5,
			fn:function(){
				screem.unlock();
			}
		});
	});

	login.drag($('#login h2').first());
	reg.drag($('#reg h2').first());



//左侧菜单
	$('#sidebar h2').toggle(function () {
		$(this).next().animate({
			mul : {
				h : 0,
				o : 0
			}
		});
	}, function () {
		$(this).next().animate({
			mul : {
				h : 150,
				o : 100
			}
		});
	});



//滑动导航

$('#nav .about li').hover(function(){
		var target = $(this).first().offsetLeft;
		$('#nav .nav_bg').animate({
			attr:'x',
			target:target + 20,
			t:30,
			step:10,
			fn:function(){
				$("#nav .white").animate({
					attr:'x',
					target: -target,
					
				});
			}
		});
	},function(){
		$('#nav .nav_bg').animate({
			attr:'x',
			target:20,
			t:30,
			step:10,
			fn:function(){
				$('#nav .white').animate({
					attr: 'x',
					target:0
				});
			}
		});
	});



	//百度分享初始化位置
	$('#share').css('top', getScroll().top+(getInner().height - parseInt(getStyle($('#share').first(), 'height'))) / 2 + 'px');
/*	
	addEvent(window,'scroll',function(){
		$('#share').animate({
			attr:'y',
			target:getScroll().top+(getInner().height - parseInt(getStyle($('#share').first(), 'height'))) / 2
		});
	});
*/

$(window).bind('scroll',function(){
	setTimeout(function(){
		$('#share').animate({
			attr:'y',
			target:getScroll().top+(getInner().height - parseInt(getStyle($('#share').first(), 'height'))) / 2
		});
	},100);
});

	//百度分享收缩效果
	$('#share').hover(function () {
		$(this).animate({
			attr : 'x',
			target : 0
		});
	}, function () {
		$(this).animate({
			attr : 'x',
			target : -221
		});
	});


/*
//test
	$('#test').click(function () {
		$(this).animate({
			t : 30,
			step : 10,
			attr : 'x',
			target : 300,
			//mul参数是一个对象，只有两种值：属性 ：目标值
			mul : {
				w : 300,			//长变300
				h : 300,			//高变300
				o : 30,
				fontSize : 100
			}

		});
	});
	
*/

//表单验证

//初始化表单操作
$('form').first().reset();

//用户名验证
$('form').form('user').bind('focus', function () {
		$('#reg .info_user').css('display', 'block');
		$('#reg .error_user').css('display', 'none');
		$('#reg .succ_user').css('display', 'none');
	}).bind('blur', function () {
		if (trim($(this).value()) == '') {
			$('#reg .info_user').css('display', 'none');
			$('#reg .error_user').css('display', 'none');
			$('#reg .succ_user').css('display', 'none');
		} else if (!check_user()) {
			$('#reg .error_user').css('display', 'block');
			$('#reg .info_user').css('display', 'none');
			$('#reg .succ_user').css('display', 'none');
		} else {
			$('#reg .succ_user').css('display', 'block');
			$('#reg .error_user').css('display', 'none');
			$('#reg .info_user').css('display', 'none');
		}
});

	function check_user(){
		if(/[a-zA-Z0-9_]{2,20}/.test(trim($('form').form('user').value())))
			return true;
	}

//密码验证
$('form').form('pass').bind('focus',function(){
	$('#reg .info_pass').css('display', 'block');
	$('#reg .error_pass').css('display', 'none');
	$('#reg .succ_pass').css('display', 'none');
}).bind('blur',function(){
	if(trim($(this).value()) == ''){
		$('#reg .info_pass').css('display','none');
	}else{
		if(check_pass(this)){
			$('#reg .info_pass').css('display', 'none');
			$('#reg .error_pass').css('display', 'none');
			$('#reg .succ_pass').css('display', 'block');	
		}else{
			$('#reg .info_pass').css('display', 'none');
			$('#reg .error_pass').css('display', 'block');
			$('#reg .succ_pass').css('display', 'none');
		}
	}
});

//密码强度验证
$('form').form('pass').bind('keyup',function(){
	check_pass();
});

function check_pass(){
	var value=trim($('form').form('pass').value());
	var value_length=value.length;
	var code_length=0;
	

//验证第一个条件：6~20个字符
	if(value_length>=6&&value_length<=20){
		$('#reg .info_pass .q1').html('●').css('color','green');
	}else{
		$('#reg .info_pass .q1').html('○');
	}
//验证第一二条件：只能包含大小写字母、数字和非空格字符
	if(value_length>0&&!/\s/.test(value)){
		$('#reg .info_pass .q2').html('●').css('color','green');
	}else{
		$('#reg .info_pass .q2').html('○');
	}

//验证第三个条件：大、小写字母、数字、非空字符，2 种以上
	if(/[0-9]/.test(value)){
		code_length++;
	}
	if(/[a-z]/.test(value)){
		code_length++;
	}
	if(/[A-Z]/.test(value)){
		code_length++;
	}
	if(/[^a-zA-Z0-9]/.test(value)){
		code_length++;
	}

	if(code_length >=2){
		$('#reg .info_pass .q3').html('●').css('color','green');
	}else{
		$('#reg .info_pass .q3').html('○');
	}

//验证安全级别
	if(value_length>=10&&code_length>=3){
		$('#reg .info_pass .s1').css('color','green');
		$('#reg .info_pass .s2').css('color','green');
		$('#reg .info_pass .s3').css('color','green');
		$('#reg .info_pass .s4').html('高').css('color','green');
	}else if(value_length>=8&&code_length>=2){
		$('#reg .info_pass .s1').css('color','#f60');
		$('#reg .info_pass .s2').css('color','#f60');
		$('#reg .info_pass .s3').css('color','#ccc');
		$('#reg .info_pass .s4').html('中').css('color','#f60');
	}else if(code_length>=1){
		$('#reg .info_pass .s1').css('color','maroon');
		$('#reg .info_pass .s2').css('color','#ccc');
		$('#reg .info_pass .s3').css('color','#ccc');
		$('#reg .info_pass .s4').html('低').css('color','maroon');
	}else{
		$('#reg .info_pass .s1').css('color','#ccc');
		$('#reg .info_pass .s2').css('color','#ccc');
		$('#reg .info_pass .s3').css('color','#ccc');
		$('#reg .info_pass .s4').html('');
	}

	if(value_length>=6&&value_length<=20&&code_length>=2){
		return true;
	}else{
		return false;
	}
}

//密码重新输入验证
$('form').form('notpass').bind('focus', function () {
		$('#reg .info_notpass').css('display', 'block');
		$('#reg .error_notpass').css('display', 'none');
		$('#reg .succ_notpass').css('display', 'none');
	}).bind('blur', function () {
		if (trim($(this).value()) == '') {
			$('#reg .info_notpass').css('display', 'none');
		} else if (check_notpass()) {
			$('#reg .error_notpass').css('display', 'none');
			$('#reg .info_notpass').css('display', 'none');
			$('#reg .succ_notpass').css('display', 'block');
		} else {
			$('#reg .succ_notpass').css('display', 'none');
			$('#reg .error_notpass').css('display', 'block');
			$('#reg .info_notpass').css('display', 'none');
		}
});

function check_notpass(){
	if(trim($('form').form('pass').value()) == trim($('form').form('notpass').value()))
		return true;
}



//提问
$('form').form('ques').bind('change', function () {
	if (check_ques()) $('#reg .error_ques').css('display', 'none');
});
	
function check_ques() {
	if ($('form').form('ques').value() != 0) return true;
}
	

//回答验证
$('form').form('ans').bind('focus', function () {
		$('#reg .info_ans').css('display', 'block');
		$('#reg .error_ans').css('display', 'none');
		$('#reg .succ_ans').css('display', 'none');
	}).bind('blur', function () {
		if (trim($(this).value()) == '') {
			$('#reg .info_ans').css('display', 'none');
		}  else if (check_ans()) {
			$('#reg .error_ans').css('display', 'none');
			$('#reg .info_ans').css('display', 'none');
			$('#reg .succ_ans').css('display', 'block');
			} else {
			$('#reg .succ_ans').css('display', 'none');
			$('#reg .error_ans').css('display', 'block');
			$('#reg .info_ans').css('display', 'none');
			}
});
	
	function check_ans(){
		if(trim($('form').form('ans').value()).length >= 2 && trim($('form').form('ans').value()).length <= 32)
			return true;
	}

//邮箱验证
$('form').form('email').bind('focus', function () {
		if($(this).value().indexOf('@') == -1) $('#reg .info_email').css('display', 'block');
		$('#reg .error_email').css('display', 'none');
		$('#reg .succ_email').css('display', 'none');
		$('#reg .info_email').css('display','block');
	}).bind('blur', function () {
		$('#reg .all_email').css('display','none');
		if (trim($(this).value()) == '') {
			$('#reg .info_email').css('display', 'none');
		}else if(check_email()){
			$('#reg .error_email').css('display', 'none');
			$('#reg .info_email').css('display', 'none');
			$('#reg .succ_email').css('display', 'block');
			} else {
			$('#reg .succ_email').css('display', 'none');
			$('#reg .error_email').css('display', 'block');
			$('#reg .info_email').css('display', 'none');
			}
});

//电子邮件选定补全
	$('#reg .all_email li').bind('mousedown',function(){
		$('form').form('email').value($(this).text());
	});

//电子邮箱键入补全
	$('form').form('email').bind('keyup',function(event){
		if($(this).value().indexOf('@') == -1 ){
			$('reg .all_email').css('display','block');
			$('#reg .all_email ul li span').html($(this).value());
		}else{
			$('reg .all_email').css('display','none');
		}
 	
 	$('#reg .all_email li').css('background','none');
	$('#reg .all_email li').css('color','#666');
 	//按下向下键
	if(event.keyCode == 40){
		if(this.index == undefined || this.index >=$('reg .all_email li').length()-1){
			this.index=this.index >=$('reg .all_email li').length()-1;
		}else{
			this.index++;
		}
		$('#reg .all_email li').eq(this.index).css('background','#e5edf2');
		$('#reg .all_email li').eq(this.index).css('color','#369');
	}
 
 	//按下向上键
 	if(event.keyCode == 38){
 		if(this.index == undefined || this.index >=0){
			this.index=0;
		}else{
			this.index--;
		}
		$('#reg .all_email li').eq(this.index).css('background','#e5edf2');
		$('#reg .all_email li').eq(this.index).css('color','#369');
 	}

 	//按下回车键
 	if(event.keyCode == 13){
 		$(this).value($('#reg .all_email li').eq(this.index).text());
 		$('reg .all_email').css('display','none');
 		this.index = undefined;
 	}
});

//电子邮箱补全系统点击获取
$('#reg .all_email li').bind('mousedown',function(){
	$('form').form('email').value($(this).text());
});


//邮箱补全移入效果
	$('#reg .all_email li').hover(function(){
		$(this).css('background','#e5edf2');
		$(this).css('color','#369');
	},function(){
		$(this).css('background','none');
		$(this).css('color','#666');
	});
 
	//邮件检测
	function check_email(){
		if(/^[\w-\.]+@[\w-\.]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($('form').form('email').value())))
			return true;
	}

//生日
	var year = $('form').form('year');
	var mouth = $('form').form('mouth');
	var day = $('form').form('day');

	//年
	for(var i = 1950;i<=2017;i++){
		year.first().add(new Option(i,i),undefined)
	}

	//月
	for(var i = 1;i<=12;i++){
		mouth.first().add(new Option(i,i),undefined)
	}

	//日
	var day30 = [4,6,9,11];
	var day31 = [1,3,5,7,8,10,12];

	year.bind('change',select_day);
	mouth.bind('change',select_day);

	function select_day(){
		if(mouth.value()!=0&&year.value()!=0){
			var cur_day = 0;
			if(inArray(day31,parseInt(mouth.value()))){
				cur_day = 31;
			}else{
				if((parseInt(year.value())%4 == 0 && parseInt(year.value())%100!=0)||parseInt(year.value())%400 == 0){
					cur_day=29;		
				}else{
					cur_day=28;
				}
			}
			day.first().options.length=1;
			for(var i =1; i<=cur_day; i++){
				day.first().add(new Option(i,i),undefined)
			}
		}else{
			day.first().options.length=1;
		}
	}

	//年月日检测
	function check_birthday(){
		if(year.value() != 0 && mouth.value() != 0 && day.value() !=0)
			return true;
	}

	//备注验证
	$('form').form('ps').bind('keyup',check_ps);

	//清尾
	$('#reg .ps .clear').click(function(){
		$('form').form('ps').value($('form').form('ps').value().substring(0,200));
		check_ps();
	});

	function check_ps(){
		var num = 200 - $('form').form('ps').value().length;
		if(num>=0){
			$('#reg .ps').eq(0).css('display','block');
			$('#reg .ps .num').eq(0).html(num);
			$('#reg .ps').eq(1).css('display','none');
		}else{
			$('#reg .ps').eq(1).css('display','block');
			$('#reg .ps .num').eq(1).html(Math.abs(num)).css('color','red');
			$('#reg .ps').eq(0).css('display','none');
		}
	}

	//在刷线页面后，还原所有的扁担数据初始化状态
	$('form').first().reset();

	//提交验证
	$('form').form('sub').click(function(){
		var flag = true;
		if(!check_user()){
			$('#reg .error_user').css('display','block');
			flag = false;
		}
		if(!check_pass()){
			$('#reg .error_pass').css('display','block');
			flag = false;
		}
		if(!check_notpass()){
			$('#reg .error_notpass').css('display','block');
			flag = false;
		}
		if(!check_ques()){
			$('#reg .error_ques').css('display','block');
			flag = false;
		}
		if(!check_ans()){
			$('#reg .error_ans').css('display','block');
			flag = false;
		}
		if(!check_email()){
			$('#reg .error_email').css('display','block');
			flag = false;
		}
		if(!check_birthday()){
			$('#reg .error_birthday').css('display','block');
			flag = false;
		}
		if(!check_ps()){
			flag = false;
		}
/*
		if(flag){
			//提交表单
			alert('表单检测完毕，提交成功');
			$('form').first().submit();
		}else{
			alert('表单填写不完整，请完善后提交');
		}
*/
//利用ajax将表单序列化

		if(flag){
			//调用 ajax
				ajax({
					method : 'post',
					url : 'demo.php',
					data : $('form').eq(0).serialize(),
					success : function (text) {
							alert(text);
					},
					async : true
				});
		}
	});



//轮播器初始化
	//$('#banner img').css('display', 'none');
	//$('#banner img').eq(0).css('display', 'block');
	$('#banner img').opacity(0);
	$('#banner img').eq(0).opacity(100);
	$('#banner ul li').eq(0).css('color', '#333');
	$('#banner strong').html($('#banner img').eq(0).attr('alt'));
	
	//轮播器计数器
	var banner_index = 1;
	
	//轮播器的种类
	var banner_type = 2; 		//1表示透明度，2表示上下滚动
	
	//自动轮播器
	var banner_timer = setInterval(banner_fn, 3000);
	
	//手动轮播器
	$('#banner ul li').hover(function () {
		clearInterval(banner_timer);
		if ($(this).css('color') != 'rgb(51, 51, 51)' && $(this).css('color') != '#333') {
			banner(this, banner_index == 0 ? $('#banner ul li').length() - 1 : banner_index - 1);
		}
	}, function () {
		banner_index = $(this).index() + 1;
		banner_timer = setInterval(banner_fn, 3000);
	});
	
	function banner(obj, prev) {
		$('#banner ul li').css('color', '#999');
		$(obj).css('color', '#333');
		$('#banner strong').html($('#banner img').eq($(obj).index()).attr('alt'));
		
		if (banner_type == 1) {
			$('#banner img').eq(prev).animate({
				attr : 'o',
				target : 0,
				t : 30,
				step : 10
			}).css('zIndex', 1);
			$('#banner img').eq($(obj).index()).animate({
				attr : 'o',
				target : 100,
				t : 30,
				step : 10
			}).css('zIndex', 2);
		} else if (banner_type == 2) {
			$('#banner img').eq(prev).animate({
				attr : 'y',
				target : 150,
				t : 30,
				step : 10
			}).css('zIndex', 1).opacity(100);
			$('#banner img').eq($(obj).index()).animate({
				attr : 'y',
				target : 0,
				t : 30,
				step : 10
			}).css('top', '-150px').css('zIndex', 2).opacity(100);
		}
		
	}
	
	function banner_fn() {
		if (banner_index >= $('#banner ul li').length()) banner_index = 0;
		banner($('#banner ul li').eq(banner_index).first(), banner_index == 0 ? $('#banner ul li').length() - 1 : banner_index - 1);
		banner_index++;
	}

/*
//轮播器初始化
$('#banner img').opacity(0);
$('#banner img').eq(0).opacity(100);
$('#banner ul li').eq(0).css('color','#333');
$('#banner strong').html($('#banner img').eq(0).attr('alt'));

//轮播器坐标
for (var i = 0 ; i < $('banner img').length();i++ ){
	$('#banner img')eq(i).css('top',0+(i*150)+'px');
}

//轮播器计数器
var banner_index = 1;

//轮播器类别
var banner_type = 2; //1是透明度轮播，2是上下轮播

//自动轮播器
var banner_timer=setInterval(banner_fn,3000);

//手动轮播器
$('#banner ul li').hover(function(){
	clearInterval(banner_timer);
	if($(this).css('color')!='rgb(51,51,51)'){
		banner(this,banner_index == 0 ? $('#banner ul li').length()-1 : banner_index-1);
	}
},function(){
	banner_index = $(this).index() + 1;
	banner_timer = setInterval(banner_fn,3000);
});


function banner(obj,prev){
	if(banner_type == 1){
		$('#banner img').css('zIndex',1);
		$('#banner ul li').css('color','#999');
		$(obj).css('color','#333');
		$('#banner strong').html($('#banner img').eq($(obj).index()).attr('alt'));
		$('#banner img').eq(prev).animate({
			attr : 'o',
			target : 0,
			t :30,
			step: 10
		});
		$('#banner img').eq($(obj).index())animate({
			attr : 'o',
			target : 100,
			t :30,
			step: 10
		}).css('top',0).css('zIndex',2);
	}else if(banner_type == 2){
		$('banner img').opacity(100);
		$('#banner img').css('zIndex', 1);
		$('#banner img').css('color','#999');
		$(obj).css('color','#333');
		$('#banner strong').html($('#banner img').eq($(obj)index()).attr('alt'));
		$('#banner img')eq(prev).animate({
			attr : 'y',
			target : 150,
			t :30,
			step: 10
		});
		$('#banner img').eq($(obj).index())animate({
			attr : 'y',
			target : 0,
			t :30,
			step: 10
		}).css('top','-150px').css('zIndex',2);
	}
}

function banner_fn(){
	if (banner_index>=$('#banner ul li').length()) banner_index=0;
	banner($('#banner ul li').eq(banner_index).first(),banner_index == 0 ? $('#banner ul li').length()-1 : banner_index - 1);
	banner_index++;
}
*/
//图片延迟加载
var wait_load = $('.wait_load');
wait_load.opacity(0);
$(window).bind('scroll',_wait_load);
$(window).bind('resize',_wait_load);

function _wait_load(){
	setTimeout(function(){
		for(var i = 0 ; i < wait_load.length();i++){
			var _this=wait_load.ge(i);
			if((getInner().height + getScroll().top)>=offsetTop(_this)){
				$(_this).attr('src',$(_this).attr('xsrc')).animate({
					attr : 'o',
					target :100,
					t :30,
					step:10
				});
			}
		}
	},100);
}


//放大图片预加载
	var photo_big=$('#photo_big');
	photo_big.center(620,511).resize(function(){
		
		if(photo_big.css('display')=='block'){
			screem.lock();
		}
	});

	$('#photo dl dt img').click(function(){
		
		photo_big.center(620,511).css('display','block');
		screem.lock().animate({
			attr:'o',
			start:0,
			target:30,
			t:30,
			step:10
		});

	var temp_img = new Image();

	$(temp_img).bind('load',function(){
		$('#photo_big .big img').attr('src',temp_img.src).animate({
			attr : 'o' ,
			target : 100 ,
			t : 30 ,
			step : 10
		}).css('width','600px').css('height','450px').css('top',0).opacity(0);
	});

	temp_img.src = $(this).attr('bigsrc');
	var children = this.parentNode.parentNode;
	prev_next_img(children);



	});
	
	$('#photo_big .close').click(function(){
		photo_big.css('display','none');

		//先执行渐变动画，动画完毕后再执行关闭unlock
		screem.animate({
			attr:'o',
			target:0,
			t:30,
			step:5,
			fn:function(){
				screem.unlock();
			}
		});
		$('#photo_big .big img').attr('src', '../images/loading.gif').css('width', '32px').css('height', '32px').css('top', '190px');
	});

	photo_big.drag($('#photo_big h2').first());

	//鼠标滑过图片
	$('#photo_big .big .left').hover(function(){
		$('#photo_big .big .sl').animate({
			attr : 'o',
			target : 50 ,
			t : 30 ,
			step : 10
		});
	},function(){
		$('#photo_big .big .sl').animate({
			attr : 'o',
			target : 0 ,
			t : 30 ,
			step : 10
		});
	});

	$('#photo_big .big .right').hover(function(){
		$('#photo_big .big .sr').animate({
			attr : 'o',
			target : 50 ,
			t : 30 ,
			step : 10
		});
	},function(){
		$('#photo_big .big .sr').animate({
			attr : 'o',
			target : 0 ,
			t : 30 ,
			step : 10
		});
	});
	
	//图片点击上一张
	$('#photo_big .big .left').click(function(){
		$('#photo_big .big img').attr('src','../images/loading.gif').css('width','32px').css('height','32px').css('top','190px');
		var current_img = new Image();
		$(current_img).bind('load',function(){
			$('#photo_big .big img').attr('src',current_img.src).animate({
				attr : 'o',
				target : 100,
				t : 30,
				step : 10
			}).opacity(0).css('width','600px').css('height','450px').css('top','0');
		});

		current_img.src=$(this).attr('src');
		var children = $('#photo dl dt img').ge(prevIndex($('#photo_big .big img').attr('index'),$('#photo').first())).parentNode.parentNode;
		prev_next_img(children);
	});

		//图片点击下一张
	$('#photo_big .big .right').click(function(){
		$('#photo_big .big img').attr('src','../images/loading.gif').css('width','32px').css('height','32px').css('top','190px');
		var current_img = new Image();
		$(current_img).bind('load',function(){
			$('#photo_big .big img').attr('src',current_img.src).animate({
				attr : 'o',
				target : 100,
				t : 30,
				step : 10
			}).opacity(0).css('width','600px').css('height','450px').css('top','0');
		});

		current_img.src=$(this).attr('src');
		var children = $('#photo dl dt img').ge(nextIndex($('#photo_big .big img').attr('index'),$('#photo').first())).parentNode.parentNode;
		prev_next_img(children);
	});


	function prev_next_img(children){
		var prev = prevIndex($(children).index(),children.parentNode);
		var next = nextIndex($(children).index(),children.parentNode);

		var prev_img = new Image();
		var next_img = new Image();

		prev_img.src = $('#photo dl dt img').eq(prev).attr('bigsrc');
		next_img.src = $('#photo dl dt img').eq(next).attr('bigsrc');
		$('#photo_big .big .left').attr('src',prev_img.src);
		$('#photo_big .big .right').attr('src',next_img.src);
		$('#photo_big .big img').attr('index',$(children).index());
		$('#photo_big .big .index').html(parseInt($(children).index()) + 1 + '/' + $('#photo dl dt img').length());
	}

});

/*








传统DOM
window.onload=function(){

	//个人中心--下拉菜单
	$().getClass('member').hover(function(){
		$().getClass('member').css('background', 'url(images/arrow2.png) no-repeat 70px center');
		$().getTagName('ul').show();

	},function(){
		$().getClass('member').css('background', 'url(images/arrow.png) no-repeat 70px center');
		$().getTagName('ul').hide();
	});

//登录框
	var login=$().getId('login');
	var screem=$().getId('screem');

	login.center(350,250).resize(function(){
		
		if(login.css('display')=='block'){
			screem.lock();
		}
	});

	$().getClass('login').click(function(){
		login.show();
		screem.lock();
		login.center(350,250);
	});
	
	$().getClass('close').click(function(){
		login.hide();
		screem.unlock();
	});
	
	//login.drag();  //未封装成拖拽插件之前的调用

	//拖拽
	login.drag([$().getTagName('h2').getElement(0)]); 
	
	


};

//$().getTagName('body').addClass('a').removeClass('a');测试添加和移除Class属性
//$().getClass('login').drag();

//拖拽功能调试
	var oDiv=document.getElementById('login');
	oDiv.onmousedown=function(e){
		var e=getEvent(e);
		oDiv.style.left=e.clientX+'px';
		oDiv.style.top=e.clientY+'px';
		//oDiv.onmousemove=function(){

		//}
	};
	oDiv.onmousedown=function(e){
		var e=getEvent(e);
		document.onmousemove=function(e){
			oDiv.style.left=e.clientX+'px';
			oDiv.style.top=e.clientY+'px';
		}

		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
		}
	};
	oDiv.onmousemove=function(e){
		var e=getEvent(e);
		oDiv.style.left=e.clientX+'px';
		oDiv.style.top=e.clientY+'px';
	}
};

*/