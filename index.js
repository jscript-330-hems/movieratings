const server = require("./server");
const mongoose = require('mongoose');

// require('dotenv').config();

const port = process.env.PORT || 5000;


mongoose.connect('mongodb+srv://hems:hdjhmVi7esVA@cluster21.0hrdz.mongodb.net/movieratings?retryWrites=true&w=majority', {
  useNewUrlParser: true, 
  useCreateIndex: true, 
  useUnifiedTopology: true,
  useFindAndModify: true,
}).then(() => {
  server.listen(port, () => {
   console.log(`Server is listening on http://localhost:${port}`);
  });
});
