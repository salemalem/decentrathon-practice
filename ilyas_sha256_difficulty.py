import hashlib

def findsha256(text, difficulty):
	digest = ''
	nonce = 0
	while not digest.startswith('0'*difficulty): #check if the first 5 digits are 0
		nonce += 1
		inputstr = (text + str(nonce)).encode() #convert to bstring
		digest = hashlib.sha256(inputstr).hexdigest()
	return digest, nonce
test_dig, test_nonce = findsha256('teachers+', 5)
print("Found nonce: {}\nThe hash is {}".format(test_nonce, test_dig))
