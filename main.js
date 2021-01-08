let body = [];

// Calculate Body Mass
function bodyMass() {
  let weight = parseInt(document.getElementById("weight").value);
  let height = parseInt(document.getElementById("height").value);
  let result = document.getElementById("result");

  let imc = Math.round((weight / (height * height)) * 10000);

  body.push(weight);
  body.push(height);
  body.push(imc);

  result.innerHTML = imc + " BM";
}

//  Basal Metabolism
function basalMetabolism() {
  let age = parseInt(document.getElementById("age").value);
  let sex = document.querySelector("input[name=sex]:checked").value;
  let result = document.getElementById("resultBm");

  let bM = calculateBasalMetabolism(age, sex);

  body.push(age);
  body.push(sex);
  body.push(bM);

  result.innerHTML = bM + " KCal";

  fillLeansData();
}

function calculateBasalMetabolism(age, sex) {
  let weight = body[0];
  let height = body[1];
  let bM;
  if (sex == "male") {
    bM = 10 * weight + 6.5 * height - 5 * age + 5;
  } else if (sex == "female") {
    bM = 10 * weight + 6.5 * height - 5 * age - 161;
  } else {
    alert("Please fill the form with correct information");
  }
  return bM;
}

// Daily Caloric Needs
function dailyCaloricNeeds() {
  let select = document.getElementById("selectLifeStyle");
  let result = document.getElementById("resultdCN");
  let lifeStyle = select.value;
  let weight = body[0] * 2.2;
  let sex = body[4];
  let dCN = calculateCaloricNeeds(lifeStyle, weight, sex);

  body.push(lifeStyle);
  body.push(dCN);

  result.innerHTML = dCN + " KCal";
}

function calculateCaloricNeeds(lifeStyle, weight, sex) {
  let dCN;
  if (lifeStyle == "easy" && sex == "male") {
    dCN = weight * 11;
  } else if (lifeStyle == "easy" && sex == "female") {
    dCN = weight * 10;
  } else if (lifeStyle == "medium" && sex == "male") {
    dCN = weight * 13;
  } else if (lifeStyle == "medium" && sex == "female") {
    dCN = weight * 12;
  } else if (lifeStyle == "hard" && sex == "male") {
    dCN = weight * 19;
  } else if (lifeStyle == "hard" && sex == "female") {
    dCN = weight * 18;
  } else {
    alert("Please fill the form with correct information");
  }
  return dCN;
}

// Calculate Leans Body Mass
function leanBodyMass() {
  let result = document.getElementById("resultLBM");
  let weight = body[0];
  let height = body[1];
  let sex = body[4];
  let lBM = Math.round(calculateLeansBodyMass(weight, height, sex));

  result.innerHTML = lBM + " Kg";

  fillFatBodyMassData()
}

function calculateLeansBodyMass(weight, height, sex) {
  // let abdomenCircunference = parseInt(document.getElementById('abdomenCircunference').value);
  //  let hipCircunference = parseInt(document.getElementById('hipCircunference').value);
  // let neckCircunference = parseInt(document.getElementById('neckCircunference').value);

  // let MASSAGRASSA = hipCircunference + abdomenCircunference - height;

  if (sex == "male") {
    lBM = 1.1 * weight - (128 * (weight * weight)) / (height * height);
  } else if (sex == "female") {
    lBM = 1.07 * weight - (148 * (weight * weight)) / (height * height);
  } else {
    alert("Please fill the form with correct information");
  }
  return lBM;
}

function fillLeansData() {
  let leansDiv = document.getElementById("leansDiv");
  let weight = body[0];
  let height = body[1];
  let sex = body[4];

  leansDiv.innerHTML = `
    <p>
    <label>Weight</label><br/>
    <input type="text" placeholder="${weight}" disabled/>
    </p>
    <p>
    <label>Height</label><br/>
    <input type="text" placeholder="${height}" disabled/>
    </p>
    <p>
    <label>Sex</label><br/>
    <input type="text" value="${sex}" disabled/>
    </p> 
    `;
}

// Fat Body Mass
function fatBodyMass() {
  /*
  let abdomenCircunference = parseInt(document.getElementById("abdomenCircunference").value);
  let hipCircunference = parseInt(document.getElementById("hipCircunference").value);
  let height = body[1];
  */
  let sex = body[4];
  let imc = body[2];
  let age = body[3];
  let result = document.getElementById("resultFBM");
  let fBM = Math.round(calculateFatBodyMass(sex, imc, age));
  let message = "";

  if ((sex == "male" && fBM <= 3) || (sex == "female" && fBM <= 11)) {
    message = "Excessive thinness";
  } else if ((sex == "male" && fBM <= 13) || (sex == "female" && fBM <= 20)) {
    message = "Athletic body";
  } else if ((sex == "male" && fBM <= 17) || (sex == "female" && fBM <= 24)) {
    message = "Active body";
  } else if ((sex == "male" && fBM <= 24) || (sex == "female" && fBM <= 31)) {
    message = "In the norm";
  } else if ((sex == "male" && fBM >= 25) || (sex == "female" && fBM >= 32)) {
    message = "Obesity state";
  }

  result.innerHTML = fBM + "% - " + message;
}

function calculateFatBodyMass(sex, imc, age) {
  let fBM;
  if (sex == "male") {
    fBM = 1.61 * imc + 0.13 * age - 12.1 * 1 - 13.9;
  } else if (sex == "female") {
    fBM = 1.61 * imc + 0.13 * age - 12.1 * 0 - 13.9;
  } else {
    alert("Please fill the form with correct information");
  }
  return fBM;
}

function fillFatBodyMassData() {
    let heightFatData = document.getElementById("heightFatData");
    let imc = body[2];
    let age = body[3];
    let sex = body[4];
  
    heightFatData.innerHTML = `
      <p>
      <label>Age</label><br/>
      <input type="text" placeholder="${age}" disabled/>
      </p>
      <p>
      <label>Sex</label><br/>
      <input type="text" placeholder="${sex}" disabled/>
      </p>
      <p>
      <label>Imc</label><br/>
      <input type="text" value="${imc}" disabled/>
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
