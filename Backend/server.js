const app = require("./src/app");
const connection = require("./src/config/db");
require("dotenv").config();
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const port = process.env.PORT || 5000;

app.listen(port, async () => {
  await connection();
  console.log(`server is listen on ${port}`);
});
