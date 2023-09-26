import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { Server } from "socket.io";

const htmlFile = await readFile("./index.html");

const httpServer = createServer((req, res) => {
  if (req.url === "/") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(htmlFile);
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end(`Route doesn't exist`);
  }
});

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("a user connected");

  //   socket.on("chat message", (msg) => {
  // console.log(`message: ${msg}`);
  //   });

  socket.on("chat message", (msg) => {
    // console.log(`message: ${msg}`);
    io.emit("chat message", `${msg}`);
  });

  // socket.on("disconnect", () => {
  //   console.log("user disconnected");
  // });
});

const port = process.env.PORT || 4000;

httpServer.listen(port, () => console.log(`Server running at port ${port}`));
