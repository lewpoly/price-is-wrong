document.querySelector('#clickMe').addEventListener('click', makeReq);
document.querySelector('#random').addEventListener('click', whichItem)
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
  hidden.forEach(e => e.classList.toggle('hidden'))
  // hide random item button
  document.querySelector('#random').classList.add('hidden')
  title.innerText += ` ${data._name}?`


}
