<!--  
      Christopher Pulley
-->

<DOCTYPE html>

<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">   
    <link rel="SHORTCUT ICON" href="img/favicon.ico">
    <link rel="stylesheet" href="css/calendarApp.css">
    
    <title>Calendar Access</title>
</head>

<body class="marginAuto">

  <!--  <header class="blkBorder backGroundGradient2">

        <h3>Homepage Calendar Control</h3>
     
    </header> -->
    
    <section class="blkBorder backGroundGradient2">

        <div class="blkBorder tableContainer marginAuto" id="tableDisplayDiv">
            Login to View Events Table
        </div>

<!-- Tab Buttons -->
        <div class="tab">
            <button type="button" id="eventEntryButton" name="eventEntryButton" class="tablinks">Event Entry
            </button>
            <button type="button" id="eventQueryButton" name="eventQueryButton" class="tablinks">Event Query
            </button>
            <button type="button" id="groupQueryButton" name="groupQueryButton" class="tablinks">Group Query
            </button>
            <button type="button" id="eventUpdateButton" name="eventUpdateButton" class="tablinks">Event Update
            </button>
            <button type="button" id="eventDeleteButton" name="eventDeleteButton" class="tablinks">Event Delete
            </button>
            <button type="button" id="userFunctionsButton" name="userFunctionsButton" class="tablinks">User Functions
            </button>
            <button type="button" id="adminFunctionsButton" name="adminFunctionsButton" class="tablinks">Admin Functions
            </button>
        </div>

<!-- Tab Panels -->
        <div>

            <div id="eventEntryTab" class="blkBorder tableContainer marginAuto tabcontent">

<!-- On Form Submission default action is prevented and window.submit event is triggered to call 
     eventActions JS function -->

<!-- Event Entry Form -->
                <form name="eventEntryForm" id="eventEntryForm">

                <fieldset>

                <legend>Enter Data for New Calendar Event</legend>

                <div class="entryFormDiv" id="entryFormDiv4"> 

                    <button name="submitEvent" id="submitEvent">Submit Event</button>

                    <input type="reset" id="submitEventReset" />

                    <div class="grayBorderThin" id="eventEntryCheckBoxDiv">

                        Check Box to Clear<br>Inputs on Submit<br>
                        <input type="checkbox" name="eventEntryCheckBox" id="eventEntryCheckBox" />

                    </div>
                    <br>

                    <span class="astkSpan">* Indicates Required Field</span>
                
                </div>

                <div class="entryFormDiv" id="entryFormDiv3">

                    <label for="eventColor">Event Color: </label>
                    <br>
                    
                    <input type="color" class="inputColor dataField" name="eventColor" id="eventColor" />
                    
                    <br><br>

                    <label for="eventDesc" id="eventDescLabel">Event Description:</label>     
                    <br>                    
                        <textarea class="dataField" name="eventDesc" id="eventDesc" rows="6" cols="30"
                            placeholder="Description" maxlength="250">
                        </textarea>

                </div>

                <div class="entryFormDiv" id="entryFormDiv2">

                    <label for="eventName">Event Name: <span class="astkSpan">*</span></label>
                    <br>
                    <input type="text" class="dataField" list="eventNameList" name="eventName" id="eventName" size="25" 
                           maxlength="30" placeholder="Name" autocomplete="off" /> 

                        <datalist name="eventNameList" id="eventNameList">
                        </datalist>

                    <br><br>

                    <label for="eventType">Event Type: <span class="astkSpan">*</span></label>
                    <br>
                    <input type="text" class="dataField" list="eventTypeList" name="eventType" id="eventType" 
                        placeholder="Type" size="25" maxlength="30" autocomplete="off" />

                        <datalist name="eventTypeList" id="eventTypeList">
                        </datalist>

                    <br><br>

                    <label for="eventLocation">Event Location:</label>
                    <br>
                    <input type="text" class="dataField" list="eventLocationList" name="eventLocation" id="eventLocation" 
                           size="25" maxlength="150" placeholder="Location" autocomplete="off" />

                        <datalist name="eventLocationList" id="eventLocationList">
                        </datalist>

                </div>

                <div class="entryFormDiv" id="entryFormDiv1">

                    <label for="eventStartDate">Event Start Date: <span class="astkSpan">*</span></label>
                    <br>
                    <input type="date" class="dataField" name="eventStartDate" id="eventStartDate" />

                    <br><br>

                    <label for="eventEndDate">Event End Date:</label>
                    <br>
                    <input type="date" class="dataField" name="eventEndDate" id="eventEndDate" />
                        
                    <br><br>

                    <label for="eventTime">Event Time:</label>
                    <br>
                    <input type="time" class="dataField" name="eventTime" id="eventTime" size="7"
                        placeholder="12:00:00" />

                </div>

                </fieldset>
                </form>
            </div>

