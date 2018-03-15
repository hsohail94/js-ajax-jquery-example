//set username cookie to value cookieValue to expire in expiryDays
function setUsernameCookie (cookieValue, expiryDays)
{
    //date object for current time/date
    var date = new Date();

    //expiry time = current time + days*24*60*60*1000
    date.setTime(date.getTime() + (expiryDays*24*60*60*1000)) 

    //line which actually sets the username cookie
    document.cookie = "username=" + cookieValue + ";expires=" + date.toUTCString() + ";path=/";
}

//function to get username cookie (if it was set)
function getUsernameCookie()
{
    var usernameCookie = "username=";

    //comprehensive cookies list, separated by semi-colon
    //var cookiesList = document.cookie.split(";");
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookiesList = decodedCookie.split(';');

    //iterate through cookies to look for "username="; return null if not found
    for (var i = 0; i < cookiesList.length; i++)
    {
        var cookieElement = cookiesList[i];
        while (cookieElement.charAt(0) == ' ')
        {
            cookieElement = cookieElement.substring(1);
        }
        if (cookieElement.indexOf(usernameCookie) == 0)
        {
            return cookieElement.substring(usernameCookie.length, cookieElement.length);
        }
        
    }
    return ""; //return nothing if username cookie not found
}

//if username cookie is not set, set it. otherwise, get it and display it
function checkUsernameCookie()
{
    var username = getUsernameCookie();

    if (username != "")
    {
        alert ("Welcome " + username + "!");
    }
    else
    {
        username = prompt("What is your name? ", "");
        if (username != "" && username != null)
        {
            setUsernameCookie(username, 10);
            //document.getElementById('name').textContent = username;
        }
    }
}

//calculate average and max from user input, then display on screen
function calculateAverageAndMax()
{
    var userNumbersInput = document.getElementById("usernumbers").value;

    var userNumbers = userNumbersInput.split(',');

    var inputInRange = 1;

    //only calculate the average and max if user has entered at least 10 numbers
    if (userNumbers.length >= 10)
    {
        var total = 0;
        for (i = 0; i < userNumbers.length; i++)
        {
            var userNumber = userNumbers[i];
            if (userNumber < 1 || userNumber > 100)
            {
                document.getElementById('max').textContent = "Please enter number between 1 and 100";
                document.getElementById('avg').textContent = "Please enter number between 1 and 100";
                inputInRange = 0;
                break;
            }
            else
            {
                total = total + parseInt(userNumber);
            }
        }

        if (inputInRange == 1)
        {
            //set average and max fields
            var average = total / userNumbers.length;
            document.getElementById('avg').textContent = average.toString();
            
            var maximum = getMaximumNumber(userNumbers);
            document.getElementById('max').textContent = maximum.toString();
        }
    }
}

//given array of numbers, calculate maximum
function getMaximumNumber (numbersList)
{
    var originalMax = parseInt(numbersList[0]);
    for (i = 1; i < numbersList.length; i++)
    {
        var current = parseInt(numbersList[i]);
        if (current > originalMax)
            originalMax = current;
    }

    return originalMax;
}

//validating user data
function handleSubmittedUserData()
{
    //get rid of existing error messages
    //if user input is still bad, they will be reprinted
    var nameError1 = document.getElementById("nameError1");
    var nameError2 = document.getElementById("nameError2");
    var emailError = document.getElementById("emailError");
    var radioError = document.getElementById("radioError");
    var checkboxError = document.getElementById("checkboxError");

    if (nameError1 != null)
        nameError1.parentNode.removeChild(nameError1);
    if (nameError2 != null)
        nameError2.parentNode.removeChild(nameError2);
    if (emailError != null)
        emailError.parentNode.removeChild(emailError);
    if (radioError != null)
        radioError.parentNode.removeChild(radioError);
    if (checkboxError != null)
        checkboxError.parentNode.removeChild(checkboxError);

    var enteredName = document.getElementById("firstName").value + 
                        document.getElementById("lastName").value;
    console.log("full name: " + enteredName);

    var enteredEmail = document.getElementById("email").value;
    var enteredAddress = document.getElementById("address").value;
    console.log("email: " + enteredEmail);

    var likedMostChecked = document.getElementsByName("mostliked");
    var howInterestedChecked = document.getElementsByName("foundout");

    //check how many checkboxes are checked
    var checkboxCount = 0;
    for (i = 0; i < likedMostChecked.length; i++)
    {
        if (likedMostChecked[i].checked)
        {
            checkboxCount++;   
        }
    }

    //check if any of the radio buttons have been checked
    var radioChecked = false;
    for (i = 0; i < howInterestedChecked.length; i++)
    {
        //if one is selected, break, as that is all we need
        if (howInterestedChecked[i].checked)
        {
            radioChecked = true;
            break;
        }
    }

    
    //print error message if user hasn't selected radio element
    if (!radioChecked)
    { 
        howInterestedChecked[0].insertAdjacentHTML("beforebegin", "<p id=\"radioError\"> <b> Please pick an option. </b> </p>");
    }

    //print error message if user hasn't select at least 2 checkbox elements
    if (checkboxCount < 2)
    {
        likedMostChecked[0].insertAdjacentHTML("beforebegin", "<p id=\"checkboxError\"> <b> Please pick at least two options. </b> </p>");
    }

    //check if full name is alphabets-only
    //(note: RegExp.match was not working for me, so I resorted to using string.match(regexp) instead)
    if (!enteredName.match(/^[a-zA-Z]+$/))
    {
        console.log("name regex test failed");
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("firstName").insertAdjacentHTML("afterend", "<p id=\"nameError1\"> <b> Please make sure your name only has alphabets </b> </p>");
        document.getElementById("lastName").insertAdjacentHTML("afterend", "<p id=\"nameError2\"> <b> Please make sure your name only has alphabets </p>");
    }

    //check if email address is in valid format
    if (!enteredEmail.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
    {
        console.log("email regex test failed");
        document.getElementById("email").value = "";
        document.getElementById("email").insertAdjacentHTML("afterend", "<p id=\"emailError\"> <b> Please enter a valid email adress. </b> </p>");
    }


}