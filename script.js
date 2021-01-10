// create images elements
var one       = document.createElement('img'),
    two       = document.createElement('img'),
    three     = document.createElement('img'),
    four      = document.createElement('img'),
    five      = document.createElement('img'),
    six       = document.createElement('img'),
    seven     = document.createElement('img'),
    eight     = document.createElement('img'),
    nine      = document.createElement('img'),
    ten       = document.createElement('img'),
    eleven    = document.createElement('img'),
    twelve    = document.createElement('img'),
    thirteen  = document.createElement('img'),
    fourteen  = document.createElement('img'),
    fifteen   = document.createElement('img'),
    sixteen   = document.createElement('img'),
// get IDs
    content       = document.getElementById('content'),
    options       = document.getElementById('options'),
    matchAudio    = document.getElementById('match-audio'),
    congratsAudio = document.getElementById('congrats-audio'),
    shokeAudio    = document.getElementById('shoke-audio'),
    reset         = document.getElementById('reset');
// get classes
    getMainCard  = document.getElementsByClassName('main-card'),
    getInnerCard = document.getElementsByClassName('inner-card'),
    getFrontCard = document.getElementsByClassName('front-card'),
    getBackCard  = document.getElementsByClassName('back-card'),
    selected     = document.getElementsByClassName('selected'),
    faStarO      = document.getElementsByClassName('fa-star-o'),
    fa           = document.getElementsByClassName('fa'),
    img = document.getElementsByTagName('img'),
    // myimagesArray = [one, two, three, four];
    myimagesArray = [one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen];
    // level 0 images
    one.src     = 'images/level0/car.jpg';
    two.src     = 'images/level0/car.jpg';
    three.src   = 'images/level0/palm.png';
    four.src    = 'images/level0/palm.png';
    five.src    = 'images/level0/flower.png';
    six.src     = 'images/level0/flower.png';
    seven.src   = 'images/level0/study.png';
    eight.src   = 'images/level0/study.png';
    nine.src    = 'images/level0/banana.jpg';
    ten.src     = 'images/level0/banana.jpg';
    eleven.src  = 'images/level0/apple.jpg';
    twelve.src  = 'images/level0/apple.jpg';
    thirteen.src= 'images/level0/pc.jpg';
    fourteen.src= 'images/level0/pc.jpg';
    fifteen.src = 'images/level0/umbrella.PNG';
    sixteen.src = 'images/level0/umbrella.PNG';

// shuffle images
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
shuffleArray(myimagesArray);

// create boxes for cards
function createBoxes() {
    for (var i = 0; i < myimagesArray.length; i++) {
        var mainCard = document.createElement('div'),
        innerCard = document.createElement('div'),
        frontCard = document.createElement('div'),
        backCard = document.createElement('div');
        mainCard.className = 'main-card';
        innerCard.className = 'inner-card';
        frontCard.className = 'front-card';
        backCard.className = 'back-card';
        content.append(mainCard);
        mainCard.append(innerCard);
        innerCard.append(frontCard, backCard);
        backCard.append(myimagesArray[i]);
    }
}
createBoxes();

// eye button
function eyeEffect(){
    intervalEye = setInterval(function(){
        for (var i = 0; i < getInnerCard.length; i++) {
            getInnerCard[i].style.webkitTransform = 'rotateY(360deg)';
        }
        document.getElementById('eyebtn').style.color = 'gray';
    }, 1000);
    timeEye = setTimeout(() => {
        for (var i = 0; i < getInnerCard.length; i++) {
            getInnerCard[i].style.webkitTransform = 'rotateY(180deg)';
        }
    }, 100);
    setInterval(function(){

        if(document.getElementById('eyebtn').style.color == 'gray'){
            document.getElementById('eyebtn').setAttribute('disabled', '');
            clearInterval(intervalEye);
        } else {
            document.getElementById('eyebtn').removeAttribute('disabled');
        }
    }, 200);
}

