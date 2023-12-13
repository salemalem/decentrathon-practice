//Здесь мы подключаем библиотеку axios которая предоставляет удобные средства для выполнения HTTP запросов
const axios = require('axios');

// данные
/*Здесь определены данные, такие как URL Ethereum RPC-узла,
метод для запроса баланса eth_getBalance, ethereum адрес и параметр блока latest*/
const rpcUrl = "https://mainnet.infura.io/v3/4bd1c238d545488491eafec180a4c90e";
const rpcMethod = "eth_getBalance";
const address = "0x39637CED01F303dC4D2Dc7A625443c81a1CdC4e9";
const blockParameter = "latest";

// Параметры для запроса JSON-RPC
/*здесь создается объект rpcPayload, представляющий параметры JSON-RPC-запроса
Этот объект содержит версию протокола, метод, параметры адрес и параметр блока,
и уникальный идентификатор запроса в данном случае id:
 */
const rpcPayload = {
    jsonrpc: "2.0",
    method: rpcMethod,
    params: [address, blockParameter],
    id: 1
};

// Отправляем POST запрос к серверу RPC
/*Здесь используется метод axios.post для отправки POST-запроса
к серверу RPC с использованием указанных URL и данных rpcPayload
Затем код обрабатывает успешный ответ и ошибку при помощи методов .then() и .catch()
 */
axios.post(rpcUrl, rpcPayload)
    .then(response => {
        // Парсим JSON ответ
        /*
        Если статус ответа равен 200 то происходит парсинг JSON ответа
        HEX строка представляющая баланс преобразуется в целое число с помощью parseInt
        Затем баланс выводится в консоль
         */
        if (response.status === 200) {
            const balance = parseInt(response.data.result, 16);  // Преобразование HEX-строки в целое число
            console.log(`Баланс адреса ${address}: ${balance} wei`);
        } else {
            console.log("Ошибка при получении баланса:", response.data);
        }
    })
    //Если возникает ошибка при отправке запроса код выведет сообщение с кодом статуса ошибки
    .catch(error => {
        console.log("Ошибка при отправке RPC-запроса. Код статуса:", error.response.status);
    });
