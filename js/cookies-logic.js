/**
 * Haaris Sohail
 * G00709380   
 * SWE642 Assignment 3: external JS file (cookies-logic.js)
 * 03/15/2018
 * 
 * This is the JS file that handles the username cookie.
 * assignment3.html also has JS code, but only that which relies on jQuery.
 *
 */

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
        }
    }

    //get the current time and date, and use that to set a header that greets the user,
    //with a customized message based on said time and date
    var currentDate = new Date();
    var hour = currentDate.getHours();
    if (hour < 12)
        document.getElementById("usernameHeader").innerHTML = "Good morning " + username
                                                                + ". If you are not " + username + 
                                                                ', <a href="javascript:wrongUser()"> please click this link. </a>';
                                                          
    else
    {
        hour = hour - 12;
        if (hour < 6)
            document.getElementById("usernameHeader").innerHTML = "Good afternoon " + username  + ". If you are not " + username + 
            ', <a href="javascript:wrongUser()"> please click this link. </a>';
        else
            document.getElementById("usernameHeader").innerHTML = "Good evening " + username  + ". If you are not " + username + 
            ', <a href="javascript:wrongUser()"> please click this link. </a>';

    }
}

//if user clicks this link, should the username be wrong, the username cookie will expire, and the 
/*page will reload, allowing the user to re-enter the username
function wrongUser()
{
    document.cookie = "username=; expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/;domain=mason.gmu.edu;";

    location.reload();
}*/
