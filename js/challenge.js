let paused = false;
let cancel; // used to stop timer with clearInterval
let likes = {}; // keys are the timer numbers, values are the number of likes

//event listeners for buttons and input field
document.getElementById('minus').addEventListener('click', () => {if (!paused) document.getElementById('counter').innerText--}) //directly editing counter text in an anonymous callback
document.getElementById('plus').addEventListener('click', () => {if (!paused) document.getElementById('counter').innerText++})
document.getElementById('heart').addEventListener('click', heart)
document.getElementById('pause').addEventListener('click', pause)
document.getElementById('submit').type = 'button'; //disables the "submit" function of the button.  Otherwise it refreshes the page
document.getElementById('submit').addEventListener('click', submit)
document.getElementById("comment-input").addEventListener('keydown', enter) //allows you to press enter instead of the submit button

cancel = setInterval(timer,1000);
function timer(){
    document.getElementById('counter').innerText++;
}

function heart(){
    if (!paused){
        key = document.getElementById('counter').innerText;
        if (key in likes){ //triggers after the else if a number is liked more than once
        likes[key] += 1; //increases the number of likes
            if (key === "42"){//just being dumb
                document.getElementById(key).innerText = `The answer to life, the universe and everything was liked ${likes[key]} times`;
                    if (likes[key] === 42)
                    document.querySelector('body').classList.add('party'); //really dumb :D
            }
            else{
                document.getElementById(key).innerText = `${key} was liked ${likes[key]} times`; //finds the li that was created in the else below.
            }
        }
        else { //this triggers before the if
            likes[key] = 1; //adds a new key/value to the likes object
            if (key === "42"){
                document.querySelector('ul.likes').innerHTML += `<li id = "${key}">The answer to life, the universe and everything was liked 1 time</li>`;
            }
            else {
                document.querySelector('ul.likes').innerHTML += `<li id = "${key}">${key} was liked 1 time</li>`; //creates a li as a child of the ul with an id matching the likes key
            }
        }
    }
}

function pause(event){
    if (!paused) { //starting state
        paused = true; //flips pause
        clearInterval(cancel); //cancels timer
        document.getElementById('minus').disabled = true; //disables all buttons
        document.getElementById('plus').disabled = true;
        document.getElementById('heart').disabled = true;
        document.getElementById('submit').disabled = true;
        event.target.innerText = "resume"; //changes pause button text/
    }
    else {
        paused = false;
        cancel = setInterval(timer,1000) //restarts the timer
        document.getElementById('minus').disabled = false;
        document.getElementById('plus').disabled = false;
        document.getElementById('heart').disabled = false;
        document.getElementById('submit').disabled = false;
        event.target.innerText = "pause";
    }
}

function submit(){
    document.getElementById('list').innerText += document.getElementById('comment-input').value + "\n\n"; //directly adds text in comment text box to the comments div.
    document.getElementById('comment-input').value = ''; //clears text box
}

function enter(e){
    if (e.which === 13){ //*apparently* better than keyCode?  Either way, 13 is the enter key.
        e.preventDefault(); //prevents default form submission which refreshes the page
        if (!paused){
        submit(); //triggers submit only if not paused
        }
    }
}