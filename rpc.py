from web3 import Web3

rpc_endpoint = "https://mainnet.infura.io/v3/783fbe233483417e83c3ea1a3a4f087d"

web3 = Web3(Web3.HTTPProvider(rpc_endpoint))

try:
    network_id = web3.net.version
    print(f"Connected to network with ID: {network_id}")
except Exception as e:
    print(f"Error while connecting: {e}")
    exit()

try:
    latest_block = web3.eth.get_block('latest')
    block_number = latest_block['number']
    print(f"Number of the last block: {block_number}")
except Exception as e:
    print(f"Error outputting the block number: {e}")