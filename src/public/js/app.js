const socket = io(); //알아서 socket.io를 실행하고있는 서버를 찾는다.
//socketIO를 사용하면 방에 참가하고 떠나는게 쉽다.

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

function handleMessageSubmit(e) {
  e.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
}

function handleNicknameSubmit(e) {
  e.preventDefault();
  const input = room.querySelector("#name input");
  const value = input.value;
  socket.emit("nickname", input.value);
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
  const msgFrom = room.querySelector("#msg");
  const nameFrom = room.querySelector("#name");
  msgFrom.addEventListener("submit", handleMessageSubmit);
  nameFrom.addEventListener("submit", handleNicknameSubmit);
}
// backend에서 실행시킨것.
// 사용하기 위해서는 가장 마지막 인자로 넘겨주면된다.

function handleRoomSubmit(e) {
  e.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, showRoom); //socket.send와 동일
  //1. 어떤 event도 전송가능
  //2. object도 전송 가능, 하나 이상의 값을 보낼 수 있다. (예.socket.emit("enter_room", { payload: input.value }, 5, "hello");)
  roomName = input.value;
  input.value = "";
}
form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (user) => {
  addMessage(`${user} arrived`);
});

socket.on("bye", (left) => {
  addMessage(`${left} Left ㅠㅠ`);
});

socket.on("new_message", addMessage);

socket.on("room_change", (rooms) => {
  const roomList = welcome.querySelector("ul");
  roomList.innerHTML = "";
  if (rooms.length === 0) {
    return;
  }
  rooms.forEach((room) => {
    const li = document.createElement("li");
    li.innerText = room;
    roomList.append(li);
  });
});
