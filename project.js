
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

  const wordInput = form.querySelector('#searchWord');
  const optionSelected = form.querySelector('#options');

  const resultWordInput = wordInput.value;
  const resultOptionSelected = optionSelected.value;

  const url = `https://wordsapiv1.p.rapidapi.com/words/${resultWordInput}/${resultOptionSelected}`;

  const result = await fetchWord(url);
  
  const showResult =  document.getElementById('display-results').innerHTML = result
  
});