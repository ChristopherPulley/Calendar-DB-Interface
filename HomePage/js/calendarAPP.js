/* 
    Script Name: calendarAPP.js
    Script Author: Christopher Pulley

    Purpose:
        Provides Client Side control and input validation for calendarAPP.php. 
        Directs Server Side operations for MySQL eventbase interface.

    Function Descriptions:  

        (Function(){})();          : Anonymous function to contain entire script
        window.onload=function ()  : Called on window.load completion
        panelEventsListeners()     : Sets Event Listeners for Tab Panel Buttons
        disableInputs()            : Disables most input fields/buttons on load or logout
        loginEventsListeners()     : Sets Event Listeners for Login/Out Buttons
        valLoginInputs()           : Check Username and Password value against RegExp before submission
        updateSystemResponse()     : Updates System Response <div> and scrolls to bottom
        createHttpRequestAndSend() : Invoked to Create/Send/Return XmlHttpRequest
        valLoginJS()               : Checkes return value of XmlHttpRequest for final login validation
        logoutUser()               : Shuts down system on logout button 'click'
        resetInputs()              : Clears input fields on query submission
        resetEventListeners()      : Clears and re-sets event listeners on logout
        systemActivate()           : Enables system functions on login
        enableInputs()             : Ensables most input fields/buttons on load or logout 
        queryEventsListeners()     : Sets Event Listeners for query form submit buttons
        loadAllDataList()          : Makes series of calls to load eventlist from DB event
        loadDataList()             : Loads individual eventlist with event from DB
        eventUpdateSelect()        : Enable/Disable <input> and <select> elements based on user selection
        showColumnInputType()      : Change input element type for value insertion based on user selection
        validateJS()               : Directs validation user input of query fields
        validateText()             : Does actual validation of query input fields with RegExp's
        eventActions()             : Gathers query input field values for XmlHttpRequest submission
        createTime()               : Create 12 Hour AM/PM Time Value DB insert.
        eventTab()                 : Controls Tab Panel System

    Notes: 
        Function definitions do not include passed arguments. See individual function comments for
        argument information and more indepth explanation.
*/

