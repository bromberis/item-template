const mongoose = require("mongoose");
const app = require("./app");

const DB =
  "mongodb+srv://user:4Rw7gen3WEQAgGpB@cluster0.xpojp.mongodb.net/data?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB connected");
  });

const port = 3005;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
