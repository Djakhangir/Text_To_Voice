//Working with SpeechSynthesis API comes with most of the modern browsers. 
//Here I will try to do opposite of Voice-To-Text like in speech reognition, here is Text-To-Voice;


                    //Basically this is our pronunciation which brings the (speed, pitch, what & language) the voice says
const msg = new SpeechSynthesisUtterance(); 
                    //empty array where our voice are going to be inputted;
let voice=[];   
                    //All the classes and elements we would like to use 
const voiceDropdown=document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
                    //to make the text in text area be default text on page load
msg.text = document.querySelector('[name="text"]').value;

                                        //on Page Load
                    //create function which will populate the voices;
function populateVoices(){
    //will trigger all voices and names available on the machine (IOS/Windows);
voices = this.getVoices();  

    //loop and set voices and languages inside our options tag to be available to select

    //To Bring it to the DOM
voiceDropdown.innerHTML=voices
        //In case we want to filter to only english speaking voices
//.filter(voice => voice.lang.includes('en'))
.map(voice => `<option value = "${voice.name}">${voice.name} (${voice.lang})</option>`).join(''); 
}

                //Funtion that allows us to change the voices available in dropdown menu
function setVoice(){
    //setting the voice on change event added below which will trigger this function
    msg.voice = voices.find(voice => voice.name === this.value);
    toggle();
}

        //function which will restart everything on changed voice
function toggle(startOver = true){
            //To Stop speech;
    speechSynthesis.cancel(); 
    if (startOver) {
                //To start speech;
        speechSynthesis.speak(msg); 
    }          
}
//When any property changes and change to what in option tag it will trigger this function bound to the event listener
function setOption(){
    console.log(this,name, this.value);
    msg[this.name] = this.value;
    toggle();
}

    //Populate all the different voices by using the global variable in this case we have SpeechSynthesis besides Utterance;
        //we add the event listener to the global variable
speechSynthesis.addEventListener('voiceschanged', populateVoices);
voiceDropdown.addEventListener('change', setVoice);
                //Working with the text area, range and pitch-adding the event listener to trigger the function;
options.forEach(option=>option.addEventListener('change', setOption));

        //Adding the event to our buttons;
speakButton.addEventListener('click', toggle); 


stopButton.addEventListener('click', ()=>toggle(false)); 
 //--we cannot pass the argument to the function toggle it won't work, That is why we use arrow function to call it
 // the simple function after event and call toggle inside the function like:
                //stopButton.addEventListener('click', function(){
                    //toggle(false);
                    //)};       or we can use bind method and pass the value of THIS or call it in context of THIS object,
//in this case it is nothing and pass the argument like below:
                // stopButton.addEventListener('click', toggle.bind(null, false));         
    


