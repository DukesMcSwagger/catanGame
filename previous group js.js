// name types for hexes
var hexes = ["wood", "wood", "wood", "wood", "desert", "ore", "ore", "ore", "wool", "wool", "wool", "wool", "clay", "clay", "clay", "grain", "grain", "grain", "grain"];
// dice values for hexes
var resourceNum = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12];
// 2nd settlement id number so each player can recieve initial resources
var playersSecondSettlement = [0, 1, 2, 3, 4];
// all player totals
var players = [];
var playerTurn = 0;
var robberLocation = 0;
var robberMoveable = false;
var robberElem;
var diceRoll = 0;
var highestRoll = 0;
var firstPlacementCount = 0;
var board = "";
//board = document.getElementById("board");

// automatically starts game
window.onload = function() {
  
	createBoard();
  
};

//
//
// places hexes and roads
function createBoard() {

	for ( i = 1; i < 5; i++ ) {

		players[i] = new Player(i, 0, 0, 0, 0, 0, 0);

	}

	// enables dice and end turn buttons
	document.getElementById("rollDice").disabled = true;
	document.getElementById("endTurn").disabled = true;

	// chooses who goes first
	for ( i = 1; i < 5; i++ ) {

		diceRoll = rollDice();

		if (diceRoll > highestRoll) {

			highestRoll = diceRoll;
			playerTurn = i;
			notify("Player " + playerTurn + " goes first. " +
			"Player " + playerTurn + " place a settlement and road.");
			
		}
    
	}

	// changes color of border for starting player
	document.getElementById("player" + playerTurn).style.borderColor = "red";
	document.getElementById("player" + playerTurn).style.borderWidth = "5px";

	// builds hexes 0-2
	var top = 114; //200
	var picLeft = 17;
    var numLeft = 52;
	
	for ( i = 0; i < 3; i++) {
    
    	board += "<div id='div" + i + "'><img src='assets/images/desert.png' alt='hex' id='hex" + i + "' onclick='javascript:placeRobber(" + i + ")' style='position:absolute;top:" + top + "px;left:" + picLeft + "px;width:105px;height:90px;'></img><div class='nums' id='resourceNum" + i + "' style='position:absolute;top:" + top + "px;left:"+ numLeft + "px;'>" + i + "<img id='robber" + i + "' src='assets/images/robber.png' style='position:relative;left:-15px;width:50px;height:50px;visibility:hidden;'></img></div></div>";

    	top = top + 100;
    }
    
	// builds hexes 3-6
    top = 64; //150
    picLeft = 107;
    numLeft = 142;
    
    for ( i = 3; i < 7; i++) {
    
    	board += "<div id='div" + i + "'><img src='assets/images/desert.png' alt='hex' id='hex" + i + "' onclick='javascript:placeRobber(" + i + ")' style='position:absolute;top:" + top + "px;left:" + picLeft + "px;width:105px;height:90px;'></img><div class='nums' id='resourceNum" + i + "' style='position:absolute;top:" + top + "px;left:" + numLeft + "px;'>" + i + "<img id='robber" + i + "' src='assets/images/robber.png' style='position:relative;left:-15px;width:50px;height:50px;visibility:hidden;'></img></div></div>";

		top = top + 100;
    
    }
    
	// builds hexes 7-11
    top = 14; //100
    picLeft = 197;
    numLeft = 232;
    
    for ( i = 7; i < 12; i++) {
    
    	board += "<div id='div" + i + "'><img src='assets/images/desert.png' alt='hex' id='hex" + i + "' onclick='javascript:placeRobber(" + i + ")' style='position:absolute;top:" + top + "px;left:" + picLeft + "px;width:105px;height:90px;'></img><div class='nums' id='resourceNum" + i + "' style='position:absolute;top:" + top + "px;left:" + numLeft + "px;'>" + i + "<img id='robber" + i + "' src='assets/images/robber.png' style='position:relative;left:-15px;width:50px;height:50px;visibility:hidden;'></img></div></div>";

		top = top + 100;
    
    }
    
	// builds hexes 12-15
    top = 64; //150
    picLeft = 287;
    numLeft = 322;
    
    for ( i = 12; i < 16; i++) {
    
    	board += "<div id='div" + i + "'><img src='assets/images/desert.png' alt='hex' id='hex" + i + "' onclick='javascript:placeRobber(" + i + ")' style='position:absolute;top:" + top + "px;left:" + picLeft + "px;width:105px;height:90px;'></img><div class='nums' id='resourceNum" + i + "' style='position:absolute;top:" + top + "px;left:" + numLeft + "px;'>" + i + "<img id='robber" + i + "' src='assets/images/robber.png' style='position:relative;left:-15px;width:50px;height:50px;visibility:hidden;'></img></div></div>";

		top = top + 100;
    
    }

	// builds hexes 16-18    
    top = 114; //200
    picLeft = 377;
    numLeft = 412;
    	
    for ( i = 16; i < 19; i++) {
    
    	board += "<div id='div" + i + "'><img src='assets/images/desert.png' alt='hex' id='hex" + i + "' onclick='javascript:placeRobber(" + i + ")' style='position:absolute;top:" + top + "px;left:" + picLeft + "px;width:105px;height:90px;'></img><div class='nums' id='resourceNum" + i + "' style='position:absolute;top:" + top + "px;left:" + numLeft + "px;'>" + i + "<img id='robber" + i + "' src='assets/images/robber.png' style='position:relative;left:-15px;width:50px;height:50px;visibility:hidden;'></img></div></div>";

    	top = top + 100;
    
    }


	// builds roads 0-5
	top = 127;
    picLeft = 0;
	var rotation = 120;
    
    for ( i = 0; i < 6; i++) {
    
    	board += "<img id='road" + i + "' src='assets/images/Road" + playerTurn + ".png' onclick='javascript:selectRoad(" + i + ")' style='position:absolute;top:" + top + "px;left:" + picLeft + "px;width:50px;height:14px;transform:rotate(" + rotation + "deg);visibility:hidden;opacity:0.4;'></img>";

    	top = top + 50;
		if (rotation == 120) {

			rotation = 60;	
	
		} else {

			rotation = 120;	

		}
    
    }

	//builds roads 6-9
	top = 102;
    picLeft = 43;
    
    for ( i = 6; i < 10; i++) {
    
		board += "<img id='road" + i + "' src='assets/images/Road" + playerTurn + ".png' onclick='javascript:selectRoad(" + i + ")' style='position:absolute;top:" + top + "px;left:" + picLeft + "px;width:52px;height:14px;visibility:hidden;opacity:0.4;'></img>";

    	top = top + 100;
    
    }

	//builds roads 10-17
	top = 77;
	picLeft = 89;
	rotation = 120;
    
    for ( i = 10; i < 18; i++) {
    
    	board += "<img id='road" + i + "' src='assets/images/Road" + playerTurn + ".png' onclick='javascript:selectRoad(" + i + ")' style='position:absolute;top:" + top + "px;left:" + picLeft + "px;width:50px;height:14px;transform:rotate(" + rotation + "deg);visibility:hidden;opacity:0.4;'></img>";

    	top = top + 50;
		
		if (rotation == 120) {

			rotation = 60;	
	
		} else {

			rotation = 120;	

		}
    
    }

	//builds roads 18-22
	top = 52;
    picLeft = 133;
    
    for ( i = 18; i < 23; i++) {
    
		board += "<img id='road" + i + "' src='assets/images/Road" + playerTurn + ".png' onclick='javascript:selectRoad(" + i + ")' style='position:absolute;top:" + top + "px;left:" + picLeft + "px;width:52px;height:14px;visibility:hidden;opacity:0.4;'></img>";

    	top = top + 100;
    
    }

	//builds roads 23-32
	top = 27;
	picLeft = 179;
	rotation = 120;
    
    for ( i = 23; i < 33; i++) {
    
    	board += "<img id='road" + i + "' src='assets/images/Road" + playerTurn + ".png' onclick='javascript:selectRoad(" + i + ")' style='position:absolute;top:" + top + "px;left:" + picLeft + "px;width:50px;height:14px;transform:rotate(" + rotation + "deg);visibility:hidden;opacity:0.4;'></img>";

    	top = top + 50;
		
		if (rotation == 120) {

			rotation = 60;	
	
		} else {

			rotation = 120;	

		}
    
    }

	//builds roads 33-38
	top = 2;
    picLeft = 223;
    
    for ( i = 33; i < 39; i++) {
    
    	board += "<img id='road" + i + "' src='assets/images/Road" + playerTurn + ".png' onclick='javascript:selectRoad(" + i + ")' style='position:absolute;top:" + top + "px;left:" + picLeft + "px;width:52px;height:14px;visibility:hidden;opacity:0.4;'></img>";

    	top = top + 100;
    
    }

	//builds roads 39-48
	top = 27;
	picLeft = 270;
	rotation = 60;
    
    for ( i = 39; i < 49; i++) {
    
    	board += "<img id='road" + i + "' src='assets/images/Road" + playerTurn + ".png' onclick='javascript:selectRoad(" + i + ")' style='position:absolute;top:" + top + "px;left:" + picLeft + "px;width:50px;height:14px;transform:rotate(" + rotation + "deg);visibility:hidden;opacity:0.4;'></img>";

		top = top + 50;
		
		if (rotation == 120) {

			rotation = 60;	
	
		} else {

			rotation = 120;	

		}
    
    }

	//builds roads 49-53
	top = 52;
    picLeft = 313;
    
    for ( i = 49; i < 54; i++) {
    
    	board += "<img id='road" + i + "' src='assets/images/Road" + playerTurn + ".png' onclick='javascript:selectRoad(" + i + ")' style='position:absolute;top:" + top + "px;left:" + picLeft + "px;width:52px;height:14px;visibility:hidden;opacity:0.4;'></img>";

    	top = top + 100;
    
    }

	//builds roads 54-61
	top = 77;
	picLeft = 360;
	rotation = 60;
    
    for ( i = 54; i < 62; i++) {
    
    	board += "<img id='road" + i + "' src='assets/images/Road" + playerTurn + ".png' onclick='javascript:selectRoad(" + i + ")' style='position:absolute;top:" + top + "px;left:" + picLeft + "px;width:50px;height:14px;transform:rotate(" + rotation + "deg);visibility:hidden;opacity:0.4;'></img>";

    	top = top + 50;
		
		if (rotation == 120) {

			rotation = 60;	
	
		} else {

			rotation = 120;	

		}
    
    }

	//builds roads 62-65
	top = 102;
    picLeft = 403;
    
    for ( i = 62; i < 66; i++) {
    
    	board += "<img id='road" + i + "' src='assets/images/Road" + playerTurn + ".png' onclick='javascript:selectRoad(" + i + ")' style='position:absolute;top:" + top + "px;left:" + picLeft + "px;width:52px;height:14px;visibility:hidden;opacity:0.4;'></img>";

    	top = top + 100;
    
    }

	//builds roads 66-71
	top = 127;
	picLeft = 450;
	rotation = 60;
    
    	for ( i = 66; i < 72; i++) {
    
    		board += "<img id='road" + i + "' src='assets/images/Road" + playerTurn + ".png' onclick='javascript:selectRoad(" + i + ")' style='position:absolute;top:" + top + "px;left:" + picLeft + "px;width:50px;height:14px;transform:rotate(" + rotation + "deg);visibility:hidden;opacity:0.4;'></img>";

    		top = top + 50;
		
		if (rotation == 120) {

			rotation = 60;	
	
		} else {
	
			rotation = 120;	

		}
    
    }

	//builds settlement locations 0-6
	top = 89;
	picLeft = 22;
    
    	for ( i = 0; i < 7; i++) {
    
    		board += "<img id='settlement" + i + "' src='assets/images/Settlement" + playerTurn + ".png' onclick='javascript:selectSettlement(" + i + ")' style='position:absolute;top:" + top + "px;left:" + picLeft + "px;width:35px;height:35px;visibility:hidden;opacity:0.4;'></img>";

    		top = top + 50;
			
			if (picLeft == 22) {

				picLeft = -3;

			} else {

				picLeft = 22;

			}
    
    }

	//builds settlement locations 7-15
	top = 39;
	picLeft = 107;
    
    	for ( i = 7; i < 16; i++) {
    
    		board += "<img id='settlement" + i + "' src='assets/images/Settlement" + playerTurn + ".png' onclick='javascript:selectSettlement(" + i + ")' style='position:absolute;top:" + top + "px;left:" + picLeft + "px;width:35px;height:35px;visibility:hidden;opacity:0.4;'></img>";

    		top = top + 50;
		
		if (picLeft == 82) {

			picLeft = 107;

		} else {

			picLeft = 82;

		}
    
    }

	//builds settlement locations 16-26
	top = -11;
	picLeft = 197;
    
    	for ( i = 16; i < 27; i++) {
    
    		board += "<img id='settlement" + i + "' src='assets/images/Settlement" + playerTurn + ".png' onclick='javascript:selectSettlement(" + i + ")' style='position:absolute;top:" + top + "px;left:" + picLeft + "px;width:35px;height:35px;visibility:hidden;opacity:0.4;'></img>";

    		top = top + 50;
		
		if (picLeft == 172) {

			picLeft = 197;

		} else {

			picLeft = 172;

		}
    
    }

	//builds settlement locations 27-37
	top = -11;
	picLeft = 262;
    
    	for ( i = 27; i < 38; i++) {
    
    		board += "<img id='settlement" + i + "' src='assets/images/Settlement" + playerTurn + ".png' onclick='javascript:selectSettlement(" + i + ")' style='position:absolute;top:" + top + "px;left:" + picLeft + "px;width:35px;height:35px;visibility:hidden;opacity:0.4;'></img>";

    		top = top + 50;
		
		if (picLeft == 287) {

			picLeft = 262;

		} else {

			picLeft = 287;

		}
    
    }

	//builds settlement locations 38-46
	top = 39;
	picLeft = 352;
    
    	for ( i = 38; i < 47; i++) {
    
    		board += "<img id='settlement" + i + "' src='assets/images/Settlement" + playerTurn + ".png' onclick='javascript:selectSettlement(" + i + ")' style='position:absolute;top:" + top + "px;left:" + picLeft + "px;width:35px;height:35px;visibility:hidden;opacity:0.4;'></img>";

    		top = top + 50;
		
		if (picLeft == 377) {

			picLeft = 352;

		} else {

			picLeft = 377;

		}
    
    }

	//builds settlement locations 47-53
	top = 89;
	picLeft = 447;
    
    	for ( i = 47; i < 54; i++) {
    
    		board += "<img id='settlement" + i + "' src='assets/images/Settlement" + playerTurn + ".png' onclick='javascript:selectSettlement(" + i + ")' style='position:absolute;top:" + top + "px;left:" + picLeft + "px;width:35px;height:35px;visibility:hidden;opacity:0.4;'></img>";

    		top = top + 50;
			
			if (picLeft == 447) {

				picLeft = 472;

			} else {

				picLeft = 447;

			}
    
    }

	// shows completed board in div with id board
    document.getElementById("board").innerHTML = board;

    showSettlementOptions();
	
	// randomize the order of the arrays
	hexes.sort(function(a, b){
	
		return 0.5 - Math.random()
		
		});
	resourceNum.sort(function(a, b){
	
		return 0.5 - Math.random()
		
		});
	
	var i = 0;
	var j = 0;
	
	// builds out hexes for board
	while (i <= hexes.length) {
			
		switch ( hexes[i]) {
		
			case "wood":
				document.getElementById("hex" + i).src = "assets/images/wood.png";
				document.getElementById("hex" + i).className = "wood";
				break;
			
			case "desert":
				document.getElementById("hex" + i).src = "assets/images/desert.png";
				document.getElementById("hex" + i).className = "desert";
				break;
				
			case "ore":
				document.getElementById("hex" + i).src = "assets/images/ore.png";
				document.getElementById("hex" + i).className = "ore";
				break;
				
			case "wool":
				document.getElementById("hex" + i).src = "assets/images/wool.png";
				document.getElementById("hex" + i).className = "wool";
				break;
				
			case "clay":
				document.getElementById("hex" + i).src = "assets/images/clay.png";
				document.getElementById("hex" + i).className = "clay";
				break;
				
			case "grain":
				document.getElementById("hex" + i).src = "assets/images/grain.png";
				document.getElementById("hex" + i).className = "grain";
				break;
					
		}
		
		i++;
	
	}
	
	// random resource numbers
	while ( j < hexes.length ) {
	
		notify(j);
		// starts robber on desert hex
		if ( hexes[j] == "desert" ) {
			
			robberLocation = j;

			resourceNum.splice(j, 0, 7); // expands resourceNum array
			document.getElementById("resourceNum" + j).style.visibility = "hidden";
			document.getElementById("robber" + j).style.visibility = "visible";// "<img id='robber" + k + "' src='assets/images/robber.png' style='position:relative;width:50px;height:50px;'></img>";

		} else {
		
			document.getElementById("resourceNum" + j).innerHTML =  "" + resourceNum[j]; //+ "<img id='robber" + k + "' src='assets/images/robber.png' style='position:relative;left:-15px;width:50px;height:50px;visibility:hidden;'></img>";
			
		}
				
		j++;		
		
	}
	
	firstPlacements();	

}

