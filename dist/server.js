var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')
app = express()

app.use('/', serveStatic(path.join(__dirname, '/dist')))

app.get(/.*/, function (req, res) {
	res.sendFile(path.join(__dirname, '/dist/index.html'))
})

app.use(serveStatic(__dirname))
var port = process.env.PORT || 5173
app.listen(port)
console.log('server started ' + port)
