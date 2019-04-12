const server = require("./api/server.js");

const port = 6500;
server.listen(port, () => console.log(`\n*** Server listening ${port} ***\n`));
