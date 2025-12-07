require("dotenv").config();

const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

const supabase = require("./supabase"); 

connectToMongo();

const app = express();
const port =  process.env.PORT;
const host = process.env.HOST
app.use(cors(
  {
  origin: ["http://localhost:3000"],
  credentials: true}
));
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
app.use("/api/file", require("./routes/file"));

(async () => {
  const { data, error } = await supabase.storage.listBuckets();

  if (error) {
    console.log(" Supabase not connected:", error.message);
  } else {
    console.log(" Supabase connected:", data);
  }
})();

app.listen(port, () => {
  console.log(` Server running at ${host}`);
});
