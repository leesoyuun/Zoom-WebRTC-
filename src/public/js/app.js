const socket = io(); //알아서 socket.io를 실행하고있는 서버를 찾는다.
//socketIO를 사용하면 방에 참가하고 떠나는게 쉽다.

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

function handleRoomSubmit(e) {
  e.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", { payload: input.value }, () => {
    console.log("server is done!");
  }); //socket.send와 동일
  //1. 어떤 event도 전송가능
  //2. object전송 가능
  input.value = "";
}
form.addEventListener("submit", handleRoomSubmit);