//
//
// hides settlements, keeping code in case it is needed
// function hideSettlements() {

// 	for ( i = 1; i < 55; i++ ){
		
// 		document.getElementById("settlement" + i).style.visibility = "hidden";
		
// 	}
	
// }

//
//
//lets users place initial settlements and roads
function firstPlacements() {

	document.getElementById("endTurn").disabled = true;

	if (firstPlacementCount == 4 ) {

		notify("Player " + playerTurn + ", it is your turn again, place another settlement and road.");

	} else {

		notify("Player " + playerTurn + ", it is your turn, place a settlement and road.");
	
	}

	showSettlementOptions();
	
}


//
//
// shows available locations for settlements
function showSettlementOptions() {

	notify("Please place a settlement, player " + playerTurn + ".");
	
	for ( i = 0; i < 54; i++ ) {
		
		if ( i == 0 ) {

			if ( document.getElementById("settlement" + i).style.visibility != "visible" 
				&& document.getElementById("settlement" + (i+1)).style.opacity == "0.4"  
					&& document.getElementById("settlement" + (i+8)).style.opacity == "0.4" ) {
		
				document.getElementById("settlement" + i).style.visibility = "visible";
				document.getElementById("settlement" + i).style.opacity = "0.4";
				document.getElementById("settlement" + i).src = "assets/images/Settlement" + playerTurn + ".png";
			
			} 

		}

		if ( i == 1 || i == 3 || i == 5 ) {

			if ( document.getElementById("settlement" + i).style.visibility != "visible" 
				&& document.getElementById("settlement" + (i+1)).style.opacity == "0.4" 
					&& document.getElementById("settlement" + (i-1)).style.opacity == "0.4" ) {
		
				document.getElementById("settlement" + i).style.visibility = "visible";
				document.getElementById("settlement" + i).style.opacity = "0.4";
				document.getElementById("settlement" + i).src = "assets/images/Settlement" + playerTurn + ".png";
			
			} 

		}

		if ( i == 2 || i == 4 ) {

			if ( document.getElementById("settlement" + i).style.visibility != "visible" 
				&& document.getElementById("settlement" + (i+1)).style.opacity == "0.4" 
					&& document.getElementById("settlement" + (i-1)).style.opacity == "0.4"
						&& document.getElementById("settlement" + (i+8)).style.opacity == "0.4" ) {
		
				document.getElementById("settlement" + i).style.visibility = "visible";
				document.getElementById("settlement" + i).style.opacity = "0.4";
				document.getElementById("settlement" + i).src = "assets/images/Settlement" + playerTurn + ".png";
			
			} 

		}

		if ( i == 6 ) {

			if ( document.getElementById("settlement" + i).style.visibility != "visible" 
				&& document.getElementById("settlement" + (i-1)).style.opacity == "0.4"
					&& document.getElementById("settlement" + (i+8)).style.opacity == "0.4" ) {
		
				document.getElementById("settlement" + i).style.visibility = "visible";
				document.getElementById("settlement" + i).style.opacity = "0.4";
				document.getElementById("settlement" + i).src = "assets/images/Settlement" + playerTurn + ".png";
			
			} 

		}

		if ( i == 7 ) {

			if ( document.getElementById("settlement" + i).style.visibility != "visible" 
				&& document.getElementById("settlement" + (i+1)).style.opacity == "0.4"
					&& document.getElementById("settlement" + (i+10)).style.opacity == "0.4" ) {
		
				document.getElementById("settlement" + i).style.visibility = "visible";
				document.getElementById("settlement" + i).style.opacity = "0.4";
				document.getElementById("settlement" + i).src = "assets/images/Settlement" + playerTurn + ".png";
			
			} 

		}

		if ( i == 8 || i == 10 || i == 12 || i == 14 ) {

			if ( document.getElementById("settlement" + i).style.visibility != "visible" 
				&& document.getElementById("settlement" + (i-1)).style.opacity == "0.4"
					&& document.getElementById("settlement" + (i-8)).style.opacity == "0.4"
						&& document.getElementById("settlement" + (i+1)).style.opacity == "0.4" ) {
		
				document.getElementById("settlement" + i).style.visibility = "visible";
				document.getElementById("settlement" + i).style.opacity = "0.4";
				document.getElementById("settlement" + i).src = "assets/images/Settlement" + playerTurn + ".png";
			
			} 

		}

		if ( i == 9 || i == 11 || i == 13 ) {

			if ( document.getElementById("settlement" + i).style.visibility != "visible" 
				&& document.getElementById("settlement" + (i-1)).style.opacity == "0.4"
					&& document.getElementById("settlement" + (i+1)).style.opacity == "0.4"
						&& document.getElementById("settlement" + (i+10)).style.opacity == "0.4" ) {
		
				document.getElementById("settlement" + i).style.visibility = "visible";
				document.getElementById("settlement" + i).style.opacity = "0.4";
				document.getElementById("settlement" + i).src = "assets/images/Settlement" + playerTurn + ".png";
			
			} 

		}

		if ( i == 15 ) {

			if ( document.getElementById("settlement" + i).style.visibility != "visible" 
				&& document.getElementById("settlement" + (i-1)).style.opacity == "0.4"
					&& document.getElementById("settlement" + (i+10)).style.opacity == "0.4" ) {
		
				document.getElementById("settlement" + i).style.visibility = "visible";
				document.getElementById("settlement" + i).style.opacity = "0.4";
				document.getElementById("settlement" + i).src = "assets/images/Settlement" + playerTurn + ".png";
			
			} 

		}

		if ( i == 16 ) {

			if ( document.getElementById("settlement" + i).style.visibility != "visible" 
				&& document.getElementById("settlement" + (i+1)).style.opacity == "0.4"
					&& document.getElementById("settlement" + (i+11)).style.opacity == "0.4" ) {
		
				document.getElementById("settlement" + i).style.visibility = "visible";
				document.getElementById("settlement" + i).style.opacity = "0.4";
				document.getElementById("settlement" + i).src = "assets/images/Settlement" + playerTurn + ".png";
			
			} 

		}

		if ( i == 17 || i == 19 || i == 21 || i == 23 || i == 25 ) {

			if ( document.getElementById("settlement" + i).style.visibility != "visible" 
				&& document.getElementById("settlement" + (i-1)).style.opacity == "0.4"
					&& document.getElementById("settlement" + (i+1)).style.opacity == "0.4"
						&& document.getElementById("settlement" + (i-10)).style.opacity == "0.4" ) {
		
				document.getElementById("settlement" + i).style.visibility = "visible";
				document.getElementById("settlement" + i).style.opacity = "0.4";
				document.getElementById("settlement" + i).src = "assets/images/Settlement" + playerTurn + ".png";
			
			} 

		}

		if ( i == 18 || i == 20 || i == 22 || i == 24 ) {

			if ( document.getElementById("settlement" + i).style.visibility != "visible" 
				&& document.getElementById("settlement" + (i-1)).style.opacity == "0.4"
					&& document.getElementById("settlement" + (i+1)).style.opacity == "0.4"
						&& document.getElementById("settlement" + (i+11)).style.opacity == "0.4" ) {
		
				document.getElementById("settlement" + i).style.visibility = "visible";
				document.getElementById("settlement" + i).style.opacity = "0.4";
				document.getElementById("settlement" + i).src = "assets/images/Settlement" + playerTurn + ".png";
			
			} 

		}

		if ( i == 26 ) {

			if ( document.getElementById("settlement" + i).style.visibility != "visible" 
				&& document.getElementById("settlement" + (i-1)).style.opacity == "0.4"
					&& document.getElementById("settlement" + (i+11)).style.opacity == "0.4" ) {
		
				document.getElementById("settlement" + i).style.visibility = "visible";
				document.getElementById("settlement" + i).style.opacity = "0.4";
				document.getElementById("settlement" + i).src = "assets/images/Settlement" + playerTurn + ".png";
			
			} 

		}

		if ( i == 27 ) {

			if ( document.getElementById("settlement" + i).style.visibility != "visible" 
				&& document.getElementById("settlement" + (i+1)).style.opacity == "0.4"
					&& document.getElementById("settlement" + (i-11)).style.opacity == "0.4" ) {
		
				document.getElementById("settlement" + i).style.visibility = "visible";
				document.getElementById("settlement" + i).style.opacity = "0.4";
				document.getElementById("settlement" + i).src = "assets/images/Settlement" + playerTurn + ".png";
			
			} 

		}

		if ( i == 28 || i == 30 || i == 32 || i == 34 || i == 36 ) {

			if ( document.getElementById("settlement" + i).style.visibility != "visible" 
				&& document.getElementById("settlement" + (i-1)).style.opacity == "0.4"
					&& document.getElementById("settlement" + (i+1)).style.opacity == "0.4"
						&& document.getElementById("settlement" + (i+10)).style.opacity == "0.4" ) {
		
				document.getElementById("settlement" + i).style.visibility = "visible";
				document.getElementById("settlement" + i).style.opacity = "0.4";
				document.getElementById("settlement" + i).src = "assets/images/Settlement" + playerTurn + ".png";
			
			} 

		}

		if ( i == 29 || i == 31 || i == 33 || i == 35 ) {

			if ( document.getElementById("settlement" + i).style.visibility != "visible" 
				&& document.getElementById("settlement" + (i-1)).style.opacity == "0.4"
					&& document.getElementById("settlement" + (i+1)).style.opacity == "0.4"
						&& document.getElementById("settlement" + (i-11)).style.opacity == "0.4" ) {
		
				document.getElementById("settlement" + i).style.visibility = "visible";
				document.getElementById("settlement" + i).style.opacity = "0.4";
				document.getElementById("settlement" + i).src = "assets/images/Settlement" + playerTurn + ".png";
			
			} 

		}

		if ( i == 37 ) {

			if ( document.getElementById("settlement" + i).style.visibility != "visible" 
				&& document.getElementById("settlement" + (i-1)).style.opacity == "0.4"
					&& document.getElementById("settlement" + (i-11)).style.opacity == "0.4" ) {
		
				document.getElementById("settlement" + i).style.visibility = "visible";
				document.getElementById("settlement" + i).style.opacity = "0.4";
				document.getElementById("settlement" + i).src = "assets/images/Settlement" + playerTurn + ".png";
			
			} 

		}

		if ( i == 38 ) {

			if ( document.getElementById("settlement" + i).style.visibility != "visible" 
				&& document.getElementById("settlement" + (i+1)).style.opacity == "0.4"
					&& document.getElementById("settlement" + (i-10)).style.opacity == "0.4" ) {
		
				document.getElementById("settlement" + i).style.visibility = "visible";
				document.getElementById("settlement" + i).style.opacity = "0.4";
				document.getElementById("settlement" + i).src = "assets/images/Settlement" + playerTurn + ".png";
			
			} 

		}

		if ( i == 39 || i == 41 || i == 43 || i == 45 ) {

			if ( document.getElementById("settlement" + i).style.visibility != "visible" 
				&& document.getElementById("settlement" + (i-1)).style.opacity == "0.4"
					&& document.getElementById("settlement" + (i+1)).style.opacity == "0.4"
						&& document.getElementById("settlement" + (i+8)).style.opacity == "0.4" ) {
		
				document.getElementById("settlement" + i).style.visibility = "visible";
				document.getElementById("settlement" + i).style.opacity = "0.4";
				document.getElementById("settlement" + i).src = "assets/images/Settlement" + playerTurn + ".png";
			
			} 

		}

		if ( i == 40 || i == 42 || i == 44 ) {

			if ( document.getElementById("settlement" + i).style.visibility != "visible" 
				&& document.getElementById("settlement" + (i-1)).style.opacity == "0.4"
					&& document.getElementById("settlement" + (i+1)).style.opacity == "0.4"
						&& document.getElementById("settlement" + (i-10)).style.opacity == "0.4" ) {
		
				document.getElementById("settlement" + i).style.visibility = "visible";
				document.getElementById("settlement" + i).style.opacity = "0.4";
				document.getElementById("settlement" + i).src = "assets/images/Settlement" + playerTurn + ".png";
			
			} 

		}

		if ( i == 46 ) {

			if ( document.getElementById("settlement" + i).style.visibility != "visible" 
				&& document.getElementById("settlement" + (i-1)).style.opacity == "0.4"
					&& document.getElementById("settlement" + (i-10)).style.opacity == "0.4" ) {
		
				document.getElementById("settlement" + i).style.visibility = "visible";
				document.getElementById("settlement" + i).style.opacity = "0.4";
				document.getElementById("settlement" + i).src = "assets/images/Settlement" + playerTurn + ".png";
			
			} 

		}
		
		if ( i == 47 ) {

			if ( document.getElementById("settlement" + i).style.visibility != "visible" 
				&& document.getElementById("settlement" + (i+1)).style.opacity == "0.4"
					&& document.getElementById("settlement" + (i-8)).style.opacity == "0.4" ) {
		
				document.getElementById("settlement" + i).style.visibility = "visible";
				document.getElementById("settlement" + i).style.opacity = "0.4";
				document.getElementById("settlement" + i).src = "assets/images/Settlement" + playerTurn + ".png";
			
			} 

		}
		
		if ( i == 48 || i == 50 || i == 52 ) {

			if ( document.getElementById("settlement" + i).style.visibility != "visible" 
				&& document.getElementById("settlement" + (i-1)).style.opacity == "0.4"
					&& document.getElementById("settlement" + (i+1)).style.opacity == "0.4" ) {
		
				document.getElementById("settlement" + i).style.visibility = "visible";
				document.getElementById("settlement" + i).style.opacity = "0.4";
				document.getElementById("settlement" + i).src = "assets/images/Settlement" + playerTurn + ".png";
			
			}
			
		}

		if ( i == 49 || i == 51 ) {

			if ( document.getElementById("settlement" + i).style.visibility != "visible" 
				&& document.getElementById("settlement" + (i-1)).style.opacity == "0.4"
					&& document.getElementById("settlement" + (i+1)).style.opacity == "0.4"
						&& document.getElementById("settlement" + (i-8)).style.opacity == "0.4" ) {
		
				document.getElementById("settlement" + i).style.visibility = "visible";
				document.getElementById("settlement" + i).style.opacity = "0.4";
				document.getElementById("settlement" + i).src = "assets/images/Settlement" + playerTurn + ".png";
			
			} 

		}
		
		if ( i == 53 ) {

			if ( document.getElementById("settlement" + i).style.visibility != "visible" 
				&& document.getElementById("settlement" + (i-1)).style.opacity == "0.4"
					&& document.getElementById("settlement" + (i-7)).style.opacity == "0.4" ) {
		
				document.getElementById("settlement" + i).style.visibility = "visible";
				document.getElementById("settlement" + i).style.opacity = "0.4";
				document.getElementById("settlement" + i).src = "assets/images/Settlement" + playerTurn + ".png";
			
			} 
		
		}

	}

}


