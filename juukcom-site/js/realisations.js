const photos = [
  { src: "/juukcom-site/image/lacoste1.jpg", alt: "Polos floqués", cat: "textile" },
  { src: "/juukcom-site/image/lacoste2.jpg", alt: "Polos brodés", cat: "textile" },
  { src: "/juukcom-site/image/tasse2.jpg", alt: "Mug personnalisé", cat: "textile" },
  { src: "/juukcom-site/image/affiche1.jpg", alt: "Affiche Ramadan", cat: "affiches" },
  { src: "/juukcom-site/image/affiche2.jpeg", alt: "Goudi Ajuma", cat: "affiches" },
  { src: "/juukcom-site/image/affiche3.jpeg", alt: "Majjal", cat: "affiches" },
  { src: "/juukcom-site/image/affiche4.jpeg", alt: "Mahuuz", cat: "affiches" },
  { src: "/juukcom-site/image/affiche5.jpeg", alt: "Journee Qassida", cat: "affiches" },
  { src: "/juukcom-site/image/cartes.jpg", alt: "Cartes de visite", cat: "cartes" },
  { src: "/juukcom-site/image/badge.jpeg", alt: "Badge personnalisé", cat: "textile" },
  { src: "/juukcom-site/image/carnet.jpeg", alt: "Carnet personnalisé", cat: "cartes" },
  { src: "/juukcom-site/image/flyers.jpeg", alt: "Flyers", cat: "cartes" },
  { src: "/juukcom-site/image/etiquette.jpeg", alt: "Étiquette personnalisée", cat: "cartes" },
  { src: "/juukcom-site/image/flocage.jpeg", alt: "tenu", cat: "textile" },
  { src: "/juukcom-site/image/flocage1.jpeg", alt: "Soow mi", cat: "textile" },
  { src: "/juukcom-site/image/flocage5.jpeg", alt: "Papito", cat: "textile" },
  { src: "/juukcom-site/image/flocage3.jpeg", alt: "Baye fall bi", cat: "textile" },
  { src: "/juukcom-site/image/flocage4.jpeg", alt: "Baye fall bi", cat: "textile" },
  { src: "/juukcom-site/image/tableau.jpeg", alt: "Tableau personnalisé", cat: "tableaux" },
  { src: "/juukcom-site/image/sachet.jpeg", alt: "sachet personnalisé", cat: "textile" },
  { src: "/juukcom-site/image/sachet1.jpeg", alt: "sachet personnalisé", cat: "textile" },
  { src: "/juukcom-site/image/sachet2.jpeg", alt: "sachet personnalisé", cat: "textile" },
  { src: "/juukcom-site/image/sachet3.jpeg", alt: "sachet personnalisé", cat: "textile" },
  { src: "/juukcom-site/image/trophee.jpeg", alt: "Trophée", cat: "textile" },
  { src: "/juukcom-site/image/trophee1.jpeg", alt: "trophée", cat: "textile" },
  { src: "/juukcom-site/image/trophee3.jpeg", alt: "trophée", cat: "textile" },
  { src: "/juukcom-site/image/trophee2.jpeg", alt: "trophée", cat: "textile" },
  { src: "/juukcom-site/image/flocage2.jpeg", alt: "foulard", cat: "textile" }
]

const categories = {
  tout: "Tout",
  textile: "Textile & goodies",
  tableaux: "Tableaux muraux",
  affiches: "Affiches",
  cartes: "Cartes de visite & Papeterie"
}

const params = new URLSearchParams(location.search)
let actif = params.get("cat")
if (!categories[actif]) actif = "tout"

const filtres = document.getElementById("filtres")
const grille = document.getElementById("grille")


function afficherFiltres() {
  filtres.innerHTML = Object.entries(categories).map(([cle, nom]) =>
    `<button class="${cle === actif ? "on" : ""}" data-cat="${cle}">${nom}</button>`
  ).join("")
}

function afficherPhotos() {
  const liste = actif === "tout" ? photos : photos.filter(p => p.cat === actif)
  grille.innerHTML = liste.map((p, i) =>
    `<img src="${p.src}" alt="${p.alt}" loading="lazy" style="animation-delay:${Math.min(i, 12) * 60}ms">`
  ).join("")
}

filtres.addEventListener("click", (e) => {
  const bouton = e.target.closest("button")
  if (!bouton || bouton.dataset.cat === actif) return

  actif = bouton.dataset.cat
  afficherFiltres()                 // le bouton choisi change tout de suite
  grille.classList.add("sortie")    // les anciennes photos s'effacent

  setTimeout(() => {
    afficherPhotos()                // on remplace les photos
    grille.classList.remove("sortie")
  }, 200)
})

afficherFiltres()
afficherPhotos()