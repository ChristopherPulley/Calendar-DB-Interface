<?php

try {

    require_once "login.php";
    require_once "checkInputs.php";

    $usrNm = clean_input($_POST['un']);
    
    $pwd = clean_input($_POST['pw']);

    $conn = new PDO("mysql:host=$hn; dbname=$db", $un, $pw);

    $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $connSQL = $conn -> prepare("SELECT pWord, user_level FROM users_login WHERE user_name = :usrNm LIMIT 1");

    $connSQL -> bindParam(':usrNm', $usrNm, PDO::PARAM_STR);

    if ($connSQL -> execute()) {

        $connResult = $connSQL -> fetch(PDO::FETCH_ASSOC);
        
        $hash = $connResult['pWord'];
        $uLevel = $connResult['user_level'];

        $userAccount = new stdClass();

        if (password_verify($pwd, $hash)) {

            $userAccount -> userName = $usrNm;
            $userAccount -> userLevel = $uLevel;
            $userAccount -> loginValid = true;
            $userAccount -> errorOccur = false;
            $userAccount -> errorText = "None";

        } else {

            $userAccount -> userName = "None";
            $userAccount -> userLevel = "None";
            $userAccount -> loginValid = false;
            $userAccount -> errorOccur = false;
            $userAccount -> errorText = "None";
        }
    }
    
}
catch (Exception $e) {

    $userAccount -> userName = "None";
    $userAccount -> userLevel = "None";
    $userAccount -> loginValid = false;
    $userAccount -> errorOccur = true;
    $userAccount -> errorText = "Error: $e";
}
finally {

    $dbResponse = json_encode($userAccount);

    echo $dbResponse;
    
    $connSQL = null;
    $conn = null;    
}


?>