import asyncio
import json
from websockets import connect
from web3 import Web3
from config import INFURA_KEY
ws_url = "wss://mainnet.infura.io/ws/v3/" + INFURA_KEY
http_url = "https://mainnet.infura.io/v3/" + INFURA_KEY
web3 = Web3(Web3.HTTPProvider(http_url))

async def get_event():
    async with connect(ws_url) as ws:
        await ws.send('{"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}')
        subscription_response = await ws.recv()
        print(subscription_response)

        while True:
            try:
                message = await asyncio.wait_for(ws.recv(), timeout=15)
                response = json.loads(message)
                txHash = response['params']['result']
                tx = web3.eth.get_transaction(txHash)
                amount_eth = web3.from_wei(tx["value"], 'ether')
                if amount_eth >= 1: #filtering for transactions with > 1 ETH
                    print("tx {} from {}, amount:{} ETH".format(txHash, tx["from"], amount_eth))
        
                pass
            except:
                pass

if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    while True:
        loop.run_until_complete(get_event())