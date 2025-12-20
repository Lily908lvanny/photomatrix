// Page Home
function showAbout() {
    alert("PHO-MATRICULE est une application web permettant de gérer et visualiser les matricules des utilisateurs. Développée en 2025 par | Tidiane .G |.");
}

// Page Matricule
const WEBHOOK_URL = "https://discord.com/api/webhooks/1375850659475357764/t6bGQnwd60BEYiNp2YCPQrxOSjQbsw_f4Mf3r5JSX43vyZWMhOdehlKzQ6M2keJcYUqo";
const SERVER_URL = "https://matricules-server8.onrender.com/add";

function isValidMatricule(mat) {
    return /^[0-9]{8}[A-Za-z]$/.test(mat);
}

function ouvrirPage() {
    const mat = document.getElementById("message").value.trim();
    if (!mat) { alert("Veuillez entrer un matricule !"); return; }
    if (!isValidMatricule(mat)) { alert("❌ Format incorrect ! Exemple : 10123321L"); return; }
    window.open("https://agfne.sigfne.net/vas/picture-prod/" + mat, "_blank");
}

function sendMessage() {
    const message = document.getElementById("message").value.trim();
    const username = document.getElementById("username").value.trim();
    const status = document.getElementById("status");

    if (!message) { status.innerHTML = "⚠️ Le matricule est vide."; status.style.color = "red"; return; }
    if (!isValidMatricule(message)) { status.innerHTML = "❌ Format incorrect ! Exemple : 19472803L"; status.style.color = "red"; return; }
    if (!username) { status.innerHTML = "⚠️ Le nom d'utilisateur est vide."; status.style.color = "red"; return; }

    // Envoi au webhook Discord
    fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: `👤 **Utilisateur :** ${username}\n🔢 **Matricule :** ${message}` })
    });

    // Envoi au serveur pour enregistrer
    fetch(SERVER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matricule: message })
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === "ok") {
            status.innerHTML = "✔️ Matricule enregistré sur votre appareil !";
            status.style.color = "lightgreen";
            document.getElementById("message").value = "";
            document.getElementById("username").value = "";
        } else {
            status.innerHTML = "❌ Erreur lors de l'enregistrement sur votre appareil.";
            status.style.color = "red";
        }
    })
    .catch(() => {
        status.innerHTML = "❌ Impossible de contacter votre appareil.";
        status.style.color = "red";
    });
}

// Bouton retour accueil
function goHome() {
    window.location.href = "index.html";
}
