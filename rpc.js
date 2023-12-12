const axios = require('axios');

// данные
const rpcUrl = "https://mainnet.infura.io/v3/4bd1c238d545488491eafec180a4c90e";
const rpcMethod = "eth_getBalance";
const address = "0x39637CED01F303dC4D2Dc7A625443c81a1CdC4e9";
const blockParameter = "latest";

// Параметры для запроса JSON-RPC
const rpcPayload = {
    jsonrpc: "2.0",
    method: rpcMethod,
    params: [address, blockParameter],
    id: 1
};

// Отправляем POST-запрос к серверу RPC
axios.post(rpcUrl, rpcPayload)
    .then(response => {
        // Парсим JSON-ответ
        if (response.status === 200) {
            const balance = parseInt(response.data.result, 16);  // Преобразование HEX-строки в целое число
            console.log(`Баланс адреса ${address}: ${balance} wei`);
        } else {
            console.log("Ошибка при получении баланса:", response.data);
        }
    })
    .catch(error => {
        console.log("Ошибка при отправке RPC-запроса. Код статуса:", error.response.status);
    });
