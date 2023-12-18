const express = require('express')
const app = express()
const port = 3000
const router = require('./routes')
const errorHandler = require('./middleware/error_handler')
const filmRouter = require('./routes/film');

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/films', filmRoute);


app.use(router)
app.use(errorHandler)
app.use(filmRoutes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})