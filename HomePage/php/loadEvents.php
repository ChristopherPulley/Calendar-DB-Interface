<?php

require_once "login.php";

$month = $_GET['month'] + 1;
$year = $_GET['year'];

$conn = new mysqli($hn, $un, $pw, $db);

    if ($conn->connect_error) die($conn->connect_error);

    $calendarStart = $year . '-' . $month . '-01';
    $calendarEnd = $year . "-" . $month . '-' . cal_days_in_month(CAL_GREGORIAN, $month, $year);

    $query =  "SELECT * FROM events WHERE event_start_date between '$calendarStart' AND '$calendarEnd'";
    
    $result = $conn->query($query);
    
    if (!$result) die($conn->error);
    
    $rows = $result->num_rows;
    
    $j = 0;
    
    $calendarEventArray = array();

    while($j < $rows) {
        
            $result->data_seek($j);
                $event_id = $result->fetch_assoc()['event_id'];
        
            $result->data_seek($j);
                $event_color = $result->fetch_assoc()['event_color'];
        
            $result->data_seek($j);
                $event_start_date = $result->fetch_assoc()['event_start_date'];
        
            $result->data_seek($j);
                $event_end_date = $result->fetch_assoc()['event_end_date'];
        
            $result->data_seek($j);
                $event_time = $result->fetch_assoc()['event_time'];
        
            $result->data_seek($j);
                $event_type = $result->fetch_assoc()['event_type'];  
        
            $result->data_seek($j);
                $event_name = $result->fetch_assoc()['event_name'];
        
            $result->data_seek($j);
                $event_location = $result->fetch_assoc()['event_location'];
        
            $result->data_seek($j);
                $event_description = $result->fetch_assoc()['event_description'];
        
            $calendarEventArray[$j] = array($event_id, $event_color, $event_start_date, $event_end_date, $event_time,
                                      $event_type, $event_name, $event_location, $event_description);
        
            $j++;                              
        }

        $eventJSON = json_encode($calendarEventArray);

        echo $eventJSON;
?>