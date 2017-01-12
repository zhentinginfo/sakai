function changeToParam(param){
	var obj = {};
	var ps = param.split("&");
	for(var i=0;i<ps.length;i++){
		var map = ps[i].split("=");
		obj[map[0]] = map[1];
	}
	return obj;
}

var domainUrl = window.location.hash.substring(1);
var parentParam =  window.location.search.substring(1);
function initialize() {
	var h = document.body.scrollHeight;
	var num = 0;
	var subNum = 0;
	// start 获取所有class=section的标签集合 
	var idx = new Array();//用于存放标签集合
	var title = new Array();
	var reg = new RegExp("(^|\\s)section(\\s|$)");
	var children = document.body.getElementsByTagName("*");
	var chLength = children.length;
	for (var i = 0; i < chLength; i++) {
		var theClassName = children[i].className;
		if (theClassName != null) {
			var isMatch = theClassName.match(reg);
			if (isMatch) {
				var titles = children[i].title.split(" ");
				if (titles.length == 1) {//一级标题
					subNum = 0;
					num++;
					idx.push(num);
					title.push(titles[0]);

					var descA = document.createElement("a");
					descA.id = "link" + num;
					children[i].insertBefore(descA, children[i].firstChild);
				} else {
					subNum++;
					idx.push(num + "_" + subNum);
					title.push(titles[1]);

					var descA = document.createElement("a");
					descA.id = "link" + num + "_" + subNum;
					children[i].insertBefore(descA, children[i].firstChild);//在div中插入链接，用于定位
				}
			}
		}
	}
	var s = domainUrl + "/domain.jsp#frameH=" + h + "&idx=" + idx.toString()
			+ "&title=" + title.toString();
	var i = document.createElement("iframe");
	i.src = s;
	i.id = "hiddenFrame";
	i.style.display = 'none';
	document.body.insertBefore(i, document.body.firstChild);
}
function setMainFrameHeight(){
	var h = document.body.scrollHeight;
	var iframe = document.getElementById("hiddenFrame");
	iframe.src = domainUrl + "/domain.jsp?frameH=" + h;
}
function helper(idx) {
	var lia = document.getElementById("link" + idx);
	lia.scrollIntoView();
}
var callJs;
function callBack(num,score){
	callJs(num,score);
}
function getValue(name,callFunction) {
	callJs = callFunction;
	var oScript = document.createElement('script');
	oScript.src = domainUrl+"/studySpace_getValue.do?"+parentParam+"&activityId="+name;    
	document.getElementsByTagName("head")[0].appendChild(oScript);
}

function setValue(name, value) {
	$.post(domainUrl+"/studySpace_setValue.do?"+parentParam+"&activityId="+name+"&activityValue="+value,null, function(data){
	});
}

initialize();