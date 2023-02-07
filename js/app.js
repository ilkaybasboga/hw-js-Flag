//*=========================================================
//*                     FLAG-APP


let input = document.getElementById("input");
let msg = document.querySelector(".msg");
const form = document.getElementById("form");
const list = document.querySelector(".container .countries");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getCountries();
  e.currentTarget.reset();
});

const getCountries = async () => {
  let inputValue = input.value;
  console.log(inputValue);
  let conURL = `https://restcountries.com/v3.1/name/${inputValue}?fullText=true`;

  try {
    const api = await fetch(conURL).then((api) => api.json());
    console.log(api);

    const {
      name: {common},
      maps: { googleMaps },
      borders,
      capital,
      flags: { png },
    } = api[0];

  //------------------------takrarı engelle--------------

  const cityNameSpans = list.querySelectorAll("h1");

  if(cityNameSpans.length){
    console.log("xxx")
    const filtArr=[...cityNameSpans].filter(span => span.innerText==common);
    if(filtArr.length>0){
      msg.innerHTML=`⛔⛔⛔You already know the weather for ${common}, Please search for another city `;
      setTimeout(() => { msg.innerText = "" }, 5000);
      return;
    }
  }
   
    const card = document.createElement("div");
    card.className = "card bg-secondry m-1";
    let cardBody = document.createElement("div");
    cardBody.className = "card-body p-1 bg-warning";
    cardBody.innerHTML = ` <img src =${png} class="flag-img">
                           <h1 class="city-name" >${common}</h1>
                           <h3>${capital}</h3>
                           <h6 >Borders:${borders}</h6>
                           <a href="${googleMaps}">MAPS</a>`;

    card.appendChild(cardBody);
    list.prepend(card)
  } catch (error) {
    
  msg.innerText = "City not found!";
  setTimeout(() => { msg.innerText = "" }, 5000);
  }
};

