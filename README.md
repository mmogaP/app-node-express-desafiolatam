# API REST con Node.js, Express, TypeScript y Swagger

Esta es una API REST para la gestión de usuarios, construida con Node.js, Express, Sequelize, y TypeScript. Incluye documentación de Swagger para facilitar su uso y comprensión.

## **Características**

- CRUD de usuarios.
- Validación de datos con Joi.
- Base de datos manejada con Sequelize.
- Documentación interactiva con Swagger.
- Desarrollado en TypeScript para mayor robustez.

---

## **Requisitos previos**

1. **Node.js**: Instalar [Node.js](https://nodejs.org/) versión 16 o superior.
2. **PostgreSQL**: Asegúrate de tener un servidor de PostgreSQL en funcionamiento.
3. **Dependencias**: Instalar dependencias con `npm`.

---

## **Instalación**

### **1. Clonar el repositorio**

```bash
git clone https://github.com/mmogaP/app-node-express-desafiolatam.git
cd app-node-express-desafiolatam
```

### **2. Instalar dependencias**

```bash
npm install
```

### **3. Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```
DATABASE_URL="postgresql://root:root@localhost:5434/test_db"
```

### **4. Ejecutar migraciones**

Sincroniza la base de datos con los modelos:

```bash
npm run dev
```

---

## **Uso**

### **Iniciar el servidor**

Inicia la aplicación en modo desarrollo:

```bash
npm run dev
```

Por defecto, el servidor estará disponible en: `http://localhost:3000`.

### **Swagger**

La documentación interactiva de la API está disponible en:  
`http://localhost:3000/api-docs`

---

## **Endpoints principales**

### **Usuarios**

| Método | Endpoint                | Descripción                 |
| ------ | ----------------------- | --------------------------- | -------------------------------- | --- |
| GET    | `/api/v1/users`         | Obtener todos los usuarios. |
| POST   | `/api/v1/auth/register` | Crear un nuevo usuario.     |
| POST   | `/api/v1/auth/login`    | Logear a un usuario.        |
| <!--   | PUT                     | `/api/v1/users/{uid}`       | Actualizar un usuario existente. | --> |

---

## **Estructura del proyecto**

```
src/
├── config/
│   ├── database.ts          # Configuración de Sequelize
│   └── swagger.config.ts    # Configuración de Swagger
├── controllers/
│   └── user.controller.ts   # Lógica de los controladores
├── db/
│   └── index.ts             # Conexión a la base de datos
├── models/
│   └── user.model.ts        # Definición del modelo de Usuario
├── routes/
│   └── user.route.ts        # Definición de las rutas
└── index.ts                 # Archivo principal de la aplicación
```

---

## **Tecnologías utilizadas**

- **Node.js**: Plataforma de desarrollo.
- **Express**: Framework para la construcción de la API.
- **TypeScript**: Tipado estático para mayor seguridad y productividad.
- **Sequelize**: ORM para la interacción con PostgreSQL.
- **Swagger**: Documentación interactiva.
- **Joi**: Validación de datos.
- **bcryptjs**: Hashing de contraseñas.

---

## **Contribuciones**

Si deseas contribuir:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y realiza un commit (`git commit -m 'Añadida nueva funcionalidad'`).
4. Haz push a tu rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

---

## **Licencia**

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

## **Contacto**

- Autor: Mauricio Moraga
- Email: [mmmorag.m3@gmail.com](mailto:mmmorag.m3@gmail.com)

## **Screenshots**

![GET](./screenshots/get.png)

![POST](./screenshots/post.png)

![PUT](./screenshots/put.png)
