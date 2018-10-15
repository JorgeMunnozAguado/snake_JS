
var CantX;
var CantY;

function calculateCant() {

    CantX = Math.floor( window.innerWidth / 21 );
    CantY = Math.floor( window.innerHeight / 21 );
    
    CantX--;
    CantY--;
    
    for (var y = 0; y < CantY; y++) {
        
        var containerDiv = document.createElement('div');
        containerDiv.id = 'container' + y;
        containerDiv.className = 'container';
        document.getElementById('game').appendChild(containerDiv);
        
        for (var x = 0; x < CantX; x++) {
            
            var newDiv = document.createElement('div');
            newDiv.id = x + 'x' + y;
            newDiv.className = 'float';
            document.getElementById('container' + y).appendChild(newDiv);
        }
    }
    
    CantX--;
    CantY--;
    
    setInterval(nextPosition, 1000/15);
    setFood();
}

function Pice(posX, posY) {
    
    this.posX = posX;
    this.posY = posY;
}

//var pice = {posX: 0, posY: 0};
var pic = new Pice(0, 0);
var snake = {size: 1, pices: []};

var food = {posX: 0, posY: 0};

snake.pices.push(pic);
/*snake.pices.push(pice = {posX: 1, posY: 0});*/
document.getElementById(snake.pices[0].posX + 'x' + snake.pices[0].posY).classList.add('snake');


var keyEvent = "";

function handle(event) {

    keyEvent = event.key;
}

function nextPosition() {
    
    document.getElementById(snake.pices[snake.pices.length - 1].posX + 'x' + snake.pices[snake.pices.length - 1].posY).classList.remove('snake');
    
    for (i = snake.pices.length - 1; i > 0; i--) {
        
        snake.pices[i].posX = snake.pices[i - 1].posX;
        snake.pices[i].posY = snake.pices[i - 1].posY;
    }
    
    if (keyEvent == 'ArrowUp'){
        
        if (snake.pices[0].posY == 0) snake.pices[0].posY = CantY;
        else snake.pices[0].posY--;
        
    } else if (keyEvent == 'ArrowDown'){
        
        if (snake.pices[0].posY == CantY) snake.pices[0].posY = 0;
        else snake.pices[0].posY++;
        
    } else if (keyEvent == 'ArrowLeft'){
        
        if (snake.pices[0].posX == 0) snake.pices[0].posX = CantX;
        else snake.pices[0].posX--;
        
    } else if (keyEvent == 'ArrowRight'){
        
        if (snake.pices[0].posX == CantX) snake.pices[0].posX = 0;
        else snake.pices[0].posX++;
        
    } //else...
    
    document.getElementById(snake.pices[0].posX + 'x' + snake.pices[0].posY).classList.add('snake');
    
    rules();
}

function rules() {
    
    if ((snake.pices[0].posY == food.posY) && (snake.pices[0].posX == food.posX)) {
        
        var posX = snake.pices[snake.pices.length - 1].posX;
        var posY = snake.pices[snake.pices.length - 1].posY;
        
        var newPice = new Pice(posX, posY);
        
        posX = snake.pices[snake.pices.length - 1].posX;
        posY = snake.pices[snake.pices.length - 1].posY;
        
        snake.pices.push(newPice);
    }
}

function setFood() {
    
    var posX, posY; 
    var bool = true;
    
    while (bool) {
        
        posX = Math.floor((Math.random() * CantX));
        posY = Math.floor((Math.random() * CantY));
        
        bool = false;
        
        for (i = snake.pices.length - 1; i > 0; i--) {
            
            if (snake.pices[i].posX == posX) {
                
                bool = true;
                break;
                
            } else if (snake.pices[i].posY == posY) {
                
                bool = true;
                break;
            }
        }
    }
    
    food.posX = posX;
    food.posY = posY;
    
    document.getElementById(food.posX + 'x' + food.posY).classList.add('food');
}

