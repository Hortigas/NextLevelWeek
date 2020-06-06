const express = require('express');
const server = express();

//pegar o banco de dados
const db = require('./database/db.js');

//configurar pasta publica
server.use(express.static('public'));

//habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }));

//utilizando template engine
const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
});

//configurar caminhos da minha aplicacao
//pagina inicial
//res: requisicao res: resposta
server.get('/', (req, res) => {
    res.render('index.html');
});

server.get('/create-point', (req, res) => {
    //req.query: Query Strings da nossa url

    res.render('create-point.html');
});

server.post('/save-point', (req, res) => {
    //req.body: O corpo do nosso formulario
    //console.log(req.body);
    //inserir dados
    const query = `
    INSERT INTO places (image,name,address,address2,state,city,items)
    VALUES (?,?,?,?,?,?,?);
    `;

    function afterInsertData(err) {
        if (err) {
            console.log(err);
            return res.send('Erro no cadastro!');
        }

        return res.render('create-point.html', { saved: true });
    }

    const values = [req.body.image, req.body.name, req.body.address, req.body.address2, req.body.state, req.body.city, req.body.items];

    db.run(query, values, afterInsertData);
});

server.get('/search-results', (req, res) => {
    const search = req.query.search;

    if (search == '') {
        //pesquisa vazia
        var places = {
            length: 0,
        };
        return res.render('search-results.html', places);
    } else if (search == 'test') {
        db.all(`SELECT * FROM places`, function (err, rows) {
            if (err) {
                return console.log(err);
            }
            return res.render('search-results.html', { places: rows });
        });
    } else {
        db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
            if (err) {
                return console.log(err);
            }
            return res.render('search-results.html', { places: rows });
        });
    }
});

server.listen(3000);
