const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Schema = mongoose.Schema;
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

const port = 4000;

const userScheme = new Schema(
    {
        email: String,
        firstName: String,
        lastName: String,
        login: String,
        password: String,
        role: String,
    },
    { versionKey: false }
);
const User = mongoose.model("User", userScheme);

const favoritsFilmScheme = new Schema(
    {
        user: mongoose.Types.ObjectId,
        film_id: [Number]
    },
    { versionKey: false }
);
const FavoritsFilm = mongoose.model("FavoritsFilm", favoritsFilmScheme);

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(cookieParser("secret key"));

mongoose
    .connect(
        "mongodb+srv://yander:yander@cluster0-ekjj1.mongodb.net/FilmCatalog?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("MongoDb, connected"))
    .catch((err) => console.log(err));


app.get("/userAuth", auth, async function (req, res){
    const user = req.user;
    // const favorite = await FavoritsFilm.findOne({user: user.userId});
    return res.status(200).json({message: "User logged in"})
});

app.post("/login", async (req, res) => {
    const { login, password } = req.body;

    const user = await User.findOne({login});

    if (!user){
        return res.status(400).json({message: "User is not found"})
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch){
        return res.status(400).json({message: "Wrong password"})
    }

    const token = jwt.sign(
        {userId: user.id},
        'secret key',
        { expiresIn: '1h'}
    );

    res.cookie('user', JSON.stringify({ 
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        login: user.login,
        role: user.role}));
    res.cookie('token', token);

    return res.status(200).json({message: "User logged in"})

});

app.post("/registration", async (req, res) => {
    const { email, firstName, lastName, login, password } = req.body;
   
    const candidate = await User.findOne({login});

    if (candidate){
        return res.status(400).json({message: "Such a logo exists"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        email: email,
        firstName: firstName,
        lastName: lastName,
        login: login,
        password: hashedPassword,
        role: "user",
    });

    await newUser.save();

    const user = await User.findOne({login});

    const favoritsFilm = new FavoritsFilm({
        user: user._id,
        film_id: []
    })

    await favoritsFilm.save();

    return res.status(201).json({message: "User created"})

});
app.put("/favorite/set", auth, async (req, res) => {
    const { film_id } = req.body;
    const user = req.user;
    const favorite = await FavoritsFilm.findOne({user: user.userId});
    let newFavorites = [];

    if(favorite.film_id.includes(film_id)){
        newFavorites = favorite.film_id.filter(item=>item !== film_id);
    } else {
        newFavorites = [...favorite.film_id, film_id];
    }

    await FavoritsFilm.updateOne({user: user.userId}, {film_id: newFavorites});

    return res.json(newFavorites)
    
})
app.get("/favorite/get", auth, async (req, res) => {
    const user = req.user;
    const favorite = await FavoritsFilm.findOne({user: user.userId});
    return res.json(favorite.film_id)
})

function auth(req, res, next){
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(401).json({message: "No authorization"})
        }
    
        const decoder = jwt.verify(token, 'secret key')
        req.user = decoder;
        next()
        
    } catch (error) {
        return res.status(401).json({message: "No authorization"})
    }
}

app.listen(port, () => console.log(`server is up port: ${port}`));
