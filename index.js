// code away!
const server = require("./server");

//custom shortcuts
const port = 4000;
const message = "server running 4k"




server.listen(port, () => {
  console.log(message);
});
