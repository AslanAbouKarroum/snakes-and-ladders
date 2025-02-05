const play_hard_checkbox = document.querySelector('#play_hard');
const two_players_checkbox = document.querySelector("#two_players");
const two_dice_checkbox = document.querySelector("#two_dice");
const new_game = document.querySelector('#new_game');

let turn = 1;              // to switch turn between the players
let player1place = 0;      // first player place
let player2place = 0;      // second player place
let check=0;                // 0 to continue the game, 3 if player one win, 4 if player two win
let hard_bot_arr=[6,6,2,1,1,1]  // array for the hard mode that store the number of dice for the next 3 moves
let hard_bot_index =0;          // index has 2 task first to get the right number on the dice and the second task is to let the bot choose randomly when the index is greater than the length of the array
let newGame_check = 0;          // if the user press new game when timeout function is occuring then the game will start itself because the timeout function will call the method
let red_circle = 'https://webstockreview.net/images/circle-clipart-colored-13.png';
let blue_circle = 'https://webstockreview.net/images/circle-clipart-colored-6.png';
let board = {   // convert the number from bottom of the ladder to the top and from the head of the snakes to the tail
    2:38,
    7:14,
    8:31,
    15:26,
    16:6,
    21:42,
    28:84,
    36:44,
    46:25,
    49:11,
    51:67,
    62:19,
    64:60,
    71:91,
    74:53,
    78:98,
    87:94,
    89:68,
    92:88,
    95:75,
    99:80
};
let img ={  // convert the number of the player place to the correspondent place on the image 
    1:91,
    2:92,
    3:93,
    4:94,
    5:95,
    6:96,
    7:97,
    8:98,
    9:99,
    10:100,
    11:90,
    12:89,
    13:88,
    14:87,
    15:86,
    16:85,
    17:84,
    18:83,
    19:82,
    20:81,
    21:71,
    22:72,
    23:73,
    24:74,
    25:75,
    26:76,
    27:77,
    28:78,
    29:79,
    30:80,
    31:70,
    32:69,
    33:68,
    34:67,
    35:66,
    36:65,
    37:64,
    38:63,
    39:62,
    40:61,
    41:51,
    42:52,
    43:53,
    44:54,
    45:55,
    46:56,
    47:57,
    48:58,
    49:59,
    50:60,
    51:50,
    52:49,
    53:48,
    54:47,
    55:46,
    56:45,
    57:44,
    58:43,
    59:42,
    60:41,
    61:31,
    62:32,
    63:33,
    64:34,
    65:35,
    66:36,
    67:37,
    68:38,
    69:39,
    70:40,
    71:30,
    72:29,
    73:28,
    74:27,
    75:26,
    76:25,
    77:24,
    78:23,
    79:22,
    80:21,
    81:11,
    82:12,
    83:13,
    84:14,
    85:15,
    86:16,
    87:17,
    88:18,
    89:19,
    90:20,
    91:10,
    92:9,
    93:8,
    94:7,
    95:6,
    96:5,
    97:4,
    98:3,
    99:2,
    100:1
};

function newGame(){
    newGame_check =1;  // so the timeout function don't call any method if the new game button is pressed
    turn = 1;
    player1place = 0;
    player2place = 0;
    check =0;
    hard_bot_index =0;
    let cells = document.querySelectorAll('.insider')
    for(let cell of cells){
        cell.style['background-color'] = null;
        if(cell.hasChildNodes()){
            cell.removeChild(cell.firstChild)
            if(cell.hasChildNodes())cell.removeChild(cell.firstChild)
        }
    }
    checkbox_div.style.visibility= 'visible';
    two_dice_div.style.visibility= 'visible';
    two_players_div.style.visibility= 'visible';
    document.getElementById('play').removeAttribute('disabled');
    document.getElementById('screen1').textContent = '';
    document.getElementById('screen2').textContent = '';
    document.getElementById("turn").textContent= 'Player 1'
};