<!-- Event Query Form -->
            <div id="eventQueryTab" class="blkBorder tableContainer marginAuto tabcontent">

                <form name="eventQueryForm" id="eventQueryForm">
                
                <fieldset>

                <legend>Enter Search Terms for Event Query:</legend>

                <div class="queryFormDiv" id="queryFormDiv5">

                    <button name="submitQuery" id="submitQuery">Submit Query</button>
                    <input type="reset" id="submitQueryReset" 
                           onclick="queryByColor.style='background-color: #ffffff'" />

                    <div class="grayBorderThin" id="eventQueryCheckBoxDiv">

                        Check Box to Clear<br>Inputs on Submit<br>
                        <input type="checkbox" name="eventQueryCheckBox" id="eventQueryCheckBox" />

                    </div>

                </div>

                <div class="queryFormDiv" id="queryFormDiv4">
                                    
                    <label for="queryByDesc">Query by Partial Description:</label>
                    <br>
                    <input type="text" class="dataField" name="queryByDesc" id="queryByDesc" placeholder="Description"
                        size="29" maxlength="50" />

                    <br><br>

                    <div id="TimeColorDiv">
                  
                        <div id="colorDiv">
                            <label for="queryByColor">Query by Color:</label>
                            <br>
                            <select class="dataField" name="queryByColor" id="queryByColor">
                            </select>
                        </div>

                        <div id="timeDiv">
                            <label for="queryByTime">Query by Time:</label>
                            <br>
                            <input type="time" class="dataField" name="queryByTime" id="queryByTime" />
                        </div>

                    </div>

                </div>

                 <div class="queryFormDiv" id="queryFormDiv3">

                    <label for="queryByType">Query by Type:</label>
                    <br>
                    <input list="queryTypeList" class="dataField" name="queryByType" id="queryByType" placeholder="Type"
                        size="25" maxlength="30" autocomplete="off" />

                    <datalist name="queryTypeList" id="queryTypeList">                                
                    </datalist>
                    
                    <br><br>

                    <label for="queryByLocation">Query By Location:</label>
                    <br>
                    <input type="text" class="dataField" list="queryLocationList" name="queryByLocation" id="queryByLocation" 
                        size="25" maxlength="50" placeholder="Location" autocomplete="off" /> 

                        <datalist name="queryLocationList" id="queryLocationList">
                        </datalist>

                 </div>

                <div class="queryFormDiv" id="queryFormDiv2">

                    <label for="queryByDate">Query by Start Date:</label>
                    <br>
                    <input type="date" class="dataField" name="queryByDate" id="queryByDate" 
                           placeholder="01/01/2001" />
                            
                    <br><br>

                    <label for="queryByName">Query by Name:</label>
                    <br>
                    <input type="text" class="dataField" list="queryNameList" name="queryByName" id="queryByName" 
                           placeholder="Name" size="16" maxlength="30" autocomplete="off" />  
                           
                        <datalist name="queryNameList" id="queryNameList">
                        </datalist>
                </div>

                <div class="queryFormDiv grayBorderThin" id="queryFormDiv1">
                    Click Check Boxes to Choose Columns to Display in Query Output:<br>
                    <input type="checkbox" class="queryColumnCheckBox" name="queryIdCheckBox" id="queryIdCheckBox" checked />ID
                    <input type="checkbox" class="queryColumnCheckBox" name="queryColorCheckBox" id="queryColorCheckBox" checked />Color
                    <input type="checkbox" class="queryColumnCheckBox" name="querySDateCheckBox" id="querySDateCheckBox" checked />Start Date
                    <input type="checkbox" class="queryColumnCheckBox" name="queryEDateCheckBox" id="queryEDateCheckBox" checked />End Date
                    <input type="checkbox" class="queryColumnCheckBox" name="queryTimeCheckBox" id="queryTimeCheckBox" checked />Time
                    <input type="checkbox" class="queryColumnCheckBox" name="queryNameCheckBox" id="queryNameCheckBox" checked />Name
                    <input type="checkbox" class="queryColumnCheckBox" name="queryTypeCheckBox" id="queryTypeCheckBox" checked />Type
                    <input type="checkbox" class="queryColumnCheckBox" name="queryLocCheckBox" id="queryLocCheckBox" checked />Location
                    <input type="checkbox" class="queryColumnCheckBox" name="queryDescCheckBox" id="queryDescCheckBox" checked />Description
                </div>

                </fieldset>

                </form>

            </div>

