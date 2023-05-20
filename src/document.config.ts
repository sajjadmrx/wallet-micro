import { INestApplication } from '@nestjs/common';

import { SwaggerTheme } from 'swagger-themes';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const brandName = 'wallet';

export class DocumentConfig {
  constructor(
    private app: INestApplication,
    private port: number,
    private docRelPath: string,
  ) {}

  setupSwagger(): this {
    const config = new DocumentBuilder()
      .setTitle(`${brandName} Document`)
      .setDescription(
        `The ${brandName} APIs \t Response Format : \n
       \n
        {
            statusCode: int,
            data : string | object | array
        }

    `,
      )
      .setVersion('1.0')
      .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        in: 'header',
        name: 'Authorization',
      })
      .build();

    const theme = new SwaggerTheme('v3');

    const document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup('api', this.app, document, {
      customCss: theme.getBuffer('dark'),
    });
    return this;
  }
}
