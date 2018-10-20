
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
    
    
    document.getElementById(snake.pices[0].posX + 'x' + snake.pices[0].posY).classList.add('snake');
    setInterval(nextPosition, 1000/15);
    setFood();
}

function Pice(posX, posY) {
    
    this.posX = posX;
    this.posY = posY;
}

var pic = new Pice(0, 0);
var snake = {size: 1, pices: [], dir: 0};

var food = new Pice(0, 0);
var points = 0;

snake.pices.push(pic);

/**
 Directions of the snake:

    - 0 : not moving.
    - 1 : left
    - 2 : up
    - 3 : right
    - 4 : down

*/

var Directions = Object.freeze({"NOT_MOVING":0, "LEFT":1, "UP":2, "RIGHT":3, "DOWN":4})


var keyEvent = "";

function handle(event) {

    keyEvent = event.key;
    
    if (keyEvent == 'ArrowUp' && snake.dir == Directions.DOWN) snake.dir = Directions.DOWN;
    else if (keyEvent == 'ArrowDown' && snake.dir == Directions.UP) snake.dir = Directions.UP;
    else if (keyEvent == 'ArrowLeft' && snake.dir == Directions.RIGHT) snake.dir = Directions.RIGHT;
    else if (keyEvent == 'ArrowRight' && snake.dir == Directions.LEFT) snake.dir = Directions.LEFT;
    
    else if (keyEvent == 'ArrowUp') snake.dir = Directions.UP;
    else if (keyEvent == 'ArrowDown') snake.dir = Directions.DOWN;
    else if (keyEvent == 'ArrowLeft') snake.dir = Directions.LEFT;
    else if (keyEvent == 'ArrowRight') snake.dir = Directions.RIGHT;
}

function nextPosition() {
    
    document.getElementById(snake.pices[snake.pices.length - 1].posX + 'x' + snake.pices[snake.pices.length - 1].posY).classList.remove('snake');
    
    for (i = snake.pices.length - 1; i > 0; i--) {
        
        snake.pices[i].posX = snake.pices[i - 1].posX;
        snake.pices[i].posY = snake.pices[i - 1].posY;
    }
    
    if (snake.dir == Directions.UP) {
        
        if (snake.pices[0].posY == 0) snake.pices[0].posY = CantY;
        else snake.pices[0].posY--;
        
        snake.dir = Directions.UP;
        
    } else if (snake.dir == Directions.DOWN) {
        
        if (snake.pices[0].posY == CantY) snake.pices[0].posY = 0;
        else snake.pices[0].posY++;
                
        snake.dir = Directions.DOWN;
        
    } else if (snake.dir == Directions.LEFT) {
        
        if (snake.pices[0].posX == 0) snake.pices[0].posX = CantX;
        else snake.pices[0].posX--;
                
        snake.dir = Directions.LEFT;
     
    } else if (snake.dir == Directions.RIGHT) {
        
        if (snake.pices[0].posX == CantX) snake.pices[0].posX = 0;
        else snake.pices[0].posX++;
                
        snake.dir = Directions.RIGHT;
        
    }
    
    document.getElementById(snake.pices[0].posX + 'x' + snake.pices[0].posY).classList.add('snake');
    
    rules();
}

function rules() {
    
    for (i = snake.pices.length - 1; i > 0; i--) {
        
        if ((snake.pices[0].posY == snake.pices[i].posY) && (snake.pices[0].posX == snake.pices[i].posX)) {
            
            for (i = snake.pices.length - 1; i > 0; i--) {
                document.getElementById(snake.pices[i].posX + 'x' + snake.pices[i].posY).classList.remove('snake');
            }
            
            snake.pices.splice(1, snake.pices.length - 1);
            dir = 0;
            
            window.alert("Tu puntuación es de " + points + " puntos.");
            
            points = 0;
        }
    }
    
    if ((snake.pices[0].posY == food.posY) && (snake.pices[0].posX == food.posX)) {
        
        points++;
        
        var posX = snake.pices[snake.pices.length - 1].posX;
        var posY = snake.pices[snake.pices.length - 1].posY;
        
        var newPice = new Pice(posX, posY);
        
        posX = snake.pices[snake.pices.length - 1].posX;
        posY = snake.pices[snake.pices.length - 1].posY;
        
        snake.pices.push(newPice);
        
        document.getElementById(food.posX + 'x' + food.posY).classList.remove('food');
        setFood();
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

