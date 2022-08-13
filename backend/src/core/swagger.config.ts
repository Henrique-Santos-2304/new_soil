import { INestApplication, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const swaggerModule = (app: INestApplication) => {
    try {
        const config = new DocumentBuilder()
            .setTitle('Academia do Futuro')
            .setDescription('Documentação oficial do projeto backend da Academia ')
            .setVersion('1.0')
            .addTag('users')
            .build();

        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api', app, document);
    } catch (err) {
        Logger.log(`${new Date()} -> Error in at configurable swagger api...`)
        Logger.log(err.message)
    }
}

export { swaggerModule }