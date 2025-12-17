# Proyecto Full-Stack -> Flask + React + DeepFace

## Overview

Este proyecto es una aplicación Full-Stack, construida de la siguiente manera:

- **Frontend:** React + Vite + TypeScript
- **Backend:** Flask (Python)
- **Integración de AI:** DeepFace (Comparación de imágenes de rostros)

El frontend consume una API REST de Flask, la cual utiliza DeepFace para valorar la comparación de dos imágenes (rostros de personas), y retornando dicha valoración hacia el Frontend.

## Versionado

- **Python:** 3.12.x
- **Flask:** 3.x
- **Node.js:** 22.x
- **Vite:** 7.2.x
- **React:** 18.x

## Estructura del proyecto:

```text
jack-automated-reports/
├── backend/
│   ├── routes/
│   │   └── summarized_reports_routes.py
│   ├── .env.example
│   ├── app.py
│   └── requirements.txt
│
├── public/
│   └── vite.svg
│
├── src/
│   ├── hooks/
│   ├── pages/
│   ├── routes/
│   ├── schemes/
│   ├── utils/
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .gitignore
└── README.md
└── ...others
```

## Arquitectura

Routes → Manejo de operaciones CRUD, en donde se esta manejando directamente la logica de servicio del verificador de DeepFace

## Lógica del servicio

El metodo verify_face utiliza un archivo con el key "requester-face", el cual guarda temporalmente en el servidor la imagen enviada, para posteriormente compararlo con el archivo ya creado/guardado posteriormente, utilizando el número de empleado para identificar la imagen de la base de datos a utilizar.

## Endpoints del backend

Todos los API endpoints se encuentran dentro de

/backend/routes

## Endpoint de ejemplo:

POST /api/face-detection/verify/<numeroDeEmpleado>

## Backend Setup (Flask)
1. Crea un virtual environment:

```
cd backend 
python -m venv venv
```
2. Activa el virtual environment:

Windows

venv\Scripts\activate

Linux / macOS

source venv/bin/activate

3. Instala las dependencias:
```
pip install -r requirements.txt
```

4. Corre el servidor Flask
```
flask run
```
5. El servidor correrá localmente:
   http://127.0.0.1:5000

## Frontend Setup (React)

Desde el root del proyecto:

1. Instala las dependencias:
```
npm install
```
2. Start development server
```
npm run dev
```
3. El frontend correrá localmente: http://localhost:5173

## Flujo de la aplicación
1. El usuario ingresará un Usuario y Contraseña previamente registrados (en este mock, se asume que el usuario no recuerda su contraseña).
2. El usuario opta por utilizar el método de "Autenticar con Rostro".
3. El usuario utiliza su número de empleado y activa el Reconocimiento facial.
4. Si el reconocimiento es exitoso, se redirecciona hacia la página de reportes, si falla, se despliega un mensaje de error.

## Notas
1. React Query maneja el cache y la sincronización de UI
2. La estructura del proyecto permite fácil integración y futura extensión.

# ¡Gracias!