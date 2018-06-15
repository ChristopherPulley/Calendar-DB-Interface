<?php // tableLoad.php - required for calendarAPP.php ?>

<?php

try {
    require_once 'login.php';
    require_once 'dateConverter.php';

    $conn = new PDO("mysql:host=$hn; dbname=$db", $un, $pw);

    $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $connSQL = $conn -> prepare("SELECT * FROM events");  // mySQL Statment

    if($connSQL -> execute()) {   
        $tableOutput = "<table id='eventsTable'><tr>" . 
            "<th class='tableHead'>Event ID</th>" . 
            "<th class='tableHead'>Event Color</th>" .
            "<th class='tableHead'>Event Start Date</th>" . 
            "<th class='tableHead'>Event End Date</th>" . 
            "<th class='tableHead'>Event Time</th>" . 
            "<th class='tableHead'>Event Name</th>" .
            "<th class='tableHead'>Event Type</th>" . 
            "<th class='tableHead'>Event Location</th>" . 
            "<th class='tableHead'>Event Description</th></tr>"; 

        while ($row = $connSQL -> fetch(PDO::FETCH_ASSOC)) {  // Get Associative Array of Next Row

            $rowClr = "#" . $row['event_color'];  // create color code for TR background-color

            $tableOutput = $tableOutput . "<tr style='background-color:$rowClr;'>" .  // Build Table Row for Display
            "<td class='tableData'>" . $row['event_id'] . "</td>" .
            "<td class='tableData'>" . "#" . $row['event_color'] . "</td>" .
            "<td class='tableData'>" . convertDate($row['event_start_date']) . "</td>" .
            "<td class='tableData'>" . convertDate($row['event_end_date']) . "</td>" .
            "<td class='tableData'>" . $row['event_time'] . "</td>" .
            "<td class='tableData'>" . $row['event_name'] . "</td>" .
            "<td class='tableData'>" . $row['event_type'] . "</td>" .
            "<td class='tableData'>" . $row['event_location'] . "</td>" .
            "<td class='tableData'>" . $row['event_description'] . "</td>" .
            "</tr>";                                
        }
        $tableOutput = $tableOutput . "</table>";  // End HTML Table
    } else {
        $tableOutput = $tableOutput . "</table><br>:Zero Rows Returned";  // ALT End Table
    }
}
catch (Exception $e) {  // Catch Errors and End Table
    $tableOutput = $tableOutput . "</table><br> Sorry. An Error Occurred " . $e -> getMessage();
} 
finally {
    $conn = null;
    echo $tableOutput;
}

?>