/*
    (Function(){})();

    Purpose:
        Enclose entire script within IIFE Closure to ensure methods 
        and members cannot be accessed outside of user interface.
*/
(function() {

"use strict";

/*
    Global Vars:
*/

// Functions for Event Listeners that are removed and reset on logout/login
var login, entryFunc, queryFunc, updateFunc, deleteFunc, adminFunc,

// HTML Objects for Login and System Output 
    userName = document.getElementById("userName"),
    pWord = document.getElementById("pWord"),
    loginButton = document.getElementById("loginButton"),
    loginResponse = document.getElementById("loginResponse"),
    dbResponse = document.getElementById("dbResponse"),
    tableDisplayDiv = document.getElementById("tableDisplayDiv"),
    logOutButton = document.getElementById("logOutButton"),
    tableLoadButton = document.getElementById("tableLoadButton"),

// HTML Objects for Event Entry Form 
    eventEntryButton = document.getElementById("eventEntryButton"),
    eventStartDate = document.getElementById("eventStartDate"),
    eventEndDate = document.getElementById("eventEndDate"),
    eventTime = document.getElementById("eventTime"),
    eventName = document.getElementById("eventName"),
    eventType = document.getElementById("eventType"),
    eventLocation = document.getElementById("eventLocation"),
    eventColor = document.getElementById("eventColor"),
    eventDesc = document.getElementById("eventDesc"),
    submitEvent = document.getElementById("submitEvent"),
    submitEventReset = document.getElementById("submitEventReset"),
    eventEntryCheckBox = document.getElementById("eventEntryCheckBox"),

// HTML Objects for Event Query Form
    eventQueryButton = document.getElementById("eventQueryButton"),
    queryByDate = document.getElementById("queryByDate"),
    queryByName = document.getElementById("queryByName"),
    queryByType = document.getElementById("queryByType"),
    queryByLocation = document.getElementById("queryByLocation"),
    queryByDesc = document.getElementById("queryByDesc"),
    queryByTime = document.getElementById("queryByTime"),
    queryByColor = document.getElementById("queryByColor"),
    submitQuery = document.getElementById("submitQuery"),
    submitQueryReset = document.getElementById("submitQueryReset"),
    eventQueryCheckBox = document.getElementById("eventQueryCheckBox"),
    queryIdCheckBox = document.getElementById("queryIdCheckBox"),
    queryColorCheckBox = document.getElementById("queryColorCheckBox"),
    querySDateCheckBox = document.getElementById("querySDateCheckBox"),
    queryEDateCheckBox = document.getElementById("queryEDateCheckBox"),
    queryTimeCheckBox = document.getElementById("queryTimeCheckBox"),
    queryNameCheckBox = document.getElementById("queryNameCheckBox"),
    queryTypeCheckBox = document.getElementById("queryTypeCheckBox"),
    queryLocCheckBox = document.getElementById("queryLocCheckBox"),
    queryDescCheckBox = document.getElementById("queryDescCheckBox"),

// HTML Objects for Group Query Form
    groupQueryButton = document.getElementById("groupQueryButton"),



// HTML Objects for Event Update Form
    eventUpdateButton = document.getElementById("eventUpdateButton"),
    eventUpdateForm = document.getElementById("eventUpdateForm"),
    updateByID_RadioButton = document.getElementById("updateByID_RadioButton"),
    updateByAnything_RadioButton = document.getElementById("updateByAnything_RadioButton"),
 	updateByID_IdNum = document.getElementById("updateByID_IdNum"),
    updateByID_Column = document.getElementById("updateByID_Column"),
    updateByID_Value = document.getElementById("updateByID_Value"),
    updateByAnything_ColumnUpdate = document.getElementById("updateByAnything_ColumnUpdate"),
    updateByAnything_ValueInsert = document.getElementById("updateByAnything_ValueInsert"),
    updateByAnything_WhereColumn = document.getElementById("updateByAnything_WhereColumn"),
    updateByAnything_ValueEquals = document.getElementById("updateByAnything_ValueEquals"),
    submitUpdate = document.getElementById("submitUpdate"),
    submitUpdateReset = document.getElementById("submitUpdateReset"),
    eventUpdateCheckBox = document.getElementById("eventUpdateCheckBox"),

// HTML Objects for Event Delete Form
    eventDeleteButton = document.getElementById("eventDeleteButton"),
    eventDeleteForm = document.getElementById("eventDeleteForm"),
    deleteById_RadioButton = document.getElementById("deleteById_RadioButton"),
    deleteByValue_RadioButton = document.getElementById("deleteByValue_RadioButton"),
    deleteByID_Id = document.getElementById("deleteByID_Id"),
    deleteByValue_Column = document.getElementById("deleteByValue_Column"),
    deleteByValue_Value = document.getElementById("deleteByValue_Value"),
    submitDelete = document.getElementById("submitDelete"),
    submitDeleteReset = document.getElementById("submitDeleteReset"),
    eventDeleteCheckBox = document.getElementById("eventDeleteCheckBox"),

// HTML Objects for User Functions Form
    userFunctionsButton = document.getElementById('userFunctionsButton'),

// HTML Objects for Admin Functions Form
    adminFunctionsButton = document.getElementById("adminFunctionsButton");  // commas till end ;
//var adminFunctionsForm = document.getElementById("adminFunctionForm");  

// var declarations end here




/*
    window.onload=function () 

    Purpose:
        Establish baseline settings for user interface.

    Actions:   
        Sets Event Listeners for Tab Panel Radio Buttons
            and Select elements.
        Sets event listeners for Login/Logout buttons.  
        Sets the tab system to the Event Entry Form. 
        Sets default color to light bluish. 
        Disables all input elements and buttons with exception 
            of Username, Password and Login button. 
        Sets event listeners for Login/Logout buttons. 

    Called By:
        DOM window.onload() event

*/
window.onload=function () {

    panelEventsListeners();
    loginEventsListeners();  

    eventEntryButton.click();

    eventColor.defaultValue="#0080FF";

    disableInputs();   
};




/*
    panelEventsListeners()

    Purpose:
        Create Event Listeners for Tab Panels

    Actions:
        Sets Event Listeners for Tab Panel Buttons.
        Sets Event Listeners for Event Update/Delete Radio Buttons
        Sets Event Listeners for Event Update/Delete Select elements

    Called By:
        window.onload=function ()
*/
function panelEventsListeners() {

    // Contain Function for Reload Main Table Button
    var tableReloadClick = function() {
        createHttpRequestAndSend ("tableDisplayDiv", "POST", "php/tableLoad.php", "", 0); },
        
    // Contain Functions for Tab Panel Event Listeners  
        entryButton = function() { eventTab(event, 'eventEntryTab'); },
        queryButton = function() { eventTab(event, 'eventQueryTab'); },
        gQueryButton = function() { eventTab(event, 'groupQueryTab')},
        updateButton = function() { eventTab(event, 'eventUpdateTab'); },
        deleteButton = function() { eventTab(event, 'eventDeleteTab'); },
        userButton = function() { eventTab(event, 'userFunctionsTab')},
        adminButton = function() { eventTab(event, "adminFunctionsTab"); },

    //  Contains Function for Query By Color Background Color Change
        queryByColorSelected = function() { queryByColor.style.backgroundColor = queryByColor.value; },

    // Contain Functions for Update Radio Button Vars
        updateByIDRadioButton = function() { eventUpdateSelect('id'); },
        updateByAnythingRadioButton = function() { eventUpdateSelect('column'); },

    // Contain Function for Update Tab Reset Button Click
        submitQueryResetButton = function(evt) { evt.preventDefault(); queryTabReset(); },

    // Contain Functions for Delete Radio Button Vars
        deleteByIdRadioButton = function() { eventUpdateSelect('deleteID'); },
        deleteByValueRadioButton = function() { eventUpdateSelect('deleteColumn'); },

    // Contain Functions for Update Select Element Vars
        updateByIDColumn = function() {
        showColumnInputType(this.value,'updateByID_Value'); },

        updateByAnythingColumnUpdate = function() { 
        showColumnInputType(this.value,'updateByAnything_ValueInsert'); },

        updateByAnythingWhereColumn = function() {
        showColumnInputType(this.value, 'updateByAnything_ValueEquals'); },

    // Contain Functions for Delete Select Element Var
        deleteByValueColumn = function() {
        showColumnInputType(this.value, 'deleteByValue_Value'); };  
    // var Declarations End Here

    // Show Main Table Button Listener
    tableLoadButton.addEventListener("click", tableReloadClick);
    
    // Tab Panel Button Listeners
    eventEntryButton.addEventListener("click", entryButton);
    eventQueryButton.addEventListener("click", queryButton);
    groupQueryButton.addEventListener("click", gQueryButton);
    eventUpdateButton.addEventListener("click", updateButton);
    eventDeleteButton.addEventListener("click", deleteButton); 
    userFunctionsButton.addEventListener("click", userButton);
    adminFunctionsButton.addEventListener("click", adminButton);

    // Query by Color Select Change Listener
    queryByColor.addEventListener("change", queryByColorSelected);

    // Update Radio Button Listeners
    updateByID_RadioButton.addEventListener("click", updateByIDRadioButton);
    updateByAnything_RadioButton.addEventListener("click", updateByAnythingRadioButton);

    // Update Reset Button Listener
    submitUpdateReset.addEventListener("click", submitQueryResetButton);

    // Delete Radio Button Listeners
    deleteById_RadioButton.addEventListener("click", deleteByIdRadioButton);
    deleteByValue_RadioButton.addEventListener("click", deleteByValueRadioButton);

    // Update Select Element Listeners
    updateByID_Column.addEventListener("change", updateByIDColumn);
    updateByAnything_ColumnUpdate.addEventListener("change", updateByAnythingColumnUpdate);  
    updateByAnything_WhereColumn.addEventListener("change", updateByAnythingWhereColumn);

    // Delete Select Element Listener
    deleteByValue_Column.addEventListener("change", deleteByValueColumn);
}




/*
    disableInputs()

    Purpose:
        Disable Inputs on document load or logout.

    Actions:
        Loop through array of all <input> tags and disable.
        Loop through array of all <button> tags and disable.
        Disable Event Descrition Field.
        Enable Login Button, Username and Password Fields.

    Called By:
        window.onload=function ()
        logoutUser()
*/
function disableInputs() {
    
    var inputs = document.getElementsByTagName("input"), 
        buttons = document.getElementsByTagName("button");

    for (var b = 0; b < inputs.length; b++) {                                 
            inputs[b].disabled = true;                                        
    }
   
    for (var c = 0; c < buttons.length; c++) {
            buttons[c].disabled = true;
    }

    eventDesc.disabled = true;
    loginButton.disabled = false;                                               
    userName.disabled  = false;
    pWord.disabled = false;
}




/*
    loginEventsListeners()

    Purpose:
        Set Login/out Event Listeners.

    Actions:
        Set Logout button event listener.
        Set Login button event listener to call valLoginInputs()
            for Username and Password validation.

    Called By:
        window.onload=function()
        resetEventListeners()

    Notes:
        Last argument in creatHttpRequestandSend call references
        'mode 1' in method to signal a login request.
*/
function loginEventsListeners() {

    logOutButton.addEventListener("click", logoutUser);

    loginButton.addEventListener("click",  login = function(evt) {
        evt.preventDefault();
        valLoginInputs(); });
}




/*
    valLoginInputs()

    Purpose:
        Validate Username and Password fields before submission

    Actions:
        Get Username and Password values from input fields.
        Check input field values against RegExp, return if false.
        Create XmlHttpRequest for submission.

    Called By:
        loginEventsListeners()
*/
function valLoginInputs() {

    var textReg = /^[A-Za-z0-9_$%&@]*$/,
        invalidText = "ERROR: Invalid Username or Password",                                                                          
        un = document.getElementById("userName").value,
        pw = document.getElementById("pWord").value;

    if (!un.match(textReg) || !pw.match(textReg)) {
        updateSystemResponse(invalidText, 1);
        return;
    }
     
    createHttpRequestAndSend("", "POST", "php/userValidate.php", 
                             "un=" + un + "&pw=" + pw, 1);
}




/*
    updateSystemResponse()

    Purpose:
        Update text of System Response Div

    Argument List:
        text: string to write to dbResponse Div
        mode: Signals to Overwrite(0) or Append(1) text

    Actions:
        Write text to dbResponse <div>
        Scroll to bottom of <div>

    Called By:
        valLoginInputs()
        createHttpRequestAndSend()
        validateText()
        validateJS()
*/
function updateSystemResponse(text, mode) {

    var textToUpdate = text;

    if (mode === 0) {
        dbResponse.innerHTML = textToUpdate + "<hr>";
    }

    if (mode === 1) {
        dbResponse.innerHTML += textToUpdate + "<hr>";
    }

    dbResponse.scrollTop = dbResponse.scrollHeight;
}




/*
    createHttpRequestAndSend(element, method, file, send, mode)

    Purpose:
        Create httpRequest to submit to PHP file.

    Argument List:
        element: HTML element to output .responseText
        method : GET or POST
        file   : PHP script to call with request
        send   : Values to be sent via POST method if used
        mode   : Signals what type of event (login, entry, ect)
                 the request is sending and returning. Alse

    Actions:
        Create XML Request Object to call, post to and return values
        from PHP script referenced in argument 'file'.

        If mode = 1 Call containing .responseText is placed to 
        valLoginJs after response is ready and Login is granted
        based on True/False return of method.

        If mode = 2 Load/display updated table, eventlist and reset form.

        Finally: Display .responseText for User named in element argument
                 if function does not return in mode.

    Called By:
        loginEventsListeners()
        systemActivate()
        loadDataList(element, column, mode)
        eventActions(mode)
*/
function createHttpRequestAndSend (element, method, file, send, mode) {
    
    var xmlhttp = new XMLHttpRequest();
    var userAccount;
    
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {

            if (mode === 1) {  // mode 1 for login attempt

                userAccount = JSON.parse(this.responseText);
                
                valLoginJS(userAccount);
                return;
            }

            if (mode === 2) {  // mode 2 for event entry

                createHttpRequestAndSend ("tableDisplayDiv", "POST", "php/tableLoad.php", "", 0);
                updateSystemResponse(this.responseText, 1);            
                loadAllDataList(); // use more specific loadeventList function 
                                   // may not load consistently due to original XML request not finished yet
                                   // possibly add mode to function to call after request return
                tableDisplayDiv.scrollTop = tableDisplayDiv.scrollHeight;
                return;
            }

            if (mode === 3) {

                document.getElementById(element).innerHTML = this.responseText; 

                var queryTable = document.getElementById("queryTable"),
                    qTm = (965 - queryTable.offsetWidth) /2;

                queryTable.style.marginLeft = qTm;

                return;
            }

            if (mode === 4) {  // group query 

            }

            if (mode === 5) {

                updateSystemResponse(this.responseText, 1);
                loadAllDataList();
                tableLoadButton.click();

                return;
            }

            if (mode=== 6) {

                updateSystemResponse(this.responseText, 1);
                loadAllDataList();
                tableLoadButton.click();

                return;
            }

            if (mode === 7) {  // user functions 

            }

            if (mode === 8) {  // admin functions

            }

            document.getElementById(element).innerHTML = this.responseText;          
        }
    };

    xmlhttp.open(method, file, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); 
    xmlhttp.send(send);
}




/*
    valLoginJS(usrAcct)

    Purpose:
        Validate Login based on .responseText.

    Argument List:
        usrAcct: userInfo object received from userValidate.php XML Request

    Actions:


    Called By:
        createHttpRequestAndSend()

    Notes:
*/
function valLoginJS(usrAcct) {
  
    var result = usrAcct.loginValid,
        access = usrAcct.userLevel,
        error = usrAcct.errorOccur,
        errorText = usrAcct.errorText;

    if (result === true) {

        if (access === "ADMIN") {

            loginResponse.innerHTML = "Login Status: Logged In - ADMIN";

        } else {

            loginResponse.innerHTML = "Login Status: Logged In - USER";
        }

        systemActivate(access); 
        updateSystemResponse("Login Valid: Welcome " + usrAcct.userName +
                             "<hr>System Status: Active", 0);
        
    } else {

        if(error === false) {

            updateSystemResponse("Login Failed: Invalid Username or Password", 1);

        } else {

            updateSystemResponse("Login Failed: Database Error " + 
                errorText + " - Please Try Again")
            
        }
    }
}




/*
    logoutUser()

    Purpose:
        Logout user upon Logout button 'click'.

    Actions:
        Return to Event Entry Tab.
        Reset all input and select elements to value = "".
        Disable all inputs except Login fields and button.
        Update Login Status info.

    Called By:
        loginEventsListeners()
*/
function logoutUser() {

    eventEntryButton.click();

    resetInputs();
    disableInputs();
    resetEventListeners();

    tableDisplayDiv.innerText = "Login to View Events Table";
    loginResponse.innerText = "Login Status: Logged Out";
    updateSystemResponse("System Status: Inactive", 0);
}




/*
    resetInputs()

    Purpose:
        Reset values of input and select elements.

    Actions:
        Loop through all inputs with ClassName "dataField" 
        and set value = "".

    Called By:
        logoutUser()
        
    Notes:
        ClassName "datafield" is assigned to all <input>    
        and <select> tags with exception of Username, 
        Password fields and all Submit/Reset elements.  // prob assign to un and pw fields
*/
function resetInputs() {

    var inputs = document.getElementsByClassName("dataField");   

    for (var b = 0; b < inputs.length; b++) {  
        
        if (inputs[b].type === "color") {

            inputs[b].value = "#42a4f4";
        } else {

            inputs[b].value = "";
        }                                               
    }

    queryByColor.style.backgroundColor = "#ffffff";
}




/*
    resetEventListeners()

    Purpose:
       Disable Event Listeners on logout to avoid doubling up on re-login.

    Actions:
        Remove event listeners for login/logout buttons.
        Remove event listeners for Tab Panel buttons.
        Reset login event listeners.

    Called By:
        logoutUser()
*/
function resetEventListeners() {

    logOutButton.removeEventListener("click", logoutUser);
    loginButton.removeEventListener("click", login);
    submitEvent.removeEventListener("click", entryFunc);
    submitQuery.removeEventListener("click", queryFunc);
  // remove lister for group query submit here
    submitUpdate.removeEventListener("click", updateFunc);
    submitDelete.removeEventListener("click", deleteFunc);
  // remove listener for user form submit button goes here
  // remove listener for admin form submit button goes here
    loginEventsListeners();
}




/*
    systemActivate(level)

    Purpose:
        Call methods needed to enable user interface interaction.

    Argument List:
        level: Level of Access Granted 'USER' or 'ADMIN'

    Actions:
        Load and display the full Events table in tableDisplayDiv.
        Enable input fields/disable login fields.
        Activate Listeners for query Submit buttons.
        Populate eventlist for Name, Type and Location fields.

    Called By:
        valLoginJS()
*/
function systemActivate(level) {
    createHttpRequestAndSend ("tableDisplayDiv", "POST", "php/tableLoad.php", "", 0);
    enableInputs(level);
    queryEventsListeners();
    loadAllDataList();
}


    
    
/*
    enableInputs(level)

    Purpose:
        Enable Inputs on Login.

    Argument List:
        level: Level of Access Granted 'USER' or 'ADMIN'

    Actions:
        Loop through all <input> tags and enable.
        Loop through all <button> tags and enable.
        Enable Event Description Field.
        Disable Login Button, Username and Password Fields.
        Set default selection for Event Update/Delete Forms.
        Enable Admin functions tab if Access Level is 'ADMIN'

    Called By:
        systemActivate()

*/
function enableInputs(level) {
    
    var inputs = document.getElementsByTagName("input"),  
        buttons = document.getElementsByTagName("button");

    for (var b = 0; b < inputs.length; b++) {             
            inputs[b].disabled = false;                   
    }

    
    for (var c = 0; c < buttons.length; c++) {
            buttons[c].disabled = false;
    }
    
    loginButton.disabled = true;
    userName.disabled = true;
    pWord.disabled = true;

    eventDesc.disabled = false;

    updateByAnything_RadioButton.click();
    deleteById_RadioButton.click();

    if (level !== "ADMIN") {
        adminFunctionsButton.disabled = true;
    }
}




/*
    queryEventsListeners()

    Purpose:
        Set Event Listeners for Event Tab Form Submit buttons.

    Actions:
        Add named function to each tab event listener that calls
        appropriate input validation mode for each query action.
        Function stops submission of form and calls a mode of 
        validateJS(mode) depending on which form is submitted.

    Called By:
        systemActivate()

*/
function queryEventsListeners() {
    
    submitEvent.addEventListener("click", entryFunc = function(evt) {
        evt.preventDefault(); 
        validateJS(2); });  // Mode 2 is for Event Entry Validation
               
    submitQuery.addEventListener("click", queryFunc = function(evt) { 
        evt.preventDefault(); 
        validateJS(3); });  // Mode 3 is for Query Event Validation

    // listener for group query goes here -- mode 4

    submitUpdate.addEventListener("click", updateFunc = function(evt) { 
        evt.preventDefault(); 
        validateJS(5); });  // Mode 5 is for Update Event Validation   
    
    submitDelete.addEventListener("click", deleteFunc = function(evt) { 
        evt.preventDefault(); 
        validateJS(6); });  // Mode 6 is for Delete Event Validation

    // lister for user submit here - mode 7
    
    // listener for admin submit goes here - mode 8

}




/*
    loadAllDataList()

    Purpose:
        Establish base <eventlist> for Name, Type and Location
        elements on Login.

    Actions:
        Call loadDataList(element, column, mode) method for 
        each <eventlist> element used in calendarAPP.php.

    Called By:
        systemActivate()
        eventActions(mode)

*/
function loadAllDataList() {

    loadDataList("eventNameList", "event_name", 0);
    loadDataList("eventTypeList", "event_type", 1);
    loadDataList("eventLocationList", "event_location", 0);

    loadDataList("queryNameList", "event_name", 0);
    loadDataList("queryTypeList", "event_type", 1);
    loadDataList("queryLocationList", "event_location", 0);

    queryByColor.style.backgroundColor = "#ffffff";  // looks out of place -- check it out
    loadDataList("queryByColor", "event_color", 2);
}




/*
    loadDataList(element, column, mode)

    Purpose:
        Populate an individual <eventlist> with event values 
        found in Events eventbase Columns  

    Argument List:
        element: HTML <eventlist> element to populate
        column : Events eventbase column to load values from 
        mode   : Utilized to inform PHP script to include 
                 default options in eventlist

    Actions:
        Creates call to createHttpRequestAndSend() method 
        with references to included arguments

    Called By:
        loadAllDataList()
        // will include more calls from query system

    Notes: 
        Result is Output Directly from PHP file
        Posted mode (1) indicates default options exist for Event Type
*/
function loadDataList(element, column, mode) {

    createHttpRequestAndSend (element, "POST", "php/loadDataLists.php", 
        "column=" + column + "&mode=" + mode, 0); 
}




/*
    eventUpdateSelect(updBy)

    Purpose:
        Utilized by Event Update/Delete Forms to Enable/Disable 
        <input> and <select> elements based on user selection 
        of update or deletion method

    Argument List:
        updBy: References method of update/delete user has chosen
               based on 'checked' status of radio buttons on forms

    Actions:
        updBy "id": 
            Enables input/select elements for 'Update by ID' <div>.
            Disables/Resets elements for 
                'Update by Column and Value' <div>.

        updBy "column":
            Enables input/select elements for 'Update by Column and Value' <div>.
            Disables/Resets elements for 'Update by ID' <div>.

        updBy "deleteID":
            Enables input/select elements for 'Delete by Row ID' <div>.
            Disables/Resets elements for 'Delete by Column and Value' <div>.

        updBy "deleteColumn":
            Enables input/select elements for 'Delete by Column and Value' <div>.
            Disables/Resets elements for 'Delete by Row ID' <div>.

    Called By:
        onclick function() attached to radio buttons in calendarAPP.php

    Notes:
        default settings for <input> elements are 
            type: text
            size: "16"
            value: ""

        default setting for <select> elements is
            value: ""
*/
function eventUpdateSelect(updBy) {

    switch (updBy) {

        case "id":

            if (updateByID_Column.value !== "") {

                updateByID_Value.disabled = false;
            } else {

                updateByID_Value.disabled = true;
            }
        
            updateByID_IdNum.disabled = false;
            updateByID_Column.disabled = false;

            updateByAnything_ValueInsert.type = "text";
            updateByAnything_ValueEquals.type = "text";
            updateByAnything_ValueInsert.size = "16";
            updateByAnything_ValueEquals.size = "16";

            updateByAnything_ColumnUpdate.value = "";
            updateByAnything_WhereColumn.value = "";
            updateByAnything_ValueInsert.value = "";
            updateByAnything_ValueEquals.value = "";  
                    
            updateByAnything_ColumnUpdate.disabled = true;
            updateByAnything_WhereColumn.disabled = true;
            updateByAnything_ValueInsert.disabled = true;
            updateByAnything_ValueEquals.disabled = true;     

            break;

        case "column":

            if (updateByAnything_ColumnUpdate.value !== "") {

                updateByAnything_ValueInsert.disabled = false;
            } else {

                updateByAnything_ValueInsert.disabled = true;
            }

            if (updateByAnything_WhereColumn.value !== "") {

                updateByAnything_ValueEquals.disabled = false;
            } else {

                updateByAnything_ValueEquals.disabled = true;
            }

            updateByAnything_ColumnUpdate.disabled = false;
            updateByAnything_WhereColumn.disabled = false;

            updateByID_Value.type = "text";
            updateByID_Value.size = "16";

            updateByID_IdNum.value = "";
            updateByID_Column.value = "";
            updateByID_Value.value = "";

            updateByID_IdNum.disabled = true;
            updateByID_Column.disabled = true;
            updateByID_Value.disabled = true;
            break;

        case "deleteID":

            deleteByID_Id.disabled = false;

            deleteByValue_Value.type = "text";
            deleteByValue_Value.size = "16";

            deleteByValue_Column.value = "";
            deleteByValue_Value.value = "";

            deleteByValue_Column.disabled = true;
            deleteByValue_Value.disabled = true;   
            break;

        case "deleteColumn":

            if (deleteByValue_Column.value !== "") {

                deleteByValue_Value.disabled = false;
            } else {

                deleteByValue_Value.disabled = true;
            }

            deleteByID_Id.value = "";
            deleteByID_Id.disabled = true;

            deleteByValue_Column.disabled = false;
            break;

        default:
            updateSystemResponse("Error in Selection System", 1);
    }
}




/*
    showColumnInputType(iType, columnID)

    Purpose:
        Change input element type for value insertion based
        on user selection of corresponding eventbase column

    Argument List:
        iType   : new HTML input type to apply to columnID
        columnID: #Id of HTML input element to change

    Actions:
        Reset columnID element settings to default.
        Assign new settings to columnID element based on iType.
        Enable columnID element

    Called By:
        onchange event attached to select elements

    Notes:
        // add some of those - lot going on here
*/
function showColumnInputType(iType, columnID) {

    var columnInputType = document.getElementById(columnID),
        columnSelected = false;

    columnInputType.className = "";
    columnInputType.type = "text";
    columnInputType.size = "16";
    columnInputType.className = "dataField";
    columnInputType.placeholder = "";

    updateByID_Value.type = "";  // do i need this -- check it out

    switch(iType) {

        case "Ntext":         
            columnInputType.maxlength = "30";  
            columnInputType.value = "";
            columnInputType.placeholder = "Name";  
            break;

        case "Ttext":         
            columnInputType.maxlength = "30";  
            columnInputType.value = "";  
            columnInputType.placeholder = "Type";        
            break;

        case "textArea": 
            columnInputType.type = "textarea";
            columnInputType.cols = "16";
            columnInputType.rows = "1";         
            columnInputType.maxlength = "250"; 
            columnInputType.value = "";     
            columnInputType.placeholder = "Description";       
            break;

        case "number":
            columnInputType.type = "number";
            columnInputType.min="1" ;
            columnInputType.max="100"; // this should equal # of events.. check out
            columnInputType.value = 1; 
            break;

        case "color":
            columnInputType.type = "color";
            columnInputType.className = "dataField inputColor";
            break;
        
        case "Sdate":
            columnInputType.type = "date";
            break;

        case "Edate":
            columnInputType.type = "date";
            break;

        case "time":
            columnInputType.type = "time";
            columnInputType.size = "7";
            break;

        case "location":         
            columnInputType.maxlength = "150";    
            columnInputType.value = ""; 
            columnInputType.placeholder = "Location";     
            break;

        default:          
            columnSelected = "true";
            columnInputType.value = "";
    }

    columnInputType.disabled = columnSelected;
}




/*
    validateJS(mode)

    Purpose:
        Validate user input of query fields before submitting to
        PHP and eventbase.

    Argument List:
        mode: indicates which query form to validate.

    Actions:
        Calls validateText() to Check Text Values of Input type 'text' 
            elements of submited form

        Input types 'date', 'time' and 'color' are only checked for null values
            as input.type dictates format

    Called By:
        queryEventsListeners()

    Notes:
        rtn default is false to prevent query errors.

*/
function validateJS(mode) {

    var rtn = false,
        IdValue, updateColumn, whereColumn, deleteByValueColumn, deleteByValueValue,
        sdVal, edVal, sD, eD;

    switch (mode) {

        case 2:  // event entry

            eventEntry: {

                if (eventStartDate.value === "") { 
                    updateSystemResponse("Event Start Date is Required to add New Event", 1);
                    break eventEntry;
                }

                if (eventName.value === "") {
                    updateSystemResponse("Event Name is Required to add New Event", 1);
                    break eventEntry;
                }

                if (eventType.value === "") {
                    updateSystemResponse("Event Type is Required to add New Event", 1);
                    break eventEntry;
                }

                rtn = validateText(eventName, 1, "Event Name");
                    if (!rtn) { break eventEntry; }

                rtn = validateText(eventType, 1, "Event Type");
                    if (!rtn) { break eventEntry; }

                rtn = validateText(eventLocation, 1,  "Event Location");
                    if (!rtn) { break eventEntry; }

                rtn = validateText(eventDesc, 2, "Event Description");
                    if (!rtn) { break eventEntry; }

                if (eventEndDate.value === "") {
                    eventEndDate.value = eventStartDate.value;
                }

// ------------------------------
                sdVal = eventStartDate.value.split("-");
                edVal = eventEndDate.value.split("-");

                sD = new Date();
                sD.setFullYear(sdVal[0], (sdVal[1] - 1 ), sdVal[2]);
                    
                eD = new Date();
                eD.setFullYear(edVal[0], (edVal[1] - 1 ), edVal[2]);
                    
                if (sD > eD) {
                    updateSystemResponse("Event End Date Cannot be Earlier than Event Start Date", 1);
                    break eventEntry;
                }
// ------------------------------

                if (rtn) {   
                    updateSystemResponse("Event Validation Successful", 1);         
                    eventActions(2);  // Mode 2 is for database Event Entry
                } 
            }

            break;

        case 3:  // event query 

            eventQuery: {

                rtn = validateText(queryByName, 1, "Query Name");
                    if (!rtn) { break eventQuery; }

                rtn = validateText(queryByType, 1, "Query Type");
                    if (!rtn) { break eventQuery; }

                rtn = validateText(queryByLocation, 1, "Query Location");
                    if (!rtn) { break eventQuery; }

                rtn = validateText(queryByDesc, 1, "Query Description");

                if (rtn) {          
                    eventActions(3);  // Mode 3 is for eventbase Event Query
                }       
            }
            
            break;

        case 4: // group query

            break

        case 5:  // event update

            if (updateByAnything_RadioButton.checked) {  // update by column and value

                updateColumn = updateByAnything_ColumnUpdate.value;
                whereColumn = updateByAnything_WhereColumn.value;

                eventUpdateByAnything: {

                    if (updateColumn === "") {

                        updateSystemResponse("ERROR: Column to Update Must be Selected for Update by Column and Value", 1);                
                        rtn = false;
                        break eventUpdateByAnything;

                    } else {

                        rtn = true;
                    }

                    if (whereColumn === "") {

                        updateSystemResponse("ERROR: Where Column Must be Selected for Update by Column and Value", 1);                    
                        rtn = false;
                        break eventUpdateByAnything;

                    } else {

                        rtn = true;
                    }

                    if (updateColumn === "Ntext" || updateColumn === "Ttext" || updateColumn === "location") {

                        rtn = validateText(updateByAnything_ValueInsert, 1, "Value of Column to Update");
                        if (!rtn) { break eventUpdateByAnything; }
                    }

                    if (whereColumn === "Ntext" || whereColumn === "Ttext" || whereColumn === "location") {

                        rtn = validateText(updateByAnything_ValueEquals, 1, "Value of Column to Update");
                        if (!rtn) { break eventUpdateByAnything; }
                    }

                    if (updateColumn === "textArea") {

                        rtn = validateText(updateByAnything_ValueInsert, 2, "Value of Where Column");
                        if (!rtn) { break eventUpdateByAnything; }
                    }

                    if (whereColumn === "textArea") {

                        rtn = validateText(updateByAnything_ValueEquals, 2, "Value of Where Column");
                        if (!rtn) { break eventUpdateByAnything; }
                    }
                }
            }
                
            if (updateByID_RadioButton.checked) {  // update by ID

                IdValue = updateByID_IdNum.value;
                updateColumn = updateByID_Column.value;

                eventUpdateByID: {

                    if (IdValue === "") {

                        updateSystemResponse("ERROR: ID Value Must be Selected for Update by ID", 1);
                        rtn = false;                
                        break eventUpdateByID;

                    } else {

                        rtn = true;
                    }

                    if (updateColumn === "") {

                        updateSystemResponse("ERROR: Column to Update Must be Selected for Update by ID", 1);
                        rtn = false;
                        break eventUpdateByID;

                    } else {

                        rtn = true;
                    }

                    if (updateColumn === "Ntext" || updateColumn === "Ttext" || updateColumn === "location") {

                        rtn = validateText(updateByID_Value, 1, "Value of Column Selected");
                        if (!rtn) { break eventUpdateByID; }
                    }

                    if (updateColumn === "textArea") {

                        rtn = validateText(updateByID_Value, 2, "Value of Column Selected");
                        if (!rtn) { break eventUpdateByID; }
                    }
                }
            }

            if (rtn === true) {

                eventActions(5);  
            } 

            break;

        case 6:  // event delete

            if (deleteById_RadioButton.checked) {

                if (deleteByID_Id.value === "") {

                    updateSystemResponse("ERROR: ID Value Must be Selected for Delete by ID", 1);
                    rtn = false;
                   
                } else {

                    rtn = true;
                }
            }

            if (deleteByValue_RadioButton.checked) {

                deleteByValueColumn = deleteByValue_Column.value;
                deleteByValueValue = deleteByValue_Value.value;

                eventDeleteByValue: {

                    if (deleteByValueColumn === "") {

                        updateSystemResponse("Error: Column Must Be Selected for Delete by  Column Value", 1);
                        rtn = false;
                        break eventDeleteByValue;

                    } else {

                        rtn = true;
                    }

                    if (deleteByValueValue === "") {

                        updateSystemResponse("Error: Value Must Be Entered for Delete by Column Value", 1);
                        rtn = false;
                        break eventDeleteByValue;

                    } else {

                        rtn = true;
                    }

                    if (deleteByValueColumn === "Ntext" || deleteByValueColumn === "Ttext" || deleteByValueColumn === "location") {

                        rtn = validateText(deleteByValue_Value, 1, "Value of Column Selected");
                        if (!rtn) { break eventDeleteByValue; }
                    }

                    if (deleteByValueColumn === "textArea") {

                        rtn = validateText(deleteByValue_Value, 2, "Value of Column Selected");
                        if (!rtn) { break eventDeleteByValue; }
                    }
                }
            }

            if (rtn === true) {

                updateSystemResponse("Delete Validation Successful", 1);
                eventActions(6);        
            } 
            break;

        case 7:  // user functions

            break;

        case 8: // admin functions

        // case 8 break

    } // end switch
       
        return;
}




/*
    validateText(elementID, mode, outputText)

    Purpose:
        Compare User text inputs against Regular Expressions to 
        validate data before sending to PHP/Database

    Argument List:
        Element   : Input Element to validate Value of
        Mode      : (1)Regular (2)Extended CharSet Allowed
        OutputText: Text referencing invalid input sent 
                    to dbResponse Div if Invalid.

    Actions:
        Validate Input Value using 1 of 2 modes depending on
        type of data to be sent to PHP

    Called By:
        validateJS(mode)

    Notes:
        Mode 1: No Special Chars
        Mode 2: Special Chars Allowed

*/
function validateText(element, mode, outputText) {

    var rtn = false,
        textReg, invalidText;

    switch (mode) {

        case 1:
            textReg = /^[A-Za-z0-9 _.,;:!'?]*$/; 
            invalidText = "ERROR: Only Letters, Numbers, Punctation, Whitespace and '_' Allowed For ";
            break;
        
        case 2:
            textReg = /^[A-Za-z0-9 _.,;:!"'/?#$%&*@]*$/;
            invalidText = "ERROR: Only Letters, Numbers, Punctuation, Whitespace and '_@#$%&*' Allowed For "; 
            break;

        default:
            updateSystemResponse ("ERROR: Input Text Validation Failed", 1);
            return rtn;

    }
        if (!element.value.match(textReg)) {

            updateSystemResponse(invalidText + outputText, 1);
        } else {

            rtn = true;
        }
    
    return rtn;  
}





/*
    eventActions(mode)

    Purpose:
        Collect Validated Text Values from Input Elements and 
        Create XmlHttpRequest 'send' data to be posted  

    Argument List:
        mode:

    Actions:

    Called By:

    Notes:

*/
function eventActions(mode) {

    var stringToPOST = "mode=" + mode,
        checkBoxArray = [0, 0, 0, 0, 0, 0, 0, 0, 0], // holds true/false values of column check boxes
        checkBoxString, element, insertValue, equalsValue, deleteValue,
        eventClearCheckBox, formResetButton;

    switch(mode) {

// event entry ----------------------------------------------------------------
        case 2: 
        
            stringToPOST += "&eventColor=" + eventColor.value.slice(1) + 
                            "&eventStartDate=" + eventStartDate.value +
                            "&eventEndDate=" + eventEndDate.value +
                            "&eventTime=" + createTime(eventTime.value) +
                            "&eventType=" + eventType.value +
                            "&eventName=" + eventName.value +
                            "&eventLocation=" + eventLocation.value +
                            "&eventDescription=" + eventDesc.value;

            element = "dbResponse";
            eventClearCheckBox = eventEntryCheckBox.checked;
            formResetButton = submitEventReset;

        break;

// event query ----------------------------------------------------------------
        case 3:     

            stringToPOST += "&queryByDate=" + queryByDate.value + 
                            "&queryByName=" + queryByName.value +
                            "&queryByType=" + queryByType.value +
                            "&queryByLocation=" + queryByLocation.value + 
                            "&queryByDesc=" + queryByDesc.value+ 
                            "&queryByTime=" + createTime(queryByTime.value) +
                            "&queryByColor=" + queryByColor.value.slice(1);

            if (stringToPOST.length < 104) {  // if all Input fields are empty
                                            // 104 is .length of stringToPOST with all "" values
                updateSystemResponse("Query Must Include at least (1) Valid Search Term", 1);
                return;
            }

            // update or reset checkBox Array as needed
            if(queryIdCheckBox.checked === true) { checkBoxArray[0] = 1; } else { checkBoxArray[0] = 0; }
            if(queryColorCheckBox.checked === true) { checkBoxArray[1] = 1; } else { checkBoxArray[1] = 0; }
            if(querySDateCheckBox.checked === true) { checkBoxArray[2] = 1; } else { checkBoxArray[2] = 0; }
            if(queryEDateCheckBox.checked === true) { checkBoxArray[3] = 1; } else { checkBoxArray[3] = 0; }
            if(queryTimeCheckBox.checked === true) { checkBoxArray[4] = 1; } else { checkBoxArray[4] = 0; }
            if(queryNameCheckBox.checked === true) { checkBoxArray[5] = 1; } else { checkBoxArray[5] = 0; }
            if(queryTypeCheckBox.checked === true) { checkBoxArray[6] = 1; } else { checkBoxArray[6] = 0; }
            if(queryLocCheckBox.checked === true) { checkBoxArray[7] = 1; } else { checkBoxArray[7] = 0; }
            if(queryDescCheckBox.checked === true) { checkBoxArray[8] = 1; } else { checkBoxArray[8] = 0; }

            checkBoxString = checkBoxArray.join();

            if (checkBoxString === "0,0,0,0,0,0,0,0,0") {  // no Columns chosen for display

                updateSystemResponse("Query Must Return at least (1) Column", 1);
                return;
            }

            stringToPOST += "&checkBoxString=" + checkBoxString;
         // updateSystemResponse(stringToPOST, 1);
            element = "tableDisplayDiv";

            eventClearCheckBox = eventQueryCheckBox.checked;   // true/false value for checkBox

            if (eventClearCheckBox === true) { queryByColor.style.backgroundColor = "#ffffff"; }
            formResetButton = submitQueryReset;
 
            updateSystemResponse("Query Execution Successful", 1);   
        break;

// event update ---------------------------------------------------------------
        case 5:  

            if (updateByAnything_RadioButton.checked) {

                if (updateByAnything_ColumnUpdate.value === "color") {

                    insertValue = updateByAnything_ValueInsert.value.slice(1);

                } else if (updateByAnything_ColumnUpdate.value === "time") {

                    insertValue = createTime(updateByAnything_ValueInsert.value);
                
                } else {

                    insertValue = updateByAnything_ValueInsert.value;
                }

                if (updateByAnything_WhereColumn.value === "color") {

                    equalsValue = updateByAnything_ValueEquals.value.slice(1);

                } else if (updateByAnything_WhereColumn.value === "time") {

                    equalsValue = createTime(updateByAnything_ValueEquals.value);
                
                } else {

                    equalsValue = updateByAnything_ValueEquals.value;
                }

                stringToPOST += "&upBy=Column" + 
                                "&colNam=" + updateByAnything_ColumnUpdate.value +
                                "&colWhe=" + updateByAnything_WhereColumn.value +
                                "&valIns=" + insertValue +
                                "&valEqu=" + equalsValue;       
            }

            if (updateByID_RadioButton.checked) {

                if (updateByID_Column.value === "color") {

                    insertValue = updateByID_Value.value.slice(1);
                
                } else if (updateByID_Column.value === "time") {

                    insertValue = createTime(updateByID_Value.value);
            
                } else {

                    insertValue = updateByID_Value.value;
                }

                stringToPOST += "&upBy=ID" +                        
                                "&idNum=" + updateByID_IdNum.value +
                                "&colNam=" + updateByID_Column.value +
                                "&colVal=" + insertValue;
            }

            element = "dbResponse";
            eventClearCheckBox = eventUpdateCheckBox.checked;
            formResetButton = submitUpdateReset;

            updateSystemResponse("Update Execution Successful", 1);

        break;

// group query ---------------------------------------------------------------        
        case 5:

        break;
    

// event delete ---------------------------------------------------------------
        case 6:   

            if (deleteById_RadioButton.checked) {

                stringToPOST += "&delBy=ID" +
                                "&idNum=" + deleteByID_Id.value;

            }

            if (deleteByValue_RadioButton.checked) {

                if (deleteByValue_Column.value === "color") {

                    deleteValue = deleteByValue_Value.value.slice(1); 

                } else if (deleteByValue_Column.value === "time") {

                    deleteValue = createTime(deleteByValue_Value.value);
                
                } else {

                    deleteValue = deleteByValue_Value.value;
                } 

                stringToPOST += "&delBy=Column" +
                                "&colNam=" + deleteByValue_Column.value +
                                "&colVal=" + deleteValue;
            }

            element = "dbResponse";
            eventClearCheckBox = eventDeleteCheckBox.checked;
            formResetButton = submitDeleteReset;
            
            updateSystemResponse("Delete Execution Successful", 1);
        // break case 6:

        // add cases 7 and 8 for user and admin functions

    } // end switch

// GO AJAX!
    createHttpRequestAndSend(element, "POST", "php/eventActions.php", stringToPOST, mode);

// Check Clear CheckBox on Form
    if (eventClearCheckBox === true) {

        formResetButton.click(); 
        eventClearCheckBox.checked = true;
    }
}
    

  

/*
    queryTabReset()

    Purpose:
        Reset Form to Default Values without Resetting RadioButton
        or forgetting which is checked

    Actions:
        Reset all input boxes to default settings
            i.e Empty/Deactivated

    Called By:
        submitEventReset.click();
*/
function queryTabReset() {

    updateByAnything_ColumnUpdate.value = "";
    updateByAnything_WhereColumn.value = "";

    updateByAnything_ValueInsert.type = "text";
    updateByAnything_ValueInsert.value = "";
    updateByAnything_ValueInsert.size = "16";
    updateByAnything_ValueInsert.disabled = true;

    updateByAnything_ValueEquals.type = "text";
    updateByAnything_ValueEquals.value = "";
    updateByAnything_ValueEquals.size = "16";
    updateByAnything_ValueEquals.disabled = true;

    updateByID_IdNum.value = "";

    updateByID_Column.value = "";

    updateByID_Value.type = "text";
    updateByID_Value.size = "16";
    updateByID_Value.value = "";
    updateByID_Value.disabled = true;

    eventUpdateCheckBox.checked = false;
}




/*
    createTime(tm)

    Purpose:
        Create 12 Hour AM/PM Time Value for DB insert (i.e  '12:00 PM').

    Argument List:
        tm: 24 hour time value from input type='time'

    Actions:
        Slice first 5 characters from time value: '00:00' disregarding seconds and decimal places.
        Slice first 2 from that value.
        Based on value determine AM/PM.
        Create time string from hours, minutes, AM/PM.

    Called By:
        eventActions(mode)

    Returns:
        String formated to 8 character 12 hour time code

    Notes:
        Value 00 = 12 AM
        Value < 10 = single digit hour - take only 2nd digit
        value > 12 = PM Hours - subtract 12 add "PM"

*/
function createTime(tm) {

    var evTm = tm,
        evTmHr;

    if (evTm !== "") {

        evTm = tm.slice(0,5);
        evTmHr = evTm.slice(0, 2);

        if (evTmHr === 0) {

            evTmHr = 12;
        }

        if (evTmHr < 10) {

            evTmHr = evTmHr.slice(1, 2);
        }

        if (evTmHr > 12) {

            evTmHr = evTmHr - 12;
            evTm = evTmHr + evTm.slice(2, 5) + " PM";

        } else {

            evTm = evTmHr + evTm.slice(2, 5) + " AM";
        }    
    }

    return evTm;
}




/*
    eventTab(evt, tabName)

    Purpose:

    Argument List:

    Actions:

    Called By:

    Notes:

*/
function eventTab(evt, tabName) {

    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");

    for (i = 0; i < tabcontent.length; i++) {

        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");

    for (i = 0; i < tablinks.length; i++) {

        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active"; 
}
 
}());  // End IIFE Closure : End CalendarAPP.js