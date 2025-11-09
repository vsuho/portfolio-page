
    // Ladataan HTML-dokumentti
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".nav-link");
    const projectCards = document.querySelectorAll(".project-card");
    let idleTime = 0; // Käyttäjän epäaktiivisuus aika
    const idleLimit = 300; // Epäaktiivisuusaika maksimissaan 300s

    /*
    function alertFunction(){
        alert("Hei!");
    }
        */
    
    // Jos käyttäjä on etusivulla, laitetaan kahden sekunnin päästä alert "Hei!" tulemaan
    /*if(document.body.id === "home"){
        window.setTimeout(alertFunction, 2000);
    }
        */

function resetIdleTime() {
    idleTime = 0; 
}
    // Katsotaan onko käyttäjä vielä epäaktiivinen
function checkIdle() {
    idleTime++;
    if (idleTime >= idleLimit) {
        alert("Olet ollut epäaktiivinen liian pitkään. Siirrytään takaisin etusivulle.");
        
        window.location.href = "index.html";    // Siirrytään takaisin etusivulle
    }
}

    // Event listenerit käyttäjän aktiivisuudelle kun sivu avataan
window.onload = function() {
    document.onmousemove = resetIdleTime;
    document.onkeydown = resetIdleTime;
    document.onclick = resetIdleTime; 
};

// Tarkistetaan sekunnin välein, jatkuuko epäaktiivisuus
setInterval(checkIdle, 1000);
    
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // Estää sivun uudelleen latautumisen

            // Saadaan valittu projekti
            const projectToShow = e.target.getAttribute("data-project");

            // Näytetään projektikortit
            projectCards.forEach(card => {
                if (card.id === projectToShow) {
                    card.style.display = "block";
                } 
                
            });
        });
    });

    document.getElementById("contact").addEventListener("submit", async function(e){
        e.preventDefault();

         // Funktio joka poistaa status-tekstin 10 sekunnin kuluttua
         function clearStatus(){
            setTimeout(() => {
                document.getElementById("status").innerText = "";
            }, 10000)
        }

        
        // Kerätään syötetyt tiedot formData-olioon
        const formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value,
        };

        try{
            const response = await fetch("/submit-form",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify(formData)
            });
    
            if(response.ok){
                document.getElementById("status").innerText = "Viesti lähetetty onnistuneesti!"
            } else{
                document.getElementById("status").innerText = "Viestin lähettäminen epäonnistui. Yritä hetken kuluttua uudelleen."        
            }
            clearStatus();

        } catch(error) {
            console.error(error);
        }
    });
})
    