<?php
require_once 'connect.php';

$sql = "SELECT * FROM drivers";
      $result = $conn->query($sql);
      
      // Проверка наличия данных
      if ($result->num_rows > 0) {
          // Создание массива для данных
          $driverData = array();
      
          // Получение данных из результата запроса
          while ($row = $result->fetch_assoc()) {
              $driverData[] = $row;
          }
      
          // Преобразование данных в JSON
          $json_driverData = json_encode($driverData);
      
          // Возвращение данных
          echo $json_driverData;
      } else {
          echo "Нет данных";
      }
      
      // Закрытие соединения с базой данных
      $conn->close();

?>