
function addMore(){
    var name = document.getElementById("name").value;
    let error = document.getElementById("error");
    console.log(name);
    if(name==''){
        error.innerHTML="Please enter the value";
    }else{
        error.innerHTML="";

        let box = document.getElementById("box");

        let li = document.createElement('li');
        li.textContent = name;

        let a = document.createElement('button');
        a.textContent='   Delete';
        a.className = "remove";
        li.appendChild(a);

        box.appendChild(li);
        document.getElementById("name").value="";
    }
}


let btn = document.querySelector("ul");
btn.addEventListener('click',function(e){
    let box = document.getElementById("box");
    let li = e.target.parentNode;
    
    box.removeChild(li);
});
let bound =  document.querySelector("ul");
bound.addEventListener('click',function(){
    bound.style.textDecoration="line-through";
});






