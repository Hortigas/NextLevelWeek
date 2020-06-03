function populateUFs() {
    const UFselect = document.querySelector("select[name=uf]");
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then((res) => res.json())
        .then((states) => {
            for (state of states) {
                UFselect.innerHTML += `<option value = "${state.id}">${state.nome}</option>`;
            }
        });
}

populateUFs();

function getCities(event) {
    const CTselect = document.querySelector("[name=city]");

    const UFvalue = event.target.value;

    document.querySelector("[name=state]").value =
        event.target.options[event.target.selectedIndex].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UFvalue}/municipios`;

    fetch(url)
        .then((res) => res.json())
        .then((citys) => {
            for (city of citys) {
                CTselect.innerHTML += `<option value = "${city.id}">${city.nome}</option>`;
            }
        });

    CTselect.disabled = false;
}

function updateCity(event) {
    document.querySelector("[name=cityName]").value =
        event.target.options[event.target.selectedIndex].text;
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);

document
    .querySelector("select[name=city]")
    .addEventListener("change", updateCity);