//
//
// shows available locations for settlements
function showRoadOptions() {

	notify("Please place a road, player " + playerTurn + ".");

	for ( i = 0; i < 54; i++ ) {

		settlementElem = document.getElementById("settlement" + i);

		if ( i == 14 ) {

			if (settlementElem.classList.contains("player" + playerTurn) == true 
				&& document.getElementById("road" + (i-5)).style.visibility != "visible") {

				document.getElementById("road" + (i-5)).style.visibility = "visible";
				document.getElementById("road" + (i-5)).style.opacity = "0.4";
				document.getElementById("road" + (i-5)).src = "assets/images/Road" + playerTurn + ".png";

			}

		}

		if ( i == 12 ) {

			if (settlementElem.classList.contains("player" + playerTurn) == true 
				&& document.getElementById("road" + (i-4)).style.visibility != "visible") {

				document.getElementById("road" + (i-4)).style.visibility = "visible";
				document.getElementById("road" + (i-4)).style.opacity = "0.4";
				document.getElementById("road" + (i-4)).src = "assets/images/Road" + playerTurn + ".png";

			}

		}

		if ( i == 10 || i == 25 ) {

			if (settlementElem.classList.contains("player" + playerTurn) == true 
				&& document.getElementById("road" + (i-3)).style.visibility != "visible") {

				document.getElementById("road" + (i-3)).style.visibility = "visible";
				document.getElementById("road" + (i-3)).style.opacity = "0.4";
				document.getElementById("road" + (i-3)).src = "assets/images/Road" + playerTurn + ".png";

			}

		}

		if ( i == 8 || i == 23 ) {

			if (settlementElem.classList.contains("player" + playerTurn) == true 
				&& document.getElementById("road" + (i-2)).style.visibility != "visible") {

				document.getElementById("road" + (i-2)).style.visibility = "visible";
				document.getElementById("road" + (i-2)).style.opacity = "0.4";
				document.getElementById("road" + (i-2)).src = "assets/images/Road" + playerTurn + ".png";

			}

		}

		if ( i >= 1 && i <= 6 || i == 21 ) {

			if (settlementElem.classList.contains("player" + playerTurn) == true 
				&& document.getElementById("road" + (i-1)).style.visibility != "visible") {

				document.getElementById("road" + (i-1)).style.visibility = "visible";
				document.getElementById("road" + (i-1)).style.opacity = "0.4";
				document.getElementById("road" + (i-1)).src = "assets/images/Road" + playerTurn + ".png";

			}

		}

		if ( i < 6 || i == 19 ) {

			if (settlementElem.classList.contains("player" + playerTurn) == true 
				&& document.getElementById("road" + i).style.visibility != "visible") {

				document.getElementById("road" + i).style.visibility = "visible";
				document.getElementById("road" + i).style.opacity = "0.4";
				document.getElementById("road" + i).src = "assets/images/Road" + playerTurn + ".png";

			}

		}

		if ( i == 17 || i == 37 ) {

			if (settlementElem.classList.contains("player" + playerTurn) == true 
				&& document.getElementById("road" + (i+1)).style.visibility != "visible") {

				document.getElementById("road" + (i+1)).style.visibility = "visible";
				document.getElementById("road" + (i+1)).style.opacity = "0.4";
				document.getElementById("road" + (i+1)).src = "assets/images/Road" + playerTurn + ".png";

			}

		}

		if ( i >= 8 && i <= 15 || i == 35 ) {

			if (settlementElem.classList.contains("player" + playerTurn) == true 
				&& document.getElementById("road" + (i+2)).style.visibility != "visible") {

				document.getElementById("road" + (i+2)).style.visibility = "visible";
				document.getElementById("road" + (i+2)).style.opacity = "0.4";
				document.getElementById("road" + (i+2)).src = "assets/images/Road" + playerTurn + ".png";

			}

		}

		if ( i >= 6 && i <= 14 || i == 33 ) {

			if (settlementElem.classList.contains("player" + playerTurn) == true 
				&& document.getElementById("road" + (i+3)).style.visibility != "visible") {

				document.getElementById("road" + (i+3)).style.visibility = "visible";
 				document.getElementById("road" + (i+3)).style.opacity = "0.4";
				document.getElementById("road" + (i+3)).src = "assets/images/Road" + playerTurn + ".png";

			}

		}

		if ( i == 4 || i == 31 ) {

			if (settlementElem.classList.contains("player" + playerTurn) == true 
				&& document.getElementById("road" + (i+4)).style.visibility != "visible") {

				document.getElementById("road" + (i+4)).style.visibility = "visible";
 				document.getElementById("road" + (i+4)).style.opacity = "0.4";
				document.getElementById("road" + (i+4)).src = "assets/images/Road" + playerTurn + ".png";

			}

		}


		if ( i == 2 || i == 29 ) {

			if (settlementElem.classList.contains("player" + playerTurn) == true 
				&& document.getElementById("road" + (i+5)).style.visibility != "visible") {

				document.getElementById("road" + (i+5)).style.visibility = "visible";
				document.getElementById("road" + (i+5)).style.opacity = "0.4";
				document.getElementById("road" + (i+5)).src = "assets/images/Road" + playerTurn + ".png";

			}

		}

		if ( i == 0 || i >= 17 && i <= 27) {

			if (settlementElem.classList.contains("player" + playerTurn) == true 
				&& document.getElementById("road" + (i+6)).style.visibility != "visible") {

				document.getElementById("road" + (i+6)).style.visibility = "visible";
				document.getElementById("road" + (i+6)).style.opacity = "0.4";
				document.getElementById("road" + (i+6)).src = "assets/images/Road" + playerTurn + ".png";

			}

		}

		if ( i >= 15 && i <= 25 || i == 46 ) {

			if (settlementElem.classList.contains("player" + playerTurn) == true 
				&& document.getElementById("road" + (i+7)).style.visibility != "visible") {

				document.getElementById("road" + (i+7)).style.visibility = "visible";
				document.getElementById("road" + (i+7)).style.opacity = "0.4";
				document.getElementById("road" + (i+7)).src = "assets/images/Road" + playerTurn + ".png";

			}

		}

		if ( i == 13 || i == 44 ) {

			if (settlementElem.classList.contains("player" + playerTurn) == true 
				&& document.getElementById("road" + (i+8)).style.visibility != "visible") {

				document.getElementById("road" + (i+8)).style.visibility = "visible";
				document.getElementById("road" + (i+8)).style.opacity = "0.4";
				document.getElementById("road" + (i+8)).src = "assets/images/Road" + playerTurn + ".png";

			}

		}

		if ( i == 11 || i == 42 ) {

			if (settlementElem.classList.contains("player" + playerTurn) == true 
				&& document.getElementById("road" + (i+9)).style.visibility != "visible") {

				document.getElementById("road" + (i+9)).style.visibility = "visible";
				document.getElementById("road" + (i+9)).style.opacity = "0.4";
				document.getElementById("road" + (i+9)).src = "assets/images/Road" + playerTurn + ".png";

			}

		}

		if ( i == 9 || i == 40 ) {

			if (settlementElem.classList.contains("player" + playerTurn) == true 
				&& document.getElementById("road" + (i+10)).style.visibility != "visible") {

				document.getElementById("road" + (i+10)).style.visibility = "visible";
				document.getElementById("road" + (i+10)).style.opacity = "0.4";
				document.getElementById("road" + (i+10)).src = "assets/images/Road" + playerTurn + ".png";

			}

		}

		if ( i == 7 || i >= 28 && i <= 38 ) {

			if (settlementElem.classList.contains("player" + playerTurn) == true 
				&& document.getElementById("road" + (i+11)).style.visibility != "visible") {

				document.getElementById("road" + (i+11)).style.visibility = "visible";
				document.getElementById("road" + (i+11)).style.opacity = "0.4";
				document.getElementById("road" + (i+11)).src = "assets/images/Road" + playerTurn + ".png";

			}

		}

		if ( i >= 26 && i <= 36 || i == 53 ) {

			if (settlementElem.classList.contains("player" + playerTurn) == true 
				&& document.getElementById("road" + (i+12)).style.visibility != "visible") {

				document.getElementById("road" + (i+12)).style.visibility = "visible";
				document.getElementById("road" + (i+12)).style.opacity = "0.4";
				document.getElementById("road" + (i+12)).src = "assets/images/Road" + playerTurn + ".png";

			}

		}

		if ( i == 24 || i == 51 ) {

			if (settlementElem.classList.contains("player" + playerTurn) == true 
				&& document.getElementById("road" + (i+13)).style.visibility != "visible") {

				document.getElementById("road" + (i+13)).style.visibility = "visible";
				document.getElementById("road" + (i+13)).style.opacity = "0.4";
				document.getElementById("road" + (i+13)).src = "assets/images/Road" + playerTurn + ".png";

			}

		}

		if ( i == 22 || i == 49 ) {

			if (settlementElem.classList.contains("player" + playerTurn) == true 
				&& document.getElementById("road" + (i+14)).style.visibility != "visible") {

				document.getElementById("road" + (i+14)).style.visibility = "visible";
				document.getElementById("road" + (i+14)).style.opacity = "0.4";
				document.getElementById("road" + (i+14)).src = "assets/images/Road" + playerTurn + ".png";

			}

		}

		if ( i == 20 || i >= 39 && i <= 47 ) {

			if (settlementElem.classList.contains("player" + playerTurn) == true 
				&& document.getElementById("road" + (i+15)).style.visibility != "visible") {

				document.getElementById("road" + (i+15)).style.visibility = "visible";
				document.getElementById("road" + (i+15)).style.opacity = "0.4";
				document.getElementById("road" + (i+15)).src = "assets/images/Road" + playerTurn + ".png";

			}

		}

		if ( i == 18 || i >= 38 && i <= 45 ) {

			if (settlementElem.classList.contains("player" + playerTurn) == true 
				&& document.getElementById("road" + (i+16)).style.visibility != "visible") {

				document.getElementById("road" + (i+16)).style.visibility = "visible";
				document.getElementById("road" + (i+16)).style.opacity = "0.4";
				document.getElementById("road" + (i+16)).src = "assets/images/Road" + playerTurn + ".png";

			}

		}

		if ( i == 16 || i == 36 ) {

			if (settlementElem.classList.contains("player" + playerTurn) == true 
				&& document.getElementById("road" + (i+17)).style.visibility != "visible") {

				document.getElementById("road" + (i+17)).style.visibility = "visible";
				document.getElementById("road" + (i+17)).style.opacity = "0.4";
				document.getElementById("road" + (i+17)).src = "assets/images/Road" + playerTurn + ".png";

			}

		}

		if ( i == 34 || i >= 48 && i <= 53 ) {

			if (settlementElem.classList.contains("player" + playerTurn) == true 
				&& document.getElementById("road" + (i+18)).style.visibility != "visible") {

				document.getElementById("road" + (i+18)).style.visibility = "visible";
				document.getElementById("road" + (i+18)).style.opacity = "0.4";
				document.getElementById("road" + (i+18)).src = "assets/images/Road" + playerTurn + ".png";

			}

		}

		if ( i == 32 || i >= 47 && i <= 52 ) {

			if (settlementElem.classList.contains("player" + playerTurn) == true 
				&& document.getElementById("road" + (i+19)).style.visibility != "visible") {

				document.getElementById("road" + (i+19)).style.visibility = "visible";
				document.getElementById("road" + (i+19)).style.opacity = "0.4";
				document.getElementById("road" + (i+19)).src = "assets/images/Road" + playerTurn + ".png";

			}

		}

		if ( i == 30 || i == 45 ) {

			if (settlementElem.classList.contains("player" + playerTurn) == true 
				&& document.getElementById("road" + (i+20)).style.visibility != "visible") {

				document.getElementById("road" + (i+20)).style.visibility = "visible";
				document.getElementById("road" + (i+20)).style.opacity = "0.4";
				document.getElementById("road" + (i+20)).src = "assets/images/Road" + playerTurn + ".png";

			}

		}

		if ( i == 28 || i == 43 ) {

			if (settlementElem.classList.contains("player" + playerTurn) == true 
				&& document.getElementById("road" + (i+21)).style.visibility != "visible") {

				document.getElementById("road" + (i+21)).style.visibility = "visible";
				document.getElementById("road" + (i+21)).style.opacity = "0.4";
				document.getElementById("road" + (i+21)).src = "assets/images/Road" + playerTurn + ".png";

			}

		}

		if ( i == 41 ) {

			if (settlementElem.classList.contains("player" + playerTurn) == true 
				&& document.getElementById("road" + (i+22)).style.visibility != "visible") {

				document.getElementById("road" + (i+22)).style.visibility = "visible";
				document.getElementById("road" + (i+22)).style.opacity = "0.4";
				document.getElementById("road" + (i+22)).src = "assets/images/Road" + playerTurn + ".png";

			}

		}

		if ( i == 39 ) {

			if (settlementElem.classList.contains("player" + playerTurn) == true 
				&& document.getElementById("road" + (i+23)).style.visibility != "visible") {

				document.getElementById("road" + (i+23)).style.visibility = "visible";
				document.getElementById("road" + (i+23)).style.opacity = "0.4";
				document.getElementById("road" + (i+23)).src = "assets/images/Road" + playerTurn + ".png";

			}

		}

	}

}


