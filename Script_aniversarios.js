Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
// Remember to inform BOTH the Back4App Application ID AND the JavaScript KEY
Parse.initialize(
    'hBFB5NqK6PfQBlDQFMQ4QMK4zVVRTa6sMoHVFVSF', // This is your Application ID
    'E4CUeH3Af4dXj93MuRSOJ7snvtOSao4Z6WhlkDt0' // This is your Javascript key
);

const lista = document.getElementById("lista")
const inputNome = document.getElementById("inputNome")
const inputData = document.getElementById("inputData")
const btnAdicionar = document.getElementById("btnAdicionar")

let servos = [];


function gerarLista() {

    lista.innerHTML = "";

    for (let i = 0; i < servos.length; ++i) {

        const nomesLista = document.createElement("div");
        nomesLista.classList = "nomesLista";

        const txt = document.createTextNode(
            `${servos[i].get("Nome")}`
        );

        const btnRemover = document.createElement("button");
        btnRemover.className = "fa fa-trash btnRemover";
        btnRemover.onclick = (evt2) => removeTarefa(evt2, servos[i]);

        nomesLista.appendChild(btnRemover);
        nomesLista.appendChild(txt);
        lista.appendChild(nomesLista);
    }

}

