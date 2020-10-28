const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require('cookie-parser')
const Schema = mongoose.Schema;
const bodyParser = require("body-parser");

const app = express();

const port = 4000;

const userScheme = new Schema(
    { name: String, password: String, status: String },
    { versionKey: false }
);
const User = mongoose.model("User", userScheme);

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(cookieParser('secret key'))

mongoose
    .connect(
        "mongodb+srv://yander:yander@cluster0-ekjj1.mongodb.net/FilmCatalog?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
        }
    )
    .then(() => console.log("MongoDb, connected"))
    .catch((err) => console.log(err));

app.post("/login", function (req, res) {
    console.log(req.body)
    let newUser = new User({
        name: req.body.name,
        password: req.body.password,
        status: req.body.name === "admin" ? "admin" : "user",
    });
    User.findOne({ name: newUser.name }, function (err, user) {
        if (err) return console.log(err);
        if (!user) {
            User.create(newUser);
            res.cookie('name', newUser.name);
            res.cookie('status', newUser.status);
            return res.send({ name: newUser.name, status: newUser.status });
        }
        res.cookie('name', newUser.name);
        res.cookie('status', newUser.status);
        return res.send({ name: user.name, status: user.status });
    });
});

app.listen(port, () => console.log(`server is up port: ${port}`));

