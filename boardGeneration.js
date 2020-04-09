//Title: catanGame
//Author: Eric Deering

//feel free to add yourself to the authors and then erase this message.

//Credit to Breanna for creating the desert tile
//Credit to Alex Hauser for creating the tokens

//global variables
var tiles = []
var settlementNodes = []

//used for the tiles[x].settlementNodes[x] array
function settlementNode(_number, _owner)
{
    this.number = _number;
    this.owner = _owner;
}

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
    //console.log("screen width: " + screen.width + "\nscreen height: " + screen.height)
    //console.log("board width: " + boardSettings.style.width)
    //console.log("board offset left: " + boardSettings.offsetLeft + "\nboard offset top: " + boardSettings.offsetTop);

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
        //generate tokens
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
        + "id='tile" + i + "'" 
        + "style='position:absolute; width: 130; height: auto;"
        + "top: " + tileTop + "; left:  " + (tileLeft) + "'>";

        if (desertGenerated == false)
        {
            board += "<img src='images/numberTokens/" + token + ".png' "
            + "id='token" + i + "'" 
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

    document.getElementById("board").innerHTML += board;
}

function generateSettlementNodes()
{
    //variables for settlement node generation
    var settlementNodeGeneration = "";
    var settlementNodeTop = 25;
    var settlementNodeLeft = -370;
    var settlementLeftIncrement = 68.5;
    var skipTileIncrement = 92;

    for (let i = 0; i < 54; i++)
    {
        settlementNodeGeneration += "<img src='images/playerPieces/invisible box.png'"
        + "id='settlementNode" + i + "' style='position:absolute; width: 25; height auto; top: " 
        + settlementNodeTop + "; left: " + settlementNodeLeft + " ;'>";

        settlementNodeTop += 72;

        if (i == 1 || i == 47)
        {
            settlementNodeTop = -90;
            settlementNodeLeft += settlementLeftIncrement;
        }

        if (i == 5 || i == 17 || i == 29 || i == 41)
        {
            settlementNodeTop = -210;
            settlementNodeLeft += settlementLeftIncrement;
        }

        if (i == 3 || i == 7 || i == 9 || i == 12 || i == 14 || i == 16 || i == 19 || i == 21 || i == 24 || i == 26 || i == 28
            || i == 31 || i == 33 || i == 36 || i == 38 || i == 40 || i == 43 || i == 45 || i == 49)
        {
            settlementNodeTop += skipTileIncrement;
        }

        if (i == 11 || i == 23 || i == 35)
        {
            settlementNodeTop = -255;
            settlementNodeLeft += settlementLeftIncrement;
        }

        if (i == 51)
        {
            settlementNodeTop = 25;
            settlementNodeLeft += settlementLeftIncrement;
        }
    }

    document.getElementById("board").innerHTML += settlementNodeGeneration;
}

function generateRoadNodes()
{
    var leftOffset = 0;
    var roadNodeGeneration = "";
    var roadNodeTop = -165;
    var roadNodeLeft = -242.5 + leftOffset;
    var roadLeftIncrement = 140;
    var rotation = 90;

    for (let i = 0; i < 72; i++)
    {
        roadNodeGeneration += "<img src='images/playerPieces/invisible rectangle.png'"
        + "id='roadNode" + i + "' style='position:absolute; width: 35; height auto; top: " 
        + roadNodeTop + "; left: " + roadNodeLeft + "; transform: rotate( " + rotation +  "deg);'>";

        roadNodeLeft += roadLeftIncrement;

        if (i == 3)
        {
            roadNodeTop = -45;
            roadNodeLeft = -312 + leftOffset;
        }

        if (i == 8)
        {
            roadNodeTop = 70;
            roadNodeLeft = -382 + leftOffset;
        }

        if (i == 14)
        {
            roadNodeTop = 190;
            roadNodeLeft = -312 + leftOffset;
        }

        if (i == 19)
        {
            roadNodeTop = 310;
            roadNodeLeft = -242.5 + leftOffset;
        }

        if (i == 23)
        {
            rotation = 30;
            roadNodeTop = -225;
            roadNodeLeft = -133 + leftOffset;
        }

        if (i == 26)
        {
            roadNodeTop = -108;
            roadNodeLeft = -207 + leftOffset;
        }

        if (i == 30)
        {
            roadNodeTop = 13;
            roadNodeLeft = -275 + leftOffset;
        }

        if (i == 35) 
        {
            roadNodeTop = 133;
            roadNodeLeft = -347 + leftOffset;
        }

        if (i == 40)
        {
            roadNodeTop = 253;
            roadNodeLeft = -275 + leftOffset;
        }

        if (i == 44)
        {
            roadNodeTop = 373;
            roadNodeLeft = -207 + leftOffset;
        }

        if (i == 47)
        {
            rotation = -30;
            roadNodeTop = -225;
            roadNodeLeft = -213 + leftOffset;
        }

        if (i == 50)
        {
            roadNodeTop = -106.5;
            roadNodeLeft = -280 + leftOffset;
        }

        if (i == 54)
        {
            roadNodeTop = 13;
            roadNodeLeft = -350 + leftOffset;
        }

        if (i == 59)
        {
            roadNodeTop = 131;
            roadNodeLeft = -275 + leftOffset;
        }

        if (i == 64)
        {
            roadNodeTop = 253;
            roadNodeLeft = -208 + leftOffset;
        }

        if (i == 68)
        {
            roadNodeTop = 372;
            roadNodeLeft = -135 + leftOffset;
        }
    }

    document.getElementById("board").innerHTML += roadNodeGeneration;
}

