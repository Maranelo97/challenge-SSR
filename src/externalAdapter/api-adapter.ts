import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';


@Injectable()
export class ExternalApiAdapter {
  constructor(private readonly httpService: HttpService) {}

  async convertCurrency(senderCurrency: string, receiverCurrency: string, amount: number): Promise<number> {
    try {
      const response = await this.httpService.get(`https://api.apilayer.com/fixer/convert`, {
        params: {
          base: senderCurrency,
          symbols: receiverCurrency,
          amount: amount.toString(),
          access_key: process.env.FIXER_API_KEY, 
        },
      }).toPromise();
      
      const convertedAmount = response.data.result;
      return convertedAmount;
    } catch (error) {
      throw new Error('Failed to convert currency');
    }
  }
}
