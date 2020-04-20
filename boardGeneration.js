//Title: catanGame
//Author: Eric Deering

//feel free to add yourself to the authors and then erase this message.

//Credit to Breanna for creating the desert tile
//Credit to Alex Hauser for creating the tokens

//global variables
var tiles = [];
var settlementNodes = [];
var roadNodes = [];

//used for the tiles[x].settlementNodes[x] array
function settlementNode(_number, _owner)
{
    this.number = _number;
    this.owner = _owner;
    this.adjacentSettlementNodes = [];
    this.adjacentRoadNodes = [];
}

function roadNode(_number, _owner)
{
    this.number = _number;
    this.owner = _owner;
    this.adjacentSettlementNodes = [];
    this.adjacentRoadNodes = [];
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
function settlementNodeSetup()
{
    for (let i = 0; i < 54; i++)
    {
        settlementNodes[i] = new settlementNode(i, 0);
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

    settlementNodes[0 ].adjacentRoadNodes = [9, 55]
    settlementNodes[1 ].adjacentRoadNodes = [9, 36]
    settlementNodes[2 ].adjacentRoadNodes = [4, 51]
    settlementNodes[3 ].adjacentRoadNodes = [4, 31, 55]
    settlementNodes[4 ].adjacentRoadNodes = [15, 36, 60]
    settlementNodes[5 ].adjacentRoadNodes = [15, 41]
    settlementNodes[6 ].adjacentRoadNodes = [0, 48]
    settlementNodes[7 ].adjacentRoadNodes = [0, 27, 51]
    settlementNodes[8 ].adjacentRoadNodes = [10, 31, 56]
    settlementNodes[9 ].adjacentRoadNodes = [10, 37, 60]   
    settlementNodes[10].adjacentRoadNodes = [20, 41, 65]
    settlementNodes[11].adjacentRoadNodes = [20, 45]
    settlementNodes[12].adjacentRoadNodes = [24, 48]
    settlementNodes[13].adjacentRoadNodes = [5, 27, 52]
    settlementNodes[14].adjacentRoadNodes = [5, 32, 56]
    settlementNodes[15].adjacentRoadNodes = [16, 37, 61]
    settlementNodes[16].adjacentRoadNodes = [16, 42, 65]
    settlementNodes[17].adjacentRoadNodes = [45, 69]
    settlementNodes[18].adjacentRoadNodes = [1, 24, 49]
    settlementNodes[19].adjacentRoadNodes = [1, 28, 52]
    settlementNodes[20].adjacentRoadNodes = [11, 32, 57]
    settlementNodes[21].adjacentRoadNodes = [11, 38, 61]
    settlementNodes[22].adjacentRoadNodes = [21, 42, 66]
    settlementNodes[23].adjacentRoadNodes = [21, 46, 69]
    settlementNodes[24].adjacentRoadNodes = [25, 49]
    settlementNodes[25].adjacentRoadNodes = [6, 28, 53]
    settlementNodes[26].adjacentRoadNodes = [6, 33, 57]
    settlementNodes[27].adjacentRoadNodes = [17, 38, 62]
    settlementNodes[28].adjacentRoadNodes = [17, 43, 66]
    settlementNodes[29].adjacentRoadNodes = [46, 70]
    settlementNodes[30].adjacentRoadNodes = [2, 25, 50]
    settlementNodes[31].adjacentRoadNodes = [2, 29, 53]
    settlementNodes[32].adjacentRoadNodes = [12, 33, 58]
    settlementNodes[33].adjacentRoadNodes = [12, 39, 62]
    settlementNodes[34].adjacentRoadNodes = [22, 43, 67]
    settlementNodes[35].adjacentRoadNodes = [22, 47, 70]
    settlementNodes[36].adjacentRoadNodes = [26, 50]
    settlementNodes[37].adjacentRoadNodes = [7, 29, 54]
    settlementNodes[38].adjacentRoadNodes = [7, 34, 58]
    settlementNodes[39].adjacentRoadNodes = [18, 39, 63]
    settlementNodes[40].adjacentRoadNodes = [18, 44, 67]
    settlementNodes[41].adjacentRoadNodes = [47, 71]
    settlementNodes[42].adjacentRoadNodes = [3, 26]
    settlementNodes[43].adjacentRoadNodes = [3, 30, 54]
    settlementNodes[44].adjacentRoadNodes = [13, 34, 59]
    settlementNodes[45].adjacentRoadNodes = [13, 40, 63]
    settlementNodes[46].adjacentRoadNodes = [23, 44, 68]
    settlementNodes[47].adjacentRoadNodes = [23, 71]
    settlementNodes[48].adjacentRoadNodes = [8, 30]
    settlementNodes[49].adjacentRoadNodes = [8, 35, 59]
    settlementNodes[50].adjacentRoadNodes = [19, 40, 64]
    settlementNodes[51].adjacentRoadNodes = [19, 68]
    settlementNodes[52].adjacentRoadNodes = [14, 35]
    settlementNodes[53].adjacentRoadNodes = [14, 64]

    settlementNodes[0 ].adjacentSettlementNodes = [1, 3]
    settlementNodes[1 ].adjacentSettlementNodes = [0, 4]
    settlementNodes[2 ].adjacentSettlementNodes = [3, 7]
    settlementNodes[3 ].adjacentSettlementNodes = [0, 2, 8]
    settlementNodes[4 ].adjacentSettlementNodes = [1, 5, 9]
    settlementNodes[5 ].adjacentSettlementNodes = [4, 10]
    settlementNodes[6 ].adjacentSettlementNodes = [7, 12]
    settlementNodes[7 ].adjacentSettlementNodes = [2, 6, 13]
    settlementNodes[8 ].adjacentSettlementNodes = [3, 9, 14]
    settlementNodes[9 ].adjacentSettlementNodes = [4, 8, 15] 
    settlementNodes[10].adjacentSettlementNodes = [5, 11, 16]
    settlementNodes[11].adjacentSettlementNodes = [10, 17]
    settlementNodes[12].adjacentSettlementNodes = [6, 18]
    settlementNodes[13].adjacentSettlementNodes = [7, 14, 19]
    settlementNodes[14].adjacentSettlementNodes = [8, 13, 20]
    settlementNodes[15].adjacentSettlementNodes = [9, 16, 21]
    settlementNodes[16].adjacentSettlementNodes = [10, 15, 22]
    settlementNodes[17].adjacentSettlementNodes = [11, 23]
    settlementNodes[18].adjacentSettlementNodes = [12, 24]
    settlementNodes[19].adjacentSettlementNodes = [13, 18, 25]
    settlementNodes[20].adjacentSettlementNodes = [14, 21, 26]
    settlementNodes[21].adjacentSettlementNodes = [15, 20, 27]
    settlementNodes[22].adjacentSettlementNodes = [16, 23, 28]
    settlementNodes[23].adjacentSettlementNodes = [17, 22, 29]
    settlementNodes[24].adjacentSettlementNodes = [18, 30]
    settlementNodes[25].adjacentSettlementNodes = [19, 26, 31]
    settlementNodes[26].adjacentSettlementNodes = [20, 25, 32]
    settlementNodes[27].adjacentSettlementNodes = [21, 28, 33]
    settlementNodes[28].adjacentSettlementNodes = [22, 27, 34]
    settlementNodes[29].adjacentSettlementNodes = [23, 35]
    settlementNodes[30].adjacentSettlementNodes = [24, 36]
    settlementNodes[31].adjacentSettlementNodes = [25, 30, 37]
    settlementNodes[32].adjacentSettlementNodes = [26, 33, 38]
    settlementNodes[33].adjacentSettlementNodes = [27, 32, 39]
    settlementNodes[34].adjacentSettlementNodes = [28, 35, 40]
    settlementNodes[35].adjacentSettlementNodes = [29, 34, 41]
    settlementNodes[36].adjacentSettlementNodes = [30, 42]
    settlementNodes[37].adjacentSettlementNodes = [31, 38, 43]
    settlementNodes[38].adjacentSettlementNodes = [32, 37, 44]
    settlementNodes[39].adjacentSettlementNodes = [33, 40, 45]
    settlementNodes[40].adjacentSettlementNodes = [34, 39, 46]
    settlementNodes[41].adjacentSettlementNodes = [35, 47]
    settlementNodes[42].adjacentSettlementNodes = [36, 43]
    settlementNodes[43].adjacentSettlementNodes = [42, 37, 48]
    settlementNodes[44].adjacentSettlementNodes = [38, 49, 45]
    settlementNodes[45].adjacentSettlementNodes = [39, 44, 50]
    settlementNodes[46].adjacentSettlementNodes = [40, 47, 51]
    settlementNodes[47].adjacentSettlementNodes = [41, 46]
    settlementNodes[48].adjacentSettlementNodes = [43, 49]
    settlementNodes[49].adjacentSettlementNodes = [44, 48, 52]
    settlementNodes[50].adjacentSettlementNodes = [45, 51, 53]
    settlementNodes[51].adjacentSettlementNodes = [46, 50]
    settlementNodes[52].adjacentSettlementNodes = [49, 53]
    settlementNodes[53].adjacentSettlementNodes = [50, 52]
}

function tileNodeSettlementAssignment()
{
    tiles[0].settlementNodes = [0, 1, 3, 4, 8, 9];
    tiles[1].settlementNodes = [2, 3, 7, 8, 13, 14];
    tiles[2].settlementNodes = [4, 5, 9, 10, 15, 16];
    tiles[3].settlementNodes = [6, 7, 12, 13, 18, 19];
    tiles[4].settlementNodes = [8, 9, 14, 15, 20, 21];
    tiles[5].settlementNodes = [10, 11, 16, 17, 22, 23];
    tiles[6].settlementNodes = [13, 14, 19, 20, 25, 26];
    tiles[7].settlementNodes = [15, 16, 21, 22, 27, 28];
    tiles[8].settlementNodes = [18, 19, 24, 25, 30, 31];
    tiles[9].settlementNodes = [20, 21, 26, 27, 32, 33];
    tiles[10].settlementNodes = [22, 23, 28, 29, 34, 35];
    tiles[11].settlementNodes = [25, 26, 31, 32, 37, 38];
    tiles[12].settlementNodes = [27, 28, 33, 34, 39, 40];
    tiles[13].settlementNodes = [30, 31, 36, 37, 42, 43];
    tiles[14].settlementNodes = [32, 33, 38, 39, 44, 45];
    tiles[15].settlementNodes = [34, 35, 40, 41, 46, 47];
    tiles[16].settlementNodes = [37, 38, 43, 44, 48, 49];
    tiles[17].settlementNodes = [39, 40, 45, 46, 50, 51];
    tiles[18].settlementNodes = [44, 45, 49, 50, 52, 53];
}

function createRoadNodeObjects()
{
    for (let i = 0; i < 72; i++)
    {
        roadNodes[i] = new roadNode(i, 0);
    }
}

function roadNodeSetup()
{
    roadNodes[0 ].adjacentSettlementNodes = [6, 7]
    roadNodes[1 ].adjacentSettlementNodes = [18, 19]
    roadNodes[2 ].adjacentSettlementNodes = [30, 31]
    roadNodes[3 ].adjacentSettlementNodes = [42, 43]
    roadNodes[4 ].adjacentSettlementNodes = [2, 3]
    roadNodes[5 ].adjacentSettlementNodes = [13, 14]
    roadNodes[6 ].adjacentSettlementNodes = [25, 26]
    roadNodes[7 ].adjacentSettlementNodes = [37, 38]
    roadNodes[8 ].adjacentSettlementNodes = [48, 49]
    roadNodes[9 ].adjacentSettlementNodes = [0, 1]
    roadNodes[10].adjacentSettlementNodes = [8, 9]
    roadNodes[11].adjacentSettlementNodes = [20, 21]
    roadNodes[12].adjacentSettlementNodes = [32, 33]
    roadNodes[13].adjacentSettlementNodes = [44, 45]
    roadNodes[14].adjacentSettlementNodes = [52, 53]
    roadNodes[15].adjacentSettlementNodes = [4, 5]
    roadNodes[16].adjacentSettlementNodes = [15, 16]
    roadNodes[17].adjacentSettlementNodes = [27, 28]
    roadNodes[18].adjacentSettlementNodes = [39, 40]
    roadNodes[19].adjacentSettlementNodes = [50, 51]
    roadNodes[20].adjacentSettlementNodes = [10, 11]
    roadNodes[21].adjacentSettlementNodes = [22, 23]
    roadNodes[22].adjacentSettlementNodes = [34, 35]
    roadNodes[23].adjacentSettlementNodes = [46, 47]
    roadNodes[24].adjacentSettlementNodes = [12, 18]
    roadNodes[25].adjacentSettlementNodes = [24, 30]
    roadNodes[26].adjacentSettlementNodes = [36, 42]
    roadNodes[27].adjacentSettlementNodes = [7, 13]
    roadNodes[28].adjacentSettlementNodes = [19, 25]
    roadNodes[29].adjacentSettlementNodes = [31, 37]
    roadNodes[30].adjacentSettlementNodes = [43, 48]
    roadNodes[31].adjacentSettlementNodes = [3, 8]
    roadNodes[32].adjacentSettlementNodes = [14, 20]
    roadNodes[33].adjacentSettlementNodes = [26, 32]
    roadNodes[34].adjacentSettlementNodes = [38, 44]
    roadNodes[35].adjacentSettlementNodes = [49, 52]
    roadNodes[36].adjacentSettlementNodes = [1, 4]
    roadNodes[37].adjacentSettlementNodes = [9, 15]
    roadNodes[38].adjacentSettlementNodes = [21, 27]
    roadNodes[39].adjacentSettlementNodes = [33, 39]
    roadNodes[40].adjacentSettlementNodes = [45, 50]
    roadNodes[41].adjacentSettlementNodes = [5, 10]
    roadNodes[42].adjacentSettlementNodes = [16, 22]
    roadNodes[43].adjacentSettlementNodes = [28, 34]
    roadNodes[44].adjacentSettlementNodes = [40, 46]
    roadNodes[45].adjacentSettlementNodes = [11, 17]
    roadNodes[46].adjacentSettlementNodes = [23, 29]
    roadNodes[47].adjacentSettlementNodes = [35, 41]
    roadNodes[48].adjacentSettlementNodes = [6, 12]
    roadNodes[49].adjacentSettlementNodes = [18, 24]
    roadNodes[50].adjacentSettlementNodes = [30, 36]
    roadNodes[51].adjacentSettlementNodes = [2, 7]
    roadNodes[52].adjacentSettlementNodes = [13, 19]
    roadNodes[53].adjacentSettlementNodes = [25, 31]
    roadNodes[54].adjacentSettlementNodes = [37, 43]
    roadNodes[55].adjacentSettlementNodes = [0, 3]
    roadNodes[56].adjacentSettlementNodes = [8, 14]
    roadNodes[57].adjacentSettlementNodes = [20, 26]
    roadNodes[58].adjacentSettlementNodes = [32, 38]
    roadNodes[59].adjacentSettlementNodes = [44, 49]
    roadNodes[60].adjacentSettlementNodes = [4, 9]
    roadNodes[61].adjacentSettlementNodes = [15, 21]
    roadNodes[62].adjacentSettlementNodes = [27, 33]
    roadNodes[63].adjacentSettlementNodes = [39, 45]
    roadNodes[64].adjacentSettlementNodes = [50, 53]
    roadNodes[65].adjacentSettlementNodes = [10, 16]
    roadNodes[66].adjacentSettlementNodes = [22, 28]
    roadNodes[67].adjacentSettlementNodes = [34, 40]
    roadNodes[68].adjacentSettlementNodes = [46, 51]
    roadNodes[69].adjacentSettlementNodes = [17, 23]
    roadNodes[70].adjacentSettlementNodes = [29, 35]
    roadNodes[71].adjacentSettlementNodes = [41, 47] 

    roadNodes[0 ].adjacentRoadNodes = [27, 48, 51]
    roadNodes[1 ].adjacentRoadNodes = [24, 28, 49, 52]
    roadNodes[2 ].adjacentRoadNodes = [25, 29, 50, 53]
    roadNodes[3 ].adjacentRoadNodes = [26, 30, 54]
    roadNodes[4 ].adjacentRoadNodes = [31, 51, 55]
    roadNodes[5 ].adjacentRoadNodes = [27, 32, 52, 56]
    roadNodes[6 ].adjacentRoadNodes = [28, 33, 53, 57]
    roadNodes[7 ].adjacentRoadNodes = [29, 34, 54, 58]
    roadNodes[8 ].adjacentRoadNodes = [30, 35, 59]
    roadNodes[9 ].adjacentRoadNodes = [55, 36]
    roadNodes[10].adjacentRoadNodes = [31, 37, 56, 60]
    roadNodes[11].adjacentRoadNodes = [32, 38, 57, 61]
    roadNodes[12].adjacentRoadNodes = [33, 39, 58, 62]
    roadNodes[13].adjacentRoadNodes = [34, 40, 59, 63]
    roadNodes[14].adjacentRoadNodes = [35, 64]
    roadNodes[15].adjacentRoadNodes = [36, 41, 60]
    roadNodes[16].adjacentRoadNodes = [37, 42, 61, 65]
    roadNodes[17].adjacentRoadNodes = [38, 43, 62, 66]
    roadNodes[18].adjacentRoadNodes = [39, 44, 63, 67]
    roadNodes[19].adjacentRoadNodes = [40, 64, 68]
    roadNodes[20].adjacentRoadNodes = [41, 45, 65]
    roadNodes[21].adjacentRoadNodes = [42, 46, 66, 69]
    roadNodes[22].adjacentRoadNodes = [43, 47, 67, 70]
    roadNodes[23].adjacentRoadNodes = [44, 68, 71]
    roadNodes[24].adjacentRoadNodes = [48, 1, 49]
    roadNodes[25].adjacentRoadNodes = [49, 2, 50]
    roadNodes[26].adjacentRoadNodes = [50, 3]
    roadNodes[27].adjacentRoadNodes = [5, 51, 52]
    roadNodes[28].adjacentRoadNodes = [1, 6, 52, 53]
    roadNodes[29].adjacentRoadNodes = [2, 7, 53, 54]
    roadNodes[30].adjacentRoadNodes = [3, 8, 54]
    roadNodes[31].adjacentRoadNodes = [4, 10, 55, 56]
    roadNodes[32].adjacentRoadNodes = [5, 11, 56, 57]
    roadNodes[33].adjacentRoadNodes = [6, 12, 57, 58]
    roadNodes[34].adjacentRoadNodes = [7, 13, 58, 59]
    roadNodes[35].adjacentRoadNodes = [8, 14, 59]
    roadNodes[36].adjacentRoadNodes = [9, 15, 60]
    roadNodes[37].adjacentRoadNodes = [10, 16, 60, 61]
    roadNodes[38].adjacentRoadNodes = [11, 17, 61, 62]
    roadNodes[39].adjacentRoadNodes = [12, 18, 62, 63]
    roadNodes[40].adjacentRoadNodes = [13, 19, 63, 64]
    roadNodes[41].adjacentRoadNodes = [15, 20, 65]
    roadNodes[42].adjacentRoadNodes = [16, 21, 65, 66]
    roadNodes[43].adjacentRoadNodes = [17, 22, 66, 67]
    roadNodes[44].adjacentRoadNodes = [18, 23, 67, 68]
    roadNodes[45].adjacentRoadNodes = [20, 69]
    roadNodes[46].adjacentRoadNodes = [21, 70, 69]
    roadNodes[47].adjacentRoadNodes = [22, 71, 70]
    roadNodes[48].adjacentRoadNodes = [0, 24]
    roadNodes[49].adjacentRoadNodes = [1, 25, 24]
    roadNodes[50].adjacentRoadNodes = [2, 26, 25]
    roadNodes[51].adjacentRoadNodes = [4, 27, 0]
    roadNodes[52].adjacentRoadNodes = [1, 5, 27, 28]
    roadNodes[53].adjacentRoadNodes = [2, 6, 28, 29]
    roadNodes[54].adjacentRoadNodes = [3, 7, 30, 29]
    roadNodes[55].adjacentRoadNodes = [4, 9, 31]
    roadNodes[56].adjacentRoadNodes = [5, 10, 31, 32]
    roadNodes[57].adjacentRoadNodes = [6, 11, 32, 33]
    roadNodes[58].adjacentRoadNodes = [7, 12, 33, 34]
    roadNodes[59].adjacentRoadNodes = [8, 13, 34, 35]
    roadNodes[60].adjacentRoadNodes = [10, 15, 36, 37]
    roadNodes[61].adjacentRoadNodes = [11, 16, 37, 38]
    roadNodes[62].adjacentRoadNodes = [12, 17, 38, 39]
    roadNodes[63].adjacentRoadNodes = [13, 18, 39, 40]
    roadNodes[64].adjacentRoadNodes = [14, 19, 40]
    roadNodes[65].adjacentRoadNodes = [16, 20, 41, 42]
    roadNodes[66].adjacentRoadNodes = [17, 21, 42, 43]
    roadNodes[67].adjacentRoadNodes = [18, 22, 43, 44]
    roadNodes[68].adjacentRoadNodes = [19, 23, 44]
    roadNodes[69].adjacentRoadNodes = [21, 45, 46]
    roadNodes[70].adjacentRoadNodes = [22, 46, 47]
    roadNodes[71].adjacentRoadNodes = [23, 47]
}

function addStaticEventListeners()
{
    document.getElementById("endTurn").addEventListener("click", function(){
        endTurn();
    });
}

function scaleUI()
{
    var dice = document.getElementById("dicePosition");
    var playerTurnText = document.getElementById("playerTurn");
    var endTurnBtn = document.getElementById("endTurn");
    console.log(screen.width);
    dice.style.left = -(screen.width * .343);
    playerTurnText.style.left = (screen.width * .11875)
    endTurnBtn.style.left = (playerTurnText.offsetLeft + 215);
}

generateBoard();
generateSettlementNodes();
generateRoadNodes();
tileTokenAssignment();
tileResourceAssignment();
settlementNodeSetup();
tileNodeSettlementAssignment();
addStaticEventListeners();
createRoadNodeObjects();
scaleUI();
roadNodeSetup();
