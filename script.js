// "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/inr/usd.json"

const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const button = document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const message=document.querySelector(".message");
const icon=document.querySelector(".dropdown i");

// for(let codes in countryList)
// {
//     console.log(codes);
// }

for (let select of dropdowns) {
    for (let code in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if (select.name === "from" && code === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name == "to" && code == "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (e) => {
        updateFlag(e.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    //console.log(currCode);
    let countryCode = countryList[currCode];
    //console.log(countryCode);
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

button.addEventListener("click", async (e) => {
    e.preventDefault();
    let amount = document.querySelector(".amount input");
    // console.log(amount);
    let amountVal = amount.value;
    //console.log(amountVal);

    if(amountVal==="" || amountVal<1)
    {
        amountVal=1;
        amount.value=1;
    }

    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();

    //console.log(data);

    let rate=data[toCurr.value.toLowerCase()];

    //console.log(rate);

    let finalAmount=amountVal * rate;
    message.innerText=`${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;


    
})

icon.addEventListener("click",(e)=>{
    e.preventDefault();
    let temp=fromCurr.value;
    fromCurr.value=toCurr.value;
    toCurr.value=temp;
    updateFlag(fromCurr);
    updateFlag(toCurr);
})

