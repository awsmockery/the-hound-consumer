const queue = require("./queue.js")
const port = 8002
const express = require('express')
const app = express()

app.post("/receive", ({ body }, response) => {
  queue.consume(() => {
    response.sendStatus(200)
  })
})

app.listen(port, () => console.log(`The Hound listening on port${port}!`))
