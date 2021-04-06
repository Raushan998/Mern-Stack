// let arr=[1,2,2,3,4,5];
// let count=0,number,max_number=0;
// for(let i=0;i<arr.length;i++){
//     for(let j=i;j<arr.length;j++){
//         if(arr[i]==arr[j])count++;
//     }
//     if(count>max_number){
//         max_number=count;
//         number=arr[i];
//     }
//     count=0;
// }
// console.log(number);
// let arr=["Red","green","yellow"];
// let color="";
// for(let i=0;i<arr.length;i++){
//     color=color+arr[i];
// }
// console.log(color);
//let arr=[[1,2,2],[5,5,5],[6,7,8]];
// let sum=0,max_element=0,count=0,element=0;
// for(let i=0;i<arr.length;i++){
//     for(let j=0;j<arr[i].length;j++){
//         sum+=arr[i][j];
//     }
// }
// for(let i=0;i<arr.length;i++){
//     for(let j=0;j<arr[i].length;j++){
//         if(element==arr[i][j])continue;
//         for(let k=0;k<arr.length;k++){
//             for(let l=0;l<arr[k].length;l++){
//                 if(arr[i][j]==arr[k][l])
//                    count++;
//             }
//         }
//         if(count>max_element){
//             max_element=count;
//             element=arr[i][j];
//         }
//         count=0;
//     }
// }
// let arr1=[];
// for(let i=0;i<arr.length;i++){
//     for(let j=0;j<arr[i].length;j++)
//         arr1[i*arr.length+j]=arr[i][j];
// }
// console.log(sum);
// console.log(element);
// console.log(arr1);
let arr=[1,2,3,4,5,6,7];
// for(let i=0;i<arr.length;i++)
//    arr[i]+=2;
// function addTwo(data,index){
//     return data+=2;
// }
// arr=arr.map(addTwo);
// console.log(arr);
function oddEven(data,index){
    return data&1;
}
arr=arr.filter(oddEven);
console.log(arr);