function play(){  // called when playing with 2 dice and 2 players
    if(check==3){ console.log( 'Player 1 Wins!');return 0}; // check if player 1 won
    if(check==4){ console.log( 'Player 2 Wins!');return 0}; // check if player 2 won
    let die1 = Math.ceil(Math.random()*6)  // random number for the dice between 1 and 6
    let die2 = Math.ceil(Math.random()*6)
    console.log(die1 + ' '+die2)
    document.getElementById('screen1').textContent = die1   // show the dice number to the user
    document.getElementById('screen2').textContent = die2
    if(turn==1){  // player 1 turn
        let element = document.getElementById(`${img[player1place]}`) || null;
        let img_in_element = document.getElementById(`img${img[player1place]}`) || null;    
        if(img_in_element){
            element.removeChild(img_in_element); // to remove the img before leaving the palce
        }
        if(die1!==die2){turn=2};     // to switch the turn if dice aren't the same and to not switching it if the dice has the same number
        player1place = player1place+die1+die2;   // changing the player place to the next one
        if(player1place==100){  // checking if the current player won  
            turn=2;             // chanching the turn in case the dice are the same
            check =3;           // changing the check 
            console.log( 'Player 1 Wins!');
        }else{           // normal cases
            if(player1place>100) player1place = 100 -(player1place%100)  // bounce back above 100
            if(board[player1place]) player1place = board[player1place]  // checking if the player lay on a snake head or a bottom of a ladders
            console.log( 'Player 1 is on square '+player1place);
        };
        element = document.getElementById(`${img[player1place]}`) || null;
        img_in_element = document.createElement("img");   // creating the img element
        img_in_element.id = `img${img[player1place]}`;    // assigning id to it
        img_in_element.src = red_circle;   // displaying the img on the newly occupied place
        element.appendChild(img_in_element);  // appending the img to the parent div
    }else if(turn==2){   // player 2 turn 
        let element2 = document.getElementById(`${img[player2place]}`) || null;  
        let img_in_element2 = document.getElementById(`img${img[player2place]}`) || null;
        if(img_in_element2){
            element2.removeChild(img_in_element2); // to remove the img before leaving the palce
        }
        if(die1!==die2){turn=1};
        player2place = player2place+die1+die2;
        if(player2place==100){
            turn=1;
            check =4;
            console.log('Player 2 Wins!');
        }else{
            if(player2place>100) player2place = 100 -(player2place%100) 
            if(board[player2place]) player2place = board[player2place]
            console.log('Player 2 is on square '+ player2place);
        };
        element2 = document.getElementById(`${img[player2place]}`) || null;
        img_in_element2 = document.createElement("img");   // creating the img element
        img_in_element2.id = `img${img[player2place]}`;    // assigning id to it
        img_in_element2.src = blue_circle;
        element2.appendChild(img_in_element2);  // appending the img to the parent div
    };
    document.getElementById("turn").textContent= `Player ${turn}`;   // changing the player 2 above the play button on the user interface
};

