var road=0;
var counter=0;
var puton=0;
var count15 =0;
var dual=0;
var j=0;
var win=0;
var lose=0;
var z={// тут вручную прописываются пять вариантов поведения графика после нажатия одной из клавиш
	0:[-0.00005, -0.00003,-0.00006,0.00001,0.00003,0.00007,0.00005,0.00006,0.00007,0.00005,0.00004,0.00008,0.00007,0.00004,0.0001],
1:[0.00003, 0.00001,-0.000016,0.00004,0.00002,0.00004,0.00005,0.00005, 0.00007,0.00006,0.00008,0.00009,0.00007,0.00004,0.00007],
2:[0.00001, 0.00005,0.00002,0.00003,0.00005,0.000006,0.00004,0.00005,0.00003,0.00007,0.00005,0.00005,0.00007,0.00004,0.00008],
3:[0.00005, 0.00003,0.00006,0.00005,0.00007,0.000008,0.00005,0.00006,0.00005, 0.00003,0.00007,0.00005,0.00009,0.00004,0.00008],
4:[-0.000001, -0.00003,-0.00001,0.00002,0.00006,0.00009,0.00005,0.00007,0.00003,0.00006,0.00009,0.00005,0.00008,0.00004,0.00007],
};//варианты выбираются случайно
//отрицательными могут быть только первые 4 числа каждого варианта


