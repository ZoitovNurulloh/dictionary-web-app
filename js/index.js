// FORM
const form = document.querySelector("#form");
const responseHeading = document.getElementById("response__heading")
const responsePhonatic = document.getElementById("response__phonatic")
const responseWrapper = document.querySelector(".response__wrapper")
const responsePhraseNoun = document.getElementById("response__phrase-noun")
const responsePhraseVerb = document.getElementById("response__phrase-verb")
const responseNounList = document.querySelector(".response__noun-list")
const responseVerbList = document.querySelector(".response__verb-list")
const responsePhraseListHeading = document.getElementById("response__list-heading")
const responseListHeading = document.querySelector(".response__list-heading")
const responseSynonymusText = document.getElementById("response__synonymus-text")
const responceLink = document.getElementById("response-source-link")
const formDanger = document.querySelector(".form__danger")
const notFound = document.querySelector(".not-found")
const response = document.querySelector(".response")
const getData = async (resurse) => {
  const request = await fetch(resurse);
  if (request.status != 200) {
    notFound.classList.add("not-found__db")
    response.classList.remove("response--db");
  }else {
    notFound.classList.remove("not-found__db");
    response.classList.add("response--db");
  }

  const data = await request.json();
  return data;
}


form.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = form.querySelector("#form__search");
  if (input.value == '' || input.value == null || input.value == undefined) {
    formDanger.style.display = "block";
  }
  responseNounList.innerHTML = '';
  responseVerbList.innerHTML = '';
  responseListHeading.textContent = ''
  getData(`https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`).then((data) => {
    const [{license,meanings,phonetics,sourceUrls,word,phonetic}] = data;

    responseHeading.textContent = word;
    responsePhonatic.textContent = phonetics[1].text;
    responceLink.textContent = sourceUrls;
    responceLink.setAttribute("href", sourceUrls);
    meanings.forEach((el, ind) => {

    if (el.partOfSpeech === 'noun') {
      responseSynonymusText.textContent = el.synonyms[0];
    }
      el.definitions.forEach((elDef) => {
        responseListHeading.textContent = 'Meaning'
        if (el.partOfSpeech === 'noun') {
          responsePhraseNoun.textContent = el.partOfSpeech;
          responseNounList.innerHTML += `<div class="response__list-item-inner">
              <li class="response__list-item">${elDef.definition}</li>
            </div>`
        }

        if (el.partOfSpeech === 'verb') {
          responsePhraseVerb.textContent = el.partOfSpeech;
          responseVerbList.innerHTML += `<div class="response__list-item-inner">
              <li class="response__list-item">${elDef.definition}</li>
              <p class="response__list-item-meaning">${elDef.example == undefined ? "" : elDef.example}</p>
            </div>`
        }
      })
    })
  })
})