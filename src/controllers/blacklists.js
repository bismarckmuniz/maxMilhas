module.exports = function (app) {
    var service = require('../services/blacklists')(app);
    return {
        index: (req, res) => {
            res.render('index');
        },

        uptime: (req, res) => {
            res.render('process.uptime()');
        },

        create: (req, res) => {
            var newBlacklist = service.push();
            var data = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
            newBlacklist.set({
                cpf: req.body.cpf,
                data: data
            });
            return res.redirect('/');
        },

        status: (req, res) => {
            var cookieValue = req.cookies.cookieName;
            service.on('value', (snapshot) => {
                res.send(JSON.stringify({queries: cookieValue || 0, amount_cpf: snapshot.numChildren()}));

                });
        },

        view: (req, res) => {
            var cookie;
            cookie = (req.cookies.cookieName == null) ? 1 : parseInt(req.cookies.cookieName) + 1;
            res.cookie('cookieName', cookie, {
                expires: new Date(Date.now() + 365*2*24*60*60*1000),//nao vencer flag cookie
                //1000 milliseconds in a second * 60 seconds in a minute * 60 minutes in an hour * 24 hour in a day * 365 days in a year
                httpOnly: true
            });

            service.on('value', (snapshot) => {
                snapshot.forEach(function(childSnapshot){
                    if(req.body.cpf === childSnapshot.val().cpf){
                        res.render('block', {id: childSnapshot.key,backlist: childSnapshot.val() || []});
                    }
                })
                res.render('view', {cpf: req.body.cpf || []});
            });
        },

        remove: (req, res) => {
            var child = service.child(req.body.id);
            child.set(null, () => {
                res.redirect('/');
            });
        },

        query: (req, res) => {
            service.on('value', (snapshot) => {
                snapshot.forEach(function(childSnapshot){
                    if(req.params.cpf === childSnapshot.val().cpf){
                        res.send(JSON.stringify(childSnapshot.val()));
                    }
                })
                res.send(JSON.stringify({msg: 'FREE - CPF nao consta na BlackList'}));
            });
        },
    }
}