
//tratar essa resposta: o que eu vou acessar dentro do objeto de resposta

const form = document.getElementById('searchForm');

async function fetchWord(url) {
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '2e011d3d00msh372ec70069a9ab1p13b85djsnb22bea16deea',
      'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    return result;
  } catch (error) {
    console.error(error);
  }
};

form.addEventListener('submit', async function (event) {
  event.preventDefault();

  document.getElementById('display-word').textContent = "";
  document.getElementById('myList').textContent = "";

  const wordInput = form.querySelector('#searchWord');
  const optionSelected = form.querySelector('#options');

  const resultWordInput = wordInput.value;
  const resultOptionSelected = optionSelected.value;

  const url = `https://wordsapiv1.p.rapidapi.com/words/${resultWordInput}/${resultOptionSelected}`;

  const resultApi = await fetchWord(url);

  const readeableResult = JSON.parse(resultApi) //change 

  document.getElementById('display-word').innerText = readeableResult.word

  readeableResult.definitions.forEach(elem => {
    const listItem = document.createElement("LI");
    const text = document.createTextNode(elem.definition);
    listItem.appendChild(text);
    document.getElementById("myList").appendChild(listItem);
  })

});

//for every definition we creat a list element inside the unorded list
// reset at the start of the addEventListener