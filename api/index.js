const server = require("./src/app");
require("dotenv").config();
const { PORT } = process.env || 3001;

server.listen(PORT, () => {
  console.log("listening OK in port:", PORT);
});
