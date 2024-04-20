const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("connected to Server");
}); //소켓오픈했을때

socket.addEventListener("message", (message) => {
  console.log("New message:", message.data);
}); //메시지를 받을때마다

socket.addEventListener("close", () => {
  console.log("DisConnected from server");
}); // 닫혔을때

setTimeout(() => {
  socket.send("hello from the browser!");
}, 10000);
