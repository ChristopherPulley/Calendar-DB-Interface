<?php

// Converts 'YYYY-mm-d Date' format used by HTML Input Element
// and MySQL and returns string in 'Mon dd YYYY format' for table display
function convertDate($date) {

    $date = strval(date_format(date_create($date), 'M d Y'));

    return $date;
}

?>