function tileTokenAssignment() //assign the token numbers to the tiles they are on
{
    for (let i = 0; i < 19; i++)
    {
        tiles[i] = document.getElementById("tile" + i);
    }

    for (let i = 0; i < 19; i++)
    {
        tiles[i].tokenNumber = findToken(i);
    }

    function findToken(_token) //figure out what number is on the token
    {
        if (document.getElementById("token" + _token) != null)
        {
            if (document.getElementById("token" + _token).src != null)
            {
                let searchStr = document.getElementById("token" + _token).src;
                //console.log(searchStr); //used for debugging
                for (let i = 18; i > 0; i--)
                {
                    if (searchStr.search(i + "T") >= 0)
                    {
                        //console.log("Token number set: " + i); //used for debugging
                        return i
                    }
                }
            }
        }
        else
        {
            return;
        }
    }
}

function tileResourceAssignment()
{
    for (let i = 0; i < 19; i++)
    {
        if (tiles[i].src.search("oreT") >= 0)
        {
            tiles[i].resource = "ore";
        }
        else if (tiles[i].src.search("sheepT") >= 0)
        {
            tiles[i].resource = "sheep";
        }
        else if (tiles[i].src.search("brickT") >= 0)
        {
            tiles[i].resource = "brick";
        }
        else if (tiles[i].src.search("forestT") >= 0)
        {
            tiles[i].resource = "wood";
        }
        else if (tiles[i].src.search("wheatT") >= 0)
        {
            tiles[i].resource = "wheat";
        }
        else if (tiles[i].src.search("desertT") >= 0)
        {
            tiles[i].resource = "desert";
        }
        else
        {
            console.log("Error: Could not find tile resource for tile " + i);
        }
    }
}
function settlementNodeTileAssignment()
{
    for (let i = 0; i < 54; i++)
    {
        settlementNodes[i] = document.getElementById("settlementNode" + i);
        settlementNodes[i].owner = 0;
    }

    settlementNodes[0].tiles = [0]
    settlementNodes[1].tiles = [0]
    settlementNodes[2].tiles = [1]
    settlementNodes[3].tiles = [0, 1]
    settlementNodes[4].tiles = [0, 2]
    settlementNodes[5].tiles = [2]
    settlementNodes[6].tiles = [3]
    settlementNodes[7].tiles = [1, 3]
    settlementNodes[8].tiles = [0, 1, 4]
    settlementNodes[9].tiles = [0, 2, 4]
    settlementNodes[10].tiles = [2, 5]
    settlementNodes[11].tiles = [5]
    settlementNodes[12].tiles = [3]
    settlementNodes[13].tiles = [1, 3, 6]
    settlementNodes[14].tiles = [1, 4, 6]
    settlementNodes[15].tiles = [2, 4, 7]
    settlementNodes[16].tiles = [2, 5, 7]
    settlementNodes[17].tiles = [5]
    settlementNodes[18].tiles = [3, 8]
    settlementNodes[19].tiles = [3, 6, 8]
    settlementNodes[20].tiles = [4, 6, 9]
    settlementNodes[21].tiles = [4, 7, 9]
    settlementNodes[22].tiles = [5, 7, 10]
    settlementNodes[23].tiles = [5, 10]
    settlementNodes[24].tiles = [8]
    settlementNodes[25].tiles = [6, 8, 11]
    settlementNodes[26].tiles = [6, 9, 11]
    settlementNodes[27].tiles = [7, 9, 12]
    settlementNodes[28].tiles = [7, 10, 12]
    settlementNodes[29].tiles = [10]
    settlementNodes[30].tiles = [8, 13]
    settlementNodes[31].tiles = [8, 11, 13]
    settlementNodes[32].tiles = [9, 11, 14]
    settlementNodes[33].tiles = [9, 12, 14]
    settlementNodes[34].tiles = [10, 12, 15]
    settlementNodes[35].tiles = [10, 15]
    settlementNodes[36].tiles = [13]
    settlementNodes[37].tiles = [11, 13, 16]
    settlementNodes[38].tiles = [11, 14, 16]
    settlementNodes[39].tiles = [12, 14, 17]
    settlementNodes[40].tiles = [12, 15, 17]
    settlementNodes[41].tiles = [15]
    settlementNodes[42].tiles = [13]
    settlementNodes[43].tiles = [13, 16]
    settlementNodes[44].tiles = [14, 16, 18]
    settlementNodes[45].tiles = [14, 17, 18]
    settlementNodes[46].tiles = [15, 17]
    settlementNodes[47].tiles = [15]
    settlementNodes[48].tiles = [16]
    settlementNodes[49].tiles = [16, 18]
    settlementNodes[50].tiles = [17, 18]
    settlementNodes[51].tiles = [17]
    settlementNodes[52].tiles = [18]
    settlementNodes[53].tiles = [18]
}

