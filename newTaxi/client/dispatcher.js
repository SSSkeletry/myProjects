/*---------Create card order for dispatcher----------*/
function getDataOrder(){
  fetch('../database/getData.php')
    .then(response => response.json())
    .then(orderData => {
      // Обработка полученных данных заказов
      for (let i = 0; i < orderData.length; i++) {
        const orderRow = orderData[i];

        const onumber = orderRow.Onumber;
        const loc = orderRow.loc;
        const arrival = orderRow.arrival;
        const comment = orderRow.comment;

        fetch('../database/getDrivers.php')
          .then(response => response.json())
          .then(driverData => {
            // Обработка полученных данных водителей
             // Обработка полученных данных водителей
             for (let j = 0; j < driverData.length; j++) {
              const driver = driverData[j];
              const dname = driver.name;
              const dsurname = driver.surname;
              const dphone_number = driver.phone_number;
              const car_brand = driver.car_brand;
              const car_number = driver.car_number;
              const ID = driver.ID;
              const driverInfo = `${dname} ${dsurname} - ${car_brand} - ${dphone_number} - ${car_number} `;
              if (i,j === 0) {
                // Вызов функции createCard только один раз для каждой карточки
                createCard(onumber, loc, arrival, comment,ID, driverInfo,driverData);
              }
            }
          })
          .catch(error => {
            console.error('Ошибка при получении данных водителей:', error);
          });
      }
    })
    .catch(error => {
      console.error('Ошибка при получении данных заказов:', error);
    });
}
getDataOrder();

function createCard(onumber, loc, arrival, comment,ID,driverInfo,driverData) {
  let ul = document.createElement('ul');
  ul.className = 'cards';
  
  let li = document.createElement('li');
  li.className = 'cards__item';
  
  let divCard = document.createElement('div');
  divCard.className = 'card';
  divCard.id = `card-${ID}`;
  
  let divImage = document.createElement('div');
  divImage.className = 'card__image card__image';
  
  let divContent = document.createElement('div');
  divContent.className = 'card__content';
  
  let divTitle = document.createElement('div');
  divTitle.className = 'card__title';
  divTitle.textContent = loc + "-" + arrival;
  
  let p = document.createElement('p');
  p.className = 'card__text';
  p.textContent = `Номер телефону: ${onumber}`;
  
  let pcom = document.createElement('p');
  pcom.className = 'card__text';
  pcom.textContent = `Коментарій для водія: ${comment}`;
  let sel = document.createElement('select');
  sel.className = 'card__text';
  for (let j = 0; j < driverData.length; j++) {
    const driver = driverData[j];
    const dname = driver.name;
    const dsurname = driver.surname;
    const dphone_number = driver.phone_number;
    const car_brand = driver.car_brand;
    const car_number = driver.car_number;
    const driverInfo = `${dname} - ${dsurname} - ${car_brand} - ${dphone_number} - ${car_number}`;
    let option = document.createElement('option');
    option.textContent = `${dname} - ${dsurname} - ${car_brand} - ${dphone_number}`;
    option.setAttribute('data-car-number', car_number);
    sel.appendChild(option);
  }
  let button = document.createElement('button');
  button.className = 'btn btn--block card__btn';
  button.textContent = 'Зробити замовлення';
  button.addEventListener('click', () => {
    const selectedDriver = sel.value;
    const [dname, dsurname, car_brand, dphone_number] = selectedDriver.split(' - ');
    const car_number = sel.options[sel.selectedIndex].getAttribute('data-car-number');
    sendDataToDatabase(ID,onumber, loc, arrival, comment, dname, dsurname, car_brand, dphone_number,car_number);
  });

  divContent.appendChild(divTitle);
  divContent.appendChild(p);
  divContent.appendChild(pcom);
  divContent.appendChild(sel);
  divContent.appendChild(button);
  divCard.appendChild(divImage);
  divCard.appendChild(divContent);
  
  li.appendChild(divCard);
  
  ul.appendChild(li);
  let section = document.querySelector('#disp-sect');
  section.appendChild(ul);
  }
  createCard(onumber || '', loc || '', arrival || '', comment || '',driverInfo || '');

  function sendDataToDatabase(ID,onumber, loc, arrival, comment, dname,dsurname,car_brand,dphone_number,car_number) {
    const data = {
      ID:ID,
      onumber: onumber,
      loc: loc,
      arrival: arrival,
      comment: comment,
      dname: dname,
      dsurname: dsurname,
      car_brand: car_brand,
      dphone_number: dphone_number,
      car_number: car_number
    };
    console.log(data);
    fetch('../database/completeOrder.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&')
  })
  .then(response => response.text())
  .then(data => {
    console.log(data); // Response from the server
    // Refresh the UI or remove the card element if deletion is successful
    const cardElement = document.querySelector(`#card-${ID}`);
    if (cardElement) {
      cardElement.remove();
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
sendDataToDatabase();