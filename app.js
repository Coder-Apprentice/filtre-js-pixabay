// Je récupère les balise dans mon html
const body = document.querySelector("body");
const app = document.getElementById("app");

// J'applique du style par default sur mon body
body.style.margin = "0px";
body.style.padding = "0px";

/* ----------------------------------------------------- */

// Exemple: URL pixabay doc -> https://pixabay.com/api/docs/
// const url =
//   "https://pixabay.com/api/?key=18303891-2601ad3ee99af425dc0d9b4e9&q=bitcoin&per_page=200&image_type=photo";

// Ma function permet e faire une requete http en direction de l'API de pixabay
// Les params me permettent de personaliser mon url donc mon resultat
function fetchPixabay(params) {
  // l'url par default avec ma key
  let baseURL =
    "https://pixabay.com/api/?key=18303891-2601ad3ee99af425dc0d9b4e9";

  // Si il y a un mot clef (keyword) dans le params alors je les concataine dans mon url
  if (params.keyword) {
    console.log("keyword");
    // Dans les mots clef je remplace les espaces ' ' par des "+"
    baseURL = baseURL + "&q=" + params.keyword.replaceAll(" ", "+");
  }
  // Ici je peux donner une limite de resultat des objet dans le tableau
  if (params.limit) {
    console.log("limit");
    // J'ajoute la limte dans l'url
    baseURL = baseURL + "&per_page=" + params.limit;
  }

  // ICI je lance la requète fetch (HTTP / GET)
  fetch(baseURL)
    .then((res) => res.json())
    .then((res) => {
      console.log("res", res);
      // J'envoie le resultat en params de ma function pour builder ma liste avec les data
      buildListeCards(res.hits);
    });
}

// Je run la function pour personaliser ma requete fetch avec les params en fonction
fetchPixabay({ keyword: "bitcoin crypto", limit: 150 });

/* ------------------------- NAV ---------------------------- */

// Je crée une balise nav
const nav = document.createElement("nav");

// Je lui applique du style
nav.style.backgroundColor = "rgb(255,0,255)";
nav.style.height = "65px";
nav.style.display = "flex";
nav.style.justifyContent = "center";
nav.style.textAlign = "center";

// Ajout de la nav dans la div #app
app.appendChild(nav);

/* ---------------------------- INPUT-SEARCH ------------------------- */

// Input Search = champs de saisi dans la nav
const inputSearch = document.createElement("input");
inputSearch.setAttribute("type", "search");
inputSearch.setAttribute("id", "mySearch");
inputSearch.setAttribute("placeholder", "Search for something..");

// ICI j'ajoute un event 'input' sur mon inputSearch
// Ce qui permet de déclencher l'évent a chaque changement de value 
inputSearch.addEventListener("input", () => {
  console.log("geojgoerjgero", inputSearch.value.toUpperCase());
  
  // L'id de la liste UL = listeCards
  var input, filter, ul, li, a, i, txtValue;

  // input = document.getElementById("myInput");

  filter = inputSearch.value.toUpperCase();
  ul = document.getElementById("listeCards");
  li = ul.getElementsByTagName("li");
  
  for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
      } else {
          li[i].style.display = "none";
      }
  }
});

// ajout  du champs sesi dans la nav
nav.appendChild(inputSearch);

/* ---------------------- BUTTON SEARCH ------------------------------- */

// Création du bouton avec événement clique
const btnSearch = document.createElement("button");
btnSearch.innerText = "Search";
btnSearch.addEventListener("click", () => {
  console.log("évenement , alerte rouge", inputSearch.value);
});

//ajout du bouton dans la nav
nav.appendChild(btnSearch);

/* ----------------------------------------------------- */

// Création d un tableau pour alimenter notre liste
const listeCards = [
  { id: 0, name: "Bruno", description: "Je suis Bruno" },
  { id: 1, name: "Christ", mmf: { ville: "detroit", pays: "taboulistant" } },
  { atk: 2, name: "Hell", description: "Je suis Hell" },
];
// console.log("obj", listeCards[1].mmf.pays);

const ul = document.createElement("ul");
ul.setAttribute("id", "listeCards");
app.appendChild(ul);

/* --------------------- boucle build liste -------------------------------- */
// Parcours  listeCards

for (i = 0; i <= listeCards.length - 1; i++) {
  // Créé un "li" & "a"
  const li = document.createElement("li");
  const a = document.createElement("a");

  // Assigne du text (key: value) dans notre "a"
  a.innerHTML = listeCards[i].description;

  // attribution des parent > enfants
  li.appendChild(a);
  ul.appendChild(li);
}


/* ---------------------- Function Build List ------------------------------- */
// TABLEAU DE BUILDLISTECARDS
function buildListeCards(array) {
  console.log("function buildListeCards", array);

  // PARCOURRIR BUILDLISTECARDS
  for (i = 0; i <= array.length - 1; i++) {
    
    //PARCOURRIR LES ID(S)
    console.log(array[i].id);

    //PARCOURRIR LES BALISES <LI> ET <A> CREE
    const li = document.createElement("li");
    const a = document.createElement("a");
   
    // DANS LE  A ON ENTRE LISTE DU NOM TAGS
    a.innerText = array[i].tags;

    li.appendChild(a);
    ul.appendChild(li);
  }
}

/* ----------------------------------------------------- */
