const fs = require("fs");
const http = require("http");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || 8080);
const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".pdf": "application/pdf",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

http.createServer((req, res) => {
  let urlPath = decodeURIComponent(new URL(req.url, `http://localhost:${port}`).pathname);
  if (urlPath === "/") urlPath = "/index.html";

  const filePath = path.normalize(path.join(root, urlPath));
  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    res.writeHead(200, { "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream" });
    res.end(data);
  });
}).listen(port, "127.0.0.1", () => {
  console.log(`Serving http://127.0.0.1:${port}`);
});
