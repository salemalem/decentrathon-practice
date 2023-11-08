import {useEffect, useState} from "react";
import {client} from "@/apiClient";

export default function Home() {
  const [result, setResult] = useState("")
  const [hash, setHash] = useState("");
  const [error, setError] = useState("");

  async function getData() {
    await client.post("", {
      "jsonrpc": "2.0",
      "method": "eth_getTransactionByHash",
      "params": [hash],
      "id": 1
    }).then((r: {
      data: {
        result: any,
        error: any,
      }
    }) => {
      setResult(JSON.stringify(r.data.result))
      if (r.data.error) setError(JSON.stringify(r.data.error))
      else {
        setError("")
      }
    })
  }

  return (
    <div className={"container"}>
      <h1 className={"title"}>Получить данные транзакции в формате JSON по хэшу транзакции</h1>
      <input
        placeholder={"Введите хэш транзакции"}
        value={hash}
        onChange={e => setHash(e.target.value)}
      />
      <button onClick={getData}>Найти</button>
      <h4 className={"resultTitle"}>Результат:</h4>
      <span className={"result"}>
        {result}
      </span>

      {error.length !== 0 && <div>
        Ошибка : <p>
        {error}
      </p>
      </div>}
    </div>
  )
}
