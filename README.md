# Backend

El propósito de este repositorio es generar un backend sólido aprendiendo una tecnología nueva como es Go/Golang.

Metas principales a realizar con este backend:

- Conectar con una base de datos SQL
- Implementar un CRUD e interfaces de comunicación con dicha BBDD
- Implementar autenticación para ciertos recursos/endpoints
- Replicar el funcionamiento de Wordpress con un admin-area
- Replicar el funcionamiento de Wordpress con un Blog manager

Con esta aplicación queremos recrear un poco el funcionamiento de Wordpress con un admin-area, que nos permita manejar múltiples aspectos de nuestra web y configuración, así como un blog.

El blog y admin-area tienen como finalidad aparte de darle más complejidad al proyecto del Portfolio, darnos un buen insight en la creación de este tipo de sistemas más complicados.

## Estructura principal backend

Vamos a seguir la estructura del video de Melkey, un creador de contenido sobre Go bastante reconocido en la comunidad, el video en el que la explica es el siguiente [video](https://www.youtube.com/watch?v=dxPakeBsgl4&ab_channel=Melkey).

En la raíz tenemos la declaración del módulo de la aplicación (go.mod), así como el readme y archivos necesarios para la construcción del proyecto.

Desde la raíz se extienden los subdirectorios principales los cuales son cmd, en el cual se encuentra el entrypoint de nuestra aplicación.

Tenemos internal, donde tendremos todo el código interno de la aplicación como por ejemplo rutas.

Y tendremos también tests, donde se ubicarán nuestros tests (si hacemos xd).

Por último tendremos bin, donde se almacenaran nuestros binarios en un futuro.

El plan es automatizar todo esto con CI/CD por lo que probablemente también contemos con archivos docker e instrucciones de ensamblaje para Github actions.

## Estructura principal BBDD

Las tecnologías principales que estoy pensando usar son PostgreSQL o Supabase.

- PostgreSQL es una base de datos como tal con su gestor, por lo que se tiene que implementar todo desde 0.
- Supabase es más un SAAS (Software as a Service) por lo que no solo cuenta con una base de datos PostgreSQL, si no que cuenta con múltiples servicios de Auth ya implementados.

> Por ahora he decidido usar PostgreSQL, ya que quiero adentrarme en el Lenguaje GO por completo e implementar toda la funcionalidad desde 0 a mano por mi cuenta. Pero puede que en un futuro eso cambie.

[Esquema entidad-relacion](./docs/PortfolioDB.png)

La idea principal de esta infraestructura es tener todas las entidades principales necesarias para recrear en parte el funcionamiento de Wordpress de una manera sencilla y rápida.

### Herramientas adicionales

Aquí dejaremos las ideas de herramientas adicionales para implementar que puedan ayudarnos al desarrollo de la aplicación.

- CMD con la migración de Tablas.
- CMD con un Faker de datos.
