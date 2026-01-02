const BASE_URL="https://api.frankfurter.app/latest?amount=100&";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");

for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption=document.createElement(`option`);
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected=true;
        } else if(select.name==="to" && currCode==="INR"){
            newOption.selected=true;
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt)=>{
    updateFlag(evt.target);
});
}

const updateFlag= (element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector(`img`);
    img.src=newSrc;
}
let msg=document.querySelector("#msg");
msg.style.display="none";

let exIcon=document.querySelector("#exchangeIcon");
exIcon.addEventListener("click",()=>{
   let temp= fromCurr.value;
   fromCurr.value=toCurr.value;
   toCurr.value=temp;

   updateFlag(fromCurr);
   updateFlag(toCurr);
            
    })

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector('.amount');
    let amtValue=amount.value;
    if(amtValue==="" || amtValue<1){
        amtValue=1;
        amount.value=1;
    }
    const URL=`${BASE_URL}from=${fromCurr.value.toLowerCase()}&to=${toCurr.value.toLowerCase()}`;
    let response= await fetch(URL);
    let data= await response.json();
    let rate=data.rates[toCurr.value];
    console.log(rate);
    let convertedAmt = amtValue * (rate / 100);
    convertedAmt = convertedAmt.toFixed(2);
    console.log(convertedAmt);
    msg.style.display="flex";

    msg.innerText=`${fromCurr.value} ${amtValue} is ${toCurr.value} ${convertedAmt}`;
    }); 
