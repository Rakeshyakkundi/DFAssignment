console.log(document.getElementById('demo').innerHTML="hello");
function Change(){
	let change = document.getElementById('pc');
	change.innerHTML="completed task";
}
function reChange() {
	let change = document.getElementById('pc');
	change.innerHTML="Click to Change";
}
function shift(){
	let change = document.getElementById('pc');
	for(let i=0;i<50;i++){
		if(i%2==0){
			change.innerHTML="In";
		}else{
			change.innerHTML="Out";
		}
	}
}