function bot(){   // called when playing one player and two dice
    if(check==3){ console.log( 'Player 1 Wins!');return 0};
    if(check==4){ console.log( 'Player 2 Wins!');return 0};
    let die1 = Math.ceil(Math.random()*6)
    let die2 = Math.ceil(Math.random()*6)
    console.log(die1 + ' '+die2)
    document.getElementById('screen1').textContent = die1
    document.getElementById('screen2').textContent = die2
    if(turn==1){
        let element = document.getElementById(`${img[player1place]}`) || null;
        let img_in_element = document.getElementById(`img${img[player1place]}`) || null;    
        if(img_in_element){
            element.removeChild(img_in_element); // to remove the img before leaving the palce
        }
        if(die1!==die2){turn=2};
        player1place = player1place+die1+die2;
        if(player1place==100){
            turn=2;
            check =3;
            console.log( 'Player 1 Wins!');
        }else{
            if(player1place>100) player1place = 100 -(player1place%100) 
            if(board[player1place]) player1place = board[player1place]
            console.log( 'Player 1 is on square '+player1place);
        };
        element = document.getElementById(`${img[player1place]}`) || null;
        img_in_element = document.createElement("img");   // creating the img element
        img_in_element.id = `img${img[player1place]}`;    // assigning id to it
        img_in_element.src = red_circle;   // displaying the img on the newly occupied place
        element.appendChild(img_in_element);  // appending the img to the parent div
    }else if(turn==2){
        let element2 = document.getElementById(`${img[player2place]}`) || null;  
        let img_in_element2 = document.getElementById(`img${img[player2place]}`) || null;
        if(img_in_element2){
            element2.removeChild(img_in_element2); // to remove the img before leaving the palce
        }
        if(die1!==die2){turn=1};
        player2place = player2place+die1+die2;
        if(player2place==100){
            turn=1;
            check =4;
            console.log('Bot Wins!');
        }else{
            if(player2place>100) player2place = 100 -(player2place%100) 
            if(board[player2place]) player2place =board[player2place]
            console.log('Bot is on square '+ player2place);
        };
        element2 = document.getElementById(`${img[player2place]}`) || null;
        img_in_element2 = document.createElement("img");   // creating the img element
        img_in_element2.id = `img${img[player2place]}`;    // assigning id to it
        img_in_element2.src = blue_circle;
        element2.appendChild(img_in_element2);  // appending the img to the parent div
    };
    if(turn==2){
        document.getElementById("turn").textContent= 'Bot'  
    }else{
        document.getElementById("turn").textContent= `Player ${turn}`;
    }
    if(turn==2) {
        setTimeout(timeout_function, 2000);   // a 2 second wait so the bot doesn't play directly after the human player it's annoying beleive me
    };
    if(turn==2) document.querySelector('#play').setAttribute('disabled',true)  // to not let the user press the button during the bot turn
    if(turn==1) document.querySelector('#play').removeAttribute('disabled')  // allowing the user to play after the bot finish its turn
};

function playOne(){      // called when playing two players and one dice
    if(check==3){ console.log( 'Player 1 Wins!');return 0};
    if(check==4){ console.log( 'Player 2 Wins!');return 0};
    let die1 = Math.ceil(Math.random()*6)
    console.log(die1)
    document.getElementById('screen1').textContent = die1
    if(turn==1){
        let element = document.getElementById(`${img[player1place]}`) || null;
        let img_in_element = document.getElementById(`img${img[player1place]}`) || null;    
        if(img_in_element){
            element.removeChild(img_in_element); // to remove the img before leaving the palce
        }
        turn=2;
        player1place = player1place+die1;
        if(player1place==100){
            turn=2;
            check =3;
            console.log( 'Player 1 Wins!');
        }else{
            if(player1place>100) player1place = 100 -(player1place%100) 
            if(board[player1place])player1place = board[player1place]
            console.log( 'Player 1 is on square '+player1place);
        };
        element = document.getElementById(`${img[player1place]}`) || null;
        img_in_element = document.createElement("img");   // creating the img element
        img_in_element.id = `img${img[player1place]}`;    // assigning id to it
        img_in_element.src = red_circle;   // displaying the img on the newly occupied place
        element.appendChild(img_in_element);  // appending the img to the parent div
    }else if(turn==2){
        let element2 = document.getElementById(`${img[player2place]}`) || null;  
        let img_in_element2 = document.getElementById(`img${img[player2place]}`) || null;
        if(img_in_element2){
            element2.removeChild(img_in_element2); // to remove the img before leaving the palce
        }
        turn=1;
        player2place =player2place+die1;
        if(player2place==100){
            turn=1;
            check =4;
            console.log('Player 2 Wins!');
        }else{
            if(player2place>100)player2place = 100 -(player2place%100) 
            if(board[player2place]) player2place = board[player2place]
            console.log('Player 2 is on square '+ player2place);
        };
        element2 = document.getElementById(`${img[player2place]}`) || null;
        img_in_element2 = document.createElement("img");   // creating the img element
        img_in_element2.id = `img${img[player2place]}`;    // assigning id to it
        img_in_element2.src = blue_circle;
        element2.appendChild(img_in_element2);  // appending the img to the parent div
    };
    document.getElementById("turn").textContent= `Player ${turn}`;
};

