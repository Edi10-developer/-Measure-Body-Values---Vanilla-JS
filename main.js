let body = [];

// Calculate Body Mass
function bodyMass(){
    let weight = parseInt(document.getElementById('weight').value);
    let height = parseInt(document.getElementById('height').value);
    let result = document.getElementById('result');

    let imc = Math.round((weight / (height * height)) * 10000);

    body.push(weight);
    body.push(height);
    
    result.innerHTML = imc + ' BM';
}


//  Basal Metabolism
function basalMetabolism(){ 
    let age = parseInt(document.getElementById('age').value);
    let sex = document.querySelector('input[name=sex]:checked').value;
    let result = document.getElementById('resultBm');

    let bM = calculateBasalMetabolism(age, sex);

    body.push(age);
    body.push(sex);
    body.push(bM);

    result.innerHTML = bM + ' KCal';

    fillLeansData();
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
        alert("Please fill the form with correct information");
    }
    return bM;
}


// Daily Caloric Needs
function dailyCaloricNeeds(){
    let select = document.getElementById('selectLifeStyle');
    let result = document.getElementById('resultdCN');
    let lifeStyle = select.value;
    let weight = body[0] * 2.2;
    let sex = body[3];
    let dCN = calculateCaloricNeeds(lifeStyle, weight, sex);

    body.push(lifeStyle);
    body.push(dCN);
   
    result.innerHTML = dCN + ' KCal';
}

function calculateCaloricNeeds(lifeStyle, weight, sex){
    let dCN;
    if((lifeStyle == 'easy') && (sex == 'male')){
        dCN = weight * 11;
    } else if((lifeStyle == 'easy') && (sex == 'female')){
        dCN = weight * 10;
    }else if((lifeStyle == 'medium') && (sex == 'male')){
        dCN = weight * 13;
    } else if((lifeStyle == 'medium') && (sex == 'female')){
        dCN = weight * 12;
    } else if((lifeStyle == 'hard') && (sex == 'male')){
        dCN = weight * 19;
    } else if((lifeStyle == 'hard') && (sex == 'female')){
        dCN = weight * 18;
    }else{
        alert("Please fill the form with correct information");
    }
    return dCN;
}


// Calculate Leans Body Mass
function leanBodyMass(){
    let result = document.getElementById('resultLBM');
    let weight = body[0];
    let height = body[1];
    let sex = body[3];
    let lBM = Math.round(calculateLeansBodyMass(weight, height, sex));

    result.innerHTML = lBM + ' Kg';
}

function calculateLeansBodyMass(weight, height, sex){
   // let abdomenCircunference = parseInt(document.getElementById('abdomenCircunference').value);
  //  let hipCircunference = parseInt(document.getElementById('hipCircunference').value);
   // let neckCircunference = parseInt(document.getElementById('neckCircunference').value);

   // let MASSAGRASSA = hipCircunference + abdomenCircunference - height;
  
    if(sex == 'male'){
        lBM = (1.10 * weight) - (128 * (weight * weight) / (height * height));
    }else if(sex == 'female'){
        lBM = (1.07 * weight) - (148 * (weight * weight) / (height * height));
    }else{
        alert("Please fill the form with correct information");
    }
    return lBM;
}

function fillLeansData(){
    let leansDiv = document.getElementById('leansDiv');
    let weight = body[0];
    let height = body[1];
    let sex = body[3];

    leansDiv.innerHTML = `
    <p>
    <label>Weight</label><br/>
    <input type="text" placeholder="${weight}" disabled/>
    </p>
    <p>
    <label>Hight</label><br/>
    <input type="text" placeholder="${height}" disabled/>
    </p>
    <p>
    <label>Sex</label><br/>
    <input type="text" value="${sex}" disabled/>
    </p> 
    `;
}


/*

MASSA GRASSA

 <p>
    <label>Abdomen Circunference</label><br/>
    <input type="number placeholder="cm" id="abdomenCircunference"/>
    </p>
    <p>
    <label>Hip Circunference</label><be/>
    <input type="number" value="cm" id="abdomenCircunference" />
    </p>
    <p>
    <label>Neck Circunference</label><be/>
    <input type="number" value="cm" id="neckCircunference" />
    </p>

*/