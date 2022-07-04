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

let chefeFamilia = [];

function gerarLista() {

    lista.innerHTML = "";

    for (let i = 0; i < chefeFamilia.length; ++i) {

        const nomesLista = document.createElement("div");
        nomesLista.classList = "nomesLista";

        const check = document.createElement("input");
        check.type = "checkbox";
        check.classList = "check";
        check.checked = chefeFamilia[i].get("oracao");
        check.onclick = (evt) => checkTarefa(evt, chefeFamilia[i]);

        const txt = document.createTextNode(
            `${chefeFamilia[i].get("Nome")}`
        );

        const btnRemover = document.createElement("button");
        btnRemover.className = "fa fa-trash btnRemover";
        btnRemover.onclick = (evt2) => removeTarefa(evt2, chefeFamilia[i]);


        nomesLista.appendChild(check);
        nomesLista.appendChild(btnRemover);
        nomesLista.appendChild(txt);
        lista.appendChild(nomesLista);
    }

}

const leitura = async () => {

    const FamiliaNoAltar = Parse.Object.extend('FamiliaNoAltar');
    const query = new Parse.Query(FamiliaNoAltar);

    try {
        const results = await query.find();
        chefeFamilia = results;
        compare();
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

    try {
        const response = await tarefa.save();
        console.log(response.get('oracao'));
        console.log('Tarefa updated', response)
    } catch (error) {
        console.error('Error while updating Tarefa', error);
    }
};

const removeTarefa = async (evt2, tarefa) => {
    tarefa.set(evt2.target.remove);
    try {
        const response = await tarefa.destroy();
        console.log('Delet ParseObject', response);
        leitura()
    } catch (error) {
        console.error('Error while updating Tarefa', error);
    }
};


function compare() {
    chefeFamilia.sort(function (x, y) {
        let a = x.get("Nome");
        let b = y.get("Nome")
        return a == b ? 0 : a > b ? 1 : -1;
    });
}


const reiniciar = async (tarefa) => {

    for (let i = 0; i < chefeFamilia.length; ++i) {
        tarefa[i].set('oracao', false);
        tarefa[i].save();
    }
    try {
        gerarLista();
    } catch (error) {
        console.error('Error while updating Tarefa', error);
    }
};
btnReiniciar.onclick = (evt) => reiniciar(chefeFamilia);





