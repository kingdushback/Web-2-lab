const fs = require("fs");
const path = "./data.json";

fs.readFile(path, "utf8", 
            function(error,res){
                if(error) throw error;
                data = JSON.parse(res);
                data.users.sort((a, b) => {return a.id - b.id});
})

function find(users, name, email)
{
    for (var i = 0; i < users.length; ++i)
    {
        if (users[i].name == name && users[i].email == email)
        {
            return i;
        }
    }
    return -1;
}

function upd(data)
{
    data.users.sort((a, b) => {return a.id - b.id});
    var res = "{ \"users\" : [";
    for (i = 0; i < data.users.length; ++i)
    {
        res += "{\"id\" : " + data.users[i].id + ", \"name\" : \"" + data.users[i].name + "\", \"email\" : \"" + data.users[i].email + "\"}";
        if (i != data.users.length - 1)
        {
            res += ", ";
        }
    }
    res += "]}";
    fs.writeFile("./data.json", res, (err) => {if(err) throw err});
}

const router = app => {
    app.options('/users', (request, response) => {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        response.send();
    });
    app.get('/', (request, response) => {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        response.send({
            message: "Nothing here"
        });
    });
    app.get('/users', (request, response) => {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    	if (request.query.num >= data.users.length || request.query.num == undefined)
    	{
    		response.send(data);
    	}
    	else
    	{
    		res = "{ \"users\" : [";
    		for (i = 0; i < request.query.num; ++i)
    		{
    			res += "{\"id\" : " + data.users[i].id + ", \"name\" : \"" + data.users[i].name + "\", \"email\" : \"" + data.users[i].email + "\"}";
    			if (i != request.query.num - 1)
    			{
    				res += ", ";
    			}
    		}
    		res += "]}"

    		response.send(res);
    	}
	});
    app.post('/users', (request, response) => {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        data.users.sort((a, b) => {return a.id - b.id});
        var i = 0;
        for (i = 0; i < data.users.length; ++i)
        {
            if (data.users[i].id != i + 1)
            {
                break;
            }
        }
        var temp = {id: i + 1, name: request.query.name, email: request.query.email};
        data.users.push(temp);
        data.users.sort((a, b) => {return a.id - b.id});
        upd(data);
        response.send({message: 'success'});
    });
    app.delete('/users', (request, response) => {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        num = find(data.users, request.query.name, request.query.email);
        if (num == -1)
        {
           response.send({message: "No such element"});
            return;
        }
        data.users.splice(num, 1);
        upd(data);
        response.send({message: "success"});
    });
    app.put('/users', (request, response) => {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        if ( find(data.users, request.query.name, request.query.email) != -1)
        {
            response.send({message: "element already exist"});
            return;
        }
        data.users.sort((a, b) => {return a.id - b.id});
        var i = 0;
        for (i = 0; i < data.users.length; ++i)
        {
            if (data.users[i].id != i + 1)
            {
                break;
            }
        }
        var temp = {id: i + 1, name: request.query.name, email: request.query.email};
        data.users.push(temp);
        upd(data);
        response.send({message: 'success'});
    });
}

module.exports = router;
