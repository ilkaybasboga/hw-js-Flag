//*=========================================================
//*                     FLAG-APP
//*=========================================================

const container = document.querySelector(".container");
const countries = document.querySelector(".countries");
let input = document.getElementById("input");
const btn = document.getElementById("button-addon2");

btn.addEventListener("click", (e) => {
  let inputValue = input.value;

  let conURL = `https://restcountries.com/v3.1/name/${inputValue}?fullText=true`;
  fetch(conURL)
    .then((res) => res.json())
    .then((x) => countriesCreat(x))
    .catch((err) => {
      const error = document.createElement("div");
      container.appendChild(error);

      if (inputValue.length == 0) {
        error.innerHTML = `
            <h2>The input field cannot be empty</h2>`;
      } else {
        error.innerHTML = `
            <h2>Please enter a valid country name!</h3>`;
      }
      error.className = "text-warning text-center ";
      setTimeout(() => {
        error.innerHTML = "";
  input.value = "";

      }, 3000);
    });

    input.value = "";

  window.onload = input.focus();

  e.preventDefault();
});

function countriesCreat(x) {
  let card = document.createElement("div");
  card.className = "card bg-secondry m-1 ";

  let cardBody = document.createElement("div");
  cardBody.className = "card-body p-1 bg-warning";

  let conFlag = document.createElement("p");
  conFlag.className = "text-center ";

  let conName = document.createElement("h");
  conName.className = "text-danger display-5 text-center";

  let conCapital = document.createElement("p");
  conCapital.className = "";

  let conBorders = document.createElement("p");
  conCapital.className = "";
  let conPopul = document.createElement("p");
  conCapital.className = "";
  let conLang = document.createElement("a");
  conCapital.className = "";

  countries.prepend(card);
  card.appendChild(cardBody);
  cardBody.appendChild(conFlag);
  cardBody.appendChild(conName);
  cardBody.appendChild(conCapital);
  cardBody.appendChild(conPopul);
  cardBody.appendChild(conBorders);
  cardBody.appendChild(conLang);

  conFlag.innerHTML = `<img src ='${x[0].flags.svg}' class="flag-img w-100 h-100">`;
  conName.innerHTML = `${x[0].name.common}`;
  conCapital.innerHTML = `Capital: ${x[0].capital}`;
  conPopul.innerHTML = `Population: ${x[0].population}`;
  conLang.innerHTML = `<a href="${x[0].maps.googleMaps}">Maps: ${x[0].maps.googleMaps}</a>`;
  conBorders.innerHTML = `Borders: ${x[0].borders}`;
}
