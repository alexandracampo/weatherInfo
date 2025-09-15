# Aplicación de Clima

## 📖 Descripción

WeatherInfo es una aplicación web que permite consultar el clima actual en los municipios de España.
La aplicación ofrece una interfaz minimalista y moderna para que los usuarios puedan seleccionar su provincia y municipio, y obtener información meteorológica en tiempo real.

La app combina datos de la API de AEMET con un servicio propio desplegado en Render, que facilita la consulta de municipios a partir de los códigos de provincia.

## ✨ Características

- Selección de provincia y municipio con datos actualizados.
- Consulta del clima actual (estado del cielo, temperatura y humedad).
- Diseño minimalista, responsive y fácil de usar.

## 🛠️ Tecnologías utilizadas

- Frontend: React (con Vite), JavaScript, CSS puro.

- **Backend propio**: Node.js + Express, MongoDB (desplegado en Render).

  - Expone un servicio REST que devuelve los municipios asociados a una provincia mediante su código.
  - Los datos de municipios están almacenados en MongoDB y sirven para poblar el desplegable en el frontend.

- API de clima: [AEMET OpenData](https://opendata.aemet.es/centrodedescargas/inicio)
  - El backend de AEMET provee los datos climáticos en tiempo real. La aplicación consulta esta API para obtener el pronóstico actual del municipio seleccionado.

## ⚙️ Requisitos

- Node.js: versión 14 o superior → comprobar con node -v.
- npm: Gestor de paquetes de Node.js → comprobar con npm -v.

## 🚀 Instalación y arranque

1. Clona este repositorio en tu máquina local
2. Instala dependencias con el comando: `npm install`
3. Navega al directorio del proyecto.
4. Levanta el proyecto en modo desarrollo: `npm run dev`
5. Necesitarás crearte un fichero .env con tu propia API Key, que puedes solicitar en la web de la AEMET.

## 📬 Contacto

[Linkedin](https://www.linkedin.com/in/alexandracampomatilla/)
