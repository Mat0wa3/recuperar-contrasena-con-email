# 📦 Inventario de Productos Alimenticios

Aplicación web que permite gestionar el inventario de productos alimenticios de manera eficiente. El sistema incluye funciones de autenticación y recuperación de contraseña mediante correo electrónico, garantizando seguridad y facilidad de uso.

## 🚀 Características

- Gestión de productos alimenticios:
  - Alta, edición y eliminación de productos.
- Autenticación de usuarios:
  - Registro de cuentas.
  - Inicio de sesión seguro.
- Recuperación de contraseña:
  - Envío de enlace de restablecimiento al correo electrónico registrado.
  - Generación de token de seguridad con expiración.
- Panel de administración:
  - Vista general del inventario.

## 🛠️ Tecnologías utilizadas

- **Backend:** Node.js + Express
- **Base de datos:** MySQL
- **Frontend:** HTML5, CSS3, JavaScript
- **Email Service:** Nodemailer
- **Autenticación:** JSON Web Tokens (JWT) / bcrypt para hashing de contraseñas

## ⚙️ Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/Mat0wa3/recuperar-contrasena-con-email.git
    ```

2. Accede al proyecto:

   ```bash
   cd recuperar-contrasena-con-email
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Crea el archivo `.env` con las variables de entorno necesarias:

   ```dotenv
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=tu_clave
   DB_NAME=inventario
   JWT_SECRET=tu_secreto
   EMAIL_USER=tu_correo@example.com
   EMAIL_PASSWORD=tu_contraseña
   ```

5. Inicia el servidor:

   ```bash
   npm run dev
   ```

6. Abre en tu navegador:

   ```
   http://localhost:3000
   ```

## ✉️ Recuperación de contraseña

1. El usuario accede a la opción **"¿Olvidaste tu contraseña?"**.
2. Ingresa su correo electrónico registrado.
3. El sistema genera un token único con expiración (por ejemplo, 1 hora).
4. Se envía un enlace de restablecimiento al correo electrónico.
5. El usuario accede al enlace y define una nueva contraseña.

> **Importante:** Configura correctamente las credenciales SMTP en el `.env`.

## 📂 Estructura del proyecto

```
inventario-alimentos/
├── controllers/
│   ├── authController.js
│   └── productController.js
├── models/
│   └── Product.js
├── routes/
│   ├── authRoutes.js
│   └── productRoutes.js
├── views/
│   └── (archivos HTML/EJS)
├── .env
├── app.js
└── package.json
```

## 🧑‍💻 Contribución

Si deseas contribuir:

1. Haz un fork del proyecto.
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y commitea (`git commit -m 'Añadir nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Crea un Pull Request.

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.
