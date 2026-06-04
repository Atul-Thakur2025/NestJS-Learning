import { Injectable } from '@nestjs/common';

@Injectable()
export class MassegeFormaterService {

    formatMessage(message: string): string{
        const time = new Date().toLocaleTimeString();
        return `[${time}] ${message}`;
    }
}
