// JavaScript

opentox.getToken(); // return a null

// log in on the OpenTox network
opentox.login("guest", "secretPassword")

opentox.getToken(); // returns the active token

// log out again
opentox.logout()

opentox.getToken(); // return again
