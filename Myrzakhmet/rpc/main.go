package main

import (
	"fmt"
	"log"

	"github.com/ethereum/go-ethereum/rpc"
)

type Block struct {
	Number string
}

func main() {
	client, err := rpc.Dial("https://mainnet.infura.io/v3/6c29752357e34df0ac27567cf5398b80")
	if err != nil {
		log.Fatalf("Could not connect to Infura: %v", err)
	}

	var lastBlock Block
	err = client.Call(&lastBlock, "eth_getBlockByNumber", "latest", true)
	if err != nil {
		fmt.Println("Cannot get the latest block:", err)
		return
	}

	fmt.Printf("Latest block: %v\n", lastBlock.Number)
}
