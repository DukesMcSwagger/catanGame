function getDiceTotal(_diceTotal)
{
    let roll = _diceTotal
    distributeResources(roll);
}

function distributeResources(_roll)
{
    for (let i = 0; i < 19; i++)
    {
        if (_roll == tiles[i].tokenNumber)
        {
            console.log("giving " + tiles[i].resource + " to settlement nodes: ")
            for (let j = 0; j < tiles[i].settlementNodes.length; j++)
            {
                console.log(tiles[i].settlementNodes[j]);
            }
        }
    }
}