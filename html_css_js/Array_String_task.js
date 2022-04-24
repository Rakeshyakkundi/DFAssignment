Merge Two arrays and store in third Array

let arr1=[1,2,3]; 
let arr2=[4,5,6]; 
let arr3=arr1.concat(arr2); 
console.log("arr1+arr2 :",arr3);

-----------------------------------
Remove duplicates from Array

let arr = ["a", "b","c","d","b","a"]; 
let uniqueArray=[...new Set(arr)]; 
console.log("Unique Array :",uniqueArray);

-----------------------------------------------
Number of occurrences of a word in a string

let str = "a b a c d c a e a"; 
let word = "a";
let count =0;
for(let i=0;i<str.length;i++){
    if(word==str[i]){
        count = count+1;
    }
}
console.log("Word '",word,"' occurred ",count,"tmes.");
let exp = new RegExp(word,'g'); 
const count = str.match(exp).length;
console.log(count);