<!-- Group Query Form -->
            <div id="groupQueryTab" class="blkBorder tableContainer marginAuto tabcontent">

                <form name="groupQueryForm" id="groupQueryForm">
                    
                    <fieldset>

                        <legend>Enter Search Terms for Event Group Query:</legend>

                        <div class="groupQueryFormDiv" id="groupQueryFormDiv6">

                            <button name="submitGroupQuery" id="submitGroupQuery">Submit Query</button>
                            <input type="reset" id="submitGroupQueryReset" />

                            <div class="grayBorderThin" id="eventGroupQueryCheckBoxDiv">

                                Check Box to Clear<br>Inputs on Submit<br>
                                <input type="checkbox" name="eventGroupQueryCheckBox" id="eventGroupQueryCheckBox" />

                            </div>

                        </div>

                        <div class="groupQueryFormDiv grayBorderThin" id="groupQueryFormDiv5">

                            <p><input type="radio" name="groupQueryRadioButton" id="groupQueryX_RadioButton"> 
                            XXXXXXXXX:</p>

                            <label for="groupQueryX">Field1:</label>
                            <br>
                            <input type="text" class="dataField" name="groupQueryX" id="groupQueryX" 
                                   placeholder="Field 1" size="16" maxlength="30" />                   
                            <br>

                            <label for="groupQueryX2">Field 2:</label>
                            <br>
                            <input type="text" class="dataField" name="groupQueryX2" id="groupQueryX2" 
                                   placeholder="Field 2" size="16" maxlength="30" />  
                        </div>

                        <div class="groupQueryFormDiv grayBorderThin" id="groupQueryFormDiv4">

                            <p><input type="radio" name="groupQueryRadioButton" id="groupQueryMultiType_RadioButton"> 
                            Multi-Type:</p>

                            <label for="groupQueryMultiType1">Event Type 1:</label>
                            <br>
                            <input type="text" class="dataField" name="groupQueryMultiType1" id="groupQueryMultiType1" 
                                   placeholder="Type 1" size="16" maxlength="30" />                   
                            <br>

                            <label for="groupQueryMultiType2">Event Type 2:</label>
                            <br>
                            <input type="text" class="dataField" name="groupQueryMultiType2" id="groupQueryMultiType2" 
                                   placeholder="Type 2" size="16" maxlength="30" />  
                        </div>

                        <div class="groupQueryFormDiv grayBorderThin" id="groupQueryFormDiv3">

                            <p><input type="radio" name="groupQueryRadioButton" id="groupQueryByDate_RadioButton"> 
                            Dates Between:</p>

                            <label for="groupQueryByDatesStart">Start Date:</label>
                            <br>
                            <input type="date" class="dataField" name="groupQueryByDatesStart" id="groupQueryByDateStarts" 
                                   placeholder="01/01/2001" />                   
                            <br>

                            <label for="groupQueryByDatesEnd">End Date:</label>
                            <br>
                            <input type="date" class="dataField" name="groupQueryByDatesStart" id="groupQueryByDatesStart" 
                                   placeholder="12/01/2001" />  
                        </div>


                        <div class="groupQueryFormDiv grayBorderThin" id="groupQueryFormDiv2">

                            <p><input type="radio" name="groupQueryRadioButton" id="groupQueryByID_RadioButton"> 
                            ID #'s Between:</p>

                            <label for="groupQueryByIdStart">ID Start:</label>
                            <br>
                            <input type="number" class="dataField" name="groupQueryByIdStart"
                                   id="groupQueryByIdStart" min="1" max="100" />                   
                            <br>

                            <label for="groupQueryByIdEnd">ID End:</label>
                            <br>
                            <input type="number" class="dataField" name="groupQueryByIdEnd"
                                   id="groupQueryByIdEnd" min="1" max="100" />  
                        </div>

                        <div class="groupQueryFormDiv grayBorderThin" id="groupQueryFormDiv1">
                            Click Check Boxes to Choose Columns to Display in Query Output:<br>
                            <input type="checkbox" class="groupQueryColumnCheckBox" name="groupQueryIdCheckBox" id="groupQueryIdCheckBox" checked />ID
                            <input type="checkbox" class="groupQueryColumnCheckBox" name="groupQueryColorCheckBox" id="groupQueryColorCheckBox" checked />Color
                            <input type="checkbox" class="groupQueryColumnCheckBox" name="groupQuerySDateCheckBox" id="groupQuerySDateCheckBox" checked />Start Date
                            <input type="checkbox" class="groupQueryColumnCheckBox" name="groupQueryEDateCheckBox" id="groupQueryEDateCheckBox" checked />End Date
                            <input type="checkbox" class="groupQueryColumnCheckBox" name="groupQueryTimeCheckBox" id="groupQueryTimeCheckBox" checked />Time
                            <input type="checkbox" class="groupQueryColumnCheckBox" name="groupQueryNameCheckBox" id="groupQueryNameCheckBox" checked />Name
                            <input type="checkbox" class="groupQueryColumnCheckBox" name="groupQueryTypeCheckBox" id="groupQueryTypeCheckBox" checked />Type
                            <input type="checkbox" class="groupQueryColumnCheckBox" name="groupQueryLocCheckBox" id="groupQueryLocCheckBox" checked />Location
                            <input type="checkbox" class="groupQueryColumnCheckBox" name="groupQueryDescCheckBox" id="groupQueryDescCheckBox" checked />Description
                        </div>                   

                    </fieldset>

                </form>

            </div>

