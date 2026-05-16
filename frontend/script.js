async function sendMessage() {

    const input = document.getElementById("message");

    const chat = document.getElementById("chat");

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

    chat.innerHTML += `
        <div class="message ai">
            <b>Sospechoso:</b> ${data.response}
        </div>
    `;

    chat.scrollTop = chat.scrollHeight;
}