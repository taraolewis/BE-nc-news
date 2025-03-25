<<<<<<< HEAD
const app = require("./app");

app.listen(9090, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server is listening on port 9090...");
  }
});
=======
const app = require("./app.js");
const { PORT = 9090 } = process.env;

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
>>>>>>> 24c2cc2 (Host Application)
