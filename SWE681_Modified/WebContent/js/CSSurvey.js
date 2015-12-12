/**
 * This file contains the methods to provide different functionalities in the CSSurvey.html.
 */
/* ###############################################
 	METHODS TO PROVIDE THE COOKIE FUNCTIONALITY
 	################################################
*/
function setCookie() {
	name = window.prompt("Please enter your name" , "Aparna");
	document.cookie = "name=" + name;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function wrongPerson(){
	document.cookie = "name=null;" + "expires=Sun, 01-Oct-89 00:00:01 GMT";
	setCookie();
	location.reload();
}


/* ####################################################
	METHODS TO VALIDATE THE DATA ENTERED BY THE USER
   ####################################################
*/

function validateForm(){
	
	var name = document.getElementById("name").value;
	var street = document.getElementById("street").value;
	var city = document.getElementById("city").value;
	var zip = document.getElementById("zip").value;
	var state = document.getElementById("state").value;
	var email = document.getElementById("email").value;	
	var checkbox = document.forms.userInfo['thingsLiked[]'];
	var radio = document.forms.userInfo['interest[]'];
	
	var reg_alpha = /^[a-zA-Z ]+$/;
	var reg_address = /^[a-zA-Z0-9 ]+$/;
	var reg_num = /^[0-9]{5}$/;
	var reg_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
	var errors = [];
			
	if(!reg_alpha.test(name)){
		errors[errors.length] = "Invalid name: Please enter a name using only alphabets! ";
		document.getElementById("name").value = '';
	}		
	if(!reg_address.test(street)){
		errors[errors.length] = "Invalid street address: Please enter a street address making use of alphabets and numbers only! ";
		document.getElementById("street").value = '';
	}
	if(!reg_alpha.test(city)){
		errors[errors.length] = "Invalid city: Please enter a valid city name and make use of only alphabets! ";
		document.getElementById("city").value = '';
	}
	if(!reg_alpha.test(state)){
		errors[errors.length] = "Invalid state name: Please enter a valid state name! ";
		document.getElementById("state").value = '';
	}
	if(!reg_num.test(zip)){
		errors[errors.length] = "Invalid zip code: Please enter a valid zip code (containing exactly 5 digits)! ";
		document.getElementById("zip").value = '';
	}
	if(!reg_email.test(email)){
		errors[errors.length] = "Please enter a valid email ID! ";
		document.getElementById("email").value = '';
	}
	var checkedcount = 0;
	for(var i = 0; i < checkbox.length; i++)
		checkedcount+=(checkbox[i].checked)? 1 : 0;
	if(checkedcount < 2)
		errors[errors.length] = "Please check atleast two boxes for what you liked most about GMU campus!";
	
	var radioCount = 0;
	for(var j = 0; j < radio.length; j++){
		radioCount += (radio[j].checked)? 1 : 0;
	}		
	if(radioCount != 1)
		errors[errors.length] = "Please select a radio button option to indicate how you learnt about mason!";
	
	if(errors.length > 0){
		reportErrors(errors);
		return false;
	}else
		return true;
}

function reportErrors(errors){
	var msg = "Errors Found:";
	 for (var i = 0; i< errors.length; i++) {
	 var numError = i + 1;
	  msg += "<br>" + numError + ". " + errors[i];
	}
	 bootbox.alert({
		 title: " ",
		 message: msg
	 });	
}

		
/* ######################
    METHOD TO RESET FORM
   ######################
*/
function resetForm(){
document.getElementById("headings").reset();
}



/* ######################################################
	METHODS TO PROCESS AND CALCULATE AVERAGE AND MAXIMUM
   ######################################################
*/

function isValid(numbers){		
	var numbersList = numbers.split(",");
	var isInvalid = false;
	
	for(var i = 0; i < numbersList.length; i++){		
		if(numbersList[i] < 0 || numbersList[i] >100)
			isInvalid = true;
	}
	if(numbersList.length != 10 || isInvalid)
		document.getElementById("numbers").value = "Invalid Entry, Please enter exactly 10 numbers between 1 & 100 separated by commas!!";
	else{
		average(numbersList);
		maximum(numbersList);
	}		
}

function average(numbersList){	
	var sum = 0;	
	for (var i=0; i < numbersList.length; i++) 
		sum += parseFloat(numbersList[i]);	
	document.getElementById("average").innerHTML = sum/10;
}

function maximum(numbersList){	
	var max = 0;	
	max = parseFloat(numbersList[0]);
	for(var i=1; i < numbersList.length; i++){
		if(parseFloat(numbersList[i]) > max)
			max = parseFloat(numbersList[i]);
	}
	document.getElementById("maximum").innerHTML = max;
}


/* ######################################################
   METHODS TO PROCESS AND POPULATE CITY/STATE USING AJAX
   ######################################################
*/

function validateZip(zip){	
	callWebService (  zip, showCityState );
}

function callWebService(zip, callBack) {
	
	var webServiceUrl = "../js/zipCode.json";
	
	// attempt to send the asynchronous request
	try {
		var asyncRequest = new XMLHttpRequest(); 

		// set up callback function and store it
		asyncRequest.onreadystatechange = function() {
			callBack(asyncRequest, zip);
		}; // end anonymous function
		
		// send the asynchronous request
		asyncRequest.open('GET', webServiceUrl, true);
		asyncRequest.setRequestHeader("Accept",
				"application/json; charset=utf-8");
		asyncRequest.send(); 
	} 
	catch (exception) {
		bootbox.alert('Request Failed');
	} 
} 


function showCityState(asyncRequest,zipcode) {
	// display message while request is being processed
	document.getElementById('validateZip').innerHTML = "Checking zip...";

	var matchFound = false;
	// if request has completed successfully, process the response
	if (asyncRequest.readyState == 4) {		
		if (asyncRequest.status == 200) {			
			// convert the JSON string to an object
			var data = JSON.parse(asyncRequest.responseText);			
			if(data != null){
				for(var i = 0; i < data.length; i++){					
					if(data[i].zip == zipcode){
						matchFound = true;
						document.getElementById("validateZip").innerHTML = '';
						document.getElementById("city").innerHTML = data[i].city;						
						document.getElementById("state").innerHTML = data[i].state;
						break;
					}					
				}
				if(!matchFound){
					document.getElementById('validateZip').innerHTML = "An invalid zip has been entered!"; // display the error
					// clear city and state values if they exist
					document.getElementById('city').innerHTML = '';
					document.getElementById('state').innerHTML = '';
				}				
			}else
				document.getElementById('validateZip').innerHTML = 'Zip validation service not avaliable';
			
			
		} 
		else if (asyncRequest.status == 500) {
			document.getElementById('validateZip').innerHTML = 'Zip validation service not avaliable';
		}
	} 
} 
