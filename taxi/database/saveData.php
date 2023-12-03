<?php

    require_once 'connect.php';
    $Onumber = $_POST['Onumber'];
    $Oloc = $_POST['Oloc'];
    $Oarrival = $_POST['Oarrival'];
    $Ocomment = $_POST['Ocomment'];
    // Подготовка SQL-запроса для вставки данных в таблицу
    $sql = "INSERT INTO dataorder (Onumber, loc, arrival, comment) VALUES (?, ?, ?, ?)";

    // Подготовка выражения
    $stmt = $conn->prepare($sql);

    // Привязка параметров и выполнение запроса
    $stmt->bind_param("ssss", $Onumber, $Oloc, $Oarrival, $Ocomment);

    if ($stmt->execute()) {
        echo "Данные успешно добавлены в базу данных.";
    } else {
        echo "Ошибка: " . $stmt->error;
    }

    // Закрытие соединения с базой данных
    $stmt->close();
    $conn->close();

?>