var q;
var xv;//x velocity
var yv;//y velocity
$('#Reset').hide();
function Reset(){
	if(confirm("Are you sure"))
	{
		window.location.reload();
	}
}
function Game(level){
	$('div.level1').hide();
	$('#Reset').show();
	
alert("Start the game");
	switch(level){
		case 1:

			xv=7;
			yv=3;
			q=8;
			main();

			break;
		case 2:
			xv=10;
			yv=5;
			q=10;
			main();
			break
		case 3:
			xv=13;
			yv=8;
			q=13;
			main();
			break;
		case 4:
			xv=22;
			yv=15;
			q=22;
			main();
			break;
		case 5:
			xv=25;
			yv=17;
			q=25;
			main();
			break;
		case 6:
			xv=28;
			yv=20;
			q=28;
			main();
			break;
		case 7:
			xv=32;
			yv=25;
			q=30;
			main();
			break;	
	}

}


function main() {
	
	var canvas;
	var cant;
	var XC;//x cordinatennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
	var YC;//y cordinatefnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
	const pHeight=120;//Paddle height
	var padd1=250;//paddle 1 positon
	var padd2=250;//paddle 2 position
	var score1=0;
	var score2=0;
	var showWinScreen=false;
	var winer;
	const maxSc=10;
	function mousePos(evt) {
		var rect=canvas.getBoundingClientRect();//take the area of the play ground
		var root=document.documentElement;
		var mX=evt.clientX-rect.left-root.scrollLeft;//evt.clientX and evt.clientY takes the x and y cordinates of mouse but we need only x,y cordinate on our playgorund
		var mY=evt.clientY-rect.top-root.scrollTop;
		return{
			x:mX,
			y:mY
		}
	}



	Ram();
	function Ram() {
		canvas=document.getElementById('game');
		cant=canvas.getContext('2d');
		XC=canvas.width/2;//x cordinatennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
	    YC=canvas.height/2
		

		setInterval(function () {
			

			moveObject();
			run();
		},1000/q);
		canvas.addEventListener('mousemove',function(evt){
			var mouseposition=mousePos(evt);
			padd1=mouseposition.y-(pHeight/2);
			

		});
		
	}
function computer() 
{
	var center = padd2+pHeight/2;
	if(center<YC+35){
		padd2 +=20;
	}
	else if(center>YC+35){
		padd2 -=20;
	}
}
function resetBall() {
	xv=-xv;
	XC=canvas.width/2;
	YC=canvas.height/2;
}
function moveObject(){
		computer();
		if(XC>canvas.width-5)
		{
			if(YC>=padd2&&YC<=padd2+pHeight)
			{
				xv=-xv;
				var sy=yv-(padd2+pHeight/2);
				yv=sy *0.050;
			}
			else
			{
				resetBall();
				yv=5
				score1++;
				score();
			}
		}
		if(XC<5)
		{
			//xv=-xv;
			if(YC>=padd1&&YC<=padd1+pHeight){
				xv=-xv;
				var sy=yv-(padd1+pHeight/2);
				yv=sy *0.050;
			}
			else{
				resetBall();
				yv=5;
				score2++;
				score();
			}
		}
		XC=XC+xv;
		if(YC>canvas.height-5){
			yv=-yv;
		}
		if(YC<5){
			yv=-yv;
		}
		YC=YC+yv;
		
}
function winWindow()
{
	if(winer=1)
	{
		var p=score2-score1;
		if(confirm("You lose the match \n you lose by "+p+"Points \n Play Again"))
		{
			alert('Thanking You');
		}
		else
		{
			if(confirm("Are you sure"))
			{
				location.reload();
			}
		}
	}
	else
	{
		var p=score1-score2;

		if(confirm(" Congratulaltion\n You Won the match by "+p +" Points \n Play Again"))
		{
			alert('Thanking You');
		}
		else
		{
			if(confirm("Are you sure"))
			{
				location.reload();
			}
		}

	}

}
function score(){
	if(score1>maxSc){
		winer=2;
		winWindow();
		showWinScreen=true;
		score1=0;
		score2=0;
	}
	else if(score2>maxSc){
		winer=1;
		winWindow();
		showWinScreen=true;
		score2=0;
		score1=0;
	} 
	else
	{
		showWinScreen=false;
	}
}
function run() {
	
	object(0,0,canvas.width,canvas.height,'red');
	object(0,padd1,12,pHeight,'black');
	object(canvas.width-12,padd2,12,pHeight,'black')
	circle(XC,YC,8,'white');
	cant.fillText(score1,100,100);
	cant.fillText(score2,canvas.width-100,100);
	for(var i=0;i<canvas.height;i+=30)
		{

			object(canvas.width/2-5,i,3,20,'black');
		}

}


function object(x,y,width,height,color) {
		cant.fillStyle=color;
		cant.fillRect(x,y,width,height);
}
function circle(x,y,r,color) {
	cant.fillStyle=color;
	cant.beginPath();

	cant.arc(x, y, r, 0, 2 * Math.PI,true);
	cant.fill();
	
}
}
