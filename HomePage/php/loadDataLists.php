<?php
// Load Data List

try {
    require_once 'login.php';

    $column = $_POST['column'];
    $mode = $_POST['mode'];

    $conn = new PDO("mysql:host=$hn; dbname=$db", $un, $pw);

    $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $connSQL = $conn -> prepare("SELECT $column FROM events");  // mySQL Statment

    $connResult = $conn -> query($connSQL);  // Submit Our Query
    
    if ($connSQL -> execute()) {

        $listOutput = "";

        $optionsArray = array();
        $arrayIndex = 0;

        if ($mode == 1) {

            array_push($optionsArray, "<option value='Class'></option>",
                "<option value='Interview'></option>",
                "<option value='Study Group'></option>",
                "<option value='Work Group'></option>");
        }

        if ($mode == 2) {

            array_push($optionsArray, "<option style='background-color:#ffffff;' value=''>Select a Color</option>");
        }

        while ($row = $connSQL -> fetch(PDO::FETCH_ASSOC)) {

            $rowValue = "#$row[$column]";

            if ($mode == 2) {
 
                array_push($optionsArray, "<option style='background-color:$rowValue;' value=$rowValue>$rowValue</option>");  

            } else {

                array_push($optionsArray, "<option value='$row[$column]'></option>");
            }
        }  

        array_push($optionsArray, "</select>");

        $optionsArray = array_unique($optionsArray);

        $listOutput = implode("", $optionsArray);

        echo $listOutput;
    }
}
catch (Exception $e) {

}
finally {
    $conn = null;   
}

?>