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

  document.getElementById('display-word').innerText = "";
  document.getElementById('myList').innerText = "";

  const wordInput = form.querySelector('#searchWord');
  const optionSelected = form.querySelector('#options');

  const resultWordInput = wordInput.value;
  const resultOptionSelected = optionSelected.value;

  const url = `https://wordsapiv1.p.rapidapi.com/words/${resultWordInput}/${resultOptionSelected}`;

  const resultApi = await fetchWord(url);

  const readeableResult = JSON.parse(resultApi) 
  
  document.getElementById('display-word').innerText = readeableResult.word

  console.log(readeableResult)


  if (resultOptionSelected === "definitions") {
    readeableResult.definitions.forEach(elem => {
      const listItem = document.createElement("LI");
      const text = document.createTextNode(elem.definition);
      listItem.appendChild(text);
      document.getElementById("myList").appendChild(listItem).innerHTML;
    })
  } else {

    let itemsList = "<ul>";
    readeableResult[resultOptionSelected].forEach(elem => {
      itemsList += "<li>" + elem + "<br>"
    })
    itemsList += "</ul>"
    document.getElementById("myList").innerHTML = itemsList
  }
  
  if (readeableResult[resultOptionSelected].length === 0) {
    document.getElementById('myList').innerText = "No result"
  }

});