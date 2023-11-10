import {
  ConnectWallet, useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import aes256 from "aes256"
import styles from "../styles/Home.module.css";
import {abi} from "../abi";
import {useEffect, useState} from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const {contract, isLoading, remove} = useContract("0xb59CCEdB7E5594a77b0Fa42900f842b8fBC42B54", abi)
  const [receiver, setReceiver] = useState("")
  const [message, setMessage] = useState("")
  const address = useAddress()

  const {mutateAsync, error} = useContractWrite(contract, "encryptAndStoreMessage");

  const {data} = useContractRead(contract, "decryptMessage", [],{
    from : address
  })

  useEffect(() => {
    if (!contract) return;
    setLoading(false);
  }, [contract]);

  return !isLoading && (
    <main className={styles.main}>
      <div className={styles.container}>
        <ConnectWallet theme={"dark"} />
        <input className={styles.input} value={receiver} onChange={e => setReceiver(e.target.value)}/>
        <input className={styles.input} value={message} onChange={e => setMessage(e.target.value)}/>
        {contract && address ? <button
          className={styles.button}
          onClick={() => {
            mutateAsync({
              args: [receiver, aes256.encrypt(process.env.NEXT_PUBLIC_SECRET_KEY, message)]
            })
          }}>Send message
        </button> : null}
      </div>
      <div>
        <p className={styles.result}>You'r message : {aes256.decrypt(process.env.NEXT_PUBLIC_SECRET_KEY, data)}</p>
      </div>
    </main>
  );
}
