// Runs the same handler on your computer
const http = require("http");
const handler = require("./server");

const PORT = 3000;
const server = http.createServer(handler);

server.listen(PORT, () => {
  console.log(`E-MART server running at http://localhost:${PORT}`);
});
