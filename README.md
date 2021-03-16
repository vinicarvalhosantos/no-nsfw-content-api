# No NSFW Content - API

The pruporse of this api is to detect if an image has NSFW content and sent a predictions porcentage with 5 categories:

- Neutral: when no nsfw content was detected.
- Drawing: when no nsfw content was detected.
- Sexy: when a sexy content was detected, but it is not necessarily a nsfw content.
- Hentai: when a hentai nsfw content was detected.
- Porn: when a porn nsfw content was detected.


It implements best practices in developing RESTful APIs and Domain-Driven
Design. Features include:

-   Use of the
    [Hexagonal Architecture](http://alistair.cockburn.us/Hexagonal+architecture)
    to arrange the application into logical layers, with well-defined
    responsibilities.
-   RESTful APIs are implemented using the [Express](http://expressjs.com/)
    framework.
-   Persistence is implemented using an in-memory repository layer. This can be
    substituted with any persistence technology of your choice.

## Dev Build

```bash
$ npm install
$ npm start
```

The dev build starts the application in watch mode. If you make any changes to
the source files, the application will recompile and restart.

To debug the application in Chrome, point the browser to chrome://inspect and
click on "Open dedicated DevTools for Node".

## Production Build

```bash
$ npm run build
$ npm run serve
```

## Docker Build

```bash
$ docker build -t <dockerhub_username>/node-es6-rest-template:1.0.0 .
$ docker run -d --rm --name rest-server -p 8080:8080 <dockerhub_username>/node-es6-rest-template:1.0.0
```

## Folder Structure

```
/src
    /routes
    /services
    /repositories
    /utils
```

The source folder contains sub-folders that arrange the application into logical
layers as suggested by the
[Hexagonal Architecture](http://alistair.cockburn.us/Hexagonal+architecture)
(a.k.a. the
[Onion Architecture](http://jeffreypalermo.com/blog/the-onion-architecture-part-1/)):

-   `routes:` This is the adapter layer of the Hexagonal Architecture. It adapts
    the HTTP transforms the HTTP requests from the external world to the service
    layer and transforms the objects returned by the service layer to HTTP
    responses.

-   `services`: The service layer coordinates high-level activities such as
    creation of domain objects and asking them to perform tasks requested by the
    external world. It interacts with the repository layer to save and restore
    objects.

-   The `utils` folder contains useful utilities and helpers.
