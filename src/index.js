// Your code here
document.addEventListener("DOMContentLoaded", () => {
    const baseURL = "http://localhost:3000/characters";
    const characterBar = document.querySelector("#character-bar");
    const detailedInfo = document.querySelector("#detailed-info");
    const votesForm = document.querySelector("#votes-form");
    const votesInput = document.querySelector("#votes");
    const resetButton = document.querySelector("#reset-btn");
    const addCharacterForm = document.querySelector("#character-form");
    let currentCharacter = null; 

   
    fetch(baseURL)
        .then(res => res.json())
        .then(characters => {
            characters.forEach(character => {
                const span = document.createElement("span");
                span.textContent = character.name;
                span.addEventListener("click", () => showCharacterDetails(character));
                characterBar.appendChild(span);
            });
        });