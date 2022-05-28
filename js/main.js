document.querySelector('#clickMe').addEventListener('click', makeReq);
document.querySelector('#random').addEventListener('click', whichItem)
document.querySelector('#reset').addEventListener('click', reset)
// let audio = document.querySelector('#laugh')

async function makeReq() {
  const guess = document.querySelector('#guess').value;
  const res = await fetch(`/api?priceIsWrong=${guess}`);
  const data = await res.json();


  console.log(data);
  // if (data.verdict === 'The Price is Wrong!!!! Too low!' || data.verdict === "The Price is WRONG! too High!") {
  //    audio.play()
    
  // }
  document.querySelector('#rightOrWrong').textContent = data.verdict;
  console.log(data.count)
  //Auto loss after 3 attempts
  if(data.count >= 3){
    document.querySelector('#rightOrWrong').textContent = `You lose! No more chances!`
    document.querySelector('#count').textContent = `Attempts: 3`
  }else{
    // updates counter on site
    document.querySelector('#count').textContent = `Attempts: ${data.count}`
  }
  
}
// Picks a random item to then guess the price of, and displays the item picture and name.


async function whichItem(){
  const title = document.querySelector('#itemTitle')
  // Makes an array of elements with class hidden
  const hidden = document.querySelectorAll('.hidden')
  



  // call to api
  const res = await fetch('/api?randomItem=true')
  //resolve to json
  const data = await res.json()
  console.log(data)
  // removes hidden class from attributes that have it
  hidden.forEach(e => e.classList.remove('hidden'))
  // hide random item button
  document.querySelector('#random').classList.add('hidden')
  // Changes title h2 to the name of the item
  title.innerText = `Guess the value of a ${data._name}?`
  //Displays chosen item that you are guessing the price on
  document.querySelector('image').src = `${data.img}`



}


async function reset(){
  //sends appropriate request
  const res = await fetch('/api?reset=true')
  const data = await res.json()

  console.log(data)
  //Resets the text boxes for right or wrong and resets the count to 0
  document.querySelector('#rightOrWrong').textContent = ``
  document.querySelector('#count').textContent = `Attempts: 0`
  // Chooses another item
  await whichItem()
  
}

// JORDAN CHANGE THIS PART OF CODE BABY