<!-- Event Update Form -->
            <div id="eventUpdateTab" class="blkBorder tableContainer marginAuto tabcontent">

                <form name="eventUpdateForm" id="eventUpdateForm">
                    
                <fieldset>

                    <legend>Enter Search Terms for Event Update:</legend>

                <div class="updateFormDiv" id="updateFormDiv5">

                    <button name="submitUpdate" id="submitUpdate">Submit Update</button>
                    <input type="reset" id="submitUpdateReset"/>
                    <br><br>

                    <div class="grayBorderThin" id="eventUpdateCheckBoxDiv">

                        Check Box to Clear<br>Inputs on Update<br>
                        <input type="checkbox" name="eventUpdateCheckBox" id="eventUpdateCheckBox" 
                           value="yes">

                    </div>

                </div>
<!-- ------------------------------------------------------------------------ -->
                <div class="grayBorderThin" id="updateFormDivUpByID">

                    <div class="updateFormDiv" id="updateFormDiv4">

                        <br><br>

                        <label for="updateByID_Column">Column to Update:</label>
                        <br>

                        <select class="columnSelectList dataField" name="updateByID_Column" id="updateByID_Column">
                            <option value="">Select a Column:</option>
                            <option value="color">Event Color</option>
                            <option value="Sdate">Event Start Date</option>
                            <option value="Edate">Event End Date</option>
                            <option value="time">Event Time</option>
                            <option value="Ntext">Event Name</option>
                            <option value="Ttext">Event Type</option>
                            <option value="location">Event Location</option>
                            <option value="textArea">Event Description</option>
                        </select>
                                
                        <br><br>

                        <label for="updateByID_Value">Value to Insert:</label>
                        <br>
                        <input type="text" class="dataField" name="updateByID_Value" id="updateByID_Value"
                            size="16" maxlength="30">                
                    </div>

<!-- ------------------------------------------------------------------------ -->

                    <div class="updateFormDiv" id="updateFormDiv3">

                    <p><input type="radio" name="updateRadioButton" id="updateByID_RadioButton"> 
                        Update by ID:</p>

                        <label for="updateByID_Id">ID:</label>
                        <br>
                        <input type="number" class="dataField" name="updateByID_IdNum" id="updateByID_IdNum"
                            min="1" max="100">
                
                    </div>

                </div>

<!-- ------------------------------------------------------------------------ -->

                <div class="grayBorderThin" id="updateFormDivUpByCol">

                    <div class="updateFormDiv" id="updateFormDiv2">

                        <br>

                        <label for="updateByAnything_ValueInsert">Value to Insert:</label>
                        <br>
                        <input type="text" class="dataField  test" name="updateByAnything_ValueInsert"
                            id="updateByAnything_ValueInsert" size="16" maxlength="30"> 
                               
                        <br>

                        <label for="updateByAnything_ValueEquals">Value Equals:</label>
                        <br>
                        <input type="text" class="dataField" name="updateByAnything_ValueEquals" 
                            id="updateByAnything_ValueEquals" size="16" maxlength="30">                
                    </div>