function tileNodeSettlementAssignment()
{
    tiles[0].settlementNodes = [new settlementNode(0,0), new settlementNode(1,0), new settlementNode(3,0), new settlementNode(4,0), new settlementNode(8,0), new settlementNode(9,0)];
    tiles[1].settlementNodes = [new settlementNode(2,0), new settlementNode(3,0), new settlementNode(7,0), new settlementNode(8,0),new settlementNode(13,0), new settlementNode(14,0)];
    tiles[2].settlementNodes = [new settlementNode(4,0), new settlementNode(5,0), new settlementNode(9,0), new settlementNode(10,0),new settlementNode(15,0), new settlementNode(16,0)];
    tiles[3].settlementNodes = [new settlementNode(6,0), new settlementNode(7,0), new settlementNode(12,0), new settlementNode(13,0), new settlementNode(18,0), new settlementNode(19,0)];
    tiles[4].settlementNodes = [new settlementNode(8,0), new settlementNode(9,0), new settlementNode(14,0), new settlementNode(15,0), new settlementNode(20,0), new settlementNode(21,0)];
    tiles[5].settlementNodes = [new settlementNode(10,0), new settlementNode(11,0), new settlementNode(16,0), new settlementNode(17,0), new settlementNode(22,0), new settlementNode(23,0)];
    tiles[6].settlementNodes = [new settlementNode(13,0), new settlementNode(14,0), new settlementNode(19,0), new settlementNode(20,0), new settlementNode(25,0), new settlementNode(26,0)];
    tiles[7].settlementNodes = [new settlementNode(15,0), new settlementNode(16,0), new settlementNode(21,0), new settlementNode(22,0), new settlementNode(27,0), new settlementNode(28,0)];
    tiles[8].settlementNodes = [new settlementNode(18,0), new settlementNode(19,0), new settlementNode(24,0), new settlementNode(25,0), new settlementNode(30,0), new settlementNode(31,0)];
    tiles[9].settlementNodes = [new settlementNode(20,0), new settlementNode(21,0), new settlementNode(26,0), new settlementNode(27,0), new settlementNode(32,0), new settlementNode(33,0)];
    tiles[10].settlementNodes = [new settlementNode(22,0), new settlementNode(23,0), new settlementNode(28,0), new settlementNode(29,0), new settlementNode(34,0), new settlementNode(35, 0)];
    tiles[11].settlementNodes = [new settlementNode(25,0), new settlementNode(26,0), new settlementNode(31,0), new settlementNode(32,0), new settlementNode(37,0), new settlementNode(38, 0)];
    tiles[12].settlementNodes = [new settlementNode(27,0), new settlementNode(28,0), new settlementNode(33,0), new settlementNode(34,0), new settlementNode(39,0), new settlementNode(40, 0)];
    tiles[13].settlementNodes = [new settlementNode(30,0), new settlementNode(31,0), new settlementNode(36,0), new settlementNode(37,0), new settlementNode(42,0), new settlementNode(43, 0)];
    tiles[14].settlementNodes = [new settlementNode(32,0), new settlementNode(33,0), new settlementNode(38,0), new settlementNode(39,0), new settlementNode(44,0), new settlementNode(45, 0)];
    tiles[15].settlementNodes = [new settlementNode(34,0), new settlementNode(35,0), new settlementNode(40,0), new settlementNode(41,0), new settlementNode(46,0), new settlementNode(47, 0)];
    tiles[16].settlementNodes = [new settlementNode(37,0), new settlementNode(38,0), new settlementNode(43,0), new settlementNode(44,0), new settlementNode(48,0), new settlementNode(49, 0)];
    tiles[17].settlementNodes = [new settlementNode(39,0), new settlementNode(40,0), new settlementNode(45,0), new settlementNode(46,0), new settlementNode(50,0), new settlementNode(51, 0)];
    tiles[18].settlementNodes = [new settlementNode(44,0), new settlementNode(45,0), new settlementNode(49,0), new settlementNode(50,0), new settlementNode(52,0), new settlementNode(53, 0)];
}

function addStaticEventListeners()
{
    document.getElementById("endTurn").addEventListener("click", function(){
        endTurn();
    });
}

generateBoard();
generateSettlementNodes();
generateRoadNodes();
tileTokenAssignment();
tileResourceAssignment();
settlementNodeTileAssignment();
tileNodeSettlementAssignment();
addStaticEventListeners();
