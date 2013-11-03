module.exports = function(app, Sequelize){
    this.users = app.sequelize.define('users', {
        uid : {type : Sequelize.INTEGER, primaryKey : true},
        username : Sequelize.STRING,
        password : Sequelize.STRING,
        type     : Sequelize.STRING,
    });

    this.slides = app.sequelize.define('slides', {
        sid  : {type : Sequelize.INTEGER, primaryKey : true},
        text : Sequelize.TEXT,
    });

    this.questions = app.sequelize.define('questions', {
        qid : {type : Sequelize.INTEGER, primaryKey : true},
        type : Sequelize.STRING,
        time : Sequelize.DATE,
        text : Sequelize.TEXT,
        anonymous : Sequelize.INTEGER,
    });

    this.presentations = app.sequelize.define('presentations', {
        pid : {type : Sequelize.INTEGER, primaryKey : true},
        name : Sequelize.STRING,
    });

    this.courses = app.sequelize.define('courses', {
        cid : {type : Sequelize.INTEGER, primaryKey : true},
        name : Sequelize.STRING,
    });

    this.users.hasMany(this.courses, {joinTableName: 'course_list'});
    this.courses.hasMany(this.users, {joinTableName: 'course_list'});

    this.courses.hasMany(this.presentations,
                        {as             : 'presentations',
                         jointTableName : 'course_presentations'
    });

    this.presentations.hasMany(this.slides,
                        {jointTableName : 'presentation_slides'});

    this.
// End of this file
    return this;
}
