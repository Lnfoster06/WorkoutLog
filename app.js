require("dotenv").config();
const Express = require("express");
const app = Express();
const dbConnection = require("./db");

app.use(Express.json());

const controllers = require("./controllers");

app.use("/journal", controllers.journalController);
app.use ("/user", controllers.userController);

//app.use(require("./middleware/validate-jwt"));

dbConnection.authenticate()
  .then(() => dbConnection.sync())
  .then(() => {
    app.listen(3000, () => {
        console.log(`[Server]: App is listening on 3000.`);
    });
  })
  .catch((err) => {
    console.log(`[Server]: Server crashed. Error = ${err}`);
  });

//app.listen(3000, () => {
 // console.log(`[Server]: App is listening on 3000.`);
//});

//app.use('/test', (req, res) => {
 //  res.send('This is a message from the test endpoint on the server!')
//});

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjQzMDY4MzgzLCJleHAiOjE2NDMxNTQ3ODN9.pGK1ZPJYTxMt5ZAiF8LB4AT3zuG8vtI8uI0-QMRB0tA"