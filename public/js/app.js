// client side js 
const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#msg1')
const messageTwo = document.querySelector('#msg2')

weatherform.addEventListener('submit' , (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = "Loading..."
    //fetch
     fetch('/weather?address=' + location).then((response)=> {
         response.json().then((data) => {
             if(data.error){
                 //console.log(data.error)
                 messageOne.textContent = data.error
                 messageTwo.textContent = ''
             } else  {
                 //console.log(data.location)
                 //console.log(data.forcast)
                 messageOne.textContent = data.location
                 messageTwo.textContent = data.forcast
             }

         })

     })
})