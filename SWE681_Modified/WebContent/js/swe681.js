/**
 * 
 */
function validateForm(){
	
	var name = document.getElementById("username").value;
	var pwd = document.getElementById("password").value;
	
	var reg_name = /^[a-zA-Z]+$/;
	var reg_pwd = /^[a-zA-Z0-9 ]+$/;
	
	var errors = [];
			
	if(!reg_name.test(name)){
		errors[errors.length] = "Invalid username: Your username can contain only alphabets! ";
		document.getElementById("username").value = '';
	}		
	if(!reg_pwd.test(pwd)){
		errors[errors.length] = "Invalid pwd: Please enter password that contains alphabets and numbers only! ";
		document.getElementById("password").value = '';
	}
	
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
	  msg += "\n" + numError + ". " + errors[i];
	}
	 alert(msg);
	 /*bootbox.alert({
		 title: " ",
		 message: msg
	 });	
*/}