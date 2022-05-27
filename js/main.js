document.querySelector('#clickMe').addEventListener('click', makeReq);
let clownLaugh = new Audio('(clown-laughing)-cqp');

async function makeReq() {
  const guess = document.querySelector('#guess').value;
  const res = await fetch(`/api?priceIsWrong=${guess}`);
  const data = await res.json();

  console.log(data);
  if (data.verdict === 'The Price is WRONG!') {
    clownLaugh.play();
    clownLaugh.loop = true;
  }
  document.querySelector('#rightOrWrong').textContent = data.verdict;
}
// JORDAN CHANGE THIS PART OF CODE BABY