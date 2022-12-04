const functions = require("@google-cloud/functions-framework");
const next = require("next");

const app = next({ dev: false });
const handle = app.getRequestHandler();

functions.http("nextjs", (req, res) => {
  return app
    .prepare()
    .then(() => handle(req, res))
    .catch((ex) => {
      console.error(ex);
      process.exit(1);
    });
});