//
//	
//roll dice
function rollDice () {

	diceRoll = Math.floor(Math.random() * 11) + 2;

	var text = "";

	// if statement for a or an depending on number
	if (diceRoll == 8 || diceRoll == 11 ) {

		text = "Player " + playerTurn + " rolled an " + diceRoll + ".";

	} else {

		text = "Player " + playerTurn + " rolled a " + diceRoll + ".";
	
	}
		
	if ( diceRoll == 7 && firstPlacementCount > 7 ) {

		moveRobber(robberLocation);

	}

	notify(text);

	if ( firstPlacementCount > 7 ) {

		giveRollResources();
		document.getElementById("endTurn").disabled = false;
		document.getElementById("rollDice").disabled = true;

		notify("Do you want to build? <br/>" 
			+ "<button onclick='javascript:showSettlementOptions()'>Settlement</button> " 
			+ "<button onclick='javascript:showRoadOptions()'>Road</button>");
		
	}

	return diceRoll;
	
}


//
//
//ends turn
function endTurn() {

	// oppositte order for second round of placing settlements and roads at the begining
	// does the last player put a settlement down then take a turn?
	
	firstPlacementCount++;

	if ( firstPlacementCount > 4 && firstPlacementCount < 8 ) {
		
		playerTurn = playerTurn - 1;

		if (playerTurn == 0) {

			playerTurn = 4;

		}

		if (playerTurn == 2) {

			document.getElementById("player3").style.borderColor = "black";
			document.getElementById("player3").style.borderWidth = "";
			document.getElementById("player2").style.borderColor = "red";
			document.getElementById("player2").style.borderWidth = "5px";

			notify("Player 2's turn.");
	
		} else if (playerTurn == 3) {

			document.getElementById("player4").style.borderColor = "black";
			document.getElementById("player4").style.borderWidth = "";
			document.getElementById("player3").style.borderColor = "red";
			document.getElementById("player3").style.borderWidth = "5px";

			notify("Player 3's turn.");

		} else if (playerTurn == 4) {

			document.getElementById("player1").style.borderColor = "black";
			document.getElementById("player1").style.borderWidth = "";
			document.getElementById("player4").style.borderColor = "red";
			document.getElementById("player4").style.borderWidth = "5px";

			notify("Player 4's turn.");
	
		} else {

			playerTurn = 1;
			document.getElementById("player2").style.borderColor = "black";
			document.getElementById("player2").style.borderWidth = "";
			document.getElementById("player1").style.borderColor = "red";
			document.getElementById("player1").style.borderWidth = "5px";

			notify("Player 1's turn.");

		}

	} else if ( firstPlacementCount == 4) {
	
		// this player gets to place settlement and road twice in a row
//		firstPlacements();
		
	} else {

		//normal order of turns
		playerTurn = playerTurn + 1;
		
		if (playerTurn == 2) {

			document.getElementById("player1").style.borderColor = "black";
			document.getElementById("player1").style.borderWidth = "";
			document.getElementById("player2").style.borderColor = "red";
			document.getElementById("player2").style.borderWidth = "5px";

			notify("Player 2's turn.");
	
		} else if (playerTurn == 3) {

			document.getElementById("player2").style.borderColor = "black";
			document.getElementById("player2").style.borderWidth = "";
			document.getElementById("player3").style.borderColor = "red";
			document.getElementById("player3").style.borderWidth = "5px";

			notify("Player 3's turn.");

		} else if (playerTurn == 4) {

			document.getElementById("player3").style.borderColor = "black";
			document.getElementById("player3").style.borderWidth = "";
			document.getElementById("player4").style.borderColor = "red";
			document.getElementById("player4").style.borderWidth = "5px";

			notify("Player 4's turn.");
	
		} else {

			playerTurn = 1;
			document.getElementById("player4").style.borderColor = "black";
			document.getElementById("player4").style.borderWidth = "";
			document.getElementById("player1").style.borderColor = "red";
			document.getElementById("player1").style.borderWidth = "5px";

			notify("Player 1's turn.");

		}

	}
	
	// stops initial placements after last player has placed theirs
	if ( firstPlacementCount < 8) {

		firstPlacements();

	} else {

		// turns on roll button for next turn
		document.getElementById("rollDice").disabled = false;
		document.getElementById("endTurn").disabled = true;
		//showSettlementOptions();

	}

}


