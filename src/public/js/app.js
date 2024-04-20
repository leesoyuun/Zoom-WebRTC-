const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");
const socket = new WebSocket(`ws://${window.location.host}`);

function handleOpen() {
  console.log("Connected to Server");
}

socket.addEventListener("open", handleOpen); //소켓오픈했을때

socket.addEventListener("message", (message) => {
  console.log("New message:", message.data);
}); //메시지를 받을때마다

socket.addEventListener("close", () => {
  console.log("DisConnected from server");
}); // 닫혔을때

setTimeout(() => {
  socket.send("hello from the browser!");
}, 10000);

function handleSubmit(e) {
  e.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(input.value); //fe에서 be로 데이터 전송
  input.value = ""; //이후 초기화
}

messageForm.addEventListener("submit", handleSubmit);
