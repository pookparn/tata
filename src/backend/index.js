var mgs_mod = require('./mongoose_module.js');
var port = process.env.PORT || 8788;
const app = require('express')(),
    http = require('http'),
    helmet = require('helmet')
//const app = express();

const alertlist = require('./core/alertlist/index.js');
app.use(helmet())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use((req, res, next) => {
    req.mgs_mod = mgs_mod
    next()
})

app.use('/alertlist', alertlist)

app.get('/', function (req, res) {
    res.send('<h1>Hello Node.js</h1>');
});
// app.get('/index', function (req, res) {
//     res.send('<h1>This is index page</h1>');
// });

// app.listen(port, function() {
//     console.log('Starting node.js on port ' + port);
// });


const server = http.createServer(app)
server.listen(port)
//server.on('error', onError)
server.on('listening', () => { console.log("Server started. Listening on port", port) })