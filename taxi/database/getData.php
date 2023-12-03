<?php
    require_once 'connect.php';
      $sql = "SELECT * FROM dataorder";
      $result = $conn->query($sql);
      
      // Проверка наличия данных
      if ($result->num_rows > 0) {
          // Создание массива для данных
          $data = array();
      
          // Получение данных из результата запроса
          while ($row = $result->fetch_assoc()) {
              $data[] = $row;
          }
      
          // Преобразование данных в JSON
          $json_data = json_encode($data);
      
          // Возвращение данных
          echo $json_data;
      } else {
          echo "Нет данных";
      }
      
      // Закрытие соединения с базой данных
      $conn->close();
?>