module.exports = function(app, Sequelize){
    this.users = app.sequelize.define('users', {
        uid : Sequelize.INTEGER,
        username : Sequelize.STRING,
        password : Sequelize.STRING,
        type     : Sequelize.STRING,
    });

    this.slides = app.sequelize.define('slides', {
        sid  : Sequelize.INTEGER,
        text : Sequelize.TEXT,
    })
// End of this file
    return this;
}
