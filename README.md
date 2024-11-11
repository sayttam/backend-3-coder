# iPets - API de Gestión de Adopciones y Mascotas

iPets es una API desarrollada en Node.js con Express y MongoDB, diseñada para gestionar usuarios, mascotas, adopciones y sesiones. La aplicación se ejecuta en un entorno de contenedores Docker para facilitar la configuración y el despliegue.

## Tabla de Contenidos
- [Descripción](#descripción)
- [Características](#características)
- [Tecnologías Usadas](#tecnologías-usadas)
- [Requisitos](#requisitos)
- [Documentación de la API](#documentación-de-la-api)
- [Imagen de Docker Hub](#imagen-de-docker-hub)

## Descripción

iPets es una API REST que permite gestionar datos de usuarios, mascotas, adopciones y sesiones de usuario. Además, la aplicación incluye endpoints para generar datos de prueba y documenta todos los servicios mediante Swagger.

## Características

- CRUD de usuarios, mascotas, adopciones y sesiones.
- Autenticación de sesiones.
- Generación de datos de prueba para facilitar el desarrollo.
- Documentación de la API con Swagger.
- Configuración para ejecución en contenedores Docker.

## Tecnologías Usadas

- **Node.js** y **Express** para el backend.
- **MongoDB** como base de datos.
- **Swagger** para la documentación de la API.
- **Docker**  Dockerfile para desplegar el contenedor individual subida a docker hub.
- **Docker Compose** YML para despliegue de la app, mongo y portainer con docker compose.

 ## Requisitos

- **Node.js** v20 o superior
- **Docker** y **Docker Compose** instalados en el sistema

## Documentación de la API

- **RUTA** /api-docs

## Imagen de Docker Hub

https://hub.docker.com/repository/docker/sayttam/ipets/