// lightning effect function
function lightning() {
    shokeAudio.play();
    var oneSrc = myimagesArray[0].src;
    setTimeout(() => {
        for (var i = 0; i < myimagesArray.length; i++) {
            if(myimagesArray[i].src === oneSrc) {
                myimagesArray[0].parentElement.parentElement.style.webkitTransform = 'rotateY(180deg)';
                myimagesArray[i].parentElement.parentElement.style.webkitTransform = 'rotateY(180deg)';
                setTimeout(() => {
                for (var i = 0; i < myimagesArray.length; i++) {
                    if(myimagesArray[i].src === oneSrc) {
                        myimagesArray[0].parentElement.parentElement.parentElement.classList.add('selected');
                        myimagesArray[i].parentElement.parentElement.parentElement.classList.add('selected');

                    }
                }
                }, 500);
                setTimeout(() => {
                    document.getElementById('lightning').style.color = 'gray';
                    setInterval(() => {
                        if(document.getElementById('lightning').style.color == 'gray'){
                            document.getElementById('lightning').setAttribute('disabled', '');
                        } else {
                            document.getElementById('lightning').removeAttribute('disabled');
                        }
                    }, 100);
                }, 700);
            }
        }
    }, 100);
    setTimeout(() => {
        selected[0].parentElement.removeChild(selected[0]);
        selected[0].parentElement.removeChild(selected[0]);
    }, 1000);
}

// function to hide over after win or lose
function overHide(){
    document.getElementById('over').onclick = function() {
        startGame();
        this.style.display = 'none';
        document.getElementById('congrat').style.display = 'none';
        document.getElementById('shoke-audio').src       = 'sounds/shoke.mp3';
    }
}
overHide();

// show and hide effects button according to the level
function eyeAndLightning() {
    setInterval(() => {
        if(level < 1) {
            document.getElementById('eyebtn').style.visibility = 'hidden';
        } else {
            document.getElementById('eyebtn').style.visibility = 'visible';
        }
    }, 50);
    
    setInterval(() => {
        if(level < 2) {
            document.getElementById('lightning').style.visibility = 'hidden';
        } else {
            document.getElementById('lightning').style.visibility = 'visible';
        }
    }, 50);
}
eyeAndLightning();

// change stars color according to the level
var level = 0;
function congratulations() {
    interval = setInterval(function(){
        document.getElementById('time').innerHTML = time;
        if(img.length == 6) {
            congratsAudio.play();
            level += 1;
            clearInterval(interval);
            clearInterval(intervalTime);
            document.getElementById('eyebtn').style.color    = '#9c27b0';
            document.getElementById('lightning').style.color = '#9c27b0';
            document.getElementById('over').style.display    = 'block';
            document.getElementById('congrat').style.display = 'block';
            if(level == 1) {
                createBoxes();
                levelImages();
                document.getElementById('levelOne').children[0].classList.replace('fa-star-o', 'fa-star');
                document.getElementById('levelOne').children[0].style.color = 'gold';
            }
            if(level == 2) {
                for (var i = 0; i < 2; i++) {
                    document.getElementById('levelTwo').children[i].classList.replace('fa-star-o', 'fa-star');
                    document.getElementById('levelTwo').children[i].style.color = 'gold';
                }
            }
            if(level == 3) {
                for (var i = 0; i < 3; i++) {
                    document.getElementById('levelThree').children[i].classList.replace('fa-star-o', 'fa-star');
                    document.getElementById('levelThree').children[i].style.color = 'gold';
                }
            }
            if(level == 4) {
                document.getElementById('medal').src = 'images/medal2.png';
            }
            if(level == 5){
                document.getElementById('trophy').children[0].style.color = 'gold';
                
                setTimeout(() => {
                    document.getElementsByClassName('fire-main')[0].style.visibility = 'visible';
                }, 300);

                setTimeout(() => {
                    document.getElementsByClassName('fire-main')[0].classList.add('fire-go');
                    
                }, 400);

                setTimeout(function() {
                    document.getElementById('over').style.display = 'block';
                    document.getElementById('congrat').style.display = 'block';
                    document.getElementById('over').onclick = function() {
                        startGame();
                        this.style.display = 'none';
                        document.getElementById('congrat').style.display = 'none';
                        document.getElementsByClassName('fire-main')[0].classList.remove('fire-go');
                        document.getElementsByClassName('fa-trophy')[0].style.color= 'gray';
                        document.getElementsByClassName('fire-main')[0].classList.remove('fire-go');
                    }
                }, 500)

                setTimeout(function(){
                    document.getElementById('medal').src = 'images/medal.png'
                    for (var i = 0; i < fa.length; i++) {
                        fa[i].classList.replace('fa-star', 'fa-star-o');
                    }
                    for (var i = 0; i < 7; i++) {
                        document.getElementsByClassName('fa-w')[i].style.color= 'gray';
                    }
                }, 1000);
            }
        }
    }, 50);
}
congratulations();

