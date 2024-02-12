import express from "express"
import dotenv from "dotenv"
import chalk from "chalk"
import cors from "cors"
import userRouter from "./router/user.router.js"

const app = express()

dotenv.config()
app.use(cors())
app.use(express.json())
app.use('/users', userRouter)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(chalk.blue(`Server listen on port ${chalk.underline('http://localhost:' + PORT + '/users')}`))
})