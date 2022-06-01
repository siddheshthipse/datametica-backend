import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  async getData() {
    const res = await axios(
      'https://teampredators.atlassian.net/rest/api/3/project',
      {
        method: 'GET',
        headers: {
          Authorization: `Basic ${Buffer.from(
            'siddheshthipse@gmail.com:aJjCPBLZBDGmO6uoOib59B3A',
          ).toString('base64')}`,
          Accept: 'application/json',
        },
      },
    );
    console.log(res.data);
  }
}
