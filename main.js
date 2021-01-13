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

  body.push(lBM);
  fillFatBodyMassData();
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

  body.push(fBM);
  body.push(message);
  fillWaterBodyBalanceData();
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

// Body Water Balance
function waterBalance() {
  let weight = body[0];
  let result = document.getElementById("resultWater");
  let wBB = (weight / 100) * 60;

  result.innerHTML = wBB + "L";

  body.push(wBB);
  fillBodyBoneMassData();
}

function fillWaterBodyBalanceData() {
  let weight = body[0];
  let heightFatData = document.getElementById("waterDiv");

  heightFatData.innerHTML = `
      <p>
      <label>Weight</label><br/>
      <input type="text" placeholder="${weight}" disabled/>
      </p>
      `;
}

// Body Bone Mass
function bodyBoneMass() {
  let weight = body[0];
  let result = document.getElementById("resultBone");
  let bBM = Math.round((weight / 100) * 3 * 100) / 100;

  result.innerHTML = bBM + "Kg";

  body.push(bBM);
}

function fillBodyBoneMassData() {
  let weight = body[0];
  let bodyBoneData = document.getElementById("boneDiv");

  bodyBoneData.innerHTML = `
        <p>
        <label>Weight</label><br/>
        <input type="text" placeholder="${weight}" disabled/>
        </p>
        `;
}

// Zodiac Sign
function zodiacSign() {
  let month = document.getElementById("month").value;
  let day = document.getElementById("day").value;
  let result = document.getElementById("resultSign");
  let sign = calculateZodiacSign(month, day);

  result.innerHTML = sign;
  body.push(sign);
}

function calculateZodiacSign(month, day) {
  if ((day <= 19 && month == 1) || (day >= 22 && month == 12)) {
    sign = "Capricorn";
  } else if ((day > 19 && month == 1) || (day <= 19 && month == 2)) {
    sign = "Aquarium";
  } else if ((day >= 20 && month == 2) || (day <= 20 && month == 3)) {
    sign = "Pez";
  } else if ((day > 20 && month == 3) || (day <= 20 && month == 4)) {
    sign = "Aries";
  } else if ((day > 21 && month == 4) || (day <= 20 && month == 5)) {
    sign = "Taurus";
  } else if ((day > 20 && month == 5) || (day <= 21 && month == 6)) {
    sign = "Gemini";
  } else if ((day > 21 && month == 6) || (day <= 22 && month == 7)) {
    sign = "Cancer";
  } else if ((day > 22 && month == 7) || (day <= 22 && month == 8)) {
    sign = "Leo";
  } else if ((day > 22 && month == 8) || (day <= 23 && month == 9)) {
    sign = "Virgo";
  } else if ((day > 23 && month == 9) || (day <= 22 && month == 10)) {
    sign = "Libra";
  } else if ((day > 22 && month == 10) || (day <= 22 && month == 11)) {
    sign = "Escorpio";
  } else if ((day > 22 && month == 11) || (day <= 21 && month == 12)) {
    zodiacSimbol = "Sagittarius";
  } else {
    alert("Please fill the form with correct information");
  }
  return sign;
}

// Happiness
function happiness() {
  let happyVal = parseInt(document.getElementById("happyVal").value);
  let happyRes;
  let result = document.getElementById("resultHappiness");

  switch (happyVal) {
    case 1:
    case 2:
    case 3:
    case 4:
      happyRes = "You don't like your life, something must to change.";
      break;
    case 5:
      happyRes = "You are dissatisfied but with a little effort you can improve your well-being.";
      break;
    case 6:
    case 7:
      happyRes = "Are you basically satisfied with your life.";
      break;
    case 8:
      happyRes = "You are a happy person.";
      break;
    case 9:
      happyRes = "You are a happy and satisfied person, life suits you very well.";
      break;
    case 10: 
    happyRes = "You are a happy and satisfied person, life could not have been better for you. Keep it up!"
      break;
    default: 
    alert("Please fill the form with correct information");
        }

    result.innerHTML = happyRes;
    body.push(happyRes);
}

// Body Status Value
function getBodyValue() {
  let result = document.getElementById("resultBodyStatus");

  result.innerHTML = `
  <div id="bodyStatusResult">
  <p>Your sex is: ${body[4]}</p>
  <p>Your age is: ${body[3]}</p>
  <p>Your zodiac sign is: ${body[13]}</p>
  <p>Your weight is: ${body[0]} Kg</p>
  <p>Your height is: ${body[1]} cm</p>
  <p>Your body mass is: ${body[2]}</p>
  <p>Your basal metabolism is: ${body[5]} KCal</p>
  <p>Your daily caloric need is: ${body[7]} Kcal</p>
  <p>Your lean body mass is: ${body[8]} Kg</p>
  <p>Your fat body mass is: ${body[9]} %. ${body[10]}</p>
  <p>Your body water balance is: ${body[11]} l</p>
  <p>Your body bone mass is: ${body[12]} Kg</p>
  <p>The intensity of your lifestyle activity is: ${body[6]}</p>
  <p>Your happiness is: ${body[6]}</p>
  </div>`;
}