function botOne(){   // called when playing one player and one dice
    if(check==3){ console.log( 'Player 1 Wins!');return 0};
    if(check==4){ console.log( 'Bot Wins!');return 0};
    let die1 = Math.ceil(Math.random()*6)
    console.log(die1)
    document.getElementById('screen1').textContent = 'Dice '+die1
    if(turn==1){
        let element = document.getElementById(`${img[player1place]}`) || null;
        let img_in_element = document.getElementById(`img${img[player1place]}`) || null;    
        if(img_in_element){
            element.removeChild(img_in_element); // to remove the img before leaving the palce
        }
        turn=2;
        player1place =player1place+die1;
        if(player1place==100){
            turn=2;
            check =3;
            console.log( 'Player 1 Wins!');
        }else{
            if(player1place>100) player1place = 100 -(player1place%100) 
            if(board[player1place]) player1place = board[player1place]
            console.log( 'Player 1 is on square '+player1place);
        };
        element = document.getElementById(`${img[player1place]}`) || null;
        img_in_element = document.createElement("img");   // creating the img element
        img_in_element.id = `img${img[player1place]}`;    // assigning id to it
        img_in_element.src = red_circle;   // displaying the img on the newly occupied place
        element.appendChild(img_in_element);  // appending the img to the parent div
    }else if(turn==2){
        let element2 = document.getElementById(`${img[player2place]}`) || null;  
        let img_in_element2 = document.getElementById(`img${img[player2place]}`) || null;
        if(img_in_element2){
            element2.removeChild(img_in_element2); // to remove the img before leaving the palce
        }
        turn=1;
        player2place = player2place+die1;
        if(player2place==100){
            turn=1;
            check =4;
            console.log('Bot Wins!');
        }else{
            if(player2place>100) player2place = 100 -(player2place%100) 
            if(board[player2place]) player2place = board[player2place]
            console.log('Bot is on square '+ player2place);
        };
        element2 = document.getElementById(`${img[player2place]}`) || null;
        img_in_element2 = document.createElement("img");   // creating the img element
        img_in_element2.id = `img${img[player2place]}`;    // assigning id to it
        img_in_element2.src = blue_circle;
        element2.appendChild(img_in_element2);  // appending the img to the parent div
    };
    if(turn==2){
        document.getElementById("turn").textContent= 'Bot'  
    }else{
        document.getElementById("turn").textContent= `Player ${turn}`;
    }
    if(turn==2) {
        setTimeout(timeout_function, 2000);
    };
    if(turn==2) document.querySelector('#play').setAttribute('disabled',true)
    if(turn==1) document.querySelector('#play').removeAttribute('disabled')
};

