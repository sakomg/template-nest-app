import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class JsonServerService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.get<any>('https://jsonplaceholder.typicode.com/todos').pipe(
        catchError((error: AxiosError) => {
          console.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }
}