// time counting
function timeCounter() {
    time = 100;
    if(level == 1)
    {
        time = 70;
    }
    if(level == 2)
    {
        time = 50;
    }
    if(level == 3)
    {
        time = 30;
    }
    if(level == 4)
    {
        time = 25;
    }
    intervalTime = setInterval(function(){
        document.getElementById('time').innerHTML = time;
        time--;
        setInterval(() => {
            if(time == 0) {
                clearInterval(intervalTime);
                level = 0;
                document.getElementById('over').style.display     = 'block';
                document.getElementById('gameover').style.display = 'block';
                document.getElementById('medal').src              = 'images/medal.png';
                for (var i = 0; i < fa.length; i++) {
                    fa[i].classList.replace('fa-star', 'fa-star-o');
                }
                for (var i = 0; i < 7; i++) {
                    document.getElementsByClassName('fa-w')[i].style.color= 'gray';
                }
            }
        }, 100);
    }, 1000);
}
timeCounter();

// change face on click
function clicks() {
    one.parentElement.parentElement.parentElement.onclick = function() {
        this.classList.add('selected');
        one.parentElement.parentElement.style.webkitTransform = 'rotateY(180deg)';
        removeInMatch();
    }
    two.parentElement.parentElement.parentElement.onclick = function() {
        this.classList.add('selected');
        two.parentElement.parentElement.style.webkitTransform = 'rotateY(180deg)';
        removeInMatch();
    }
    three.parentElement.parentElement.parentElement.onclick = function() {
        this.classList.add('selected');
        three.parentElement.parentElement.style.webkitTransform = 'rotateY(180deg)';
        removeInMatch();
    }
    four.parentElement.parentElement.parentElement.onclick = function() {
        this.classList.add('selected');
        four.parentElement.parentElement.style.webkitTransform = 'rotateY(180deg)';
        removeInMatch();
    }
    five.parentElement.parentElement.parentElement.onclick = function() {
        this.classList.add('selected');
        five.parentElement.parentElement.style.webkitTransform = 'rotateY(180deg)';
        removeInMatch();
    }
    six.parentElement.parentElement.parentElement.onclick = function() {
        this.classList.add('selected');
        six.parentElement.parentElement.style.webkitTransform = 'rotateY(180deg)';
        removeInMatch();
    }
    seven.parentElement.parentElement.parentElement.onclick = function() {
        this.classList.add('selected');
        seven.parentElement.parentElement.style.webkitTransform = 'rotateY(180deg)';
        removeInMatch();
    }
    eight.parentElement.parentElement.parentElement.onclick = function() {
        this.classList.add('selected');
        eight.parentElement.parentElement.style.webkitTransform = 'rotateY(180deg)';
        removeInMatch();
    }
    nine.parentElement.parentElement.parentElement.onclick = function() {
        this.classList.add('selected');
        nine.parentElement.parentElement.style.webkitTransform = 'rotateY(180deg)';
        removeInMatch();
    }
    ten.parentElement.parentElement.parentElement.onclick = function() {
        this.classList.add('selected');
        ten.parentElement.parentElement.style.webkitTransform = 'rotateY(180deg)';
        removeInMatch();
    }
    eleven.parentElement.parentElement.parentElement.onclick = function() {
        this.classList.add('selected');
        eleven.parentElement.parentElement.style.webkitTransform = 'rotateY(180deg)';
        removeInMatch();
    }
    twelve.parentElement.parentElement.parentElement.onclick = function() {
        this.classList.add('selected');
        twelve.parentElement.parentElement.style.webkitTransform = 'rotateY(180deg)';
        removeInMatch();
    }
    thirteen.parentElement.parentElement.parentElement.onclick = function() {
        this.classList.add('selected');
        thirteen.parentElement.parentElement.style.webkitTransform = 'rotateY(180deg)';
        removeInMatch();
    }
    fourteen.parentElement.parentElement.parentElement.onclick = function() {
        this.classList.add('selected');
        fourteen.parentElement.parentElement.style.webkitTransform = 'rotateY(180deg)';
        removeInMatch();
    }
    fifteen.parentElement.parentElement.parentElement.onclick = function() {
        this.classList.add('selected');
        fifteen.parentElement.parentElement.style.webkitTransform = 'rotateY(180deg)';
        removeInMatch();
    }
    sixteen.parentElement.parentElement.parentElement.onclick = function() {
        this.classList.add('selected');
        sixteen.parentElement.parentElement.style.webkitTransform = 'rotateY(180deg)';
        removeInMatch();
    }
}
clicks();

