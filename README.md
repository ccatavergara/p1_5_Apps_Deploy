[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/t9QTJJzF)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=11644971&assignment_repo_type=AssignmentRepo)

**Nombres de integrantes del grupo**: Samuel Aliaga y Catalina Vergara

## Notas
- Para visualizar un "trip", es necesario agregar un viaje desde el "seed" o la base de datos.
- Utilizamos una librería adicional para el manejo del inicio de sesión.

# Proyecto 1.3 - Primera aproximación al Frontend Web Móvil con React

En este laboratorio desarrollarás una parte del frontend de la aplicación Travel Log, utilizando React.

Los objetivos son:

* Familiarizarse con la arquitectura de aplicación React con múltiples componentes de primer nivel, utilizando enrutamiento de tipo _hash routing_ con React.
* Comprender cómo proveer navegabilidad entre los componentes.
* Familiarizarse con uso de CSS en React.
* Familiarizarse con componentes de biblioteca MUI.
* Implementar un flujo básico de autenticación y desarrollar primeras llamadas al backend.
## Arquitectura de la aplicación de frontend

La aplicación de este proyecto base está constituida por varios componentes que puedes encontrar en `src/components`. Existen ciertos componentes de nivel página, como `HomePage`, `Trips Page`, `SearchPage`, `MapPage`, `SearchPage`, etc., y otros componentes enfocados en proveer una funcionalidad y experiencia de navegación por la aplicación, como `TopNav` y `BottomBar`.

Te recomendamos revisar estos componentes para que puedas ver las bibliotecas (módulos) utilizados, con componentes y hooks externos incorporados a la aplicación.

