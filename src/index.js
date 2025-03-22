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

      
    function showCharacterDetails(character) {
        currentCharacter = character; 
        detailedInfo.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <h2>${character.name}</h2>
            <p>Votes: <span id="vote-count">${character.votes}</span></p>
        `;
    };
    votesForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!currentCharacter) return;

        let addedVotes = parseInt(votesInput.value);
        let newVoteCount = currentCharacter.votes + addedVotes;

       
        document.querySelector("#vote-count").textContent = newVoteCount;
        currentCharacter.votes = newVoteCount;
        votesInput.value = "";

       
        fetch(`${baseURL}/${currentCharacter.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ votes: newVoteCount })
        });
    });
