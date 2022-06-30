Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
// Remember to inform BOTH the Back4App Application ID AND the JavaScript KEY
Parse.initialize(
    'hBFB5NqK6PfQBlDQFMQ4QMK4zVVRTa6sMoHVFVSF', // This is your Application ID
    'E4CUeH3Af4dXj93MuRSOJ7snvtOSao4Z6WhlkDt0' // This is your Javascript key
);


const lista = document.getElementById("lista")
const inputNome = document.getElementById("inputNome")
const btnAdicionar = document.getElementById("btnAdicionar")
const btnReiniciar = document.getElementById("btnReiniciar")

let nomes = [];
let nomeOrdem = [];


function gerarLista() {
    lista.innerHTML = "";
    for (let i = 0; i < nomes.length; ++i) {

        nomeOrdem[i] = nomes[i].get("Nome");
        console.log(nomeOrdem[i]);
        
    }
    nomeOrdem.sort();

    for (let i = 0; i < nomes.length; ++i) {

        const check = document.createElement("input");
        check.type = "checkbox";
        check.classList = "check";
        check.checked = nomes[i].get("oracao");
        check.onclick = (evt) => checkTarefa(evt, nomes[i]);

        const nomesLista = document.createElement("div");
        nomesLista.classList = "nomesLista";

        const txt = document.createTextNode(
            `${nomeOrdem[i]}` 
        );
        
        lista.appendChild(check);
        nomesLista.appendChild(txt);
        lista.appendChild(nomesLista);
        
    }

};
gerarLista();


const leitura = async () => {
    const FamiliaNoAltar = Parse.Object.extend('FamiliaNoAltar');
    const query = new Parse.Query(FamiliaNoAltar);
    try {
        const results = await query.find();
        nomes = results;
        gerarLista();
    } catch (error) {
        console.error('Error while fetching FamiliaNoAltar', error);
    }
};
leitura();


const adicionar = async () => {
    const myNewObject = new Parse.Object('FamiliaNoAltar');
    myNewObject.set('Nome', inputNome.value);
    myNewObject.set('oracao', false);
    inputNome.value = "";
    inputNome.focus();
    try {
        const result = await myNewObject.save();
        console.log('FamiliaNoAltar created', result);
        leitura();
    } catch (error) {
        console.error('Error while creating FamiliaNoAltar: ', error);
    }
};

btnAdicionar.onclick = adicionar;


const checkTarefa = async (evt, tarefa) => {
    tarefa.set('oracao', evt.target.checked);

    // if (evt.target.checked) {
    //   div2.className = "risco";
    // } else {
    //   div2.className = "semRisco"
    // }

    try {
        const response = await tarefa.save();
        console.log(response.get('oracao'));
        console.log('Tarefa updated', response)
    } catch (error) {
        console.error('Error while updating Tarefa', error);
    }
};