La aplicación utiliza componentes de interfaz de usuario de la biblioteca [MUI](https://mui.com/), la cual es una adaptación de componentes de Material UI de Google para React.

## Configuración de la aplicación de frontend

Los parámetros de configuración de la aplicación de frontend son los siguientes:

* `AUTH_TOKEN`: La aplicación base no tiene un formulario de acceso (login) de usuario. Por lo tanto, si se requiere conectar con _endpoints_ de _backend_, se puede enviar un token configurable en el archivo `constants.js`. La generación de este token se realiza mediante la misma llamada a backend vista en el [laboratorio 1](https://github.com/icc4203-202320/lab1).
* `baseUrl`: Esta variable declarada en index.js contiene la URL del backend. El _hostname_ es obtenido a través del objeto `window` de la API del DOM. El número de puerto para usar el backend en modo producción (docker) es el 9090. Si se usa el backend en modo desarrollo, entonces se puede modificar esta variable y dejar en 3000.

## Enrutamiento de tipo hash (_hash routing_)

Al crear aplicaciones de tipo SPA, es generalmente la aplicación ejecutando en el frontend la que debe reaccionar cuando la URL cambia manteniéndose las partes de dominio, puerto y ruta hasta la raíz de la aplicación. Por ejemplo, si la raíz de la aplicación es `http://www.ejemplo.com`, y la aplicación tiene un enlace a `http://www.ejemplo.com/ejemplos`, cuando el usuario pincha este último enlace, no debe ocurrir una recarga de la página desde el origen remoto, sino que dicha URL debe desencadenar una actualización del DOM de la página actual, y el contenido desplegado debe ser cambiado por el código de la aplicación de _frontend_ de acuerdo a la ruta.

Para React existe una biblioteca llamada `react-router`. Esta biblioteca provee componentes necesarios para proveer enrutamiento en el frontend. En particular, hay dos componentes básicos para enrutamiento que podemos usar en nuestras aplicaciones:

1. `BrowserRouter`: Utiliza la API de [Historial de HTML5](https://developer.mozilla.org/en-US/docs/Web/API/History_API) (específicamente `pushState`, `replaceState`, y el evento `popstate`) para mantener la interfaz de usuario sincronizada con la URL en el navegador. Esta API permite que las URL se actualice debidamente cuando el usuario presiona los botones _back_ y _forward_ del navegador. Sin embargo, si recargas la página o intentas visitar una ruta directamente a través de la URL (por ejemplo http://www.ejemplo.com/ruta), es probable que recibas un error 404 a menos que hayas configurado tu servidor para que siempre sirva el archivo `index.html` y dejes que `react-router` tome el control desde allí.
2. `HashRouter`: HashRouter utiliza el fragmento de hash (`#`) de la URL (`window.location.hash`) para mantener la interfaz de la aplicación sincronizada con la URL. Antes de que la API de Historial estuviera ampliamente disponible, esta era la solución para evitar recargar la página al cambiar la URL Como resultado de usar `HashRouter`, las URL tendrán un "#" en ellas (por ejemplo, `example.com/#/ruta`). Esto puede no ser tan limpio o estético como las URL proporcionadas por `BrowserRouter`. Debido a que toda la navegación se basa en el cambio de hash, no tienes que preocuparte por configurar tu servidor para manejar rutas específicas, ya que el servidor solo ve la parte antes del `#`. `HashRouter` Funciona en todos los navegadores: Aunque la mayoría de los navegadores modernos admiten la API de Historial, `HashRouter` garantiza que la navegación funcione incluso en navegadores más antiguos.

En este proyecto usamos `HashRouter` debido a lo último relativo a a simplicidad de la configuración.

Para navegar programáticamente desde una página a otra, existe un hook del módulo `react-router-dom` llamado [`useNavigate`](https://reactrouter.com/en/main/hooks/use-navigate), el cual permite esto.

## Estilos de CSS

En `App.css` están definidos los estilos personalizados que son aplicados a los componentes de la aplicación. Se puede ver que contenedores y elementos de navegación se ajustan a un RWD usando _media queries_. Sin embargo, no hay trato especial con base la orientación del dispositivo móvil vertical u horizontal, sino que sólo se considera el ancho de la vista.

En este proyecto, podrán modificar los estilos de CSS, y ajustarlos para que la aplicación se asemeje al diseño que han prototipado. Además, parte de la evaluación consistirá en que el RWD opere de forma óptima y en casos en donde sea pertinente aprovechar la orientación horizontal/vertical del dispositivo.

## Biblioteca MUI

[MUI](https://mui.com/) (anteriormente conocido como Material-UI) es una biblioteca popular de componentes de React que implementa los principios del diseño Material Design de Google. Con el tiempo, MUI ha crecido para ser una de las bibliotecas más utilizadas para la construcción de interfaces de usuario en aplicaciones React debido a su conjunto amplio de componentes ricos y personalizables. La documentación de MUI [la encuentras aquí](https://mui.com/material-ui/getting-started/).

MUI ofrece una amplia variedad de componentes predefinidos, desde botones y tarjetas hasta diálogos y barras de navegación. Estos componentes están diseñados según los principios de Material Design, pero son altamente personalizables. La personalización se logra a través de temas, estilos y otras utilidades proporcionadas por MUI.

MUI tiene un sistema robusto de [_theming_](https://mui.com/material-ui/customization/theming/) que permite definir un diseño coherente y estilizado para tu aplicación. Con el sistema de _theming_, puedes especificar colores, tipos de letra y otras propiedades visuales de tu aplicación de manera centralizada.

Si vas a `index.js` verás que el componente `App` es creado en el ámbito de un _theme_. La personalización del _theme_ está presente en el módulo que define `theme.js`. Evidentemente, puedes personalizar el _theme_ de la aplicación si no te gusta la paleta original (que no fue elegida por el profesor guía, btw).

MUI incluye un sistema de cuadrícula flexible que facilita la creación de diseños responsivos. Por otro lado, MUI puede integrarse fácilmente con otras bibliotecas de React y herramientas como formularios, validación, animaciones, entre otras. Los componentes básicos de layout son Box, Container, Grid, Stack, Image List y Hidden (ver aquí [más información](https://mui.com/material-ui/react-box/)).

Finalmente, una de las fortalezas de MUI es su documentación detallada. Cada componente está bien documentado con ejemplos, propiedades y variaciones.

## Ejecutar la aplicación de frontend

Para ejecutar la aplicación de frontend, debes contar con npm 9.x.x (Node Package Manager) y node 18.x.x instalados en tu ambiente de desarrollo. Luego, puedes ejecutar:

```sh
$ npm install # instala todos los paquetes especificados en `packages.json`
$ npm start
```

La primera vez, la aplicación tardará en levantarse, es normal.

El puerto por omisión es `3000`, el cual es de hecho el mismo puerto que utiliza el backend de Rails en modo de desarrollo. Si necesitas usar otro puerto para servir el frontend, puedes probar con:

```sh
$ PORT=7890 npm start # Se usa variable de entorno PORT con valor para el puerto arbitrario, en rango válido
```

Además, debes tener en ejecución (desde una copia local de su repositorio) la aplicación de _backend_. Puedes ejecutar la aplicación de _backend_ en modo producción o desarrollo, definiendo correctamente en `index.js` la variable `baseUrl` (línea 29).

El comando `npm start` automáticamente debería abrir tu navegador web apuntando a la URL correcta. Si esto no ocurre, puedes abrir un navegador web y acceder a http://localhost:PUERTO.

Inicialmente verás el renderizado del componente `HomePage`, el cual es instanciado dentro de `App`. El elemento raiz es instanciado y configurado en `index.js`.

## Vamos a la acción

En esta tercera parte del primer proyecto del curso, contarás con un código base para desarrollar tu aplicación de Travel Log. El objetivo no es desarrollar la aplicación completa, sino poner en práctica el uso de todas las herramientas y tecnologías vistas en el curso para desarrollar las partes relevantes de una aplicación web móvil.

Con base a lo anterior, los aspectos a desarrollar en esta entrega son los siguientes:

1. [3.0] Interfaz de login para inicio de sesión. Deberás implementar un componente, por ejemplo, `LoginPage` que permita al usuario iniciar sesión. Este componente deberá contener un formulario en donde el usuario pueda ingresar su correo electrónico y su contraseña. El formulario deberá contar con validación, y usar componentes de MUI para implementar su interfaz de usuario. Además, para conectar con endpoint de la API de backend para autenticación, y obtener _token_ para usar la API, podrás usar todo lo visto hasta el momento, incluyendo hooks básicos (`useState`, `useEffect`) custom hooks (desarrollados por ti), el hook `useReducer`, la [API Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), y [Axios](https://blog.openreplay.com/integrating-axios-with-react-hooks/) (puedes ver cómo usarla sin usar patrón reductor, pero te recomendamos usar dicho patrón como vimos en clases, y cómo aparece explicado en el libro guía). Podrán usar _local storage_ y hooks para mantener el _token_ y enviarlo entre peticiones sucesivas. Si el _token_ no es válido, deben redirigir siempre al usuario a la página de login.

2. [0.5] Cierre de sesión: Agregar esta funcionalidad a la barra de navegación en componente `TopNav`.


3. [1.5] Una vez que el usuario logra acceder exitosamente, redirigirlo al componente `TripsPage`, para desplegar una página que permita listar los viajes que ha realizado el usuario. Evidentemente, los viajes deben ser cargados desde el backend. Los viajes se deben desplegar de manera lo más similar al prototipo que ya han desarrollado. Si no prototiparon esto, entonces, hagan una vista que despliegue los viajes como pequeñas tarjetas que tengan el espacio necesario para desplegar una imagen. Dado que aún la aplicación no permite subidas de imágenes, pueden usar [skeleton de MUI](https://mui.com/material-ui/react-skeleton/) para simular el despliegue de imágenes.

4. [1.0] Implementen `TripPage` para el despliegue (_show_) de un viaje en particular. Simulen el despliegue de imágenes que pueda verse correctamente horizontal y verticalmente.

Para las cargas asíncronas de objetos desde el backend, hay un componente llamado `SpinnerOfDoom` que puede utilizarse para mostrar un _spinner_ (animación que da al usuario la sensación de que la carga está en progreso). Pueden modificar o reemplazar este componente si lo prefieren.

## Forma de Trabajo y Entrega

Deben realizar _commit_ de todo su trabajo al presente repositorio, generado desde enlace de GitHub classroom. Si requieren un nuevo repositorio, deben contactar al profesor guía (calvarez@uandes.cl).

Pueden entregar su trabajo hasta el domingo 3/9 a las 23:59 hrs.

## Referencias

* Álvarez, C. (2023). ICC 4203 Aplicaciones Móviles, Clase 4. Disponible en Canvas.
* Wieruch, R. (2023). The Road to Reach. Disponible en sitio del curso.
* MUI - Getting Started (s.f.). Disponible en https://mui.com/material-ui/getting-started/
* React Router (s.f.). Disponible en https://reactrouter.com/en/main


