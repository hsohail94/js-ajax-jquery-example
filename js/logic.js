/**
 * Haaris Sohail
 * G00709380   
 * SWE642 Assignment 3: external JS file (logic.js)
 * 03/15/2018
 * 
 * This is the JS file that handles user input.
 * assignment3.html also has JS code, but only that which relies on jQuery.
 *
 */

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

    //if everything checks out, scroll all the way to the top, as well as print a message at the top
    if (radioChecked && checkboxCount >= 2 && 
        enteredEmail.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        && enteredName.match(/^[a-zA-Z]+$/))
        {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            document.getElementById("successfulSubmission").innerHTML = "<i> Thanks for filling out this survey! </i>"
        }
}