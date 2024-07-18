[FASTIFY__BADGE]: https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white
[TYPESCRIPT__BADGE]: https://img.shields.io/badge/typescript-D4FAFF?style=for-the-badge&logo=typescript
[RENDER__BADGE]: https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white
[PRISMA__BADGE]: https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white
[SQLITE__BADGE]: https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white
[ZOD__BADGE]: https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white

<h1 align="center" style="font-weight: bold;">Plann.er backend 💻</h1>

![fastify][FASTIFY__BADGE]
![typescript][TYPESCRIPT__BADGE]
![render][RENDER__BADGE]
![prisma][PRISMA__BADGE]
![sqlite][SQLITE__BADGE]
![zod][ZOD__BADGE]

<p align="center">
 <a href="#started">Getting Started</a> • 
  <a href="#routes">API Endpoints</a> •
 <a href="#colab">Collaborators</a>
</p>

<p align="center">
Welcome to the Plann.er backend. This is the API and database for the plann.er web app. With this backend, I aimed to apply the BFF (Backend for Frontend) concept, creating routes to optimize frontend requests.
</p>

<h2 id="started">🚀 Getting started</h2>

You can use this API with any route tester, such as Postman or Insomnia. However, if you want to try it with a frontend, please consider visiting the Plann.er frontend documentation at the link below.

- [Frontend](https://github.com/GuiFeelipeDev/planner-frontend)

<h3>Prerequisites</h3>

- [NodeJS (v20+)](https://nodejs.org/pt/download/package-manager)
- [NPM (v10+)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

<h3>Cloning</h3>

```bash
git clone https://github.com/GuiFeelipeDev/nlw-journey-backend.git
```

<h3> Environment Variables</h2>

Use the `example` as reference to create your configuration file `.env` with your local configuration

The `DATABASE_URL` is for the SQLite database path.

The `WEB_BASE_URL` is for the frontend locally.

The `PORT` is for the port where the api will run.

```yaml
DATABASE_URL="file:./dev.db"
WEB_BASE_URL="http://localhost:5173"
PORT=3333
```

<h3>Starting</h3>

```bash
cd nlw-journey-backend
npm run dev
```

<h2 id="routes">📍 API Endpoints</h2>

​
| trips | description  
|----------------------|-----------------------------------------------------
| <kbd>GET /trips/:tripId</kbd> | returns the details for the trip passed on tripId
| <kbd>POST /trips</kbd> | create a new trip
| <kbd>PATCH /trips/:tripId</kbd> | updates trip starts date, end date or destination
| <kbd>DELETE /trips/:tripId</kbd> | deletes the trip with corresponding id

| participants                                       | description                                |
| -------------------------------------------------- | ------------------------------------------ |
| <kbd>GET /trips/:tripId/participants</kbd>         | returns all participants for the tripId    |
| <kbd>GET /participants/:participantId</kbd>        | returns the participant details            |
| <kbd>POST /trips/:tripId/invites</kbd>             | Invites a new participant                  |
| <kbd>GET /participants/:participantId/verify</kbd> | verify if a participant belongs to an trip |
| <kbd>DELETE /participants/:participantId</kbd>     | deletes the participant with this id       |

| links                                | description                      |
| ------------------------------------ | -------------------------------- |
| <kbd>GET /trips/:tripId/links</kbd>  | returns all links for the tripId |
| <kbd>POST /trips/:tripId/links</kbd> | creates a new link               |

| activities                                | description                           |
| ----------------------------------------- | ------------------------------------- |
| <kbd>GET /trips/:tripId/activities</kbd>  | returns all activities for the tripId |
| <kbd>POST /trips/:tripId/activities</kbd> | creates a new activity                |
| <kbd>POST /activities/:activityId</kbd>   | deletes a activity                    |

<h2 id="colab">🤝 Collaborators</h2>

Special thanks to Diego from Rocketseat, who provided the starter code for this app as part of the NLW Journey.

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/diego3g">
        <img src="https://avatars.githubusercontent.com/u/2254731?v=4" width="100px;" alt="Fernanda Kipper Profile Picture"/><br>
        <sub>
          <b>Diego Fernandes</b>
        </sub>
      </a>
    </td>
  </tr>
</table>
