import { 
  ethers,
  logger,
} from '../../deps.ts';
import { tokenABI } from './Token.abi.ts';

export class Token {
  private wallet: ethers.Wallet;
  public tokenContract: ethers.Contract;
  public address: string;
  public decimals!: number;
  public symbol!: string;
  public name!: string;
  private abi: string[] = tokenABI;

  constructor(wallet: ethers.Wallet, address: string) {
    this.wallet = wallet;
    this.address = address;

    this.tokenContract = new ethers.Contract(this.address, this.abi, this.wallet);
  }

  public async init(): Promise<void> {
    try {
      this.decimals = await this.tokenContract.decimals();
      this.symbol = await this.tokenContract.symbol();
      this.name = await this.tokenContract.name();
    } catch (error) {
      logger.error('Error initializing token:', error);
      throw error;  // Re-throw the error so it can be handled by the calling code
    }
  }

  public async getBalanceOf(address: string): Promise<ethers.BigNumber> {
    try {
      return await this.tokenContract.balanceOf(address);
    } catch (error) {
      logger.error('Error getting token balance:', error);
      throw error;  // Re-throw the error so it can be handled by the calling code
    }
  }

  public async getAllowance(owner: string, spender: string): Promise<ethers.BigNumber> {
    try {
      return await this.tokenContract.allowance(owner, spender);
    } catch (error) {
      logger.error('Error getting token allowance:', error);
      throw error;  // Re-throw the error so it can be handled by the calling code
    }
  }

  public async approve(spender: string, amount: ethers.BigNumberish, gasOptions: ethers.providers.TransactionRequest): Promise<ethers.ContractTransaction> {
    try {
      return await this.tokenContract.approve(spender, amount, gasOptions);
    } catch (error) {
      logger.error('Error approving token:', error);
      throw error;  // Re-throw the error so it can be handled by the calling code
    }
  }

  public getBigNumberFormat(value: number | string): ethers.BigNumber {
    try {
      // Ensure the decimals property is initialized before calling this function
      const decimals = this.decimals;
      if (decimals === undefined) {
        throw new Error('Token decimals not initialized');
      }

      // Convert the number to a string if it isn't already
      const valueStr = value.toString();

      // Use the ethers utility function to parse the value with the correct number of decimals
      // example: 1.0 eth -> 1000000000000000000 eth
      return ethers.utils.parseUnits(valueStr, decimals);
    } catch (error) {
      logger.error('Error converting value to BigNumber:', error);
      throw error;  // Re-throw the error so it can be handled by the calling code
    }
  }

  public getReadableFormat(value: ethers.BigNumber): string {
    try {
      // Ensure the decimals property is initialized before calling this function
      const decimals = this.decimals;
      if (decimals === undefined) {
        throw new Error('Token decimals not initialized');
      }

      // Use the ethers utility function to format the value with the correct number of decimals
      // example: 1000000000000000000 eth -> 1.0 eth
      return ethers.utils.formatUnits(value, decimals);
    } catch (error) {
      logger.error('Error converting BigNumber to readable format:', error);
      throw error;  // Re-throw the error so it can be handled by the calling code
    }
  }
}
