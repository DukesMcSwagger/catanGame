//Title: catanGame
//Author: Eric Deering

//feel free to add yourself to the authors and then erase this message.

//Credit to Alex Hauser for creating the tokens

function generateBoard()
{
    //variables for board generation
    var board = " ";
    var tileLeft = -360;
    var counter = 0;
    var tileTopInitial = 0;
    var tileLeftIncrement = 70; //amount of pixels to the next tile left of the following column
    var tileTopIncrement = 120; //amount of pixels to the next tile top of that column
    var tileRowTop = tileTopInitial - 240; //tops for the higher set rows
    var tileIncrementRowTop = tileTopInitial - 120; //tops for the lower set rows
    var tileTop = tileTopInitial; //current tile height
    var forest = 0;
    var ore = 0;
    var brick = 0;
    var wheat = 0;
    var sheep = 0;
    var desert = 0;
    var image = " ";
    var imageSelect = 0;
    var oreImage = "oreT"
    var forestImage = "forestT";
    var sheepImage = "sheepT";
    var brickImage = "brickT";
    var wheatImage = "wheatT";
    var desertImage = "desertT";
    var tileGenerated = false;
    var desertGenerated = false;
    var boardSettings = document.getElementById("board");
    var two = 0;
    var three = 0;
    var four = 0;
    var five = 0;
    var six = 0;
    var eight = 0;
    var nine = 0;
    var ten = 0;
    var eleven = 0;
    var twelve = 0;
    var tokenGenerated = false;
    var tokenSelect = 0;
    var token = " ";

    // FOR DEBUGGING
    console.log("screen width: " + screen.width + "\nscreen height: " + screen.height)
    console.log("board width: " + boardSettings.style.width)
    console.log("board offset left: " + boardSettings.offsetLeft + "\nboard offset top: " + boardSettings.offsetTop);

    boardSettings.style.left = '50%';
    boardSettings.style.top = '40%';

    //generate the board and adjust positioning for each row
    for (let i = 0; i < 19; i++)
    {
        tileGenerated = false;
        tokenGenerated = false;
        desertGenerated = false;

        while (tileGenerated == false)
        {
            imageSelect = Math.floor(Math.random() * 5);

            // FOR DEBUGGING
            // console.log("image select: " + imageSelect);

            if (imageSelect == 0 && ore < 3)
            {
                image = oreImage;
                ore++;
                tileGenerated = true;
            }
            else if (imageSelect == 1 && forest < 4)
            {
                image = forestImage;
                forest++;
                tileGenerated = true;
            }
            else if (imageSelect == 2 && sheep < 4)
            {
                image = sheepImage;
                sheep++;
                tileGenerated = true;
            }
            else if (imageSelect == 3 && brick < 3)
            {
                image = brickImage;
                brick++;
                tileGenerated = true;
            }
            else if (imageSelect == 4 && wheat < 4)
            {
                image = wheatImage;
                wheat++;
                tileGenerated = true;
            }
            else if (desert < 1)
            {
                image = desertImage;
                desert++;
                tileGenerated = true;
                desertGenerated = true;
            }
        
        }

        while (tokenGenerated == false)
        {
            tokenSelect = Math.floor(Math.random() * 10);

            if (desertGenerated == true)
            {
                break;
            }

            if (tokenSelect == 0 && two < 1)
            {
                token = "2T";
                two++;
                tokenGenerated = true;
            }
            else if (tokenSelect == 1 && three < 2)
            {
                token = "3T";
                three++;
                tokenGenerated = true;
            }
            else if (tokenSelect == 2 && four < 2)
            {
                token = "4T";
                four++;
                tokenGenerated = true;
            }
            else if (tokenSelect == 3 && five < 2)
            {
                token = "5T";
                five++;
                tokenGenerated = true;
            }
            else if (tokenSelect == 4 && six < 2)
            {
                token = "6T";
                six++;
                tokenGenerated = true;
            }
            else if (tokenSelect == 5 && eight < 2)
            {
                token = "8T";
                eight++;
                tokenGenerated = true;
            }
            else if (tokenSelect == 6 && nine < 2)
            {
                token = "9T";
                nine++;
                tokenGenerated = true;
            }
            else if (tokenSelect == 7 && ten < 2)
            {
                token = "10T";
                ten++;
                tokenGenerated = true;
            }
            else if (tokenSelect == 8 && eleven < 2)
            {
                token = "11T";
                eleven++;
                tokenGenerated = true;
            }
            else if (tokenSelect == 9 && twelve < 1)
            {
                token = "12T";
                twelve++;
                tokenGenerated = true;
            }
        }

        //generate html code for tiles
        board += "<img src='images/boardTiles/" + image + ".png' " 
        + "style='position:absolute; width: 130; height: auto;"
        + "top: " + tileTop + "; left:  " + tileLeft + "'>";

        if (desertGenerated == false)
        {
            board += "<img src='images/numberTokens/" + token + ".png' "
            + "style='position:absolute; width: 25; height: auto;"
            + "top: " + (tileTop + 108) + "; left: " + (tileLeft + 53) + "'>";
        }

        tileTop += 240;

        //check to see if time for row reset
        if (counter == 0 || counter == 5 || counter == 10 || counter == 15)
        {
            tileTop = tileIncrementRowTop;
            tileLeft += tileLeftIncrement;
        }

        if (counter == 2 || counter == 7 || counter == 12)
        {
            tileTop = tileRowTop;
            tileLeft += tileLeftIncrement;
        }
        
        if (counter == 17)
        {
            tileTop = tileTopInitial;
            tileLeft += tileLeftIncrement;
        }

        counter++;
    }

    document.getElementById("board").innerHTML = board;
}

generateBoard();
