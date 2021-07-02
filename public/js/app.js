console.log("happy me")

//url from where we are trying to fetch from. then method uses a callback function.
fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    //convert to JSON and once done use the data
     response.json().then((data)=>{
console.log(data) ;
     })
})



const weatherForm = document.querySelector('form');
var search ='';
const p1 = document.getElementById("first")
const p2 = document.getElementById("second")

weatherForm.addEventListener('submit', (event)=>{
    event.preventDefault()
    search = document.querySelector('input').value;  
    console.log('testing!')
    console.log(search)
    fetch('/weather?address='+ search).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            p1.textContent = data.error
            console.log(data.error)
            
        }else{
            console.log(data.Location)
            p1.textContent = data.Location
            console.log(data.forecast)
            p2.textContent = data.forecast
        }
    })
})
})