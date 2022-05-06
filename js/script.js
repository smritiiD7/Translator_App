 const fromText = document.querySelector(".from-text");
 const toText = document.querySelector(".to-text");

const selectTag = document.querySelectorAll("select");
const exchangeIcon = document.querySelector(".exchange")
const translateBtn = document.querySelector("button");
icons = document.querySelectorAll(".icons i");


selectTag.forEach((tag,id) =>{
  for(const country_code in countries){
 //console.log(countries[country_code]);
 //selecting english by default as FROM language and Hindi as TO language
 let selected;
if(id == 0 && country_code=='en-GB'){
  selected = "selected"
}
else if(id==1 && country_code == 'hi-IN'){
  selected = "selected";
}
 let option = `<option value="${country_code}"${selected}>${countries[country_code]}</option>`;
 tag.insertAdjacentHTML("beforeend",option)//adding option tag inside select tag
  }
});



exchangeIcon.addEventListener("click", ()=>{ //SWAP KAR RAHE
  let tempText = fromText.value;
  tempLang = selectTag[0].value;
  fromText.value = toText.value;
  selectTag[0].value = selectTag[1].value;
  toText.value = tempText;
 selectTag[1].value = tempLang;
  
})

translateBtn.addEventListener("click",()=>{
let text = fromText.value,
translateFrom = selectTag[0].value, //getting from select tagvalue
translateTo = selectTag[1].value;
//console.log(text, translateFrom, tranlateTo);
if(!text) return;
toText.setAttribute("placeholder","Translating...please wait")
let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`; //api fetch
//fetching api response and returning it with parsing into js object
//and in another method rescevingg the object
fetch(apiUrl).then(res=>res.json()).then(data=>{
  //console.log(data);
  toText.value= data.responseData.translatedText;
  toText.setAttribute("placeholder","Translation")
});
});

icons.forEach(icon =>{
  icon.addEventListener("click", ({target})=>{
   // console.log(target);
   if(target.classList.contains("fa-copy")){
     if(target.id == "from"){
     //console.log("From copy icon click hua hai iska matlab");}
     navigator.clipboard.writeText(fromText.value); 
     }
     else {
     //console.log("To copy icon click hua hai");
     navigator.clipboard.writeText(toText.value); 
     }
   }
   else{
    // console.log("Speech icon click hua!!");
    let utterance ;
    if(target.id == "from"){
      utterance = new SpeechSynthesisUtterance(fromText.value);
      utterance.lang = selectTag[0].value;//setting utterance language to fromSelect tag value
      }
      else {
        utterance = new SpeechSynthesisUtterance(toText.value);
        utterance.lang = selectTag[1].value;////setting utterance language to toSelect tag value
      }
      speechSynthesis.speak(utterance) //speak the passed utterence
   }
  });
});


