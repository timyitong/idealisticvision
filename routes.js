module.exports = function(app, models){
    // Lib:
    var ObjectId = app.mongoose.Types.ObjectId;

    //index:
    app.get('/', function (req,res){
        res.render("index.jade", {});
    });

    app.get('/users', function (req, res){
        app.models.users.findAll().success(function(users){
            res.send(users);
        }); 
    });

    app.post('/signup', function (req, res){
        app.bcrypt.genSalt(10, function(err, salt) {
            var user = app.models.users.build(
                      {username     : req.body.username,
                       password     : app.bcrypt.hashSync(req.body.password, salt),
                       type         : req.body.usertype,
                      }
                );
            user.save()
                .success(function(result){
                    res.send("success");
                }).error(function(result){
                    res.send(result);
                });
        });        
    }); 

    app.post('/login', function (req, res){
        app.models.users.find({where:{uid:req.body.username}})
           .success(function(user){
               if (app.bcrypt.compareSync(req.body.password, user.password)){
                   res.send("success");
               }else{
                   res.send("fail");
               }
           }).error(function(err){
               res.send("fail");
           });
    });

    app.get('/courses/:uid', function (req, res){
        var uid = req.params.uid;
        app.models.users.find({where: {uid:uid}}).success(function(user){
            user.getCourses().success(function(courses){
                res.send(courses);
            });
        });
    });

    app.post('/courses/enroll', function (req, res){
        var uid = req.body.uid;
        var cid = req.body.cid;
        app.models.course_list.build({uid:uid, cid:cid})
            .save()
            .success(function(result){
                res.send("success");
            }).error(function(result){
                res.send(result);
            });
    });

    app.get('/courses', function(req, res){
        app.models.courses.findAll().success(function(courses){
            res.send(courses);
        }).error(function(err){
            res.send(err);
        });
    });

    app.post('/courses', function (req, res){
        app.models.courses.build({
            name : req.body.name,
        }).save().success(function(result){
            res.send("success");
        }).error(function(result){
            res.send("fail");
        });
    });

    app.post('/presentations', function (req, res){
        app.models.presentations.build({
            pid : req.body.pid,
            name : req.body.name,
        }).save().success(function(presentation){
            app.models.courses.find({where:{cid:req.body.cid}})
                .success(function(course){
                    course.addPresentation(presentation);
                    res.send("success");
                }).error(function(result){
                    res.send(result);
                });
        }).error(function(result){
            res.send(result);
        });
    });

    app.get('/courses/presentations/:cid', function (req, res){
        var cid = req.params.cid;
        app.models.courses.find({where: {cid:cid}}).success(function(course){
            course.getPresentations().success(function(presentations){
                res.send(presentations);
            });
        });
    });

    app.get('/questions/:slideID', function(req, res){
        var sid = req.params.slideID;
        app.models.find({where:{sid:sid}}).success(function(slide){
            if (slide.type == 'q'){
                slide.getQuestions().success(function(questions){
                    res.send(questions);
                });
            }else{
                res.send({});
            }
        });
    });
}
