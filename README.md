# Nest.js and Salesforce
<span style="color:gray;font-weight:700;font-size:25px">
Integrations with third-party systems
</span>

---

## Introduction to Node.js

### Wiki

- **Asynchronous Nature:**
  Node.js is built around asynchronous, non-blocking I/O operations, which align well with the event-driven architecture of Salesforce.
- **JavaScript Everywhere:**
  Salesforce's client-side development uses JavaScript heavily, making Node.js a natural fit for server-side integration. Using the same language on both client and server sides simplifies development, reduces context switching, and fosters code reusability.
- **Large Ecosystem of Packages (npm):**
  Node.js has a vast ecosystem of open-source packages available through npm (Node Package Manager). This enables rapid development by leveraging pre-built modules for tasks like authentication, API requests, data manipulation, and more.

---

## Introduction to Nest.js

### Wiki

- A progressive *Node.js* framework for building efficient, scalable, and maintainable server-side applications.
- Utilizes TypeScript, providing strong typing and enhanced developer experience.
- Follows best practices, making it a great fit for enterprise-level applications.
- Supports various modules and libraries for seamless integration with external services.

---

## Integrating with Salesforce

- Leverage Nest.js to connect your application with Salesforce APIs.
- Utilize Salesforce REST and SOAP APIs for data retrieval and manipulation.
- Implement OAuth 2.0 for secure authentication and authorization.
- Leverage Nest.js decorators for efficient request handling.

---

## Vanilla Node.js server

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!\n');
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});
```

## Express.js server

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});
```

## Nest.js server

```javascript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
  });
}
bootstrap();
```

## Literature: Further Reading/Watching

- [Nest.js Documentation](https://docs.nestjs.com)
- [Nest.js vs Express.js](https://blog.logrocket.com/nestjs-vs-express-js)
- [YouTube | Nest.js - quick course](https://youtu.be/j2-GqaeSueA?si=1MXf1XnUkJ0YAhNy)
- [Circular Dependencies and how to avoid them](https://trilon.io/blog/avoiding-circular-dependencies-in-nestjs)