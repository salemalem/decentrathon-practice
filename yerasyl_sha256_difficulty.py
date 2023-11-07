import hashlib
prefix = "teachers+";
target_zeros = 5
nonce = 0
while True:
  data = prefix + str(nonce)
  hash_result = hashlib.sha256(data.encode()).hexdigest()
  if hash_result[:target_zeros] == "0" * target_zeros:
    print(f"Input value: {data}")
    print(f"SHA-256 hash: {hash_result}")
    break
  nonce += 1