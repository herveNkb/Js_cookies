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
  event.preventDefault()

  const newCookie = {};

  inputs.forEach(input => {
    const nameAttribute = input.getAttribute("name")
    newCookie[nameAttribute] = input.value;
  })
  // Date d'expiration du cookie (ici, c'est pour une 7jours)
  newCookie.expires = new Date(new  Date().getTime() + 7 * 24 * 60 * 60 * 1000)
}






















