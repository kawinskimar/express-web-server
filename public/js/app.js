const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')

weatherForm.addEventListener('submit', (e) => {
   e.preventDefault()
   const location = search.value

   messageOne.textContent = "Loading..."
   messageTwo.textContent = ""
   messageThree.textContent = ""
   messageFour.textContent = ""

   fetch('/forecast?address=' + location).then((response) => {
      response.json().then((data) => {
         if(data.error) {
            messageOne.textContent = data.error
         } else {
            messageOne.textContent = data.location
            messageTwo.textContent = "It is currently " + Math.round(data.currentTemp) + "°F (feels like " + Math.round(data.feelsLike)
               + "°F) with a " + data.currentPrecipProb + "% chance of precipitation.  The humidity is " + Math.round(data.humidity) + "%."
            messageThree.textContent = "The high temperature today is " + Math.round(data.tempHigh) + "°F and the low is " + Math.round(data.tempLow) + "°F."
            messageFour.textContent = data.summary
         }
      })
   })
})