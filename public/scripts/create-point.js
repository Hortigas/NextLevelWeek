function populateUFs() {
    const UFselect = document.querySelector('select[name=uf]');
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then((res) => res.json())
        .then((states) => {
            for (state of states) {
                UFselect.innerHTML += `<option value = "${state.id}">${state.nome}</option>`;
            }
        });
}

populateUFs();

function getCities(event) {
    const CTselect = document.querySelector('[name=city]');

    const UFvalue = event.target.value;

    document.querySelector('[name=state]').value = event.target.options[event.target.selectedIndex].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UFvalue}/municipios`;

    CTselect.innerHTML = '<option value>Seleciona a Cidade</option>';
    CTselect.disabled = true;

    fetch(url)
        .then((res) => res.json())
        .then((citys) => {
            for (city of citys) {
                CTselect.innerHTML += `<option value = "${city.nome}">${city.nome}</option>`;
            }
        });

    CTselect.disabled = false;
}

document.querySelector('select[name=uf]').addEventListener('change', getCities);

//Itens de coleta

for (const item of document.querySelectorAll('.items-grid li')) {
    item.addEventListener('click', handleSelectedItem);
}

let selectedItems = [];

function handleSelectedItem(event) {
    const itemLi = event.target;

    itemLi.classList.toggle('selected');

    const itemID = itemLi.dataset.id;
}

document.querySelector('form button').addEventListener('click', updateItemList);

function updateItemList() {
    for (const item of document.querySelectorAll('.items-grid li')) {
        if (item.classList.contains('selected')) selectedItems.push(item.dataset.id);
    }

    document.querySelector('input[name=items]').value = selectedItems;
    console.log(selectedItems);
}
