module.exports = function(app, Sequelize){
    this.users = app.sequelize.define('users', {
        uid : {type : Sequelize.INTEGER,
               primaryKey : true,
               autoIncrement : true,
              },
        username : Sequelize.STRING,
        password : Sequelize.STRING,
        type     : Sequelize.STRING,
    });

    this.slides = app.sequelize.define('slides', {
        sid  : {type : Sequelize.INTEGER,
                primaryKey : true,
                autoIncrement: true, 
                },
        text : Sequelize.TEXT,
        index: Sequelize.INTEGER,
        type : Sequelize.STRING,
    });

    this.questions = app.sequelize.define('questions', {
        qid : {type : Sequelize.INTEGER,
               primaryKey : true,
               autoIncrement: true, 
               },
        type : Sequelize.STRING,
        time : Sequelize.DATE,
        text : Sequelize.TEXT,
        anonymous : Sequelize.INTEGER,
    });

    this.presentations = app.sequelize.define('presentations', {
        pid : {type : Sequelize.INTEGER,
               primaryKey : true,
               autoIncrement: true,
               },
        name : Sequelize.STRING,
    });

    this.courses = app.sequelize.define('courses', {
        cid : { type : Sequelize.INTEGER,
                primaryKey : true,
                autoIncrement: true,
              },
        name : Sequelize.STRING,
    });

    this.course_list = app.sequelize.define('course_list', {
        cid : { type    : Sequelize.INTEGER,
                primaryKey : true,
              },
        uid : { type    : Sequelize.INTEGER,
                primaryKey : true,
              },
    });

    this.answers = app.sequelize.define('presenation_quiz_answers', {
        pid : {type : Sequelize.INTEGER, primaryKey : true},
        cid : {type : Sequelize.INTEGER, primaryKey : true},
        qid : {type : Sequelize.INTEGER, primaryKey : true},
        uid : {type : Sequelize.INTEGER, primaryKey : true},
        answer : Sequelize.TEXT,
    });

    this.users.hasMany(this.courses,
                        {as             : 'Courses',
                         foreignKey     : 'uid',
                         useJunctionTable: true,
                         joinTableName  : this.course_list});

    this.courses.hasMany(this.presentations,
                        {as             : 'Presentations',
                         foreignKey     : 'cid',
                         useJunctionTable: true,
                         jointTableName : 'course_presentations'
    });

    this.presentations.hasMany(this.slides,
                        {as             : 'Slides',
                         foreignKey     : 'pid',
                         useJunctionTable: true,
                         jointTableName : 'presentation_slides'});

    this.slides.hasMany(this.questions,
                        {as             : 'Questions',
                         foreignKey     : 'sid',
                         useJunctionTable: true,
                         jointTableName : 'slide_questions'});
                        
// End of this file
    return this;
}