<!-- ------------------------------------------------------------------------ -->

                    <div class="updateFormDiv" id="updateFormDiv1">

                    <p><input type="radio" name="updateRadioButton" id="updateByAnything_RadioButton"> 
                        Update by Column Value:</p>

                        <label for="updateByAnything_ColumnUpdate">Column to Update:</label>
                        <br>
                        <select class="columnSelectList dataField" name="updateByAnything_ColumnUpdate"
                                   id="updateByAnything_ColumnUpdate">
                            <option value="">Select a Column:</option>
                            <option value="color">Event Color</option>
                            <option value="Sdate">Event Start Date</option>
                            <option value="Edate">Event End Date</option>
                            <option value="time">Event Time</option>
                            <option value="Ntext">Event Name</option>
                            <option value="Ttext">Event Type</option>
                            <option value="location">Event Location</option>
                            <option value="textArea">Event Description</option>
                        </select> 
                                                      
                        <br><br>

                        <label for="updateByAnything_WhereColumn">Where Column:</label>
                        <br>
                        <select class="columnSelectList dataField" name="updateByAnything_WhereColumn"
                                   id="updateByAnything_WhereColumn">
                            <option value="">Select a Column:</option>
                            <option value="number">Event ID</option>
                            <option value="color">Event Color</option>
                            <option value="Sdate">Event Start Date</option>
                            <option value="Edate">Event End Date</option>
                            <option value="time">Event Time</option>
                            <option value="Ntext">Event Name</option>
                            <option value="Ttext">Event Type</option>
                            <option value="location">Event Location</option>
                            <option value="textArea">Event Description</option>
                        </select>            
                    </div>

                </div>

                </fieldset>

                </form>
            
            </div>

