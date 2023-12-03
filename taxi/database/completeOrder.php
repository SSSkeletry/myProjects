<?php

require_once 'connect.php';
$onumber = $_POST['onumber'];
$loc = $_POST['loc'];
$arrival = $_POST['arrival'];
$comment = $_POST['comment'];
$dname = $_POST['dname'];
$dsurname = $_POST['dsurname'];
$car_brand = $_POST['car_brand'];
$dphone_number = $_POST['dphone_number'];
$car_number = $_POST['car_number'];

// Check if 'onumber' is not null before executing the query
if (!empty($onumber)) {
  // Prepare and execute SQL query to save the data
  $sql = "INSERT INTO complete_order (onumber, loc, arrival, comment, dname, dsurname, dphone_number, car_brand,car_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("sssssssss", $onumber, $loc, $arrival, $comment, $dname, $dsurname, $dphone_number, $car_brand,$car_number);
  
  if ($stmt->execute()) {
    echo "Data successfully added to the database.";
  
    // Удаление записи из таблицы "dataorder"
    $deleteSql = "DELETE FROM dataorder WHERE onumber = ?";
    $deleteStmt = $conn->prepare($deleteSql);
    $deleteStmt->bind_param("s", $onumber);
    $deleteStmt->execute();
    $deleteStmt->close();
  } else {
    echo "Error: " . $stmt->error;
  }
  
  // Close the database connection
  $stmt->close();
} else {
  echo "Error: 'onumber' cannot be null.";
}

$conn->close();
?>