//
//
//changes color of selected road to that of current player's turn
function selectRoad(i) {

	// stops road from being clickable
	document.getElementById("road" + i).onclick = null;

	document.getElementById("road" + i).src = "assets/images/Road" + playerTurn + ".png";
	document.getElementById("road" + i).style.opacity = "1.0";

	for ( j = 0; j < 72; j++ ) {
		
		if ( j != i && document.getElementById("road" + j).style.opacity == "0.4" ) {
			
			document.getElementById("road" + j).style.visibility = "hidden";
			document.getElementById("road" + j).src = "assets/images/Road" + playerTurn + ".png";
								
		}
		
	}

	if ( firstPlacementCount < 8 ) {

		document.getElementById("endTurn").disabled = false;

	} else {
		
		giveResources();
		
	}

}

//
//
// send resources to players
function giveResources() {
		
	for ( i = 1; i < 5; i++ ) {
		
		if ( playersSecondSettlement[i] == 0 || playersSecondSettlement[i] == 1 || playersSecondSettlement[i] == 2 || playersSecondSettlement[i] == 8 || playersSecondSettlement[i] == 9 || playersSecondSettlement[i] == 10 ) {
							
				if ( document.getElementById("hex0").classList.contains("clay") == true ) {
				
					players[i].clay = players[i].clay + 1;
					
				}
				
				if ( document.getElementById("hex0").classList.contains("grain") == true ) {
				
					players[i].grain = players[i].grain + 1;
					
				}
				
				if ( document.getElementById("hex0").classList.contains("ore") == true ) {
				
					players[i].ore = players[i].ore + 1;
					
				}
				
				if ( document.getElementById("hex0").classList.contains("wood") == true ) {
				
					players[i].wood = players[i].wood + 1;
					
				}
				
				if ( document.getElementById("hex0").classList.contains("wool") == true ) {
				
					players[i].wool = players[i].wool + 1;
					
				}
			
		}

		if ( playersSecondSettlement[i] == 2 || playersSecondSettlement[i] == 3 || playersSecondSettlement[i] == 4 || playersSecondSettlement[i] == 10 || playersSecondSettlement[i] == 11 || playersSecondSettlement[i] == 12 ) {
							
				if ( document.getElementById("hex1").classList.contains("clay") == true ) {
				
					players[i].clay = players[i].clay + 1;
					
				}
				
				if ( document.getElementById("hex1").classList.contains("grain") == true ) {
				
					players[i].grain = players[i].grain + 1;
					
				}
				
				if ( document.getElementById("hex1").classList.contains("ore") == true ) {
				
					players[i].ore = players[i].ore + 1;
					
				}
				
				if ( document.getElementById("hex1").classList.contains("wood") == true ) {
				
					players[i].wood = players[i].wood + 1;
					
				}
				
				if ( document.getElementById("hex1").classList.contains("wool") == true ) {
				
					players[i].wool = players[i].wool + 1;
					
				}
			
		}

		if ( playersSecondSettlement[i] == 4 || playersSecondSettlement[i] == 5 || playersSecondSettlement[i] == 6 || playersSecondSettlement[i] == 12 || playersSecondSettlement[i] == 13 || playersSecondSettlement[i] == 14 ) {
							
				if ( document.getElementById("hex2").classList.contains("clay") == true ) {
				
					players[i].clay = players[i].clay + 1;
					
				}
				
				if ( document.getElementById("hex2").classList.contains("grain") == true ) {
				
					players[i].grain = players[i].grain + 1;
					
				}
				
				if ( document.getElementById("hex2").classList.contains("ore") == true ) {
				
					players[i].ore = players[i].ore + 1;
					
				}
				
				if ( document.getElementById("hex2").classList.contains("wood") == true ) {
				
					players[i].wood = players[i].wood + 1;
					
				}
				
				if ( document.getElementById("hex2").classList.contains("wool") == true ) {
				
					players[i].wool = players[i].wool + 1;
					
				}
			
		}

		if ( playersSecondSettlement[i] == 7 || playersSecondSettlement[i] == 8 || playersSecondSettlement[i] == 9 || playersSecondSettlement[i] == 17 || playersSecondSettlement[i] == 18 || playersSecondSettlement[i] == 19 ) {
							
				if ( document.getElementById("hex3").classList.contains("clay") == true ) {
				
					players[i].clay = players[i].clay + 1;
					
				}
				
				if ( document.getElementById("hex3").classList.contains("grain") == true ) {
				
					players[i].grain = players[i].grain + 1;
					
				}
				
				if ( document.getElementById("hex3").classList.contains("ore") == true ) {
				
					players[i].ore = players[i].ore + 1;
					
				}
				
				if ( document.getElementById("hex3").classList.contains("wood") == true ) {
				
					players[i].wood = players[i].wood + 1;
					
				}
				
				if ( document.getElementById("hex3").classList.contains("wool") == true ) {
				
					players[i].wool = players[i].wool + 1;
					
				}
	
		}

		if ( playersSecondSettlement[i] == 9 || playersSecondSettlement[i] == 10 || playersSecondSettlement[i] == 11 || playersSecondSettlement[i] == 19 || playersSecondSettlement[i] == 20 || playersSecondSettlement[i] == 21 ) {
							
				if ( document.getElementById("hex4").classList.contains("clay") == true ) {
				
					players[i].clay = players[i].clay + 1;
					
				}
				
				if ( document.getElementById("hex4").classList.contains("grain") == true ) {
				
					players[i].grain = players[i].grain + 1;
					
				}
				
				if ( document.getElementById("hex4").classList.contains("ore") == true ) {
				
					players[i].ore = players[i].ore + 1;
					
				}
				
				if ( document.getElementById("hex4").classList.contains("wood") == true ) {
				
					players[i].wood = players[i].wood + 1;
					
				}
				
				if ( document.getElementById("hex4").classList.contains("wool") == true ) {
				
					players[i].wool = players[i].wool + 1;
					
				}
			
		}

		if ( playersSecondSettlement[i] == 11 || playersSecondSettlement[i] == 12 || playersSecondSettlement[i] == 13 || playersSecondSettlement[i] == 21 || playersSecondSettlement[i] == 22 || playersSecondSettlement[i] == 23 ) {
							
				if ( document.getElementById("hex5").classList.contains("clay") == true ) {
				
					players[i].clay = players[i].clay + 1;
					
				}
				
				if ( document.getElementById("hex5").classList.contains("grain") == true ) {
				
					players[i].grain = players[i].grain + 1;
					
				}
				
				if ( document.getElementById("hex5").classList.contains("ore") == true ) {
				
					players[i].ore = players[i].ore + 1;
					
				}
				
				if ( document.getElementById("hex5").classList.contains("wood") == true ) {
				
					players[i].wood = players[i].wood + 1;
					
				}
				
				if ( document.getElementById("hex5").classList.contains("wool") == true ) {
				
					players[i].wool = players[i].wool + 1;
					
				}
			
		}

		if ( playersSecondSettlement[i] == 13 || playersSecondSettlement[i] == 14 || playersSecondSettlement[i] == 15 || playersSecondSettlement[i] == 23 || playersSecondSettlement[i] == 24 || playersSecondSettlement[i] == 25 ) {
							
				if ( document.getElementById("hex6").classList.contains("clay") == true ) {
				
					players[i].clay = players[i].clay + 1;
					
				}
				
				if ( document.getElementById("hex6").classList.contains("grain") == true ) {
				
					players[i].grain = players[i].grain + 1;
					
				}
				
				if ( document.getElementById("hex6").classList.contains("ore") == true ) {
				
					players[i].ore = players[i].ore + 1;
					
				}
				
				if ( document.getElementById("hex6").classList.contains("wood") == true ) {
				
					players[i].wood = players[i].wood + 1;
					
				}
				
				if ( document.getElementById("hex6").classList.contains("wool") == true ) {
				
					players[i].wool = players[i].wool + 1;
					
				}
			
		}

		if ( playersSecondSettlement[i] == 16 || playersSecondSettlement[i] == 17 || playersSecondSettlement[i] == 18 || playersSecondSettlement[i] == 27 || playersSecondSettlement[i] == 28 || playersSecondSettlement[i] == 29 ) {
							
				if ( document.getElementById("hex7").classList.contains("clay") == true ) {
				
					players[i].clay = players[i].clay + 1;
					
				}
				
				if ( document.getElementById("hex7").classList.contains("grain") == true ) {
				
					players[i].grain = players[i].grain + 1;
					
				}
				
				if ( document.getElementById("hex7").classList.contains("ore") == true ) {
				
					players[i].ore = players[i].ore + 1;
					
				}
				
				if ( document.getElementById("hex7").classList.contains("wood") == true ) {
				
					players[i].wood = players[i].wood + 1;
					
				}
				
				if ( document.getElementById("hex7").classList.contains("wool") == true ) {
				
					players[i].wool = players[i].wool + 1;
					
				}
			
		}

		if ( playersSecondSettlement[i] == 18 || playersSecondSettlement[i] == 19 || playersSecondSettlement[i] == 20 || playersSecondSettlement[i] == 29 || playersSecondSettlement[i] == 30 || playersSecondSettlement[i] == 31 ) {
							
				if ( document.getElementById("hex8").classList.contains("clay") == true ) {
				
					players[i].clay = players[i].clay + 1;
					
				}
				
				if ( document.getElementById("hex8").classList.contains("grain") == true ) {
				
					players[i].grain = players[i].grain + 1;
					
				}
				
				if ( document.getElementById("hex8").classList.contains("ore") == true ) {
				
					players[i].ore = players[i].ore + 1;
					
				}
				
				if ( document.getElementById("hex8").classList.contains("wood") == true ) {
				
					players[i].wood = players[i].wood + 1;
					
				}
				
				if ( document.getElementById("hex8").classList.contains("wool") == true ) {
				
					players[i].wool = players[i].wool + 1;
					
				}
			
		}

		if ( playersSecondSettlement[i] == 20 || playersSecondSettlement[i] == 21 || playersSecondSettlement[i] == 22 || playersSecondSettlement[i] == 31 || playersSecondSettlement[i] == 32 || playersSecondSettlement[i] == 33 ) {
							
				if ( document.getElementById("hex9").classList.contains("clay") == true ) {
				
					players[i].clay = players[i].clay + 1;
					
				}
				
				if ( document.getElementById("hex9").classList.contains("grain") == true ) {
				
					players[i].grain = players[i].grain + 1;
					
				}
				
				if ( document.getElementById("hex9").classList.contains("ore") == true ) {
				
					players[i].ore = players[i].ore + 1;
					
				}
				
				if ( document.getElementById("hex9").classList.contains("wood") == true ) {
				
					players[i].wood = players[i].wood + 1;
					
				}
				
				if ( document.getElementById("hex9").classList.contains("wool") == true ) {
				
					players[i].wool = players[i].wool + 1;
					
				}
			
		}

		if ( playersSecondSettlement[i] == 22 || playersSecondSettlement[i] == 23 || playersSecondSettlement[i] == 24 || playersSecondSettlement[i] == 33 || playersSecondSettlement[i] == 34 || playersSecondSettlement[i] == 35 ) {
							
				if ( document.getElementById("hex10").classList.contains("clay") == true ) {
				
					players[i].clay = players[i].clay + 1;
					
				}
				
				if ( document.getElementById("hex10").classList.contains("grain") == true ) {
				
					players[i].grain = players[i].grain + 1;
					
				}
				
				if ( document.getElementById("hex10").classList.contains("ore") == true ) {
				
					players[i].ore = players[i].ore + 1;
					
				}
				
				if ( document.getElementById("hex10").classList.contains("wood") == true ) {
				
					players[i].wood = players[i].wood + 1;
					
				}
				
				if ( document.getElementById("hex10").classList.contains("wool") == true ) {
				
					players[i].wool = players[i].wool + 1;
					
				}
			
		}

		if ( playersSecondSettlement[i] == 24 || playersSecondSettlement[i] == 25 || playersSecondSettlement[i] == 26 || playersSecondSettlement[i] == 35 || playersSecondSettlement[i] == 36 || playersSecondSettlement[i] == 37 ) {
							
				if ( document.getElementById("hex11").classList.contains("clay") == true ) {
				
					players[i].clay = players[i].clay + 1;
					
				}
				
				if ( document.getElementById("hex11").classList.contains("grain") == true ) {
				
					players[i].grain = players[i].grain + 1;
					
				}
				
				if ( document.getElementById("hex11").classList.contains("ore") == true ) {
				
					players[i].ore = players[i].ore + 1;
					
				}
				
				if ( document.getElementById("hex11").classList.contains("wood") == true ) {
				
					players[i].wood = players[i].wood + 1;
					
				}
				
				if ( document.getElementById("hex11").classList.contains("wool") == true ) {
				
					players[i].wool = players[i].wool + 1;
					
				}
			
		}

		if ( playersSecondSettlement[i] == 28 || playersSecondSettlement[i] == 29 || playersSecondSettlement[i] == 30 || playersSecondSettlement[i] == 38 || playersSecondSettlement[i] == 39 || playersSecondSettlement[i] == 40 ) {
							
				if ( document.getElementById("hex12").classList.contains("clay") == true ) {
				
					players[i].clay = players[i].clay + 1;
					
				}
				
				if ( document.getElementById("hex12").classList.contains("grain") == true ) {
				
					players[i].grain = players[i].grain + 1;
					
				}
				
				if ( document.getElementById("hex12").classList.contains("ore") == true ) {
				
					players[i].ore = players[i].ore + 1;
					
				}
				
				if ( document.getElementById("hex12").classList.contains("wood") == true ) {
				
					players[i].wood = players[i].wood + 1;
					
				}
				
				if ( document.getElementById("hex12").classList.contains("wool") == true ) {
				
					players[i].wool = players[i].wool + 1;
					
				}
			
		}

		if ( playersSecondSettlement[i] == 30 || playersSecondSettlement[i] == 31 || playersSecondSettlement[i] == 32 || playersSecondSettlement[i] == 40 || playersSecondSettlement[i] == 41 || playersSecondSettlement[i] == 42 ) {
							
				if ( document.getElementById("hex13").classList.contains("clay") == true ) {
				
					players[i].clay = players[i].clay + 1;
					
				}
				
				if ( document.getElementById("hex13").classList.contains("grain") == true ) {
				
					players[i].grain = players[i].grain + 1;
					
				}
				
				if ( document.getElementById("hex13").classList.contains("ore") == true ) {
				
					players[i].ore = players[i].ore + 1;
					
				}
				
				if ( document.getElementById("hex13").classList.contains("wood") == true ) {
				
					players[i].wood = players[i].wood + 1;
					
				}
				
				if ( document.getElementById("hex13").classList.contains("wool") == true ) {
				
					players[i].wool = players[i].wool + 1;
					
				}
			
		}

		if ( playersSecondSettlement[i] == 32 || playersSecondSettlement[i] == 33 || playersSecondSettlement[i] == 34 || playersSecondSettlement[i] == 42 || playersSecondSettlement[i] == 43 || playersSecondSettlement[i] == 44 ) {
							
				if ( document.getElementById("hex14").classList.contains("clay") == true ) {
				
					players[i].clay = players[i].clay + 1;
					
				}
				
				if ( document.getElementById("hex14").classList.contains("grain") == true ) {
				
					players[i].grain = players[i].grain + 1;
					
				}
				
				if ( document.getElementById("hex14").classList.contains("ore") == true ) {
				
					players[i].ore = players[i].ore + 1;
					
				}
				
				if ( document.getElementById("hex14").classList.contains("wood") == true ) {
				
					players[i].wood = players[i].wood + 1;
					
				}
				
				if ( document.getElementById("hex14").classList.contains("wool") == true ) {
				
					players[i].wool = players[i].wool + 1;
					
				}
			
		}

		if ( playersSecondSettlement[i] == 34 || playersSecondSettlement[i] == 35 || playersSecondSettlement[i] == 36 || playersSecondSettlement[i] == 44 || playersSecondSettlement[i] == 45 || playersSecondSettlement[i] == 46 ) {
							
				if ( document.getElementById("hex15").classList.contains("clay") == true ) {
				
					players[i].clay = players[i].clay + 1;
					
				}
				
				if ( document.getElementById("hex15").classList.contains("grain") == true ) {
				
					players[i].grain = players[i].grain + 1;
					
				}
				
				if ( document.getElementById("hex15").classList.contains("ore") == true ) {
				
					players[i].ore = players[i].ore + 1;
					
				}
				
				if ( document.getElementById("hex15").classList.contains("wood") == true ) {
				
					players[i].wood = players[i].wood + 1;
					
				}
				
				if ( document.getElementById("hex15").classList.contains("wool") == true ) {
				
					players[i].wool = players[i].wool + 1;
					
				}
			
		}

		if ( playersSecondSettlement[i] == 39 || playersSecondSettlement[i] == 40 || playersSecondSettlement[i] == 41 || playersSecondSettlement[i] == 47 || playersSecondSettlement[i] == 48 || playersSecondSettlement[i] == 49 ) {
							
				if ( document.getElementById("hex16").classList.contains("clay") == true ) {
				
					players[i].clay = players[i].clay + 1;
					
				}
				
				if ( document.getElementById("hex16").classList.contains("grain") == true ) {
				
					players[i].grain = players[i].grain + 1;
					
				}
				
				if ( document.getElementById("hex16").classList.contains("ore") == true ) {
				
					players[i].ore = players[i].ore + 1;
					
				}
				
				if ( document.getElementById("hex16").classList.contains("wood") == true ) {
				
					players[i].wood = players[i].wood + 1;
					
				}
				
				if ( document.getElementById("hex16").classList.contains("wool") == true ) {
				
					players[i].wool = players[i].wool + 1;
					
				}
			
		}

		if ( playersSecondSettlement[i] == 41 || playersSecondSettlement[i] == 42 || playersSecondSettlement[i] == 43 || playersSecondSettlement[i] == 49 || playersSecondSettlement[i] == 50 || playersSecondSettlement[i] == 51 ) {
							
				if ( document.getElementById("hex17").classList.contains("clay") == true ) {
				
					players[i].clay = players[i].clay + 1;
					
				}
				
				if ( document.getElementById("hex17").classList.contains("grain") == true ) {
				
					players[i].grain = players[i].grain + 1;
					
				}
				
				if ( document.getElementById("hex17").classList.contains("ore") == true ) {
				
					players[i].ore = players[i].ore + 1;
					
				}
				
				if ( document.getElementById("hex17").classList.contains("wood") == true ) {
				
					players[i].wood = players[i].wood + 1;
					
				}
				
				if ( document.getElementById("hex17").classList.contains("wool") == true ) {
				
					players[i].wool = players[i].wool + 1;
					
				}
			
		}

		if ( playersSecondSettlement[i] == 43 || playersSecondSettlement[i] == 44 || playersSecondSettlement[i] == 45 || playersSecondSettlement[i] == 51 || playersSecondSettlement[i] == 52 || playersSecondSettlement[i] == 53 ) {
							
				if ( document.getElementById("hex18").classList.contains("clay") == true ) {
				
					players[i].clay = players[i].clay + 1;
					
				}
				
				if ( document.getElementById("hex18").classList.contains("grain") == true ) {
				
					players[i].grain = players[i].grain + 1;
					
				}
				
				if ( document.getElementById("hex18").classList.contains("ore") == true ) {
				
					players[i].ore = players[i].ore + 1;
					
				}
				
				if ( document.getElementById("hex18").classList.contains("wood") == true ) {
				
					players[i].wood = players[i].wood + 1;
					
				}
				
				if ( document.getElementById("hex18").classList.contains("wool") == true ) {
				
					players[i].wool = players[i].wool + 1;
					
				}
			
		}
		
		notify(players[i].player + " " + players[i].clay + " " + players[i].grain + " " 
			+ players[i].ore + " " + players[i].wood + " " + players[i].wool);

		document.getElementById("rollDice").disabled = false; 

	}

	notify("Player " + playerTurn + ", play the first turn.");
	
}


