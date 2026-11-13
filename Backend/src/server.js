import app from './app.js';
import { config } from './config/environment.js';
import { connectDatabases, disconnectDatabases } from './config/db.js';

async function bootstrap() {
    await connectDatabases();

    const server = app.listen(config.port, () => {
        console.log(`🚀 Servidor activo en: http://localhost:${config.port}`);
    });

    const handleShutdown /*gestionador de apagado*/ = async (signal) => {
        console.log(`\n⚠️  ${signal} recibido. Cerrando conexiones limpiamente...`);
        server.close(async () => {
            await disconnectDatabases();
            process.exit(0);
        });
    };

    process.on('SIGINT',/*Solicitud de apagado*/ () => handleShutdown('SIGINT'));
    process.on('SIGTERM',/*Se apaga de manera segura*/ () => handleShutdown('SIGTERM'));
}
//Arranque de aplicacion
bootstrap();