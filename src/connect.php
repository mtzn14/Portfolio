<?php 
     header('Access-Control-Allow-Origin: http://localhost:3000');
     header('Access-Control-Allow-Headers: Content-Type');
     if($_SERVER["REQUEST_METHOD"] === "POST") {
         include "connect.php";

        $jsonData = file_get_contents("php://input");
        $phpObject = json_decode($jsonData);

        $fname = $phpObject->fname;
        $lname = $phpObject->lname;
        $usermail = $phpObject->uemail;
        $uname = $phpObject->uname;
        $userpassword = md5($phpObject->upwd);
        $userrole = "user";

        $response = [];

        // napraviti provjeru

        $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->bind_param("s", $uname);
        $stmt->execute();
        $result = $stmt->get_result();
        $numRows = $result->num_rows;
        if($numRows > 0) {
            $response["isError"] = true;
            $response["message"] = "Username already exists!";
        }
        else {
            $stmt = $conn->prepare(
                "INSERT INTO users (userfirstname, userlastname, useremail, username, password, userrole)
                VALUES (?,?,?,?,?,?)"
            );
            $stmt->bind_param("ssssss", $fname, $lname, $usermail, $uname, $userpassword, $userrole);
            $stmt->execute();
            $response["isError"] = false;
        }
        $conn->close();
        echo json_encode($response);
    }
?>