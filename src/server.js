import http from "http";
import SocketIO from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  socket.onAny((e) => {
    console.log(`Socket Event : ${e}`);
  });
  socket.on("enter_room", (roomName, done) => {
    socket.join(roomName); // 방에 들어가기 위함
    done();
    socket.to(roomName).emit("welcome");
  });
  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) => socket.to(room).emit("bye"));
  });
  socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit("new_message", msg);
    done();
  });
}); //백엔드에서 connection을 받을 준비가 되었음.(fe - be connect)

// const sockets = [];

// wss.on("connection", (socket) => {
//   sockets.push(socket); //연결된 브라우저에 맞게 소켓추가
//   socket["nickname"] = "anon";
//   console.log("Connected to Brwoser");
//   socket.on("close", onSocketClose);
//   socket.on("message", (msg) => {
//     const message = JSON.parse(msg);
//     switch (message.type) {
//       case "new_message":
//         sockets.forEach((aSocket) =>
//           // aSocket.send(message.payload.toString("utf8"))
//           aSocket.send(`${socket.nickname}: ${message.payload}`)
//         );
//       case "nickname":
//         socket["nickname"] = message.payload;
//     }
//   });
// });
httpServer.listen(3000, handleListen);