<!-- Event Delete Form -->
            <div id="eventDeleteTab" class="blkBorder tableContainer marginAuto tabcontent">
                
            <form name="eventDeleteForm" id="eventDeleteForm">
                    
                <fieldset>

                    <legend>Enter Terms for Event Delete:</legend>

                <div class="deleteFormDiv" id="deleteFormDiv3">

                    <button name="submitDelete" id="submitDelete">Submit Delete</button>
                    <input type="reset" id="submitDeleteReset"/>
                    <br>
                
                    <div class="grayBorderThin" id="eventDeleteCheckBoxDiv">

                        Check Box to Clear<br>Inputs on Delete<br>
                        <input type="checkbox" name="eventDeleteCheckBox" id="eventDeleteCheckBox" 
                            value="yes">

                    </div>

                </div>

                <div class="grayBorderThin deleteFormDiv" id="deleteFormDivDelByID">

                    <p><input type="radio" name="deleteBy_RadioButton" id="deleteById_RadioButton"> 
                    Delete by Event ID:</p>

                    <label for="deleteByID_Id">ID to Delete:</label>
                    <br>
                    <input type="number" class="dataField" name="deleteByID_Id" id="deleteByID_Id"
                           min="1" max="100"> 
                                                    
                    <br><br><br><br>

                </div>

                <div class="grayBorderThin deleteFormDiv" id="deleteFormDivDelByVal">

                    <p><input type="radio" name="deleteBy_RadioButton"
                              id="deleteByValue_RadioButton">
                    Delete by Column Value:</p>

                    <label for="deleteByValue_Column">Column to Search:</label>
                    <br>

                    <select class="columnSelectList dataField" name="deleteByValue_Column" 
                            id="deleteByValue_Column">
                        <option value="">Select a Column:</option>
                        <option value="number">Event ID</option>
                        <option value="color">Event Color</option>
                        <option value="Sdate">Event Start Date</option>
                        <option value="Edate">Event End Date</option>
                        <option value="time">Event Time</option>
                        <option value="Ntext">Event Name</option>
                        <option value="Ttext">Event Type</option>
                        <option value="location">Event Location</option>
                        <option value="textArea">Event Description</option>
                    </select> 
                               
                    <br><br>

                    <label for="deleteByValue_Value">Value Equals:</label>
                    <br>
                    <input type="text" class="dataField" name="deleteByValue_Value" 
                        id="deleteByValue_Value" size="16" maxlength="30">                
                </div>

                </fieldset>

                </form>
                
            </div>

            <div id="userFunctionsTab" class="blkBorder tableContainer marginAuto tabcontent">

                <form name="userFunctionsForm" id="userFunctionsForm">
                    
                    <fieldset>

                        <legend>Available User Functions:</legend>

                    </fieldset>

                </form>

            </div>

            <div id="adminFunctionsTab" class="blkBorder tableContainer marginAuto tabcontent">

                <form name="adminFunctionsForm" id="adminFunctionsForm">
                    
                    <fieldset>

                        <legend>Administrator Functions:</legend>

                        <div class="adminFuncFormDiv" id="adminFuncFormDiv4">

                            <button name="submitAdminFunc" id="submitAdminFunc">Submit Query</button>
                            <input type="reset" id="submitAdminFuncReset" />

                            <div class="grayBorderThin" id="eventAdminFuncCheckBoxDiv">

                                Check Box to Clear<br>Inputs on Submit<br>
                                <input type="checkbox" name="eventAdminFuncCheckBox" id="eventAdminFuncCheckBox" />

                            </div>

                        </div>

                        <div class="adminFuncFormDiv grayBorderThin" id="adminFuncFormDiv3">

                            <p><input type="radio" name="adminFuncRadioButton" id="adminCondenseTable_RadioButton"> 
                            Condense Table:<span class="astkSpan"> *</span></p>

                            <br>

                            <button name="adminCondenseTableButton" id="adminCondenseTableButton">Condense Table</button>

                            <br>
                            <br>

                            <p class="astkSpan">* Removes Missing Row ID's and Moves Records up to 
                                                  Fill Empty Spaces
                            </p>

                            <br>

                        </div>

                        <div class="adminFuncFormDiv grayBorderThin" id="adminFuncFormDiv2">

                            <p><input type="radio" name="adminFuncRadioButton" id="adminDelUser_RadioButton"> 
                            Delete User:</p>

                            <br>

                            <label for="adminDelUserName">User Name:</label>
                            <br>
                            <input type="text" class="dataField" name="adminDelUserName" id="adminDelUserName" 
                                   placeholder="Username" size="16" maxlength="30" />                   
                            <br>
                            <br>

                        </div>

                        <div class="adminFuncFormDiv grayBorderThin" id="adminFuncFormDiv1">

                            <p><input type="radio" name="adminFuncRadioButton" id="adminAddUser_RadioButton"> 
                            Add User:</p>

                            <br>

                            <label for="adminAddUserName">Username:</label>
                            <br>
                            <input type="text" class="dataField" name="adminAddUserName" id="adminAddUserName" 
                                   placeholder="Username" size="16" maxlength="30" />                   
                            <br>

                            <label for="adminAddUserPassWord1">Password:</label>
                            <br>
                            <input type="text" class="dataField" name="adminAddUserPassWord1" id="adminAddUserPassWord1" 
                                   placeholder="Password" size="16" maxlength="30" />  
                            <br>

                            <label for="adminAddUserPassWord2">Password Again:</label>
                            <br>
                            <input type="text" class="dataField" name="adminAddUserPassWord2" id="adminAddUserPassWord2" 
                                   placeholder="Password Again" size="16" maxlength="30" />  
                        </div>


                    </fieldset>

                </form>

            </div>
        </div>

    </section>


<!-- LOGIN BOX -->
    <nav class="blkBorder backGroundGradient2" id="loginBox">
        <h4><a href="..//index.php">Return to Homepage</a></h4>
        <hr>
        <h3>Login to Events Database:</h3>
        <form name="loginForm" id="loginForm">

            Username : <input type="text" name="userName" id="userName"
                              value="Cpulley" required autocomplete="off"><br><br>
            Password : <input type="password" name="pWord" id="pWord"
                              value="Cpulley" required autocomplete="off"><br><br>

            <button name="loginButton" id="loginButton">Login</button>&nbsp;&nbsp;

            <button type="button" name="logOutButton" id="logOutButton">Logout</button><br>
        
        </form>
        <h4 id="loginResponse">Login Status: Logged Out</h4>
        <hr>
        
        <div>
            <div id="tableLoadButtonTab">
                <button id="tableLoadButton" name="tableLoadButton">Show Main Table</button>
            </div>

            <div>
                <h3>System Response:</h3>
            <div>
        </div>

        <div class="blkBorder marginAuto" id="dbResponse">
            System Status: Inactive<br><hr>
        </div>
    </nav>

    <footer class="blkBorder backGroundGradient2">
        <?php 
            echo "<h6><i>Homepage Calendar Control: Copyright &copy; Christopher Pulley " .  date("Y") . "</i></h6>";   
        ?>     
    </footer>

    
    <script src="js/calendarAPP.js"></script>
</body>

</html>
