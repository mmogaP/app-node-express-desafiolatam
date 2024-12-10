// Importa los módulos necesarios
import path from "path"; // Para trabajar con rutas de archivos y directorios
import winston from "winston"; // Librería para manejar logs en Node.js

// Obtiene el directorio actual del archivo utilizando `import.meta.dirname`
const __dirname = import.meta.dirname;

// Define la ruta del archivo donde se guardarán los logs
const logFilePath = path.join(__dirname, "../../logs/app.log");
// La ruta es relativa al directorio actual y apunta a un archivo llamado "app.log" dentro de la carpeta "logs".

// Configura el logger utilizando winston
const logger = winston.createLogger({
  // Establece el nivel mínimo de logs que se registrarán
  // Los niveles disponibles son: error, warn, info, verbose, debug, silly.
  level: "info",

  // Define el formato de los logs
  format: winston.format.combine(
    // Agrega una marca de tiempo a cada mensaje de log
    winston.format.timestamp(),
    // Define un formato personalizado para los mensajes de log
    // Incluye la marca de tiempo, el nivel del mensaje, y el contenido del mensaje.
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),

  // Configura los "transports" (lugares donde se envían los logs)
  transports: [
    // Transport para la consola (útil durante el desarrollo)
    new winston.transports.Console({
      // Formato específico para la consola: incluye colores y formato simplificado
      format: winston.format.combine(
        winston.format.colorize(), // Colorea los niveles de los logs
        winston.format.simple() // Mensajes más compactos
      ),
    }),

    // Transport para guardar los logs en un archivo
    new winston.transports.File({ filename: logFilePath }),
    // Los mensajes se guardarán en el archivo "app.log" definido en `logFilePath`.
  ],
});

// Exporta el logger para que pueda ser usado en otros módulos
export default logger;

// Una vez importado en otro módulo, puedes usar `logger` para registrar mensajes como:
// logger.info("Este es un mensaje informativo");
// logger.error("Este es un mensaje de error");