//
//
// gives resources to players based on turn roll
function giveRollResources () {

	for ( i = 0; i < 19; i++ ) {

		if ( document.getElementById("resourceNum" + i).textContent == diceRoll ) {

			for ( j = 1; j < 5; j++ ) {

				if ( i == 0 && document.getElementById("settlement0").classList.contains("player" + j) == true || 
					i == 0 && document.getElementById("settlement1").classList.contains("player" + j) == true ||
					i == 0 && document.getElementById("settlement2").classList.contains("player" + j) == true ||
					i == 0 && document.getElementById("settlement8").classList.contains("player" + j) == true ||
					i == 0 && document.getElementById("settlement9").classList.contains("player" + j) == true ||
					i == 0 && document.getElementById("settlement10").classList.contains("player" + j) == true ) {

					if ( document.getElementById("hex0").classList.contains("clay") == true ) {
				
						players[j].clay = players[j].clay + 1;
					
					}
				
					if ( document.getElementById("hex0").classList.contains("grain") == true ) {
				
						players[j].grain = players[j].grain + 1;
					
					}
				
					if ( document.getElementById("hex0").classList.contains("ore") == true ) {
				
						players[j].ore = players[j].ore + 1;
					
					}
				
					if ( document.getElementById("hex0").classList.contains("wood") == true ) {
				
						players[j].wood = players[j].wood + 1;
					
					}
				
					if ( document.getElementById("hex0").classList.contains("wool") == true ) {
				
						players[j].wool = players[j].wool + 1;
					
					}

				}

				if ( i == 1 && document.getElementById("settlement2").classList.contains("player" + j) == true || 
					i == 1 && document.getElementById("settlement3").classList.contains("player" + j) == true ||
					i == 1 && document.getElementById("settlement4").classList.contains("player" + j) == true ||
					i == 1 && document.getElementById("settlement10").classList.contains("player" + j) == true ||
					i == 1 && document.getElementById("settlement11").classList.contains("player" + j) == true ||
					i == 1 && document.getElementById("settlement12").classList.contains("player" + j) == true ) {

					if ( document.getElementById("hex1").classList.contains("clay") == true ) {
				
						players[j].clay = players[j].clay + 1;
					
					}
				
					if ( document.getElementById("hex1").classList.contains("grain") == true ) {
				
						players[j].grain = players[j].grain + 1;
					
					}
				
					if ( document.getElementById("hex1").classList.contains("ore") == true ) {
				
						players[j].ore = players[j].ore + 1;
					
					}
				
					if ( document.getElementById("hex1").classList.contains("wood") == true ) {
				
						players[j].wood = players[j].wood + 1;
					
					}
				
					if ( document.getElementById("hex1").classList.contains("wool") == true ) {
				
						players[j].wool = players[j].wool + 1;
					
					}

				}

				if ( i == 2 && document.getElementById("settlement4").classList.contains("player" + j) == true || 
					i == 2 && document.getElementById("settlement5").classList.contains("player" + j) == true ||
					i == 2 && document.getElementById("settlement6").classList.contains("player" + j) == true ||
					i == 2 && document.getElementById("settlement12").classList.contains("player" + j) == true ||
					i == 2 && document.getElementById("settlement13").classList.contains("player" + j) == true ||
					i == 2 && document.getElementById("settlement14").classList.contains("player" + j) == true ) {

					if ( document.getElementById("hex2").classList.contains("clay") == true ) {
				
						players[j].clay = players[j].clay + 1;
					
					}
				
					if ( document.getElementById("hex2").classList.contains("grain") == true ) {
				
						players[j].grain = players[j].grain + 1;
					
					}
				
					if ( document.getElementById("hex2").classList.contains("ore") == true ) {
				
						players[j].ore = players[j].ore + 1;
					
					}
				
					if ( document.getElementById("hex2").classList.contains("wood") == true ) {
				
						players[j].wood = players[j].wood + 1;
					
					}
				
					if ( document.getElementById("hex2").classList.contains("wool") == true ) {
				
						players[j].wool = players[j].wool + 1;
					
					}

				}

				if ( i == 3 && document.getElementById("settlement7").classList.contains("player" + j) == true || 
					i == 3 && document.getElementById("settlement8").classList.contains("player" + j) == true ||
					i == 3 && document.getElementById("settlement9").classList.contains("player" + j) == true ||
					i == 3 && document.getElementById("settlement17").classList.contains("player" + j) == true ||
					i == 3 && document.getElementById("settlement18").classList.contains("player" + j) == true ||
					i == 3 && document.getElementById("settlement19").classList.contains("player" + j) == true ) {

					if ( document.getElementById("hex3").classList.contains("clay") == true ) {
				
						players[j].clay = players[j].clay + 1;
					
					}
				
					if ( document.getElementById("hex3").classList.contains("grain") == true ) {
				
						players[j].grain = players[j].grain + 1;
					
					}
				
					if ( document.getElementById("hex3").classList.contains("ore") == true ) {
				
						players[j].ore = players[j].ore + 1;
					
					}
				
					if ( document.getElementById("hex3").classList.contains("wood") == true ) {
				
						players[j].wood = players[j].wood + 1;
					
					}
				
					if ( document.getElementById("hex3").classList.contains("wool") == true ) {
				
						players[j].wool = players[j].wool + 1;
					
					}

				}

				if ( i == 4 && document.getElementById("settlement9").classList.contains("player" + j) == true || 
					i == 4 && document.getElementById("settlement10").classList.contains("player" + j) == true ||
					i == 4 && document.getElementById("settlement11").classList.contains("player" + j) == true ||
					i == 4 && document.getElementById("settlement19").classList.contains("player" + j) == true ||
					i == 4 && document.getElementById("settlement20").classList.contains("player" + j) == true ||
					i == 4 && document.getElementById("settlement21").classList.contains("player" + j) == true ) {

					if ( document.getElementById("hex4").classList.contains("clay") == true ) {
				
						players[j].clay = players[j].clay + 1;
					
					}
				
					if ( document.getElementById("hex4").classList.contains("grain") == true ) {
				
						players[j].grain = players[j].grain + 1;
					
					}
				
					if ( document.getElementById("hex4").classList.contains("ore") == true ) {
				
						players[j].ore = players[j].ore + 1;
					
					}
				
					if ( document.getElementById("hex4").classList.contains("wood") == true ) {
				
						players[j].wood = players[j].wood + 1;
					
					}
				
					if ( document.getElementById("hex4").classList.contains("wool") == true ) {
				
						players[j].wool = players[j].wool + 1;
					
					}

				}

				if ( i == 5 && document.getElementById("settlement11").classList.contains("player" + j) == true || 
					i == 5 && document.getElementById("settlement12").classList.contains("player" + j) == true ||
					i == 5 && document.getElementById("settlement13").classList.contains("player" + j) == true ||
					i == 5 && document.getElementById("settlement21").classList.contains("player" + j) == true ||
					i == 5 && document.getElementById("settlement22").classList.contains("player" + j) == true ||
					i == 5 && document.getElementById("settlement23").classList.contains("player" + j) == true ) {

					if ( document.getElementById("hex5").classList.contains("clay") == true ) {
				
						players[j].clay = players[j].clay + 1;
					
					}
				
					if ( document.getElementById("hex5").classList.contains("grain") == true ) {
				
						players[j].grain = players[j].grain + 1;
					
					}
				
					if ( document.getElementById("hex5").classList.contains("ore") == true ) {
				
						players[j].ore = players[j].ore + 1;
					
					}
				
					if ( document.getElementById("hex5").classList.contains("wood") == true ) {
				
						players[j].wood = players[j].wood + 1;
					
					}
				
					if ( document.getElementById("hex5").classList.contains("wool") == true ) {
				
						players[j].wool = players[j].wool + 1;
					
					}

				}

				if ( i == 6 && document.getElementById("settlement13").classList.contains("player" + j) == true || 
					i == 6 && document.getElementById("settlement14").classList.contains("player" + j) == true ||
					i == 6 && document.getElementById("settlement15").classList.contains("player" + j) == true ||
					i == 6 && document.getElementById("settlement23").classList.contains("player" + j) == true ||
					i == 6 && document.getElementById("settlement24").classList.contains("player" + j) == true ||
					i == 6 && document.getElementById("settlement25").classList.contains("player" + j) == true ) {

					if ( document.getElementById("hex6").classList.contains("clay") == true ) {
				
						players[j].clay = players[j].clay + 1;
					
					}
				
					if ( document.getElementById("hex6").classList.contains("grain") == true ) {
				
						players[j].grain = players[j].grain + 1;
					
					}
				
					if ( document.getElementById("hex6").classList.contains("ore") == true ) {
				
						players[j].ore = players[j].ore + 1;
					
					}
				
					if ( document.getElementById("hex6").classList.contains("wood") == true ) {
				
						players[j].wood = players[j].wood + 1;
					
					}
				
					if ( document.getElementById("hex6").classList.contains("wool") == true ) {
				
						players[j].wool = players[j].wool + 1;
					
					}

				}

				if ( i == 7 && document.getElementById("settlement16").classList.contains("player" + j) == true || 
					i == 7 && document.getElementById("settlement17").classList.contains("player" + j) == true ||
					i == 7 && document.getElementById("settlement18").classList.contains("player" + j) == true ||
					i == 7 && document.getElementById("settlement27").classList.contains("player" + j) == true ||
					i == 7 && document.getElementById("settlement28").classList.contains("player" + j) == true ||
					i == 7 && document.getElementById("settlement29").classList.contains("player" + j) == true ) {

					if ( document.getElementById("hex7").classList.contains("clay") == true ) {
				
						players[j].clay = players[j].clay + 1;
					
					}
				
					if ( document.getElementById("hex7").classList.contains("grain") == true ) {
				
						players[j].grain = players[j].grain + 1;
					
					}
				
					if ( document.getElementById("hex7").classList.contains("ore") == true ) {
				
						players[j].ore = players[j].ore + 1;
					
					}
				
					if ( document.getElementById("hex7").classList.contains("wood") == true ) {
				
						players[j].wood = players[j].wood + 1;
					
					}
				
					if ( document.getElementById("hex7").classList.contains("wool") == true ) {
				
						players[j].wool = players[j].wool + 1;
					
					}

				}

				if ( i == 8 && document.getElementById("settlement18").classList.contains("player" + j) == true || 
					i == 8 && document.getElementById("settlement19").classList.contains("player" + j) == true ||
					i == 8 && document.getElementById("settlement20").classList.contains("player" + j) == true ||
					i == 8 && document.getElementById("settlement29").classList.contains("player" + j) == true ||
					i == 8 && document.getElementById("settlement30").classList.contains("player" + j) == true ||
					i == 8 && document.getElementById("settlement31").classList.contains("player" + j) == true ) {

					if ( document.getElementById("hex8").classList.contains("clay") == true ) {
				
						players[j].clay = players[j].clay + 1;
					
					}
				
					if ( document.getElementById("hex8").classList.contains("grain") == true ) {
				
						players[j].grain = players[j].grain + 1;
					
					}
				
					if ( document.getElementById("hex8").classList.contains("ore") == true ) {
				
						players[j].ore = players[j].ore + 1;
					
					}
				
					if ( document.getElementById("hex8").classList.contains("wood") == true ) {
				
						players[j].wood = players[j].wood + 1;
					
					}
				
					if ( document.getElementById("hex8").classList.contains("wool") == true ) {
				
						players[j].wool = players[j].wool + 1;
					
					}

				}

				if ( i == 9 && document.getElementById("settlement20").classList.contains("player" + j) == true || 
					i == 9 && document.getElementById("settlement21").classList.contains("player" + j) == true ||
					i == 9 && document.getElementById("settlement22").classList.contains("player" + j) == true ||
					i == 9 && document.getElementById("settlement31").classList.contains("player" + j) == true ||
					i == 9 && document.getElementById("settlement32").classList.contains("player" + j) == true ||
					i == 9 && document.getElementById("settlement33").classList.contains("player" + j) == true ) {

					if ( document.getElementById("hex9").classList.contains("clay") == true ) {
				
						players[j].clay = players[j].clay + 1;
					
					}
				
					if ( document.getElementById("hex9").classList.contains("grain") == true ) {
				
						players[j].grain = players[j].grain + 1;
					
					}
				
					if ( document.getElementById("hex9").classList.contains("ore") == true ) {
				
						players[j].ore = players[j].ore + 1;
					
					}
				
					if ( document.getElementById("hex9").classList.contains("wood") == true ) {
				
						players[j].wood = players[j].wood + 1;
					
					}
				
					if ( document.getElementById("hex9").classList.contains("wool") == true ) {
				
						players[j].wool = players[j].wool + 1;
					
					}

				}

				if ( i == 10 && document.getElementById("settlement22").classList.contains("player" + j) == true || 
					i == 10 && document.getElementById("settlement23").classList.contains("player" + j) == true ||
					i == 10 && document.getElementById("settlement24").classList.contains("player" + j) == true ||
					i == 10 && document.getElementById("settlement33").classList.contains("player" + j) == true ||
					i == 10 && document.getElementById("settlement34").classList.contains("player" + j) == true ||
					i == 10 && document.getElementById("settlement35").classList.contains("player" + j) == true ) {

					if ( document.getElementById("hex10").classList.contains("clay") == true ) {
				
						players[j].clay = players[j].clay + 1;
					
					}
				
					if ( document.getElementById("hex10").classList.contains("grain") == true ) {
				
						players[j].grain = players[j].grain + 1;
					
					}
				
					if ( document.getElementById("hex10").classList.contains("ore") == true ) {
				
						players[j].ore = players[j].ore + 1;
					
					}
				
					if ( document.getElementById("hex10").classList.contains("wood") == true ) {
				
						players[j].wood = players[j].wood + 1;
					
					}
				
					if ( document.getElementById("hex10").classList.contains("wool") == true ) {
				
						players[j].wool = players[j].wool + 1;
					
					}

				}

				if ( i == 11 && document.getElementById("settlement24").classList.contains("player" + j) == true || 
					i == 11 && document.getElementById("settlement25").classList.contains("player" + j) == true ||
					i == 11 && document.getElementById("settlement26").classList.contains("player" + j) == true ||
					i == 11 && document.getElementById("settlement35").classList.contains("player" + j) == true ||
					i == 11 && document.getElementById("settlement36").classList.contains("player" + j) == true ||
					i == 11 && document.getElementById("settlement37").classList.contains("player" + j) == true ) {

					if ( document.getElementById("hex11").classList.contains("clay") == true ) {
				
						players[j].clay = players[j].clay + 1;
					
					}
				
					if ( document.getElementById("hex11").classList.contains("grain") == true ) {
				
						players[j].grain = players[j].grain + 1;
					
					}
				
					if ( document.getElementById("hex11").classList.contains("ore") == true ) {
				
						players[j].ore = players[j].ore + 1;
					
					}
				
					if ( document.getElementById("hex11").classList.contains("wood") == true ) {
				
						players[j].wood = players[j].wood + 1;
					
					}
				
					if ( document.getElementById("hex11").classList.contains("wool") == true ) {
				
						players[j].wool = players[j].wool + 1;
					
					}

				}

				if ( i == 12 && document.getElementById("settlement28").classList.contains("player" + j) == true || 
					i == 12 && document.getElementById("settlement29").classList.contains("player" + j) == true ||
					i == 12 && document.getElementById("settlement30").classList.contains("player" + j) == true ||
					i == 12 && document.getElementById("settlement38").classList.contains("player" + j) == true ||
					i == 12 && document.getElementById("settlement39").classList.contains("player" + j) == true ||
					i == 12 && document.getElementById("settlement40").classList.contains("player" + j) == true ) {

					if ( document.getElementById("hex12").classList.contains("clay") == true ) {
				
						players[j].clay = players[j].clay + 1;
					
					}
				
					if ( document.getElementById("hex12").classList.contains("grain") == true ) {
				
						players[j].grain = players[j].grain + 1;
					
					}
				
					if ( document.getElementById("hex12").classList.contains("ore") == true ) {
				
						players[j].ore = players[j].ore + 1;
					
					}
				
					if ( document.getElementById("hex12").classList.contains("wood") == true ) {
				
						players[j].wood = players[j].wood + 1;
					
					}
				
					if ( document.getElementById("hex12").classList.contains("wool") == true ) {
				
						players[j].wool = players[j].wool + 1;
					
					}

				}

				if ( i == 13 && document.getElementById("settlement30").classList.contains("player" + j) == true || 
					i == 13 && document.getElementById("settlement31").classList.contains("player" + j) == true ||
					i == 13 && document.getElementById("settlement32").classList.contains("player" + j) == true ||
					i == 13 && document.getElementById("settlement40").classList.contains("player" + j) == true ||
					i == 13 && document.getElementById("settlement41").classList.contains("player" + j) == true ||
					i == 13 && document.getElementById("settlement42").classList.contains("player" + j) == true ) {

					if ( document.getElementById("hex13").classList.contains("clay") == true ) {
				
						players[j].clay = players[j].clay + 1;
					
					}
				
					if ( document.getElementById("hex13").classList.contains("grain") == true ) {
				
						players[j].grain = players[j].grain + 1;
					
					}
				
					if ( document.getElementById("hex13").classList.contains("ore") == true ) {
				
						players[j].ore = players[j].ore + 1;
					
					}
				
					if ( document.getElementById("hex13").classList.contains("wood") == true ) {
				
						players[j].wood = players[j].wood + 1;
					
					}
				
					if ( document.getElementById("hex13").classList.contains("wool") == true ) {
				
						players[j].wool = players[j].wool + 1;
					
					}

				}

				if ( i == 14 && document.getElementById("settlement32").classList.contains("player" + j) == true || 
					i == 14 && document.getElementById("settlement33").classList.contains("player" + j) == true ||
					i == 14 && document.getElementById("settlement34").classList.contains("player" + j) == true ||
					i == 14 && document.getElementById("settlement42").classList.contains("player" + j) == true ||
					i == 14 && document.getElementById("settlement43").classList.contains("player" + j) == true ||
					i == 14 && document.getElementById("settlement44").classList.contains("player" + j) == true ) {

					if ( document.getElementById("hex14").classList.contains("clay") == true ) {
				
						players[j].clay = players[j].clay + 1;
					
					}
				
					if ( document.getElementById("hex14").classList.contains("grain") == true ) {
				
						players[j].grain = players[j].grain + 1;
					
					}
				
					if ( document.getElementById("hex14").classList.contains("ore") == true ) {
				
						players[j].ore = players[j].ore + 1;
					
					}
				
					if ( document.getElementById("hex14").classList.contains("wood") == true ) {
				
						players[j].wood = players[j].wood + 1;
					
					}
				
					if ( document.getElementById("hex14").classList.contains("wool") == true ) {
				
						players[j].wool = players[j].wool + 1;
					
					}

				}

				if ( i == 15 && document.getElementById("settlement34").classList.contains("player" + j) == true || 
					i == 15 && document.getElementById("settlement35").classList.contains("player" + j) == true ||
					i == 15 && document.getElementById("settlement36").classList.contains("player" + j) == true ||
					i == 15 && document.getElementById("settlement44").classList.contains("player" + j) == true ||
					i == 15 && document.getElementById("settlement45").classList.contains("player" + j) == true ||
					i == 15 && document.getElementById("settlement46").classList.contains("player" + j) == true ) {

					if ( document.getElementById("hex15").classList.contains("clay") == true ) {
				
						players[j].clay = players[j].clay + 1;
					
					}
				
					if ( document.getElementById("hex15").classList.contains("grain") == true ) {
				
						players[j].grain = players[j].grain + 1;
					
					}
				
					if ( document.getElementById("hex15").classList.contains("ore") == true ) {
				
						players[j].ore = players[j].ore + 1;
					
					}
				
					if ( document.getElementById("hex15").classList.contains("wood") == true ) {
				
						players[j].wood = players[j].wood + 1;
					
					}
				
					if ( document.getElementById("hex15").classList.contains("wool") == true ) {
				
						players[j].wool = players[j].wool + 1;
					
					}

				}

				if ( i == 16 && document.getElementById("settlement39").classList.contains("player" + j) == true || 
					i == 16 && document.getElementById("settlement40").classList.contains("player" + j) == true ||
					i == 16 && document.getElementById("settlement41").classList.contains("player" + j) == true ||
					i == 16 && document.getElementById("settlement47").classList.contains("player" + j) == true ||
					i == 16 && document.getElementById("settlement48").classList.contains("player" + j) == true ||
					i == 16 && document.getElementById("settlement49").classList.contains("player" + j) == true ) {

					if ( document.getElementById("hex16").classList.contains("clay") == true ) {
				
						players[j].clay = players[j].clay + 1;
					
					}
				
					if ( document.getElementById("hex16").classList.contains("grain") == true ) {
				
						players[j].grain = players[j].grain + 1;
					
					}
				
					if ( document.getElementById("hex16").classList.contains("ore") == true ) {
				
						players[j].ore = players[j].ore + 1;
					
					}
				
					if ( document.getElementById("hex16").classList.contains("wood") == true ) {
				
						players[j].wood = players[j].wood + 1;
					
					}
				
					if ( document.getElementById("hex16").classList.contains("wool") == true ) {
				
						players[j].wool = players[j].wool + 1;
					
					}

				}

				if ( i == 17 && document.getElementById("settlement41").classList.contains("player" + j) == true || 
					i == 17 && document.getElementById("settlement42").classList.contains("player" + j) == true ||
					i == 17 && document.getElementById("settlement43").classList.contains("player" + j) == true ||
					i == 17 && document.getElementById("settlement49").classList.contains("player" + j) == true ||
					i == 17 && document.getElementById("settlement50").classList.contains("player" + j) == true ||
					i == 17 && document.getElementById("settlement51").classList.contains("player" + j) == true ) {

					if ( document.getElementById("hex17").classList.contains("clay") == true ) {
				
						players[j].clay = players[j].clay + 1;
					
					}
				
					if ( document.getElementById("hex17").classList.contains("grain") == true ) {
				
						players[j].grain = players[j].grain + 1;
					
					}
				
					if ( document.getElementById("hex17").classList.contains("ore") == true ) {
				
						players[j].ore = players[j].ore + 1;
					
					}
				
					if ( document.getElementById("hex17").classList.contains("wood") == true ) {
				
						players[j].wood = players[j].wood + 1;
					
					}
				
					if ( document.getElementById("hex17").classList.contains("wool") == true ) {
				
						players[j].wool = players[j].wool + 1;
					
					}

				}

				if ( i == 18 && document.getElementById("settlement43").classList.contains("player" + j) == true || 
					i == 18 && document.getElementById("settlement44").classList.contains("player" + j) == true ||
					i == 18 && document.getElementById("settlement45").classList.contains("player" + j) == true ||
					i == 18 && document.getElementById("settlement51").classList.contains("player" + j) == true ||
					i == 18 && document.getElementById("settlement52").classList.contains("player" + j) == true ||
					i == 18 && document.getElementById("settlement53").classList.contains("player" + j) == true ) {

					if ( document.getElementById("hex18").classList.contains("clay") == true ) {
				
						players[j].clay = players[j].clay + 1;
					
					}
				
					if ( document.getElementById("hex18").classList.contains("grain") == true ) {
				
						players[j].grain = players[j].grain + 1;
					
					}
				
					if ( document.getElementById("hex18").classList.contains("ore") == true ) {
				
						players[j].ore = players[j].ore + 1;
					
					}
				
					if ( document.getElementById("hex18").classList.contains("wood") == true ) {
				
						players[j].wood = players[j].wood + 1;
					
					}
				
					if ( document.getElementById("hex18").classList.contains("wool") == true ) {
				
						players[j].wool = players[j].wool + 1;
					
					}

				}

			}

		}

	}

	for ( i = 1; i < 5; i++ ) {

		notify(players[i].player + " " + players[i].clay + " " 
					+ players[i].grain + " " + players[i].ore + " " + players[i].wood 
					+ " " + players[i].wool);

	}

}


