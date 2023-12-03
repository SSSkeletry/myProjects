<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "taxi-site";

// Создание подключения к базе данных
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка соединения
if ($conn->connect_error) {
    die("Ошибка подключения к базе данных: " . $conn->connect_error);
}

?>