const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/Db');
const userRouter = require('./Users/UserRouter');
const postRouter = require('./BlogPost/PostRouter');

dotenv.config();
connectDB();

const app = express();

app.use(cors())
app.use(express.json());

app.use("/user", userRouter)
app.use("/post", postRouter)

app.use("/", (req,res) => {
    return res.status(200).send({message:"Success"})
})

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).send({ error: message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