//
//
// Player object to store resource values
function Player(player, clay, grain, ore, wood, wool, vp) {

	this.player = player;
	this.clay = clay;
	this.grain = grain;
	this.ore = ore;
	this.wood = wood;
	this.wool = wool;
	this.vp = vp;

}



//
//
//places settlement
function selectSettlement(i) {

	// stops settlement from being clickable
	document.getElementById("settlement" + i).onclick = null;
		
	for ( j = 0; j < 54; j++ ) {
		
		if ( j != i && document.getElementById("settlement" + j).style.opacity == "0.4" ) {
			
			document.getElementById("settlement" + i).style.opacity = "1.0";
			document.getElementById("settlement" + i).classList.add("player" + playerTurn);
			document.getElementById("settlement" + j).style.visibility = "hidden";
			document.getElementById("settlement" + j).src = "assets/images/Settlement" + playerTurn + ".png";
								
		}
		
	}
	
	if ( firstPlacementCount >= 4 && firstPlacementCount <= 8 ) {
		
		playersSecondSettlement[playerTurn] = i;
		showRoadOptions();
		
	}

	if ( firstPlacementCount < 9) {

	showRoadOptions();

	} 

}


//
//
//moves robber --Should this be automatic or chosen by player?--
function moveRobber(robberLocation) {

	document.getElementById("robber" + robberLocation).style.visibility = "hidden";
	document.getElementById("endTurn").disabled = true;

	robberMoveable = true;

}


