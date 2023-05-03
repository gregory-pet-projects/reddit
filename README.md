# Reddit 2.0

The project is a Reddit clone application built using popular technologies. It aims to replicate the functionalities of the popular social news aggregation and discussion website, Reddit. The use of Next JS allows for server-side rendering, while Typescript ensures type safety. Apollo and GraphQL are used for data management and communication, while Next-Auth with Reddit enables secure authentication. Tailwind CSS provides a utility-first approach to styling, and React Hook Form simplifies form management. Overall, the project offers a modern and scalable solution for building a Reddit-like application.

## Technologies Used
- React TypeScript
- Next JS
- Next-Auth with Reddit
- Supabase SLQ DB
- GraphQL
- Apollo
- Tailwind CSS
- React Hook Form
- others...

## Screenshots
<div align="left">
    <img src="https://firebasestorage.googleapis.com/v0/b/pet-projects-db.appspot.com/o/Portfolio%20previews%2Freddit%2FScreenshot%202023-05-03%20at%2021.05.13.png?alt=media&token=7e2f0428-6cab-480d-b94a-e6d7109fd089" width="400px"</img> 
     <img src="https://firebasestorage.googleapis.com/v0/b/pet-projects-db.appspot.com/o/Portfolio%20previews%2Freddit%2FScreenshot%202023-05-03%20at%2021.05.39.png?alt=media&token=2039d867-c5bb-4d95-9045-e4dfe890e0b5" width="400px"</img> 
</div>

## Getting Started

```bash
  git clone https://github.com/gregory-pet-projects/reddit.git
  cd reddit
  npm i
```

Add .env.local file
```bash
  REDDIT_CLIENT_ID=
  REDDIT_CLIENT_SECRET=
  NEXT_PUBLIC_STEPZEN_API_KEY=
  NEXT_SECRET=
  NEXT_AUTH_URL=
```
Start your app
```bash
  npm run dev
```

For DB debugging you can start local stepzen by next command in new terminval
```bash
  cd stepzen
  stepzen start --dashboard=local
```
### Links:
- [Stepzen](https://dashboard.stepzen.com/)
