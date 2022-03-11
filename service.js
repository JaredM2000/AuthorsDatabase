const integrationLayer = require('./integration.js');

function errorCheck(myData){
    var AIDFormat = /^[0-9]{3}\-[0-9]{2}\-[0-9]{4}$/;
    var phoneFormat = /^[0-9]{3}\ [0-9]{3}\-[0-9]{4}$/;
    var zipFormat = /^[0-9]{5}$/
    if(!AIDFormat.test(myData.au_id))
    {
        return new Array(false,'The id does not fit the format\nPlease format it as: "XXX-XX-XXXX" \nWhere X is any number 1-9 \n');
    }
    if(!phoneFormat.test(myData.phone))
    {
        return new Array(false,'The phone number does not fit the format\nPlease format it as: "XXX XX-XXXX" \nWhere X is any number 1-9 \n');
    }
    if(!zipFormat.test(myData.zip))
    {
        return new Array(false,'The zipcode does not fit the format\nPlease format it as: "XXXXX" \nWhere X is any number 1-9 \n');
    }


    return new Array(true, "Author formatted for insertion");
}

function authorsGet(con, res)
{
    return integrationLayer.authorsGet(con, res);
}

function authorGet(id, con, res)
{
    return integrationLayer.authorGet(id, con, res);
}

function authorsPost(au, con, res)
{
    var ec = errorCheck(au)
    if(!ec[0])
    {
        res.send(ec[1]);
    }
    else
    {
        integrationLayer.authorsPost(au, con, res);
    }
}

function authorsPut(au, con, res)
{
    var ec = errorCheck(au)
    if(!ec[0])
    {
        res.send(ec[1]);
    }
    else
    {
        integrationLayer.authorsPut(au, con, res);
    }
}

function authorDelete(id, con, res)
{
    return integrationLayer.authorDelete(id, con, res);
}


module.exports = { errorCheck, authorsGet, authorGet, authorsPost, authorsPut, authorDelete };