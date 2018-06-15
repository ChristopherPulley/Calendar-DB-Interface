<?php

try {

    require_once "login.php";
    require_once "checkInputs.php";

    $usrNm = clean_input($_POST['un']);

    $pwd = clean_input($_POST['pw']);

    $conn = new mysqli($hn, $un, $pw, $db);  // Create New mySQL Connection

    $connSQL = $conn -> prepare("SELECT pWord, User_Level FROM users WHERE User_Name = ? LIMIT 1");

    $connSQL -> bind_param("s", $usrNm);

    $connSQL -> execute();

    $connResult = $connSQL -> get_result();
    
    $rows = $connResult -> num_rows;  // Number of Rows Returned

    $loginValid = false;

    if ($rows == 1) {

        $userInfo = new stdClass();

        $row = $connResult -> fetch_assoc();

        $hash = $row['pWord'];
        $uLevel = $row['User_Level'];

        if (password_verify($pwd, $hash)) {

            $loginValid = true;

            $userInfo -> userName = $usrNm;
            $userInfo -> userLevel = $uLevel;
            $userInfo -> loginValid = $loginValid;

        } else {

            $userInfo -> userName = 'None';
            $userInfo -> userLevel = 'None';
            $userInfo -> loginValid = $loginValid;
        }
    }
}
catch (Exception $e) {

    $dbResponse = "Connection Error: " . $e -> getMessage();
}
finally {

    $dbResponse = json_encode($userInfo);
    echo $dbResponse;
    
    $connSQL -> close();
    $conn -> close();    
}


?>