function animateProperties(e,t,i,a,o,n){
	var r=a.property,l=a.val;
	if(Math.abs(l-t[r])<=1)return void(t[r]=l);
	if(void 0===t[r]||null===t[r])return void(t[r]=l);
	if(o=o||100,i===!1?(i=t,i.start=e):i&&i.start||(i={start:e}),l!==t[r])
		{var s=o+i.start-e;if(1>=s)return t[r]=l,delete i.start,void(n&&n());t[r]+=1e3*(l-t[r])/(48*s)}
}
function calculateScaleRange(e,t,i,a){
	if(i=Math.round(i),t>e)return!1;
	var o=5;
	a&&(o=3e4);
	var n=2,r=n>=i;
	e===t&&(e+=.5,t>=.5?t-=.5:e+=.5);
	for(var l=Math.abs(e-t),s=Math.floor(Math.log(l)/Math.log(o)),c=Math.ceil(e/+Math.pow(o,s))*Math.pow(o,s),h=Math.floor(t/+Math.pow(o,s))*Math.pow(o,s),d=c-h,f=Math.pow(o,s),m=Math.round(d/f),u=0;(m>i||i>2*m)&&!r;){
		if(u++>100){
			console.log("while ",m,i,r),console.log("args ",e,t,i,a);
			break
		}
		m>i?(f*=2,m=Math.round(d/f),m%1!==0&&(r=!0)):(f/=2,m=Math.round(d/f))
	}
	return r&&(m=n,f=d/m),{steps:m,stepValue:f,min:h-+m*f,max:h+m*f}
}
function Chart(e,t)
{
	function i(e){
		n.chart.cursorCoords.x=e.layerX,n.chart.cursorCoords.y=e.layerY
	}
	function a(){
		n.chart.cursorCoords.x=null,n.chart.cursorCoords.y=null
	}
	var o,n=this; 
	n._chartAnim={},n._lastValAnim={},n._scaleLinesAnim={},n.selectedTime={time:null,style:function(e){}},n.conf={barometerColor:"#CC0000",barometerTextColor:"#fff",defaultBarometerColor:"#9C9B9B",bgColor:"#1a1a1a",axisColor:"#666",font:"normal 12px Proxima Nova Regular",curPointColor:"#41ff5e",cursorColor:"#F6FFB5",cursorTextColor:"#000",chartColor:"rgba(128,128,128, 0.701961)",chartStrokeColor:"#808080",type:"candle",timeFrame:1e4,scaleLineRange:50,fixedLength:6};
	for(var r in t)
		void 0!==n.conf[r]&&(n.conf[r]=t[r]);
	n.conf.timeFrame<=1e3&&(n.conf.type="area"),n.currentTranslateX=0,n.points={},n.objects=[],n.firstPoint=0,n.lastPoint=0,n.axisLabelSize={
		x:20,y:70
	}
	,n.chart={
		pointWidth:5,paddingTop:50,paddingBottom:30,drawPoints:{},visiblePoints:{},extremes:{},cursorCoords:{}
	}
	,n._setSizeCanvas=function(e,t,i){
		e.canvas.width=t*window.devicePixelRatio,e.width=t,e.canvas.height=i*window.devicePixelRatio,e.height=i,e.canvas.style.height=i+"px",e.canvas.style.width=t+"px",e.ctx=e.canvas.getContext("2d"),e.ctx.font=n.conf.font,e.ctx.lineWidth=0,e.ctx.scale(window.devicePixelRatio,window.devicePixelRatio)
	},
	n._createCanvas=function(t,i,a){
		n.hasOwnProperty(t)||(n[t]={}),n[t].canvas=document.createElement("canvas"),n[t].canvas.style.position="absolute",n[t].canvas.style.left=0,n[t].canvas.style.top=0,n[t].render=function(e){},n._setSizeCanvas(n[t],i,a),e.appendChild(n[t].canvas)
	},
	n._createCanvas("backLayer",e.offsetWidth,e.offsetHeight),n._createCanvas("backLayerMask",e.offsetWidth,e.offsetHeight),n._createCanvas("chart",e.offsetWidth-n.axisLabelSize.y,e.offsetHeight-n.axisLabelSize.x),n._createCanvas("frontLayer",e.offsetWidth,e.offsetHeight),n._drawBackLayerMask=function(){
		var e=n.backLayerMask.ctx;e.clearRect(0,0,n.backLayerMask.width,n.backLayerMask.height),e.beginPath(),e.moveTo(0,n.chart.height+.5),e.lineTo(n.backLayerMask.width,n.chart.height+.5),e.lineWidth=1,e.strokeStyle=n.conf.axisColor,e.stroke(),e.closePath()
	},
	n._drawBackLayerMask(),n._checkNewExtremums=function(e){
		return e<n.chart.extremes.minRate?(n.chart.extremes.minRate=e,!0):e>n.chart.extremes.maxRate?(n.chart.extremes.maxRate=e,!0):!1
	},
	n._checkExtremums=function(){
		for(n.chart.extremes.minRate=+(1/0),n.chart.extremes.maxRate=-(1/0),o=n.chart.visiblePoints.from;o<=n.chart.visiblePoints.to;o+=1e3)n.points.hasOwnProperty(o)&&("area"==n.conf.type||o%n.conf.timeFrame)&&n._checkNewExtremums(n.points[o].rate);var e=(n.chart.height-n.chart.paddingTop-n.chart.paddingBottom)/(n.chart.extremes.maxRate-n.chart.extremes.minRate);e!=n.scaleY&&isFinite(e)&&e>0&&(n.scaleY=e,n._setValBetweenLines())
	},
	n.changeDrawPoints=function(){
		var e={first:+n.firstPoint,last:+n.lastPoint},t=n.chart.drawPoints,i=n.chart.visiblePoints;n.points.hasOwnProperty(n.timeToX(e.first))<-1e3?t.from=n.XToTime(-1e3):t.from=e.first,n.points.hasOwnProperty(n.XToTime(0))?i.from=n.XToTime(0):i.from=e.first,n.points.hasOwnProperty(n.timeToX(e.last))>1e3?t.to=n.XToTime(1e3):t.to=e.last,n.points.hasOwnProperty(n.XToTime(n.chart.width))?i.to=n.XToTime(n.chart.width):i.to=e.last,n._checkExtremums()
	},
	n._setValBetweenLines=function(){
		var e=n.backLayer,t=n.chart.height,i=((t/n.conf.scaleLineRange<2?2:t/n.conf.scaleLineRange)*Math.log(n.chart.pointWidth),calculateScaleRange(n.YToRate(0),n.YToRate(t),7));i&&(e.firstLine=i.max+i.stepValue*(n.chart.paddingTop/n.conf.scaleLineRange+1),e.lastLine=i.min-i.stepValue*(n.chart.paddingBottom/n.conf.scaleLineRange+1),e.valBetweenLines=i.stepValue)
	},
	n.setPoints=function(e){
		return n.chart.pointWidth=5,e[e.length-Math.floor((n.chart.width+1e3)/n.chart.pointWidth/2)]&&(n.chart.drawPoints.from=e[e.length-Math.floor(n.chart.width/n.chart.pointWidth/2)].time),n.chart.drawPoints.from||(n.chart.drawPoints.from=e[0].time),n.chart.visiblePoints.from=e[e.length-Math.floor(n.chart.width/n.chart.pointWidth/2)].time,n.chart.visiblePoints.from||(n.chart.visiblePoints.from=e[0].time),n.chart.drawPoints.to=e[e.length-1].time,n.chart.visiblePoints.to=+n.chart.drawPoints.to,n.basePoint=n.chart.visiblePoints.from,delete n.points,n.points={},e.forEach(function(e,t,i){
			n.points[e.time]={rate:e.rate,time:e.time}
		}),
		n.currentTranslateX=0,n.firstPoint=e[0].time,n.lastPoint=e[e.length-1].time,n._checkExtremums(),n.backLayer.lines={},n.axisLabelSize.y=n.backLayer.ctx.measureText(e[0].rate.toFixed(n.conf.fixedLength)).width+5,n.chart.render=n.drawChart,n.backLayer.render=n.drawBackLayer,n.frontLayer.render=n.drawFrontLayer,!0
	},
	n._setChartColor=function(){
		if("string"==typeof n.conf.chartColor)
			n.chart.ctx.fillStyle=n.conf.chartColor;
		else{
			n._chartColor=n.chart.ctx.createLinearGradient(0,n.chart.height,0,0);
			for(var e in n.conf.chartColor){//тут меняется градиент под линией графика
				n.conf.chartColor.hasOwnProperty(e)&&n._chartColor.addColorStop(1,"#CC0000");
				n.conf.chartColor.hasOwnProperty(e)&&n._chartColor.addColorStop(0.5,"#db4c4c");
				n.conf.chartColor.hasOwnProperty(e)&&n._chartColor.addColorStop(0,"#ea9999");
			}
			n.chart.ctx.fillStyle=n._chartColor
		}
		n.chart.ctx.strokeStyle=n.conf.chartStrokeColor
	},
	n._setChartColor(),
	n.drawChartFn=function(){
		var e=null,t=null,i=null,a=null,o=null,r=null,l=null,s="area";
		n.updateVar=function(){
			n.backLayer.lines&&n._setValBetweenLines(),e=+n.chart.pointWidth,t=+n.scaleY,i=+n.chart.extremes.minRate,a=+n.currentTranslateX,o=+n.chart.paddingBottom,r=+n.chart.height,l=+n.basePoint,s=n.conf.type,"candle"==s&&1e3==n.conf.timeFrame&&(n.conf.timeFrame=5e3),"candle"==s&&Math.floor(n.chart.pointWidth*(n.conf.timeFrame/1e3)/2)-3<1&&(n.chart.pointWidth=8/(n.conf.timeFrame/1e3)+.1,e=+n.chart.pointWidth)
		},
		n.timeToX=function(t){
			return(t-l)/1e3*e+a
		},
		n.XToTime=function(t){
			return 1e3*Math.round((l*e/1e3+t-a)/e)
		},
		n.rateToY=function(e){
			return Math.floor(r-(e-i)*t-o)
		},
		n.YToRate=function(e){
			return(r-e-o)/t+i
		}
	},
	n.drawChartFn(),
	n.drawChart=function(e){
		n.updateVar();var t=+n.chart.drawPoints.from,i=+n.chart.drawPoints.to,a=n.chart.ctx;a.clearRect(0,0,n.chart.width,n.chart.height),a.beginPath();var r=null;switch(n.conf.type){
			case"area":animateProperties(e,n.points[i],n._lastValAnim,{property:"y",val:n.rateToY(n.points[i].rate)}),animateProperties(e,n.points[i],n._chartAnim,{property:"x",val:n.timeToX(Math.ceil(i/n.conf.timeFrame)*n.conf.timeFrame)}),a.moveTo(n.points[i].x,n.points[i].y);
			var l=[];
			for(o=i-1e3;o>t;o-=1e3)if(n.points.hasOwnProperty(o)&&o%n.conf.timeFrame==0){
				r=n.points[o],animateProperties(e,r,n._chartAnim,{property:"x",val:n.timeToX(o)}),animateProperties(e,r,n._chartAnim,{property:"y",val:n.rateToY(r.rate)});
				for(var s=l.length;s--;)n.points[l[s]]&&(n.points[l[s]].x=r.x,n.points[l[s]].y=r.y);
				l=new Array,a.lineTo(r.x,r.y)
			}
			else l.push(o);
			n.points.hasOwnProperty(o)&&(r=n.points[t],animateProperties(e,r,n._chartAnim,{property:"x",val:n.timeToX(t)}),animateProperties(e,r,n._chartAnim,{property:"y",val:n.rateToY(r.rate)}),a.lineTo(r.x,r.y)),a.lineWidth=2,a.stroke(),a.lineTo(0,n.chart.height),a.lineTo(n.points[i].x,n.chart.height),a.fill()
		}
	},
	n.addPoint=function(e){
		n.points.hasOwnProperty(e.time)?n.points[e.time].rate=e.rate:(n.points[e.time]={rate:e.rate,time:e.time},n.points[n.lastPoint].x&&(n.points[e.time].x=n.points[n.lastPoint].x),n.points[n.lastPoint].y&&(n.points[e.time].y=n.points[n.lastPoint].y)),n.lastPoint=e.time,n.changeDrawPoints()
	};
	var l=0;
	n.addObject=function(e,t,i,a){
		return n.objects.push({drawFunc:e,time:t,rate:i,opacity:a?0:1,id:++l}),l
	},
	n.changeObject=function(e,t){
		for(o=n.objects.length;o--;)if(n.objects[o].id==e)for(var i in t)t.hasOwnProperty(i)&&(n.objects[o][i]=t[i])
	},
	n.delObject=function(e,t){
		for(o=n.objects.length;o--;)n.objects[o].id==e&&(t?n.objects.splice(o,1):n.objects[o].toDel=!0)
	},
	n.drawBackLayer=function(e){
		var t=n.backLayer,i=t.ctx;i.save(),"setLineDash"in i?i.setLineDash([1,3]):"mozDash"in i?i.mozDash=[1,3]:"webkitLineDash"in i?i.webkitLineDash=[1,3]:i._lineDash=[1,3],i.clearRect(0,0,t.width,t.height),i.beginPath(),i.fillStyle=n.conf.axisColor,i.textAlign="right",i.moveTo(-1,0);
		for(var a=!0,o=t.firstLine;o>t.lastLine;o-=t.valBetweenLines){
			t.lines[o]?animateProperties(e,t.lines[o],n._scaleLinesAnim,{property:"y",val:n.rateToY(o)}):t.lines[o]={y:n.rateToY(o)};
			var r=Math.round(t.lines[o].y);r>n.chart.height||(a?(i.lineTo(-1,r),i.lineTo(t.width+1,r)):(i.lineTo(t.width+1,r),i.lineTo(-1,r)),a=!a,i.fillText(o.toFixed(n.conf.fixedLength),t.width-5,r-4))
		}
		i.strokeStyle=n.conf.axisColor,i.stroke(),i.closePath(),i.restore();
		var l=Math.floor(n.chart.width/(i.measureText("00:00:00").width+17)),s=2>l?2:l;
		s*=n.chart.pointWidth-(n.chart.pointWidth<2?0:.9),s=5>s?5:s,s=s>10?10:s;
		var c=calculateScaleRange(6e4*Math.ceil(n.XToTime(n.chart.width)/6e4)+6e4,6e4*Math.floor(n.XToTime(0)/6e4)-6e4,s,!0);
		if(c){
			c.min+=(n.selectedTime.time-c.min)%c.stepValue,i.save(),i.beginPath(),i.textAlign="center",i.textBaseline="top",i.fillStyle=n.conf.axisColor,i.strokeStyle=n.conf.axisColor;
			for(var h,d,f,m,u,p,g=c.min;g<=c.max;g+=c.stepValue)i.beginPath(),h=n.timeToX(g),i.stroke(),i.closePath(),g!=n.selectedTime.time&&(d=new Date(g),f=d.getHours(),m=d.getMinutes(),u=d.getSeconds(),p=f+":"+((m+"").length<2?"0"+m:m)+":"+((u+"").length<2?"0"+u:u),i.fillText(p,h,n.frontLayer.height-n.axisLabelSize.x+5));
				n.selectedTime&&n.selectedTime.time&&n.selectedTime.style&&(h=n.timeToX(n.selectedTime.time),n.selectedTime.style(i),d=new Date(n.selectedTime.time),f=d.getHours(),m=d.getMinutes(),u=d.getSeconds(),p=f+":"+((m+"").length<2?"0"+m:m)+":"+((u+"").length<2?"0"+u:u),i.fillText(p,h,n.frontLayer.height-n.axisLabelSize.x+5)),i.closePath(),i.restore()
		}
	},
	n.drawFrontLayer=function(e){
		var t=n.frontLayer.ctx;
		t.clearRect(0,0,n.frontLayer.width,n.frontLayer.height);
		for(var i=n.objects.length;i--;)if(n.objects[i].hasOwnProperty("drawFunc")&&(animateProperties(e,n.objects[i],n._chartAnim,{property:"x",val:n.timeToX(n.objects[i].time)}),animateProperties(e,n.objects[i],n._chartAnim,{property:"y",val:n.rateToY(n.objects[i].rate)}),!(isNaN(n.objects[i].x)&&(n.objects[i].x<0||n.objects[i].x>n.frontLayer.width)||isNaN(n.objects[i].y)&&(n.objects[i].y<0||n.objects[i].y>n.frontLayer.height)))){
			if(n.objects[i].toDel){
				if(animateProperties(e,n.objects[i],!1,{property:"opacity",val:0}),n.objects[i].opacity<=.2){
					n.delObject(n.objects[i].id,!0);
					continue
				}
			}
			else animateProperties(e,n.objects[i],!1,{property:"opacity",val:1});
			t.save(),t.beginPath();
			try{
				n.objects[i].drawFunc(t,n.objects[i].x,n.objects[i].y,n.objects[i].opacity)
			}
			catch(a){
				console.error("error draw Object",a)
			}
			t.closePath(),t.restore()
		}
		n.drawBarometer(),t.save(),t.beginPath(),n.drawCursor(),t.closePath(),t.restore()
	},
	n.drawBarometer=function(){
		var e=n.frontLayer.ctx,t=n.frontLayer.width;if(n.lastPoint){
			var i=n.points[n.lastPoint].y;
			i>n.frontLayer.height||(e.beginPath(),e.moveTo(0,i),e.lineTo(t-n.axisLabelSize.y-10,i),e.lineTo(t-n.axisLabelSize.y-5,i-7),e.lineTo(t,i-7),e.lineTo(t,i+8),e.lineTo(t-n.axisLabelSize.y-5,i+8),e.lineTo(t-n.axisLabelSize.y-10,i+.3),e.lineTo(0,i+.3),e.fillStyle=n.conf.barometerColor,e.fill(),e.fillStyle=n.conf.barometerTextColor,e.textAlign="right",e.fillText(n.points[n.lastPoint].rate.toFixed(n.conf.fixedLength),t-5,i+4),n.points[n.chart.drawPoints.to].x<n.chart.width-10&&"area"==n.conf.type&&(e.save(),e.shadowColor=n.conf.curPointColor,e.shadowBlur=10,e.shadowOffsetY=0,e.shadowOffsetX=0,e.fillStyle=n.conf.curPointColor,e.beginPath(),e.arc(n.points[n.chart.drawPoints.to].x,n.points[n.chart.drawPoints.to].y,3,0,2*Math.PI),e.fill(),e.restore()))
		}
	},
	n.drawCursor=function(){
		var e=n.frontLayer.ctx,t=n.frontLayer.width,i=n.frontLayer.height,a=n.chart.cursorCoords.y,o=n.chart.cursorCoords.x;
		if(!(!a||!o||a>n.chart.height||o>n.chart.width)){
			"setLineDash"in e?e.setLineDash([7,5]):"mozDash"in e?e.mozDash=[7,5]:"webkitLineDash"in e?e.webkitLineDash=[7,5]:e._lineDash=[7,5],e.strokeStyle=n.conf.cursorColor,e.fillStyle=n.conf.cursorColor,e.beginPath(),e.moveTo(0,a+.5),e.lineTo(t,a+.5),e.stroke(),e.closePath(),e.moveTo(t-n.axisLabelSize.y-10,a),e.lineTo(t-n.axisLabelSize.y-5,a-7),e.lineTo(t,a-7),e.lineTo(t,a+8),e.lineTo(t-n.axisLabelSize.y-5,a+8),e.lineTo(t-n.axisLabelSize.y-10,a+1),e.fill(),e.fillStyle=n.conf.cursorTextColor,e.textAlign="right",e.fillText(n.YToRate(a).toFixed(n.conf.fixedLength),t-5,a+4);
			var r=new Date(n.XToTime(o)),l=r.getHours(),s=r.getMinutes(),c=r.getSeconds(),h=l+":"+((s+"").length<2?"0"+s:s)+":"+((c+"").length<2?"0"+c:c);
			e.beginPath(),e.moveTo(o+.5,0),e.lineTo(o+.5,i-20),e.stroke(),e.closePath();
			var d=e.measureText(h).width;e.fillStyle=n.conf.cursorColor,e.fillRect(o-d/2-5,i-19,d+10,20),e.textAlign="center",e.fillStyle=n.conf.cursorTextColor,e.fillText(h,o,i-5)
		}
	},
	n.selectTime=function(e,t){n.deselectTime(),n.selectedTime.time=e,n.selectedTime.style=t},
	n.deselectTime=function(){
		n.selectedTime.time=null,n.selectedTime.style=function(e){}
	};
	var s,c,h=10,d=Date.now(),f=1e3/h;
	!function m(e){
		n.chart.requestId=window.requestAnimationFrame(m,n.chart.canvas),s=Date.now(),c=s-d,c>f&&(d=s-c%f,n.chart.render(e))
	}(),
	function u(e){
		n.chart.requestId=window.requestAnimationFrame(u,n.backLayer.canvas),c>f&&(d=s-c%f,n.backLayer.render(e))
	}(),
	function p(e){
		n.chart.requestId=window.requestAnimationFrame(p,n.frontLayer.canvas),c>f&&(d=s-c%f,n.frontLayer.render(e))
	}(),
	n.frontLayer.canvas.addEventListener("mousemove",i),n.frontLayer.canvas.addEventListener("mouseout",a),window.addEventListener("resize",function(){n._setSizeCanvas(n.backLayer,e.offsetWidth,e.offsetHeight),n._setSizeCanvas(n.backLayerMask,e.offsetWidth,e.offsetHeight),n._setSizeCanvas(n.chart,e.offsetWidth-n.axisLabelSize.y,e.offsetHeight-n.axisLabelSize.x),n._setSizeCanvas(n.frontLayer,e.offsetWidth,e.offsetHeight),n._drawBackLayerMask(),n.changeDrawPoints(),n._setChartColor()}),
	n._currentX=0,n.scrollOn=function(e){
		if(!arguments.length)return n.scrollOn(n.chart.width/1.5-n.timeToX(Math.ceil((new Date).valueOf()))),!0;var t=(n.firstPoint+5e3-n.basePoint)/1e3*n.chart.pointWidth+n.currentTranslateX+e,i=(n.lastPoint-1e4-n.basePoint)/1e3*n.chart.pointWidth+n.currentTranslateX+e;0>t&&i>0&&(n.currentTranslateX+=e,n.changeDrawPoints())
	},
	n.frontLayer.canvas.addEventListener("mousedown",function(e){return!1}),document.addEventListener("mouseup",function(){return!1}),n.frontLayer.canvas.addEventListener("touchstart",function(e){return!1}),document.addEventListener("touchend",function(){return!1})
}


