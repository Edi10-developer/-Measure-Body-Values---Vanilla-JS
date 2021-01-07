// Calculate Body Mass
function bodyMass(){
    let weight = parseInt(document.getElementById('weight').value);
    let height = parseInt(document.getElementById('height').value);
    let result = document.getElementById('result');

    let imc = (weight / (height * height)) * 10000;
    
    result.innerHTML = imc;

}