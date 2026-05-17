let suspicions = {

    suspect1: 0,

    suspect2: 0,

    suspect3: 0,

    suspect4: 0
};
let killer = "";
function changeSuspect() {

    const suspectSelect =
        document.getElementById("suspectSelect");

    const suspect =
        suspectSelect.value;

    const image =
        document.getElementById("suspectImage");

    const name =
        document.getElementById("suspectName");

    if(suspect === "suspect1") {

        image.src = "./suspects/laura.png";
        name.innerText = "Laura";
    }

    else if(suspect === "suspect2") {

        image.src = "./suspects/marcos.png";
        name.innerText = "Marcos";
    }

    else if(suspect === "suspect3") {

        image.src = "./suspects/sofia.png";
        name.innerText = "Sofia";
    }

    else if(suspect === "suspect4") {

        image.src = "./suspects/daniel.png";
        name.innerText = "Daniel";
    }

    const suspicion =
        suspicions[suspect];

    document.getElementById("suspicionBar")
        .style.width =
            suspicion + "%";

    document.getElementById("suspicionText")
        .innerText =
            "Sospecha: " +
            suspicion +
            "%";
}

async function sendMessage() {

    const input =
        document.getElementById("message");

    const chat =
        document.getElementById("chat");

    const suspect =
        document.getElementById("suspectSelect").value;

    const message = input.value;

    if(message === "") return;

    chat.innerHTML += `
        <div class="message user">
            <b>Tú:</b> ${message}
        </div>
    `;

    input.value = "";

    const response =
        await fetch("http://localhost:3000/chat", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            message,
            suspect
        })
    });

    const data = await response.json();
    suspicions[suspect] +=
    Math.floor(Math.random() * 15);

if(suspicions[suspect] > 100) {

    suspicions[suspect] = 100;
}

changeSuspect();
   suspicions[suspect] +=
    Math.floor(Math.random() * 15);

if(suspicions[suspect] > 100) {

    suspicions[suspect] = 100;
}


document.getElementById("suspicionText")
    .innerText =
        "Sospecha: " +
        suspicions[suspect] +
        "%";
    const aiDiv =
    document.createElement("div");

aiDiv.classList.add("message");
aiDiv.classList.add("ai");

chat.appendChild(aiDiv);

const name =
    document.getElementById("suspectName").innerText;

let text =
    `<b>${name}:</b> `;

let i = 0;

const interval = setInterval(() => {

    text += data.response[i];

    aiDiv.innerHTML = text;

    i++;

    if(i >= data.response.length) {

        clearInterval(interval);
    }

}, 20);

    chat.scrollTop = chat.scrollHeight;
}
function accuse() {

    const suspect =
        document.getElementById("suspectName").innerText;

    if(suspect === killer) {

        alert(
            "¡HAS RESUELTO EL CASO!\n\n" +
            suspect +
            " es el asesino."
        );

    } else {

        alert(
            "Has acusado al sospechoso incorrecto.\n\n" +
            "El asesino escapó..."
        );
    }
}
async function loadCase() {

    const randomCase =
        Math.floor(Math.random() * 3) + 1;

    const response =
        await fetch(`./cases/case${randomCase}.json`);


    const data =
        await response.json();

    const cluesDiv =
        document.getElementById("clues");

    data.clues.forEach(clue => {

        cluesDiv.innerHTML += `
            <p>• ${clue}</p>
        `;
    });

    const suspects = [
        "Laura",
        "Marcos",
        "Sofia",
        "Daniel"
    ];

    killer =
        suspects[
            Math.floor(
                Math.random() * suspects.length
            )
        ];

    console.log("ASESINO:", killer);
}
loadCase();
changeSuspect();