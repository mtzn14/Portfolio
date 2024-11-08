<?php 
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Access-Control-Allow-Headers: Content-Type');
    if($_SERVER["REQUEST_METHOD"] === "POST") {
        include "connect.php";
        $phpJSON = file_get_contents("php://input");
        $phpData = json_decode($phpJSON, true);
        $username = $phpData["username"];
        $userpass = md5($phpData["pwd"]);
        $stmtUN = $conn->prepare("SELECT firstname, lastname, email, userrole, username 
        FROM users WHERE username = :un AND userpassword = :up");
        $stmtUN->execute([":un" => $username, ":up" => $userpass]);
        $numRowsUN = $stmtUN->rowCount();
        if($numRowsUN > 0) {
            $rowUN = $stmtUN->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(["response" => $rowUN], true);
        }
        else {
            $stmtEM = $conn->prepare("SELECT firstname, lastname, email, userrole, username 
            FROM users WHERE email = :un AND userpassword = :up");
            $stmtEM->execute([":un" => $username, ":up" => $userpass]);
            $numRowsEM = $stmtEM->rowCount();
            if($numRowsEM > 0) {
                $rowEM = $stmtEM->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode(["response" => $rowEM], true);
            }
            else {
                echo json_encode(["response" => "Error"], true);
            }
        }
    }
?>