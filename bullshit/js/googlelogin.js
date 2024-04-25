var YOUR_CLIENT_ID = '251632704340-s28es5e4fo5an0nms1urjc0tr0qalpob.apps.googleusercontent.com';
var YOUR_REDIRECT_URI = 'https://emersa.io';
var fragmentString = location.hash.substring(1);

// Parse query string to see if page request is coming from OAuth 2.0 server.
var params = {};
var regex = /([^&=]+)=([^&]*)/g, m;
while (m = regex.exec(fragmentString)) {
  params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
}
if (Object.keys(params).length > 0) {
  localStorage.setItem('oauth2-test-params', JSON.stringify(params) );
  if (params['state'] && params['state'] == 'try_sample_request') {
    trySampleRequest();
  }
}


function trySampleRequest1(){
 // window.location.href("https://apps.emersa.io:8083/auth/google");
  window.open("https://apps.emersa.io:8083/auth/google", "_self");
}
// If there's an access token, try an API request.
// Otherwise, start OAuth 2.0 flow.
function trySampleRequest() {
  var params = JSON.parse(localStorage.getItem('oauth2-test-params'));
  if (params && params['access_token']) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET',
        'https://www.googleapis.com/drive/v3/about?fields=user&' +
        'access_token=' + params['access_token']);
    xhr.onreadystatechange = function (e) {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.response);
      } else if (xhr.readyState === 4 && xhr.status === 401) {
        // Token invalid, so prompt for user permission.
        oauth2SignIn();
      }
    };
    xhr.send(null);
  } else {
    oauth2SignIn();
  }
}

/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
function oauth2SignIn() {
  // Google's OAuth 2.0 endpoint for requesting an access token
  var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  // Create element to open OAuth 2.0 endpoint in new window.
  var form = document.createElement('form');
  form.setAttribute('method', 'GET'); // Send as a GET request.
  form.setAttribute('action', oauth2Endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.
  var params = {'client_id': YOUR_CLIENT_ID,
                'redirect_uri': YOUR_REDIRECT_URI,
                'scope': 'https://www.googleapis.com/auth/userinfo.email',
                'state': 'try_sample_request',
                'include_granted_scopes': 'true',
                'response_type': 'token'};

  // Add form parameters as hidden input values.
  for (var p in params) {
    var input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', p);
    input.setAttribute('value', params[p]);
    form.appendChild(input);
  }

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit();
}

$(document).ready(function() {
	$('#login').on('click', function() {
		$("#login_form").show();
		$("#register_form").hide();
    $("#login_social").hide();
	});
	$('#register').on('click', function() {
		$("#register_form").show();
		$("#login_form").hide();
	});
	$('#butsave').on('click', function() {
		$("#butsave").attr("disabled", "disabled");
		var username = $('#username').val();
		var email = $('#email').val();
		var phone = $('#phone').val();
		var city = $('#city').val();
		var password = $('#password').val();
		if(username!="" && email!="" && phone!="" && password!="" ){
	
			  //  const userName = document.getElementById('name').value;
        // const url = 'https://jsonplaceholder.typicode.com/posts';
        // Add your code below this line
        let url = 'https://membershipapi.onrender.com/api/auth/signup';
            let req = new XMLHttpRequest();

            console.log(req);
            req.open('POST', url, true);
            req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            req.onreadystatechange = () =>{
                if(req.readyState === 4 && req.status === 201){
                    
                    let object = JSON.parse(req.responseText)
                    console.log(object);
                }
                if(req.status === 200){
                    let object = JSON.parse(req.responseText)
                    console.log(object);
                    document.getElementById("messagebox1").innerHTML = object.message;
            }
            }
            var number = {
           email: document.getElementById('email').value,
           username: document.getElementById('username').value, 
           password: document.getElementById('password').value
         }
            let body = JSON.stringify(number);
            req.send(body);
            let dude = req.responseText;
            console.log(dude);
          //  let jsonResponse = req.response;
           // document.getElementById("messagebox").innerHTML = dude.responseText;
        // Add your code above this line

		}
		else{
			alert('Please fill all the field !');
		}
	});
	$('#butlogin').on('click', function() {
		var email = $('#email_log').val();
		var password = $('#password_log').val();
		if(email!="" && password!="" ){
			

		  //  const userName = document.getElementById('name').value;
        // const url = 'https://jsonplaceholder.typicode.com/posts';
        // Add your code below this line
        let url = 'https://apps.emersa.io:8083/api/auth/signin';
            let req = new XMLHttpRequest();

            console.log(req);
            req.open('POST', url, true);
            req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            req.onreadystatechange = () =>{
                if(req.readyState === 4 && req.status === 201){
                    
                    let object = JSON.parse(req.responseText)
                    console.log(object);
                }
                if(req.status === 200){
                    let object = JSON.parse(req.responseText)
                    console.log(object);
                    document.getElementById("messagebox").innerHTML = object.message;
					function setCookie(cName, cValue, expDays) {
        let date = new Date();
        date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}
setCookie('accessToken', object.accessToken, 30);
            } if(req.status === 401){
                    let object = JSON.parse(req.responseText)
                    console.log(object);
                    document.getElementById("messagebox").innerHTML = "Invalid username or password";
            }
            }
            var number = {
           username: document.getElementById('username1').value,
          // username: document.getElementById('username').value, 
           password: document.getElementById('password1').value
         }
            let body = JSON.stringify(number);
            req.send(body);
            let dude = req.responseText;
            console.log(dude);
          //  let jsonResponse = req.response;
           // document.getElementById("messagebox").innerHTML = dude.responseText;
        // Add your code above this line
			
			}
		else{
			alert('Please fill all the field !');
		}
	});
});

let account = null;
let accessToken = null;
const connect1 = async () => {
  if (window.ethereum) {
    await window.ethereum.send('eth_requestAccounts')
    window.w3 = new Web3(window.ethereum)
    var accounts = await w3.eth.getAccounts()
    account = accounts[0];

    accessToken = await authenticate()
    
    let opts = {
      method: 'GET',
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${accessToken}`
      }
    }

    let res = await fetch(`http:localhost:8080/web3/secret`, opts)
    alert(await res.text())
  }
}

const authenticate = async () => {
  let res = await fetch(`http:localhost:8080/web3/nonce?address=${account}`)
  let resBody = await res.json()

  let signature = await w3.eth.personal.sign(resBody.message, account)

  let opts = {
    method: 'POST',
    headers: {
      'Content-Type': "application/json",
      'Authorization': `Bearer ${resBody.tempToken}`
    }
  }

  res = await fetch(`http:localhost:8080/web3/verify?signature=${signature}`, opts)
  resBody = await res.json()

  console.log(resBody)
  return resBody.token
}