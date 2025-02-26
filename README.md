# MichiClima 😸

MichiClima es una aplicación web progresiva (PWA) que proporciona información meteorológica basada en la ubicación del usuario. La aplicación utiliza datos de WeatherAPI y ofrece una experiencia divertida con el "Modo Michi".

## Tecnologías Utilizadas

Este proyecto utiliza las siguientes tecnologías:

- **React 18**: Biblioteca de JavaScript para construir interfaces de usuario. Usé React 18.0.0 para lograr la compatibilidad con Cloudinary.
- **TypeScript**: Un superconjunto de JavaScript que añade tipos estáticos. Es el primer proyecto "real" que hago con TypeScript.
- **Vite**: Un entorno de desarrollo rápido y moderno.
- **Zustand**: Una biblioteca para la gestión del estado en React.
- **Cloudinary**: Servicio de gestión de imágenes y videos en la nube.
- **Vercel**: Plataforma de despliegue para aplicaciones web.

## Modo Michi

El "Modo Michi" es una característica particular de MichiClima que añade un toque divertido a la aplicación. Al activar el Modo Michi(en la Guía de uso), ocurren las siguientes cosas:

1. El spinner de carga cambia por uno felino.
2. En lugar de aparecer los clásicos íconos del clima, aparecen imágenes de un lindo gatito llamado Sundae, con un fondo relacionado con el clima.
3. Al hacer clic sobre Sundae, se pueden escuchar maullidos.

## Uso

Al abrir la aplicación, se solicitará permiso para acceder a la ubicación del usuario. Si se concede el permiso, la aplicación mostrará la información meteorológica actual y el pronóstico para el día siguiente. La información se actualiza cada 15 minutos.

## Créditos

- El gato que aparece como spinner cuando el Modo Michi está activado es de LordTofuAnimation y se obtuvo mediante GIPHY.
- Los sonidos de gatitos son de Freesound Community y se obtuvieron a través de Pixabay.
- La data del clima se obtiene gracias a WeatherAPI.com.

## Instalación

Para instalar y ejecutar este proyecto localmente, sigue estos pasos:

1. Clona el repositorio:
   ```sh
   git clone https://github.com/tu-usuario/michiclima.git
   cd michiclima
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Crea un archivo .env en la raíz del proyecto y añade tu clave de API de WeatherAPI:
   ```sh
   WEATHER_API_KEY=tu_clave_de_api
   ```
4. Inicia el servidor de Vercel en local:
   ```sh
   vercel dev
   ```

## Licencia

Este proyecto está licenciado bajo la Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License(CC BY-NC-SA 4.0). Consultae [LICENSE](https://creativecommons.org/licenses/by-nc/4.0/) para obtener más detalles.
