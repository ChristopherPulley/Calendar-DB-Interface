<?php

try {
    require_once "login.php";
    require_once "checkInputs.php";
    require_once "dateConverter.php"; 

    $error = 0;

    $mode = $_POST['mode'];

    $conn = new PDO("mysql:host=$hn; dbname=$db", $un, $pw);

    $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Event Entry ----------------------------------------------------------------
    if ($mode == 2) {
       
        $sqlStmt = $conn->prepare("INSERT INTO events (event_color, event_start_date, event_end_date,
            event_time, event_type, event_name, event_location, event_description) VALUES 
            (?, ?, ?, ?, ?, ?, ?, ?)");

        $sqlStmt -> bindParam(1, $evCl, PDO::PARAM_STR);
        $sqlStmt -> bindParam(2, $evSd, PDO::PARAM_STR);
        $sqlStmt -> bindParam(3, $evEd, PDO::PARAM_STR);
        $sqlStmt -> bindParam(4, $evTm, PDO::PARAM_STR);
        $sqlStmt -> bindParam(5, $evTp, PDO::PARAM_STR);
        $sqlStmt -> bindParam(6, $evNm, PDO::PARAM_STR);
        $sqlStmt -> bindParam(7, $evLc, PDO::PARAM_STR);
        $sqlStmt -> bindParam(8, $evDs, PDO::PARAM_STR);

        $evCl = $_POST['eventColor'];
        $evSd = $_POST['eventStartDate'];
        $evEd = $_POST['eventEndDate'];
        $evTm = $_POST['eventTime'];

        $evTp = clean_input($_POST['eventType']);
        $evNm = clean_input($_POST['eventName']);
        $evLc = clean_input($_POST['eventLocation']);
        $evDs = clean_input($_POST['eventDescription']);

        if ($sqlStmt -> execute()) {

            $evCl = "#" . $evCl;

            echo "New Event Inserted" . "<hr>" .
                "Event Start Date: " . convertDate($evSd) . "<br>" .
                "Event End Date: " . convertDate($evEd) . "<br>" . 
                "Event Time: " . $evTm . "<br>" .
                "Event Type: " . $evTp . "<br>" .
                "Event Color: " . $evCl . "<br>" .  
                "Event Name: " . $evNm . "<br>" . 
                "Event Location: " . $evLc . "<br>" .
                "Event Description: " . $evDs;
        }
    }

    // Event Query ----------------------------------------------------------------
    if ($mode == 3) {

    // event_color is queried by default but column only displayed if Color Checkbox = true
        $columns = "event_color, ";
        $whereString = "";
        $fields = 1;

        $tableOutput = "<table id='queryTable'><tr>";

        if ($_POST['checkBoxString']) { 
            
            $checkBoxString = $_POST['checkBoxString'];
            $checkBoxArray = explode(",", $checkBoxString);
        }
        
//printf($checkBoxString); //---------------------------------------------------take me out!

// build table header and add columns to query string
        if ($checkBoxArray[0] == 1)  {

            $tableOutput .= "<th class='tableHead'>Event ID</th>"; 
            $fields++;
            $columns = "event_id, " . $columns;
        }

        if ($checkBoxArray[1] == 1)  {

            $tableOutput .= "<th class='tableHead'>Event Color</th>";
        }
    
        if ($checkBoxArray[2] == 1)  {

            $tableOutput .= "<th class='tableHead'>Event Start Date</th>"; 
            $fields++;
            $columns .= "event_start_date, ";
        }

        if ($checkBoxArray[3] == 1)  {

            $tableOutput .= "<th class='tableHead'>Event End Date</th>";
            $fields++;
            $columns .= "event_end_date, ";
        }

        if ($checkBoxArray[4] == 1)  {

            $tableOutput .= "<th class='tableHead'>Event Time</th>"; 
            $fields++;
            $columns .= "event_time, ";
        }

        if ($checkBoxArray[5] == 1)  {

            $tableOutput .= "<th class='tableHead'>Event Name</th>";
            $fields++;
            $columns .= "event_name, ";
        }

        if ($checkBoxArray[6] == 1)  {

            $tableOutput .= "<th class='tableHead'>Event Type</th>";
            $fields++;
            $columns .= "event_type, ";
        }

        if ($checkBoxArray[7] == 1)  {

            $tableOutput .= "<th class='tableHead'>Event Location</th>";
            $fields++;
            $columns .= "event_location, ";
        }

        if ($checkBoxArray[8] == 1)  {

            $tableOutput .= "<th class='tableHead'>Event Description</th>"; 
            $fields++;
            $columns .= "event_description, ";
        }

        $tableOutput .= "</tr>";

// build WHERE part of SQL statement  
        if ($_POST['queryByDate'] != "") { 
            
            $qvDt = $_POST['queryByDate']; 
            $whereString .= "event_start_date='$qvDt' && ";          
        }

        if ($_POST['queryByTime'] != "") {

            $qvTm = $_POST['queryByTime']; 
            $whereString .= "event_time='$qvTm' && ";
        }

        if ($_POST['queryByName'] != "") { 
            
            $qvNm = clean_input($_POST['queryByName']); 
            $whereString .= "event_name LIKE '%$qvNm%' && ";
        }

        if ($_POST['queryByType'] != "") { 
            
            $qvTy = clean_input($_POST['queryByType']); 
            $whereString .= "event_type LIKE '%$qvTy%' && ";
        }

        if ($_POST['queryByLocation'] != "") { 
            
            $qvLc = clean_input($_POST['queryByLocation']); 
            $whereString .= "event_location LIKE '%$qvLc%' && ";
        }

        if ($_POST['queryByDesc'] != "") { 
            
            $qvDs = clean_input($_POST['queryByDesc']); 
            $whereString .= "event_description LIKE '%$qvDs%' && ";
        }

        if ($_POST['queryByColor'] != "") { 
            
            $qvCl = $_POST['queryByColor'];      
            $whereString .= "event_color='$qvCl' && ";
        }

        $columns = substr($columns, 0, strlen($columns)- 2);  // cuts last ', '

        $whereString = substr($whereString, 0, strlen($whereString) - 4); // cuts last '&&'

        $sqlStmt = $conn->prepare("SELECT $columns FROM events WHERE $whereString");

        if ($sqlStmt -> execute()) {

            while ($row = $sqlStmt -> fetch(PDO::FETCH_BOTH)) {  // Get Associative Array of Next Row

                $rowClr = "#" . $row['event_color'];  // get row color of current event

                $tableOutput .= "<tr style='background-color:$rowClr;'>";

                for ($i = 0; $i < $fields; $i++) {

                    if ($checkBoxArray[1] == 1 && $row[$i] == $row['event_color']) {

                        $tableOutput .= "<td class='tableData'>$rowClr</td>";
                    } 
                    else if ($checkBoxArray[2] == 1 && $row[$i] == $row['event_start_date']) {
                            
                        $tableOutput .= "<td class='tableData'>" .
                            convertDate($row['event_start_date']) .
                            "</td>";
                    }
                    else if ($checkBoxArray[3] == 1 && $row[$i] == $row['event_end_date']) {

                        $tableOutput .= "<td class='tableData'>" . 
                            convertDate($row['event_end_date']) .
                            "</td>";
                    }
                    else if ($row[$i] != $row['event_color']){

                        $tableOutput .=  "<td class='tableData'>$row[$i]</td>";
                    }                  
                }

                $tableOutput .= "</tr>";
            }

            $tableOutput .= "</table>";

        } else {
                $tableOutput = $tableOutput . "</table><br>:Zero Rows Returned for SQL Statement:<br><br>$sqlString";  // ALT End Table
        }   
        

        echo $tableOutput; 
    }

    // Event Update ---------------------------------------------------------------
    if ($mode == 5) {

        if ($_POST['colNam'] == "color") { $colName = "event_color"; $name = "Event Color"; }
        if ($_POST['colNam'] == "Sdate") { $colName = "event_start_date"; $name = "Event Start Date"; }
        if ($_POST['colNam'] == "Edate") { $colName = "event_end_date"; $name = "Event End Date"; }
        if ($_POST['colNam'] == "time") { $colName = "event_time"; $name = "Event Time"; }
        if ($_POST['colNam'] == "Ntext") { $colName = "event_name"; $name = "Event Name"; }
        if ($_POST['colNam'] == "Ttext") { $colName = "event_type"; $name = "Event Type"; }
        if ($_POST['colNam'] == "location") { $colName = "event_location"; $name = "Event Location"; }
        if ($_POST['colNam'] == "textArea") { $colName = "event_description"; $name = "Event Description"; }

        
        if ($_POST['upBy'] == "ID") {

            $colValue = $_POST['colVal'];
                 
            $idNum = $_POST['idNum'];

            $sqlStmt = $conn->prepare("UPDATE events SET $colName = '$colValue' WHERE event_id = $idNum");

            $updateOutput = "Event ID: $idNum Column: '$name' Value Updated to '$colValue'";
        }

        if ($_POST['upBy'] == "Column") {

            if ($_POST['colWhe'] == "number") { $colWhere = "event_id"; $wName = "Event ID";}
            if ($_POST['colWhe'] == "color") { $colWhere = "event_color"; $wName = "Event Color"; }
            if ($_POST['colWhe'] == "Sdate") { $colWhere = "event_start_date"; $wName = "Event Start Date"; }
            if ($_POST['colWhe'] == "Edate") { $colWhere = "event_end_date"; $wName = "Event End Date"; }
            if ($_POST['colWhe'] == "time") { $colWhere = "event_time"; $wName = "Event Time"; }
            if ($_POST['colWhe'] == "Ntext") { $colWhere = "event_name"; $wName = "Event Name"; }
            if ($_POST['colWhe'] == "Ttext") { $colWhere = "event_type"; $wName = "Event Type"; }
            if ($_POST['colWhe'] == "location") { $colWhere = "event_location"; $wName = "Event Location"; }
            if ($_POST['colWhe'] == "textArea") { $colWhere = "event_description"; $wName = "Event Description"; }

            $valIns = clean_input($_POST['valIns']);
            $valEqu = clean_input($_POST['valEqu']);

            $sqlStmt = $conn->prepare("UPDATE events SET $colName = '$valIns' WHERE $colWhere = '$valEqu'");
            
            $updateOutput = "$name Updated to '$valIns' Where $wName Equals '$valEqu'";
        }

        $sqlStmt -> execute();
      
        echo $updateOutput;
    }

    // Event Delete ---------------------------------------------------------------
    if ($mode == 6) {

        if ($_POST['delBy'] == "ID") {

            $delIdNum = $_POST['idNum'];

            $sqlStmt = $conn -> prepare("DELETE FROM events WHERE event_id = ?");

            $sqlStmt -> bindParam(1, $delIdNum, PDO::PARAM_STR);

            $deleteUpdate = "Event ID: '$delIdNum' and Event Data Deleted";
        }

        if ($_POST['delBy'] == "Column") {

            if ($_POST['colNam'] == "number") { $delCol = "event_id"; }
            if ($_POST['colNam'] == "color") { $delCol = "event_color"; }
            if ($_POST['colNam'] == "Sdate") { $delCol = "event_start_date"; }
            if ($_POST['colNam'] == "Edate") { $delCol = "event_end_date"; }
            if ($_POST['colNam'] == "time") { $delCol = "event_time"; }
            if ($_POST['colNam'] == "Ntext") { $delCol = "event_name"; }
            if ($_POST['colNam'] == "Ttext") { $delCol = "event_type"; }
            if ($_POST['colNam'] == "location") { $delCol = "event_location"; }
            if ($_POST['colNam'] == "textArea") { $delCol = "event_description"; }

            $delVal = clean_input($_POST['colVal']);

            $sqlStmt = $conn -> prepare("DELETE FROM events WHERE $delCol = ?");

            $sqlStmt -> bindParam(1, $delVal, PDO::PARAM_STR);

            $deleteUpdate = "Event Deleted Where $delCol equals $delVal";
        }

        $sqlStmt -> execute();

        echo $deleteUpdate;
    }
}
catch (Exception $e) {

    $error = 1;

    if ($mode == 2 || $mode == 3) {
        $tableOutput .= "</table><br> Sorry. An Error Occurred " . $e -> getMessage();
    }

    if ($mode == 5 || $mode == 6) {
        $updateOutput = "Sorry. An Update Error Occured " . $e -> getMessage();
    }
}
finally {

    if ($error != 1) {

        $sqlStmt = null;
        $conn = null;
    }
}

?>