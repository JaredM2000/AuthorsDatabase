
function authorsGet(con, res)
{
    con.query("SELECT au_id, au_lname, au_fname, phone, address, city, state, zip, if(contract=1,1,0) AS contract FROM authors", function (err, result, fields) {
        if (err) throw err;
        res.json(result);
    });
}

function authorGet(id, con, res)
{
    var sql = "SELECT au_id, au_lname, au_fname, phone, address, city, state, zip, if(contract=1,1,0) AS contract FROM authors WHERE au_id = ?"; 
    con.query(sql, [id] , function (err, result, fields) {
            if (err) throw err;
            res.json( result );
    });
}

function authorsPost(au, con, res)
{
    if(!au.au_id || !au.au_lname || !au.au_fname ||
        !au.phone || !au.address || !au.city || 
        !au.state || !au.zip) 
   {
       console.log("BAD POST authors"); 
       // https://www.bennadel.com/blog/2434-http-status-codes-for-invalid-data-400-vs-422.htm
       res.status(422).end();
   }
   else // params OK
   {
       console.log("POST authors"); 
       var sql = "INSERT INTO authors (au_id, au_fname, au_lname, phone, address, city, state, zip, contract) ";
       sql += "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"; 

       con.query(sql, [au.au_id, 
               au.au_lname, 
               au.au_fname,
               au.phone,
               au.address,
               au.city,
               au.state,
               au.zip,
               au.contract] , function (err, result) {
               if (err) throw err;
               res.send( result );
       });
   }
}

function authorsPut(au, con, res)
{
    if(au.au_id)
	{
		if(!au.au_id || !au.au_lname || !au.au_fname) 
	   {
		   console.log("BAD PUT authors"); 
		   // https://www.bennadel.com/blog/2434-http-status-codes-for-invalid-data-400-vs-422.htm
		   res.status(422).end();
	   }
	   else // params OK
	   {
		   console.log("PUT authors"); 
		   var sql = "UPDATE authors SET au_lname =?, au_fname =?, contract =? WHERE au_id = ?";
   
		   con.query(sql, [au.au_lname, 
				   au.au_fname,
				   au.contract,
				   au.au_id] , function (err, result) {
				   if (err) throw err;
				   res.send( result );
		   });
	   }
	}
}

function authorDelete(id, con, res)
{
    if(id)
	{
		console.log("Req authors: " + id); 
		var sql = "DELETE FROM authors WHERE au_id = ?"; 
		con.query(sql, [id] , function (err, result, fields) {
    			if (err) throw err;
    			res.json( result );
		});
	}
}

module.exports = { authorsGet, authorGet, authorsPost, authorsPut, authorDelete };