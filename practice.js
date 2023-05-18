console.log("hello");

const users = [
    { fN : "Gudi", lN:"abc", age: 26 },
    { fN : "Guduli", lN:"ccc", age: 30 },
    { fN : "Subha", lN:"ddd", age: 28 },
    { fN : "Subhalaxmi", lN:"eee", age: 32 }
]

const output = users.reduce((acc,curr)=>{
    if(curr.age>=30){
        acc.push(curr.fN)
    }
    return acc
},[])

console.log(output);

console.log(undefined + 11);

// console.log(Promise.resolve(1).then((x)=>x+1).then((x)=>{ throw new Error('My Error')}).catch(()=> 1).then((x)=> x+1).then((x)=> console.log(x)).catch(console.error));

// console.log(new Date('10:00:00 AM'));


function get(a,b,c){
    alert(a);
    console.log(b);
    console.log(c)
}

get(5,6)