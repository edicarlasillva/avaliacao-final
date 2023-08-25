import express from 'express'

import usersRouter from './routes/users'
import messagesRouter from './routes/messages'

const app = express()

app.use(express.json())

// Definindo rotas para roteamento
// As rotas terão prefixo users ou messages
app.use("/users", usersRouter)
app.use("/messages", messagesRouter)

app.listen(3000, () => console.log("Servidor rodando na porta 3000"))