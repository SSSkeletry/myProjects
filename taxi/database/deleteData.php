<?php
require_once 'connect.php';
if (isset($_POST['ID'])) {
  // Get the ID parameter
  $ID = $_POST['ID'];

  // Prepare the SQL statement to delete the order
  $sql = "DELETE FROM dataorder WHERE ID = '$ID'";

  // Execute the SQL statement
  if (mysqli_query($conn, $sql)) {
    // Return a success message
    echo "Order deleted successfully";
  } else {
    // Return an error message
    echo "Error deleting order: " . mysqli_error($conn);
  }
} else {
  // Return an error message if the ID parameter is missing
  echo "Error: ID parameter is missing";
}

// Close the database connection
mysqli_close($conn);

?>