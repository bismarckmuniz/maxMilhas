module.exports = function (app) {
    var controller = app.controllers.blacklists;

    app.get('/', controller.index);
    app.get('/status', controller.status); // {"queries":"xx","amount_cpf":xx}
    app.get('/query/:cpf', controller.query);// http://localhost:3000/query/{12345678910} 
    app.post('/view', controller.view);
    app.post('/create', controller.create);
    app.post('/remove', controller.remove);
    app.post('/uptime', controller.uptime);

}