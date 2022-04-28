const inputBox = document.querySelector(".inputField input");
const addButton = document.querySelector(".inputField button");

inputBox.onkeyup = ()=>{
    let userData = inputBox.value;
    if(userData.trim() !=0){
        addButton.classList.add("active");
    }else{
        addButton.classList.remove("active");
    }
}
addButton.onClick = () =>{
    let userData=  inputBox.value;
    let getLocalStorage = localStorage.getItem("New Todo");
    if(localStorage == null){
        listArray = [];
    }
    else{
        listArray.JSON.parse(getLocalStorage);
    }
    listArray.push(userData);
    localStorage.setItem("New Todo",JSON.stringify(listArray))
}