function SendGet()
{	
	var request = new XMLHttpRequest();
	var url = "http://localhost:3002/users";
	
	if (document.getElementById("Num").checked)
	{
		url += "?num=";
		url += document.getElementById("number").value;
	}

    console.log(url);
    request.open('GET', url);
    request.responseType = 'json';
    request.send();

    request.onload = function()
    {
    	console.log(request.response); 
		var result = request.response;
		document.getElementById("results").innerHTML = "<label>Results: </label><br>";
		for (var i = 0; i < result.users.length; ++i)
		{
			document.getElementById("results").innerHTML += `
			<br><div class = \"elem\">
				<lable>Name - ${result.users[i].name}</lable><br>
				<lable>Email - ${result.users[i].email}</lable><br>
			</div>
			`
		}
    }
}

function SendPost()
{
	var request = new XMLHttpRequest();
	var url = "http://localhost:3002/users";


	url += "?name=";
	url += document.getElementById("name").value;
	url += "&email=";
	url += document.getElementById("email").value;

    console.log(url);

	request.open('POST', url);
	request.responseType = 'json';
    request.send();

    request.onload = function()
    {
    	console.log(request.response); 
    }
}

function SendDelete()
{
	var request = new XMLHttpRequest();
	var url = "http://localhost:3002/users";


	url += "?name=";
	url += document.getElementById("name").value;
	url += "&email=";
	url += document.getElementById("email").value;

    console.log(url);

	request.open('DELETE', url);
	request.responseType = 'json';
    request.send();

    request.onload = function()
    {
    	console.log(request.response); 
    }
}

function SendPut()
{
	var request = new XMLHttpRequest();
	var url = "http://localhost:3002/users";


	url += "?name=";
	url += document.getElementById("name").value;
	url += "&email=";
	url += document.getElementById("email").value;

    console.log(url);

	request.open('PUT', url);
	request.responseType = 'json';
    request.send();

    request.onload = function()
    {
    	console.log(request.response); 
    }
}