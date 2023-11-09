import { DEX } from './DEX.abstract.ts';
import { DEXabi } from './DEX.abi.ts';
import { 
  ethers,
  logger,
} from '../../deps.ts';
import { Token } from '../tokens/Token.ts';

export class PancakeswapDEX extends DEX {
  protected provider: ethers.providers.JsonRpcProvider;
  protected wallet: ethers.Wallet;
  protected ABI: string[] = DEXabi; // The ABI for the DEX's router contract
  public routerAddress: string;
  public routerContract: ethers.Contract;
  public swapDeadline: number = 20 * 60; // 20 minutes
  public name: string = 'Pancakeswap';

  constructor(wallet: ethers.Wallet) {
    super(wallet);
    this.wallet = wallet;
    this.routerAddress = "0xEfF92A263d31888d860bD50809A8D171709b7b1c"; // Uniswap V2 Router 2 address Ethereum mainnet
    this.routerContract = new ethers.Contract(this.routerAddress, this.ABI, this.wallet);
  }

  public async getPrice(inputToken: Token, outputToken: Token, amountIn: ethers.BigNumberish): Promise<string> { // read
    try {
      const amountOut = await this.routerContract.getAmountsOut(amountIn, [inputToken.address, outputToken.address]);
      return amountOut[1].toString();
    } catch (error) {
      logger.error('Error getting price from Uniswap:', error);
      throw error;  // Re-throw the error so it can be handled by the calling code
    }
  }

  public async swap(
    inputToken: Token, 
    outputToken: Token, 
    amountIn: ethers.BigNumberish, 
    amountOutMin: ethers.BigNumberish, 
    gasOptions: ethers.providers.TransactionRequest
  ): Promise<ethers.ContractReceipt> { // write
    if (!gasOptions.gasPrice || !gasOptions.gasLimit) {
      throw new Error('gasPrice and gasLimit must be defined in the gasOptions parameter.');
    }
    try {
      const deadline = Math.floor(Date.now() / 1000) + this.swapDeadline; // 20 minutes from the current Unix time
      const amountOutMinParsed = ethers.BigNumber.from(amountOutMin.toString());
      const amountInParsed = ethers.BigNumber.from(amountIn.toString());
      const tx = await this.routerContract.swapExactTokensForTokens(
        amountInParsed, 
        amountOutMinParsed, 
        [ 
          inputToken.address, 
          outputToken.address
        ], 
        this.wallet.address, 
        deadline,
        gasOptions,
      );
      const txReceipt = await tx.wait();
      return txReceipt;
    } catch (error) {
      logger.error('Error swapping tokens on Uniswap:', error);
      throw error;  // Re-throw the error so it can be handled by the calling code
    }
  }


  public async buy(
    inputToken: Token, 
    outputToken: Token, 
    amountIn: ethers.BigNumberish, 
    amountOutMin: ethers.BigNumberish, 
    gasOptions: ethers.providers.TransactionRequest
  ): Promise<ethers.ContractReceipt> { // write
    try {
      const swapTx = await this.swap(inputToken, outputToken, amountIn, amountOutMin, gasOptions);
      return swapTx;
    } catch (error) {
      logger.error('Error buying tokens on Uniswap:', error);
      throw error;  // Re-throw the error so it can be handled by the calling code
    }
  }

  public async approveDEX(token: Token, gasOptions: ethers.providers.TransactionRequest): Promise<ethers.ContractReceipt> {
    try {
      const tx = await token.approve(this.routerAddress, ethers.constants.MaxUint256, gasOptions);
      const txReceipt = await tx.wait();
      return txReceipt;
    } catch (error) {
      logger.error('Error approving token on Uniswap:', error);
      throw error;  // Re-throw the error so it can be handled by the calling code
    }
  }
}