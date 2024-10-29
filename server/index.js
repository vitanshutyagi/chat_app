const express = require("express")
const app = express()
const connect = require("./connect")
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")
const cors = require('cors')

app.use(cors())
app.use(cookieParser())

app.use(bodyParser.urlencoded({
    extended: false
}))

const userRoutes = require("./routes/userRoutes")
const messageRoutes = require("./routes/messageRoutes")

connect();


app.use(express.json())

app.use(userRoutes)
app.use(messageRoutes)

app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});
const PORT = process.env.PORT || 4002
app.listen(PORT,() => { 
    console.log(`App is running at port ${PORT}`);
})