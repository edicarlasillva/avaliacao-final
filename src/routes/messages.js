// import express from 'express'
import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'

import { users } from './users'

// const router = express.Router()
const router = Router()

const messages = []

// Rota para criar um recado
router.post("/", (request, response) => {
  const { title, description, userId } = request.body

  const user = users.find(user => user.id === userId)

  if (!user) {
    return response.status(404).json({
      message: "Usuário não encontrado."
    })
  }

  const newMessage = {
    id: uuidv4(),
    title,
    description,
    userId
  }

  messages.push(newMessage)

  response.status(201).json({
    message: "Recado criado com sucesso.",
    newMessage
  })

})

// Rota para listar todos os recados de um usuário específico
router.get("/:userId", (resquest, response) => {
  const { userId } = resquest.params

  const user = users.find(user => user.id === userId)

  if (!user) {
    return response.status(404).json({
      message: "Usuário não encontrado."
    })
  }

  const userMessages = messages.filter(message => message.userId === userId)

  response.status(200).json(userMessages)
})

// Rota para atualizar um recado
router.put("/:messageId", (request, response) => {
  const { messageId } = request.params
  const { title, description } = request.body

  const messageIndex = messages.findIndex(message => message.id === messageId)

  if (messageIndex === -1) {
    return response.status(404).json({
      message: "Recado não encontrado."
    })
  }

  messages[messageIndex].title = title
  messages[messageIndex].description = description

  response.status(200).json({
    message: "Recado atualizado com sucesso."
  })
})

// Rota para excluir um recado
router.delete("/:messageId", (request, response) => {
  const { messageId } = request.params

  const messageIndex = messages.findIndex(message => message.id === messageId)

  if (messageIndex === -1) {
    return response.status(404).json({
      message: "Recado não encontrado."
    })
  }

  const deletedMessage = messages.splice(messageIndex, 1)

  response.status(200).json({
    message: "Recado excluído com sucesso.",
    deletedMessage
  })
})

export default router