//
//
//places robber at selection
function placeRobber(i) {

	robberElem = document.getElementById("robber" + i);

	if ( robberMoveable == true ) {

		robberElem.style.visibility = "visible";
		robberElem.src = "assets/images/robber.png";		
		robberLocation = i;
		robberMoveable = false;
		document.getElementById("endTurn").disabled = false;

	}
	
}


//
//
// building cost card
function buildingCost() {

	buildingCostElem = document.getElementById("buildingCostImage");
	boardElem = document.getElementById("board");

	if (buildingCostElem.style.visibility == "hidden") {

		buildingCostElem.style.visibility = "visible";
		buildingCostElem.style.zIndex = "1";
		boardElem.style.filter = "blur(5px)";
	
	} else {

		buildingCostElem.style.visibility = "hidden";
		buildingCostElem.style.zIndex = "";
		boardElem.style.filter = "blur(0px)";

	}

}


//
//
// keeps players updated
function notify(string) {

	var text = document.getElementById("notifications");
	text.insertAdjacentHTML("afterbegin", string + "<br/><br/>");			

}

// used to check coordinates on the screen
// function showCoords(event) {
    // var x = event.clientX;
    // var y = event.clientY;
    // var coords = "X coords: " + x + ", Y coords: " + y;
    // document.getElementById("diceRoll").innerHTML = coords;
// }
