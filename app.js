import express from 'express'
import nunjucks from 'nunjucks'
import session from 'express-session'

const app = express()
const PORT = 5555

app.use(express.urlencoded({ extended: false }))

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: "any old secret string p98237948p12yhjkfhwbdflgivuaye908fryh3u"
}))

nunjucks.configure('views', {
    autoescape: true,
    express: app,
})

app.get('/', (req, res) => {

    if (req.session.email) {
        res.render('index.html', { emailAddress: req.session.email })
    } else {
        res.render('index.html')
    }
})

app.get('/login', (req, res) => {
    res.render('login.html')
})

app.post('/login', (req, res) => {

    const { email } = req.body
    
    req.session.email = '🐣'

    res.render('dashboard.html')

})

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err)
        }

        res.redirect('/')
    })
})

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))