// check if 2 cards matching
function removeInMatch(selected) {
    var selected = document.getElementsByClassName('selected'),
        selected1 = selected[0].children[0].children[1].children[0].src,
        selected2 = selected[1].children[0].children[1].children[0].src;
    if(selected.length == 2 && selected1 === selected2){
        setTimeout(() => {
            if(selected.length == 2){
                while(selected.length > 0){
                    selected[0].parentElement.removeChild(selected[0]);
                    matchAudio.play();
                }
            }
        }, 600);
    } else {
        setTimeout(() => {
            for (var i = 0; i < selected.length; i++) {
                selected[i].children[0].style.webkitTransform = 'rotateY(360deg)';
            }
            for (var i = 0; i < selected.length; i++) {
                while(selected.length > 0){
                    selected[i].classList.remove('selected');
                }
            }
        }, 350);
    }
}
removeInMatch('selected');

// change images according to level
function levelImages() {
    setInterval(() => {
        if(level == 1) {
            one.src     = 'images/level1/bird.png';
            two.src     = 'images/level1/bird.png';
            three.src   = 'images/level1/camel.png';
            four.src    = 'images/level1/camel.png';
            five.src    = 'images/level1/cup.png';
            six.src     = 'images/level1/cup.png';
            seven.src   = 'images/level1/cycle.png';
            eight.src   = 'images/level1/cycle.png';
            nine.src    = 'images/level1/elephant.png';
            ten.src     = 'images/level1/elephant.png';
            eleven.src  = 'images/level1/fish.png';
            twelve.src  = 'images/level1/fish.png';
            thirteen.src= 'images/level1/loader.jpg';
            fourteen.src= 'images/level1/loader.jpg';
            fifteen.src = 'images/level1/plane.png';
            sixteen.src = 'images/level1/plane.png';
        }
        if(level == 2) {
            one.src     = 'images/level2/colors.png';
            two.src     = 'images/level2/colors.png';
            three.src   = 'images/level2/eye.jpg';
            four.src    = 'images/level2/eye.jpg';
            five.src    = 'images/level2/flag.jpg';
            six.src     = 'images/level2/flag.jpg';
            seven.src   = 'images/level2/fridge.png';
            eight.src   = 'images/level2/fridge.png';
            nine.src    = 'images/level2/hat.jpg';
            ten.src     = 'images/level2/hat.jpg';
            eleven.src  = 'images/level2/horse.png';
            twelve.src  = 'images/level2/horse.png';
            thirteen.src= 'images/level2/train.jpg';
            fourteen.src= 'images/level2/train.jpg';
            fifteen.src = 'images/level2/watch.jpg';
            sixteen.src = 'images/level2/watch.jpg';
        }
        if(level == 3) {
            one.src     = 'images/level3/bear.jpg';
            two.src     = 'images/level3/bear.jpg';
            three.src   = 'images/level3/chair.png';
            four.src    = 'images/level3/chair.png';
            five.src    = 'images/level3/phone.jpg';
            six.src     = 'images/level3/phone.jpg';
            seven.src   = 'images/level3/table.png';
            eight.src   = 'images/level3/table.png';
            nine.src    = 'images/level3/tele.jpg';
            ten.src     = 'images/level3/tele.jpg';
            eleven.src  = 'images/level3/twitter.png';
            twelve.src  = 'images/level3/twitter.png';
            thirteen.src= 'images/level3/whats.png';
            fourteen.src= 'images/level3/whats.png';
            fifteen.src = 'images/level3/wolf.png';
            sixteen.src = 'images/level3/wolf.png';
        }
        if(level == 4) {
            one.src     = 'images/level4/android.png';
            two.src     = 'images/level4/android.png';
            three.src   = 'images/level4/camera.png';
            four.src    = 'images/level4/camera.png';
            five.src    = 'images/level4/dog.png';
            six.src     = 'images/level4/dog.png';
            seven.src   = 'images/level4/radio.png';
            eight.src   = 'images/level4/radio.png';
            nine.src    = 'images/level4/fan.png';
            ten.src     = 'images/level4/fan.png';
            eleven.src  = 'images/level4/faucet.png';
            twelve.src  = 'images/level4/faucet.png';
            thirteen.src= 'images/level4/moon.png';
            fourteen.src= 'images/level4/moon.png';
            fifteen.src = 'images/level4/motocycle.jpg';
            sixteen.src = 'images/level4/motocycle.jpg';
        }
    }, 100);
}

//reset button
function startGame() {
    if(level == 5){
        level = level - 5;
    }
    content.innerHTML = '';
    document.getElementById('over').style.display     = 'none';
    document.getElementById('gameover').style.display = 'none';
    document.getElementById('congrat').style.display  = 'none';
    timeCounter();
    shuffleArray(myimagesArray);
    createBoxes();
    clicks();
    congratulations();
}

