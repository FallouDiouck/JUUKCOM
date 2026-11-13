const photos = [
  { src: "/juukcom-site/image/lacoste1.jpg", alt: "Polos floqués", cat: "textile" },
  { src: "/juukcom-site/image/lacoste2.jpg", alt: "Polos brodés", cat: "textile" },
  { src: "/juukcom-site/image/tasse2.jpg", alt: "Mug personnalisé", cat: "textile" },
  { src: "/juukcom-site/image/affiche1.jpg", alt: "Affiche Ramadan", cat: "affiches" },
  { src: "/juukcom-site/image/cartes.jpg", alt: "Cartes de visite", cat: "cartes" },
  { src: "/juukcom-site/image/badge.jpeg", alt: "Badge personnalisé", cat: "textile" },
  { src: "/juukcom-site/image/carnet.jpeg", alt: "Carnet personnalisé", cat: "cartes" },
  { src: "/juukcom-site/image/etiquette.jpeg", alt: "Étiquette personnalisée", cat: "cartes" },
  { src: "/juukcom-site/image/flocage.jpeg", alt: "Badge personnalisé", cat: "textile" },
  { src: "/juukcom-site/image/flocage1.jpeg", alt: "Badge personnalisé", cat: "textile" },
  { src: "/juukcom-site/image/tableau.jpeg", alt: "Badge personnalisé", cat: "tableaux" },
  { src: "/juukcom-site/image/sachet.jpeg", alt: "Badge personnalisé", cat: "textile" },
  { src: "/juukcom-site/image/trophee.jpeg", alt: "Badge personnalisé", cat: "textile" },
  { src: "/juukcom-site/image/trophee1.jpeg", alt: "Badge personnalisé", cat: "textile" },
  { src: "/juukcom-site/image/flocage2.jpeg", alt: "Badge personnalisé", cat: "textile" }
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