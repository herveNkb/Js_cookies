const inputs = document.querySelector("input");

// Écouteur événement "invalid" pour le message d'erreur si le champ est vide
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
    // Les guillemets vides de setCustomValidity permet de ne plus afficher le message d'erreur.
    event.target.setCustomValidity("");
  }
}
