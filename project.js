const form = document.getElementById('searchForm');

async function fetchWord(resultWordInput, resultOptionSelected) {
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '2e011d3d00msh372ec70069a9ab1p13b85djsnb22bea16deea',
      'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
    },
  };

  const url = `https://wordsapiv1.p.rapidapi.com/words/${resultWordInput}/${resultOptionSelected}`;

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

form.addEventListener('submit', async function (event) {
  event.preventDefault();

  document.getElementById('display-word').innerText = "";
  document.getElementById('myList').innerText = "";

  const wordInput = form.querySelector('#searchWord');
  const optionSelected = form.querySelector('#options');

  const resultWordInput = wordInput.value;
  const resultOptionSelected = optionSelected.value;

  const readeableResult = await fetchWord(resultWordInput, resultOptionSelected);
  
  if (readeableResult.word) {
    document.getElementById('display-word').innerText = `${readeableResult.word} - ${resultOptionSelected}`
  } else {
    document.getElementById('display-word').innerText = "No result"
  }

  console.log(readeableResult)

  document.getElementById("display-results").style.display = "block";

  if (resultOptionSelected === "definitions") {
    readeableResult.definitions.forEach(elem => {
      showItem(elem.definition);
    })

  } else {
    readeableResult[resultOptionSelected].forEach(elem => {
      showItem(elem)
    })
  }
  
  if (readeableResult?.[resultOptionSelected].length === 0) {
    document.getElementById('myList').innerText = "No result"
  }

});

function showItem(itemText) {
  const listItem = document.createElement("li");
  const text = document.createTextNode(itemText);
  listItem.appendChild(text);
  document.getElementById("myList").appendChild(listItem);
}