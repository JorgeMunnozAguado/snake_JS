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
}


var pice = {posX: 0, posY: 0};
var snake = {size: 1, pices: []};

snake.pices.push(pice);
s/*nake.pices.push(pice = {posX: 1, posY: 0});*/
document.getElementById(snake.pices[0].posX + 'x' + snake.pices[0].posY).classList.add('snake');

function handle(event) {

    document.getElementById(snake.pices[snake.pices.length - 1].posX + 'x' + snake.pices[snake.pices.length - 1].posY).classList.remove('snake');

    for (i = snake.pices.length - 1; i > 1; i--) {
        snake.pices[i].posX = snake.pices[i - 1].posX;
        snake.pices[i].posY = snake.pices[i - 1].posY;
    }

    if (event.key == 'ArrowUp'){

        if (snake.pices[0].posY != 0) snake.pices[0].posY--;

    } else if (event.key == 'ArrowDown'){

        if (snake.pices[0].posY != CantY) snake.pices[0].posY++;

    } else if (event.key == 'ArrowLeft'){

        if (snake.pices[0].posX != 0) snake.pices[0].posX--;

    } else if (event.key == 'ArrowRight'){

        if (snake.pices[0].posX != CantX) snake.pices[0].posX++;

    }

    document.getElementById(snake.pices[0].posX + 'x' + snake.pices[0].posY).classList.add('snake');
}