function hard(){    // called when playing against hard opponent, here the bot will arrive to the cell 84 in 2 turns (3 moves) and have a move in hand (2 dice equal case)
    if(check==3){ console.log( 'Player 1 Wins!');return 0};
    if(check==4){ console.log( 'Bot Wins!');return 0};
    if(turn==1){
        let die1 = Math.ceil(Math.random()*6)
        let die2 = Math.ceil(Math.random()*6)
        console.log(die1 + ' '+die2)
        document.getElementById('screen1').textContent = die1
        document.getElementById('screen2').textContent = die2
        let element = document.getElementById(`${img[player1place]}`) || null;
        let img_in_element = document.getElementById(`img${img[player1place]}`) || null;    
        if(img_in_element){
            element.removeChild(img_in_element); // to remove the img before leaving the palce
        }
        if(die1!==die2){turn=2};
        player1place = player1place+die1+die2;
        if(player1place==100){
            turn=2;
            check =3;
            console.log( 'Player 1 Wins!');
        }else{
            if(player1place>100) player1place = 100 -(player1place%100) 
            if(board[player1place]) player1place = board[player1place]
            console.log( 'Player 1 is on square '+player1place);
        };
        element = document.getElementById(`${img[player1place]}`) || null;
        img_in_element = document.createElement("img");   // creating the img element
        img_in_element.id = `img${img[player1place]}`;    // assigning id to it
        img_in_element.src = red_circle;   // displaying the img on the newly occupied place
        element.appendChild(img_in_element);  // appending the img to the parent div
    }else if(turn==2){
        let die1 = 0;
        let die2 = 0;
        if(hard_bot_index<hard_bot_arr.length){  // checking if the bot played all his designated moves or yet
            die1 = hard_bot_arr[hard_bot_index];    // assigning the first dice to the coorespondent index in the array
            die2 = hard_bot_arr[hard_bot_index+1];
            hard_bot_index+=2;       // adding the index for the next move or turn
        }else{                    // leaving the bot to his chance :(
            die1 = Math.ceil(Math.random()*6)
            die2 = Math.ceil(Math.random()*6)
        }
        console.log(die1 + ' '+die2)
        document.getElementById('screen1').textContent = die1
        document.getElementById('screen2').textContent = die2
        let element2 = document.getElementById(`${img[player2place]}`) || null;  
        let img_in_element2 = document.getElementById(`img${img[player2place]}`) || null;
        if(img_in_element2){
            element2.removeChild(img_in_element2); // to remove the img before leaving the palce
        }
        if(die1!==die2){turn=1};
        player2place = player2place+die1+die2;
        if(player2place==100){
            turn=1;
            check =4;
            console.log('Bot Wins!');
        }else{
            if(player2place>100) player2place = 100 -(player2place%100) 
            if(board[player2place]) player2place = board[player2place]
            console.log('Bot is on square '+ player2place);
        };
        element2 = document.getElementById(`${img[player2place]}`) || null;
        img_in_element2 = document.createElement("img");   // creating the img element
        img_in_element2.id = `img${img[player2place]}`;    // assigning id to it
        img_in_element2.src = blue_circle;
        element2.appendChild(img_in_element2);  // appending the img to the parent div
    };
    if(turn==2){
        document.getElementById("turn").textContent= 'Bot'  
    }else{
        document.getElementById("turn").textContent= `Player ${turn}`;
    }
    if(turn==2) {
        setTimeout(timeout_function, 2000);
    };
    if(turn==2) document.querySelector('#play').setAttribute('disabled',true)
    if(turn==1) document.querySelector('#play').removeAttribute('disabled')
};


function play_now(){       // called when the play button is clicked on
    newGame_check = 0;   // to reset the check button to start playing normally
    const checkbox_div = document.getElementById('checkbox_div');
    const two_dice_div = document.getElementById('two_dice_div');
    const two_players_div = document.getElementById('two_players_div');
    checkbox_div.style.visibility= 'hidden';      // hide the options so the user doesn't toggle them after the starting of the game
    two_dice_div.style.visibility= 'hidden';      // although their parent div has hidden visibility, but if the hard mode was checked and unchecked they will have a style of visibility visible and they will appear
    two_players_div.style.visibility= 'hidden';
    if(play_hard_checkbox.checked){          // specifing which method should be called
        hard();
    }else if(two_dice_checkbox.checked){
        if (two_players_checkbox.checked){
            play();
        }else{
            bot();
        }
    }else{
        if (two_players_checkbox.checked){
            playOne();
        }else{
            botOne();
        }
    };
};


function timeout_function(){
    if(newGame_check){     // to check if the new game button was pressed during the bot turn
        return 0;
    }else if(play_hard_checkbox.checked){
        hard();
    }else if(two_dice_checkbox.checked){
        bot();
    }else{
        botOne();
    }
};
    
function hide_other_options(){    // function to hide other checkboxes if the hard mode is checked and to make them visible again if the user uncheked it
    const two_dice_div = document.getElementById('two_dice_div');
    const two_players_div = document.getElementById('two_players_div');
    if(play_hard_checkbox.checked){
        two_dice_div.style.visibility= 'hidden';
        two_players_div.style.visibility= 'hidden';
    }else{
        two_dice_div.style.visibility= 'visible';
        two_players_div.style.visibility= 'visible';
    }
}

new_game.addEventListener('click', newGame);

play_hard_checkbox.addEventListener('change',hide_other_options);

document.querySelector('#play').addEventListener('click', play_now);
    
    