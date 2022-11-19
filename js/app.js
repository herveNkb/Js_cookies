const inputs = document.querySelectorAll("input");

// Écouteur d'événement "invalid" pour le message d'erreur si le champ est vide
// et l'écouteur "input" lorsque le champ n'est plus vide.
inputs.forEach((input) => {
  input.addEventListener("invalid", handleValidation);
  input.addEventListener("input", handleValidation);
});

function handleValidation(event) {
  if (event.type === "invalid") {
    // setCustomValidity permet de modifier le message d'erreur si le champ est vide.
    event.target.setCustomValidity(
      "Attention, veuillez mettre quelque chose dans ce champ"
    );
  } else if (event.type === "input") {
    // Les guillemets vides de setCustomValidity permettent de ne plus afficher le message d'erreur.
    event.target.setCustomValidity("");
  }
}

// Création de l'objet "cookie"
const cookieForm = document.querySelector("form");
cookieForm.addEventListener("submit", handleForm);

function handleForm(event) {
  event.preventDefault();

  const newCookie = {};

  inputs.forEach((input) => {
    const nameAttribute = input.getAttribute("name");
    newCookie[nameAttribute] = input.value;
  });
  // Date d'expiration du cookie (ici, c'est pour une 7jours)
  newCookie.expires = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);

  createCookie(newCookie);
  // Vide le champ de l'input une fois le cookie créé
  cookieForm.reset();
}

// Création du cookie
function createCookie(newCookie) {
  // Affichage du "toast" en bas à droite de l'écran
  if (doesCookieExist(newCookie.name)) {
    createToast({ name: newCookie.name, state: "modifié", color: "orangered" });
  } else {
    createToast({ name: newCookie.name, state: "créé", color: "green" });
  }

  // encodeURIComponent() encode le texte en cas de caractères spéciaux
  document.cookie = `${encodeURIComponent(
    newCookie.name
  )} = ${encodeURIComponent(
    newCookie.value
    //toUTCString converti l'objet date en string
  )};expires=${newCookie.expires.toUTCString()}`;
}

// Vérifie si le cookie existe déjà
function doesCookieExist(name) {
  // Enlève les espaces et le séparateur (;)
  const cookies = document.cookie.replace(/\s/g, "").split(";");

  // Met le nom de chaque cookie dans un tableau à multiple dimension car ".split" garde tout ce qui a avant le =
  const onlyCookiesName = cookies.map((cookie) => cookie.split("=")[0]);

  // Boucle dans le tableau onlyCookieName pour voir si le nom du cookie qui est en train
  // d'être créé n'existe pas déjà
  return onlyCookiesName.find((cookie) => cookie === encodeURIComponent(name));
}

// Création du "toast"
const toastContainer = document.querySelector(".toasts-container");

function createToast({ name, state, color }) {
  const toastInfo = document.createElement("p");
  toastInfo.className = "toast";

  toastInfo.textContent = `Cookie ${name} ${state}.`;
  toastInfo.style.backgroundColor = color;

  toastContainer.appendChild(toastInfo);

  // Supprime le toast automatiquement
  setTimeout(() => {
    toastInfo.remove();
  }, 2500);
}

// Affichage des cookies
const cookiesList = document.querySelector(".cookies-list");
const displayCookieBtn = document.querySelector(".display-cookie-btn");
const infoTxt = document.querySelector(".info-txt");

displayCookieBtn.addEventListener("click", displayCookies);

// Verrouille l'affichage du message d'erreur pour éviter le spam du click
let lock = false;

function displayCookies() {
  // Enlève les espaces avec le regex de replace(), crée un tableau et enlève-les ";" avec split()
  // et inverse l'ordre avec reverse()
  const cookies = document.cookie.replace(/\s/g, "").split(";").reverse();

  // Si cookies est false
  if (!cookies[0]) {
    if (lock) return;
    
    lock = true;
    infoTxt.textContent = "Pas de cookies à afficher, créez-en un !";

    setTimeout(() => {
      infoTxt.textContent = "";
      lock = false;
    }, 2000);
    return;
  }
  // Si cookies est true
  createElements(cookies);
}











































