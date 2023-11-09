import { ethers } from '../../deps.ts';
import { Token } from '../tokens/token.ts';
// import { DEXabi } from './DEX.abi.ts';

export abstract class DEX {
  protected abstract provider: ethers.providers.JsonRpcProvider;
  protected abstract wallet: ethers.Wallet;
  protected abstract ABI: string[];
  public abstract routerAddress: string;
  public abstract routerContract: ethers.Contract;
  public swapDeadline: number;
  

  constructor(wallet: ethers.Wallet) {}

  abstract getPrice(inputToken: Token, outputToken: Token, amountIn: ethers.BigNumberish): Promise<string>;

  abstract swap(
    inputToken: Token, 
    outputToken: Token, 
    amountIn: ethers.BigNumberish, 
    amountOutMin: ethers.BigNumberish, 
    gasOptions: ethers.providers.TransactionRequest
  ): Promise<ethers.ContractReceipt>;

  abstract getSwapOutputAmount(txReceipt: ethers.ContractReceipt): Promise<ethers.BigNumber>;

  abstract buy(
    inputToken: Token, 
    outputToken: Token, 
    amountIn: ethers.BigNumberish, 
    amountOutMin: ethers.BigNumberish, 
    gasOptions: ethers.providers.TransactionRequest
  ): Promise<ethers.BigNumber>;

}

