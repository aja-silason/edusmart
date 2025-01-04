import express from "express"; 

import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(bodyParser.json());

const data = [
    {
        student: "Anania Augusto",
        age: 20,
        address: "Luanda province"
    }
]

app.get("/", (req, res) => {
    res.status(200).send(data);
    // res.send("edusmart/api/vi/");
});

app.listen(port, () => {
    console.log(`Server is running at ${port} port`);
})