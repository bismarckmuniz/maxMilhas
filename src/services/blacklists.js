var blacklists = (app) => {
    var firebase = app.firebase;
    return firebase.database().ref('blacklists');
}

module.exports = blacklists