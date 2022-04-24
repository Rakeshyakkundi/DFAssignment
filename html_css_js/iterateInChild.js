const myDiv = document.querySelector('#myDiv');
const myDivChild = myDiv.ChildNodes;

for(const node of myDivChild){
    console.log(node);
}