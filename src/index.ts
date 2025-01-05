import http from "http";

const PORT = 3000;

const routes: Record<string, string> = {
  "/": "Node.js Library",
  "/books": "Books Page",
  "/authors": "Authors Page",
};

const server = http.createServer((req, res) => {
  const response = routes[req.url ?? "/"];
  res.writeHead(200, { "content-type": "text/plain" });
  res.end(response);
});

server.listen(PORT, () => {
  console.log("Server listening on port 3000");
});