function offsetPosition(e){
	var t=0;
	do 
		t+=e.offsetTop;
	while(e=e.offsetParent);
	return t
}




var dataOTC={//на это не обращайте внимание
	0:[1,9,9,9,8.5,8,7.5,7,6.5,6,5.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9,9,1,1,1,1]
};
dataOTC[0][0]= 1.08615;//ТУТ МЕНЯТЬ КУРС!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//это начальное значение графика, к которому на каждом шаге прибавляется число

for (var i = 1; i <= 1000; i++) {
	dataOTC[0][i]= dataOTC[0][i-1] + (Math.random() - 0.5)*0.0001 ;
	dataOTC[0][i]=Math.round(dataOTC[0][i] * 1000000) / 1000000;
};


//API браузеров для рисования
window.requestAnimationFrame||(window.requestAnimationFrame=function(){
	return window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}
}()),
window.cancelAnimationFrame||(window.cancelAnimationFrame=function(){
	return window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame||function(e){window.clearTimeout(e)}
}()),

function(){
	var e=CanvasRenderingContext2D.prototype.moveTo,t=CanvasRenderingContext2D.prototype.lineTo,i={x:100,y:100};


	CanvasRenderingContext2D.prototype.moveTo=function(t,a){e.call(this,t,a),i.x=t,i.y=a},
	CanvasRenderingContext2D.prototype.lineTo=function(a,o){
		if("_lineDash"in this&&this._lineDash){
			e.call(this,i.x,i.y),this.save();
			var n=i.x,r=i.y,l=a-n,s=o-r,c=Math.sqrt(l*l+s*s),h=Math.atan2(s,l);this.translate(n,r),e.call(this,0,0),this.rotate(h);
			var d=this._lineDash.length,f=0,m=!0;
			for(n=0;c>n;)n+=this._lineDash[f++%d],n>c&&(n=c),m?t.call(this,n,0):e.call(this,n,0),m=!m;this.restore(),this.moveTo(a,o);
		}
		else 
			t.call(this,a,o),i.x=a,i.y=o;
	}
},
function write(){
	"use strict;";

	function e(e,o,n){
		function r(o){
			function r(e){
				s.timeToX&&s.timeToX(e)>s.chart.width&&s.scrollOn(s.chart.width-s.timeToX(e)-50),v=e,P.length?(s.changeObject(P[0],{time:e}),s.selectTime(
					e,function(e){
						e.textBaseline="hanging",e.font="14px RobotoBold",e.fillStyle="rgb(184,184,184)"//часы под графиком после обновления
					}
					)
				):(P[0]=s.addObject(function(e,t,i,a){//линия финиша
					e.font="10px RobotoLight",e.rotate(1.5*Math.PI),e.beginPath(),e.moveTo(30,t+.5),e.lineTo(-s.chart.height,t+.5),e.lineWidth=1,e.strokeStyle="rgba(255,255,255, "+a+")",e.stroke(),e.textAlign="left",e.fillStyle="rgba(255,255,255, "+a+" )",e.fillText("",-s.chart.height+30,t-5)
				}
				,e,null,!1),s.selectTime(e,function(e){
					e.textBaseline="hanging",e.font="14px RobotoBold",e.fillStyle="rgb(184,184,184)"//часы под графиком до обновления
				}
				))
			};
			function l(){//стрелки
				"black"===n.style&&!R&&["call","put"].forEach(function(e){
					s.delObject(S,!0),S=s.addObject(
						function(e,t,i,a){function o(a){
							e.beginPath(),e.moveTo(t+11,i+5*a.dir),e.lineTo(t+5,i+11*a.dir),e.lineTo(t+29,i+34*a.dir),e.lineTo(t+20,i+44*a.dir),e.lineTo(t+45,i+45*a.dir),e.lineTo(t+44,i+20*a.dir),e.lineTo(t+35,i+29*a.dir),e.fillStyle=a.color,e.fill()
						}
						if(s.points[s.lastPoint]){
							i=s.points[s.lastPoint].y,t=s.points[s.lastPoint].x;
							var n={dir:-1,color:"rgba( 43, 139, 58, "+a+" )"};
							o(n),n={dir:1,color:"rgba( 193, 55, 38, "+a+" )"},o(n)
						}
					},
					null,null,!0
					)
				}
				)
			};
			var s,c,h,d,f,m,u,p,g,T,v,w=[];
			T=void 0!==n.countPoints?n.countPoints:.2,g=a*T,o=o.concat(o.splice(0,parseInt(g))),p=t();
			var y=1e3,b=n.dealTime,x=n.dealTime-5e3,P=[],
			C={type:"area",timeFrame:y,fixedLength:n.fixed,font:"normal 10px Roboto",barometerColor:"#0A0A0A",barometerTextColor:"#fff",defaultBarometerColor:"#0A0A0A",bgColor:"#fff",axisColor:"#888",curPointColor:"#41ff5e",cursorColor:"#ddd",cursorTextColor:"#000",chartColor:"rgba(255, 130, 1, 0.701961)",chartStrokeColor:"#BB5C0C",chartStrokeWidth:"2"},
			L={barometerColor:"#9C9B9B",barometerTextColor:"#fff",defaultBarometerColor:"#9C9B9B",bgColor:"#7a7a7a",axisColor:"#7a7a7a",curPointColor:"#41ff5e",cursorColor:"rgba(255,219,219,0.4)",cursorTextColor:"#000",chartColor:{0:"rgba(238,111,1,0.5)",1:"rgba(0,0,0,0.5)"},chartStrokeColor:"rgb(184,184,184)",chartStrokeWidth:"2"};"black"===n.style&&($(e).find(".bg-white").removeClass("bg-white"),$.extend(C,L)),m=$(e).find(".chart")[0],
			f=new function(){
				var e,t;
				e=!1,t=[],this.timer=null,this.checkTimer=function(i){
					return void 0!==i?this.timer=i:this.timer<=0?this.timer=b:this.timer-=1e3,e?!1:(u=new Date(this.timer).toTimeString(),u=u.substr(u.indexOf(":")+1,5),void t.forEach(function(e,t){
						$(e).children("span").text(u)
					}
					))
				}
				,this.stop=function(){e=!0},this.start=function(){e=!1},this.generateTimer=function(){
				var e=$("<div/>",{
					"class":"chart-timer",html:[$("<div/>",{}),$("<span/>",{
						"class":"chart-time-self",text:"00:15"
					})]
					});
					return t.push(e),e
				}
			},
			s=new Chart(m,C);//end var
			for(var k=i;k%n.dealTime>0;)
				k+=1e3;
			for(
				f.timer=k-i,$(s).on("checkTimer",function(e,t){f.checkTimer(t)}),setTimeout(function(){s.scrollOn(100)},100),
				$(window).focus(function(){s.scrollOn()}),
				r(k,x,!0),
				f.generateTimer().appendTo($(m)),
				f.generateTimer().appendTo($(e).find(".wde-timer-cont")),//таймер под кнопками
				c=0,h=1e3*T;h>c;c++
				)
			d=o.shift(),o.push(d),w.push({rate:d,time:i-1e3*h+1e3*c,open:w.length>0?w[w.length-1].rate:d,close:d,high:(w.length>0?w[w.length-1].rate:d)+Math.random()/5e3,low:(w.length>0?w[w.length-1].rate:d)-Math.random()/5e3});
			s.setPoints(w),
			setInterval
			(
				function(){
					
					d1=o.shift();
					var dd=0;
					if (counter==1){
						if(dual=="put"){
							dd=-1;
						}
						if(dual=="call"){
							dd=1;
						}
					}
					if (counter==2){
						if(dual=="put"){
							dd=1;
						}
						if(dual=="call"){
							dd=-1;
						}
					}
					if (counter>2){//соотношение выиграшей меняется тут!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
						var ii=Math.random();//эта функция выбирает случайное значение от 0 до 1
						if(ii<0.75){//тут вы ставите вероятность от 0 до 1
							if(dual=="put"){
								dd=-1;
							}
							if(dual=="call"){
								dd=1;
							}
						}
						if(ii>0.75){//и тут вы ставите вероятность от 0 до 1
							if(dual=="put"){
								dd=1;
							}
							if(dual=="call"){
								dd=-1;
							}
						}
					}
					if(dd==1){
						var sluc= Math.floor(Math.random() * (4 - 0 + 1));
						for(var i=0; i<15; i++){
							if(d1<o[i]){
								o[i]=o[i]+z[sluc][i];
							}
							else{
								o[i]=d1+z[sluc][i];
							}

						}
						o[15]=(o[15]+d1)/2;
						dd=0;
					}
					if(dd==-1){
						var sluc= Math.floor(Math.random() * (4 - 0 + 1));
						for(var i=0; i<15; i++){
							if(d1>o[i]){
								o[i]=o[i]-z[sluc][i];
							}
							else{
								o[i]=d1-z[sluc][i];
							}
						}
						dd=0;
						o[15]=(o[15]+d1)/2;
					}
					dual=0;

					/*d1=o.shift();
					if(dual=="put"){
						dual=0;
						win=15;
					}
					if(dual=="put"){
						lose=15;
						dual=0;
					}
					d1=d1+z[win]-z[lose];*/
					

					d=d1,p=t(),o.push(d),s.addPoint({rate:d,time:p,open:w.length>0?w[w.length-1].close:d,close:d,high:w[w.length-1].rate+Math.random()/5e3,low:w[w.length-1].rate-Math.random()/5e3}),
					$(s).trigger("checkTimer"),!R||t(-1e3)%v||(b=n.dealTime,$(s).trigger("endDeal",[d])),!R&&v-t(-1e3)<=5e3&&(b=n.dealTime+(n.dealTime-x),$(s).trigger("endBuy",[d])),
					c++;
					
				}
				,1000
				),
			s.chart.pointWidth=n.pointWidth;
			var S=null;
			l.call(),$(e).on("mouseenter",".mc-btn",
			function(e){ //стрелки
				var t=$(this).hasClass("mc-btn_call")?"call":"put";
				s.delObject(S,!0),"put"===t?s.conf.barometerColor="rgb(193, 55, 38)":s.conf.barometerColor="rgb(43, 139, 58)",S=s.addObject(function(e,i,a,o){
					if(s.points[s.lastPoint]){
						a=s.points[s.lastPoint].y,i=s.points[s.lastPoint].x;
						var n={dir:-1,color:"rgba( 43, 139, 58, "+o+" )"};
						"put"==t&&(n={dir:1,color:"rgba( 193, 55, 38, "+o+" )"}),e.beginPath(),e.moveTo(i+11,a+5*n.dir),e.lineTo(i+5,a+11*n.dir),e.lineTo(i+29,a+34*n.dir),e.lineTo(i+20,a+44*n.dir),e.lineTo(i+45,a+45*n.dir),e.lineTo(i+44,a+20*n.dir),e.lineTo(i+35,a+29*n.dir),e.fillStyle=n.color,e.fill();

					}
				}
				,null,null,!0)
			}),
			$(e).on("mouseleave",".mc-btn",
			function(e){
				s.delObject(S),s.conf.barometerColor=s.conf.defaultBarometerColor,l()
			}),
			$(e).on("click",".restart",function(e){$(s).trigger("restart")});
			var _=null,
			M=function(t){
				var i=$(this).hasClass("mc-btn_call")?"call":"put";
				dual=i;
				counter=counter+1;//счетчик
				"put"===i?ga("send","event","WebSite","LandingIteractions","Game_Put"):ga("send","event","WebSite","LandingIteractions","Game_Call"),_={created:p,dir:i,value:d},$(s).trigger("setRate",[_]),$(e).off("click",".mc-btn",M)
			};
			$(e).on("click",".mc-btn",M);
			var j=null,R=null;
			$(s).on("setRate",
				function(e,t){// скрытие кнопок call put
					s.delObject(S),j||(R=t,j=s.addObject(function(e,i,a,o){
						i=Math.floor(i),a=Math.floor(a);
						var n={dir:-1,color:"rgba( 43, 139, 58, "+o+" )"};
						"put"==t.dir?n={dir:1,color:"rgba( 193, 55, 38, "+o+" )"}:e.textBaseline="top",e.beginPath(),e.fillStyle=n.color,e.arc(i,a,3,0,2*Math.PI,!1),e.fill(),e.beginPath(),e.moveTo(0,a+1*n.dir),e.lineTo(60,a+1*n.dir),e.lineTo(80,a+22*n.dir),e.lineTo(100,a+1*n.dir),e.lineTo(e.canvas.width,a+1*n.dir),e.lineTo(e.canvas.width,a),e.lineTo(0,a),e.fill(),e.textAlign="center",e.font="10px RobotoLight",e.fillText(t.value,80,a-3*n.dir)
					},
					t.created,t.value,!0))
				}
			),
			$(s).on("endDeal",function(){
				r(t(n.dealTime-1e3),n.dealTime,!0),$(s).trigger("checkTimer",[n.dealTime])
			}),
			$(s).on("endBuy",
			function(){//рестарт в нашем случае каждые 15 сек, 
				r(t(n.dealTime-1e3),n.dealTime+(n.dealTime-x),!0),$(s).trigger("checkTimer",[n.dealTime]);
			}),
			$(s).on("restart",function(){//кнопка рестарта
				ga("send","event","WebSite","LandingIteractions"),R=null,j=null,$(e).on("click",".mc-btn",M),f.start(),$(e).removeClass("deal-finished").removeClass("deal-finished_lose").removeClass("deal-finished_win");		
			}),
			$(s).on("setRate",function(){//при нажатии кнопки above ли bellow
				$(e).find(".js-mc-legend").addClass("deal-started");

			}),
			$(s).on("endDeal",function(t,i)
			{//вывод результата
				function a(){
					$(e).addClass("deal-finished deal-finished_win")
				}
				function o(){
					$(e).addClass("deal-finished deal-finished_lose")
				}
				if(!R||!j)return!1;
				$(e).find(".js-mc-legend").removeClass("deal-started"),f.stop();
				var n={up:{put:o,call:a},down:{put:a,call:o}};
				R.value<i&&n.up[R.dir](),R.value>=i&&n.down[R.dir](),s.delObject(j),j=null,R=null
			})
		}
		$.get(o).error(function(){
			r(dataOTC[road]);
		})
	}
	var t,i,a;
	t=function(e){//выполняется 2 раза за секунду
		return "number"!=typeof e || e!==e?1e3*Math.ceil((new Date).valueOf()/1e3):1e3*Math.ceil(((new Date).valueOf()+e)/1e3)
	},
	i=t(),
	a=(new Date).valueOf().toString(),
	a=a.substr(0,a.length-3),
	a=a.substr(a.length-3),
	a=Math.ceil(parseInt(a.substr(a.length-3))),
	$(function(){
			var t={
			0:{fixed:6,dealTime:15e3,pointWidth:3,style:"black",interval:1e3,countPoints:.2},
			1:{fixed:3,dealTime:3e4,pointWidth:4,style:"black",interval:1e3,countPoints:.2}
			};
		$(".mini-chart-wrap").each(
			function(i,a){
				e(
					a,$(a).data("active-id"),t[0]
				)
			}
		)
	}
)
}(),
$(document).ready(function write(road){});
