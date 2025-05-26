const typingText = document.querySelector(".typing-text");
const inputField = document.querySelector(".input-field");
const time = document.querySelector(".time");
const mistakes = document.querySelector(".mistakes");
const wpm = document.querySelector(".wpm");
const cpm = document.querySelector(".cpm");
const button = document.querySelector(".btn");

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

document.addEventListener('DOMContentLoaded', loadParagraph);

document.addEventListener('keydown', () => inputField.focus());

typingText.addEventListener('click', () => inputField.focus());

inputField.addEventListener("input", initTyping);

button.addEventListener("click", reset);

function loadParagraph() {
    const paragraph = [
        "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet and is commonly used for typing practice. Regular practice with such sentences helps improve both speed and accuracy in typing.",
        "Technology has revolutionized the way we communicate, work, and live our daily lives. From smartphones to artificial intelligence, innovation continues to shape our future in ways we never imagined possible. The digital age has brought unprecedented connectivity and opportunities.",
        "Reading books is one of the most enriching activities that can expand your knowledge, improve your vocabulary, and transport you to different worlds. Whether fiction or non-fiction, books offer insights into human nature, history, science, and countless other subjects that broaden our understanding.",
        "Climate change represents one of the most pressing challenges of our time, requiring immediate action from governments, businesses, and individuals worldwide. Rising temperatures, melting ice caps, and extreme weather patterns demand sustainable solutions and environmental consciousness from every person on Earth.",
        "The art of cooking brings people together across cultures and generations, creating memories and traditions that last a lifetime. From simple home-cooked meals to elaborate feasts, food serves as a universal language that expresses love, creativity, and cultural heritage in every dish prepared with care.",
        "Space exploration continues to fascinate humanity as we reach for the stars and seek to understand our place in the vast universe. Missions to Mars, discoveries of exoplanets, and advances in rocket technology bring us closer to becoming an interplanetary species while inspiring future generations of explorers.",
        "Education is the foundation upon which we build our future, empowering individuals with knowledge, critical thinking skills, and the ability to solve complex problems. Quality education opens doors to opportunities, promotes equality, and drives innovation that benefits society as a whole through continuous learning and growth.",
        "Music has the power to evoke emotions, bring people together, and transcend cultural boundaries in ways that words alone cannot achieve. From classical symphonies to modern pop songs, musical expression reflects the human experience and serves as a soundtrack to our most important moments and memories.",
        "The ocean covers more than seventy percent of our planet's surface and remains one of the least explored frontiers on Earth. Marine ecosystems support incredible biodiversity, regulate our climate, and provide resources that sustain billions of people while holding secrets that scientists are only beginning to understand.",
        "Entrepreneurship drives economic growth and innovation by encouraging individuals to take risks, create new products and services, and solve problems in creative ways. Successful entrepreneurs often combine passion with persistence, turning ideas into reality while creating jobs and opportunities for others in their communities."
    ];
    const randomIndex = Math.floor(Math.random() * paragraph.length);
    typingText.innerHTML = "";
    
    for (const char of paragraph[randomIndex]) {
        console.log(char);
        typingText.innerHTML += `<span>${char}</span>`;
    }
    
    typingText.querySelectorAll('span')[0].classList.add('active');
}

function initTyping() {
    const char = typingText.querySelectorAll('span');
    const typedChar = inputField.value.charAt(charIndex);
    
    // Start timer when user begins typing
    if (!isTyping) {
        timer = setInterval(initTime, 1000);
        isTyping = true;
    }
    
    if (charIndex < char.length && timeLeft > 0) {
        if (char[charIndex].innerText == typedChar) {
            char[charIndex].classList.add('correct');
        } else {
            char[charIndex].classList.add('incorrect');
            mistake++;
        }
        charIndex++;
        
        // Remove active class from previous character and add to current
        char.forEach(span => span.classList.remove('active'));
        if (charIndex < char.length) {
            char[charIndex].classList.add('active');
        }
        
        mistakes.querySelector('span').innerText = mistake;
        
        // Calculate and update CPM and WPM
        let cpmValue = charIndex - mistake;
        let wpmValue = Math.round(((charIndex - mistake) / 5) / ((maxTime - timeLeft) / 60));
        
        cpm.querySelector('span').innerText = cpmValue >= 0 ? cpmValue : 0;
        wpm.querySelector('span').innerText = wpmValue >= 0 ? wpmValue : 0;
        
        // Check if paragraph is completed
        if (charIndex >= char.length) {
            clearInterval(timer);
            inputField.disabled = true;
        }
    } else {
        clearInterval(timer);
        inputField.disabled = true;
    }
}

function initTime() {
    if (timeLeft > 0) {
        timeLeft--;
        time.querySelector('span b').innerText = timeLeft;
        
        // Calculate final WPM and CPM when time runs out
        let cpmValue = charIndex - mistake;
        let wpmValue = Math.round(((charIndex - mistake) / 5) / ((maxTime - timeLeft) / 60));
        
        cpm.querySelector('span').innerText = cpmValue >= 0 ? cpmValue : 0;
        wpm.querySelector('span').innerText = wpmValue >= 0 ? wpmValue : 0;
    } else {
        clearInterval(timer);
        inputField.disabled = true;
    }
}

function reset() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    wpm.querySelector('span').innerText = 0;
    cpm.querySelector('span').innerText = 0;
    mistakes.querySelector('span').innerText = 0;
    time.querySelector('span b').innerText = timeLeft;
    inputField.value = "";
    inputField.disabled = false;
}
