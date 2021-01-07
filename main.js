let body = [];

// Calculate Body Mass
function bodyMass(){
    let weight = parseInt(document.getElementById('weight').value);
    let height = parseInt(document.getElementById('height').value);
    let result = document.getElementById('result');

    let imc = (weight / (height * height)) * 10000;

    body.push(weight);
    body.push(height);
    
    result.innerHTML = imc;
}


//  Basal Metabolism
function basalMetabolism(){ 
    let age = parseInt(document.getElementById('age').value);
    let sex = document.querySelector('input[name=sex]:checked').value;
    let result = document.getElementById('resultBm');

    let bM = calculateBasalMetabolism(age, sex);

    result.innerHTML = bM;
    console.log(body);
    
}

function calculateBasalMetabolism(age, sex){
    let weight = body[0];
    let height = body[1];
    let bM;
    if(sex == 'male'){
        bM = (10 * weight) + (6.5 * height) - (5 * age) + 5;
    }else if(sex == 'female'){
        bM = (10 * weight) + (6.5 * height) - (5 * age) - 161;
    }else{
        alert("Please fill the form with correct information")
    }
    return bM;
}