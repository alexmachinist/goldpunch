const request = require('request')
const ms = require('ms')
const format = require("node.date-time");
const url = 'https://api.bitfinex.com/v2'

function logTime() {
  return new Date().format("Y-M-d hh:m:SS")+' ';
}
//console.log(new Date())
let data = new Date();
//console.log(data);

//*** This code is copyright 2002-2016 by Gavin Kistner, !@phrogz.net
//*** It is covered under the license viewable at http://phrogz.net/JS/_ReuseLicense.txt
Date.prototype.customFormat = function(formatString){
  var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhhh,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
  YY = ((YYYY=this.getFullYear())+"").slice(-2);
  MM = (M=this.getMonth()+1)<10?('0'+M):M;
  MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
  DD = (D=this.getDate())<10?('0'+D):D;
  DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][this.getDay()]).substring(0,3);
  th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
  formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);
  h=(hhh=this.getHours());
  if (h==0) h=24;
  if (h>12) h-=12;
  hh = h<10?('0'+h):h;
  hhhh = hhh<10?('0'+hhh):hhh;
  AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
  mm=(m=this.getMinutes())<10?('0'+m):m;
  ss=(s=this.getSeconds())<10?('0'+s):s;
  return formatString.replace("#hhhh#",hhhh).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
};



request.get(  `${url}/candles/trade:1m:tBTCUSD/last`,
  function(error, response, body) {
  	console.log(JSON.parse(body)[0]);
  	
  	let test = JSON.parse(body)[0];
	console.log(typeof test)

	var milliseconds = 937858019615;
	var myDate = new Date(1542308580000);
	console.log(myDate.format("Y-M-d hh:m:SS"));

	var time = new Date().getTime();
    var date = new Date(time);

  	let test2 = test.toString();
  	//console.log(ms(test, { long: true }))
  	//console.log(test.format("Y-M-d hh:m:SS"));
})

request.get(
  `${url}/candles/trade:1m:tBTCUSD/hist`,
  (error, response, body) => console.log('')
)