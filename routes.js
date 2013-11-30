module.exports = function(app, models){
    // Lib:
    var ObjectId = app.mongoose.Types.ObjectId;
    
    //index:
    app.get('/', function (req,res){
        models.PresentationModel.find(function (err, presentations){
            res.render("index.jade", {presentations: presentations});
        })
    });

    app.post('/login', function (req, res){
        if (req.body.password == '111')
            res.send("0");
        else
            res.send("1");
    });

    app.get('/courses/:uid', function (req, res){
        var uid = req.params.uid;
        models.CourseModel.find().exec(function(err, courses){
            if (!err){
                res.send(courses);
            }else{
                res.send("error");
            }
        }); 
    });

    app.post('/courses', function (req, res){
        var course = new models.CourseModel({
            name: req.body.name
        });
        course.save();
        res.send("success");
    });

    app.post('/presentations', function (req, res){
        var presentation = new models.PresentationModel({
            title: req.body.title,
            content: req.body.content,
            cid: ObjectId(req.body.cid),
            type: req.body.ptype
        });
        presentation.save();
        res.send("success");
    });

    app.get('/courses/presentations/:cid', function (req, res){
        var cid = req.params.cid;
        models.PresentationModel.find({cid: ObjectId(cid)},
        function (err, presentations){
            if (!err){
                res.send(presentations);
            }else{
                res.send("error");
            }
        });
    });

    app.post('/presentations/slides', function (req, res){
        var slide = new models.SlideModel({
            presentationID: ObjectId(req.body.pid),
            index: req.body.index,
            type:  req.body.type,
            title: req.body.title,
            content: req.body.content,
        });
        slide.save(function(err){
            if (!err){
                res.send("success");
            }else{
                console.log(err);
                res.send("error");
            }
        });
    });

    app.get('/slides/:sid', function (req, res){
        var sid = req.params.sid;
        model.SlideModel.findOne({_id : ObjectId(sid)},
        function (err, slide){
            if (!err){
                res.send(slide);
            }else{
                res.send("error");
            }
        });
    });

    app.get('/presentations/:pid', function (req, res){
        var pid = req.params.pid;
        model.PresentationModel.findOne({presentationID: ObjectId(pid)},
        function (err, presentation){
            if (!err){
                res.send(presentation);
            }else{
                console.log(err);
                res.send("error");
            }
        });
    });

    app.get('/presentations/:pid/slides', function (req, res){
        var pid = req.params.pid;
        models.SlideModel.find({presentationID: ObjectId(pid)},
        function (err, slides){
            if (!err){
                res.send(slides);
            }else{
                console.log(err);
                res.send("error");
            }
        });
    });

    app.get('/presentations/:pid/show/:ptype', function (req, res){
        var pid = req.params.pid;
        var ptype = req.params.ptype;
        if (ptype == 'slide'){
            models.SlideModel.find({presentationID: ObjectId(pid)},
            function (err, slides){
                if (!err){
                    res.render("presentation.jade", {presentationID: pid, slides: slides});
                }else{
                    console.log(err);
                    res.send("error");
                }
            });
        }else if (ptype == 'quiz'){
            models.QuestionModel.find({presentationID: ObjectId(pid)},
            function (err, questions){
                if (!err){
                    res.render("quiz.jade", {presentationID: pid, questions: questions});
                }else{
                    console.log(err);
                    res.send("error");
                }
            });
        }else{
            res.send("not found");
        }
    });

    app.post('/questions/:presentationID', function(req, res){
        var pid = req.params.presentationID;
        var question = new models.QuestionModel({
            presentationID: ObjectId(pid),
            index: req.body.number,
            presentationID: ObjectId(pid),
            title: req.body.title,
            selections: req.body.selections,
            answer: req.body.answer,
        });
        question.save();
        res.send("success");
    });

    app.get('/questions/:presentationID', function(req, res){
        var pid = req.params.presentationID;
        models.QuestionModel.find({presentationID: ObjectId(pid)}).sort("index")
        .exec(function (err, questions){
            if (!err){
                res.send(questions);
            }else{
                res.send("error");
            }
        });
    });

    app.post('/answers', function (req, res){
        var selectedNum = req.body.selectedNum;
        var ans = new models.AnswerModel({
            questionID: ObjectId(req.body.questionID),
            selection: req.body.selectedNum,
            userID: req.body.uid,
        });
        ans.save();
        res.send("success");
    });

    app.get('/answers/:presentationID', function (req, res){
        var pid = req.params.presentationID;
        models.AnswerModel.find({presentationID: ObjectId(pid)}, function(err, answers){
            if (!err){
                res.send(answers);
            }else{
                res.send("error");
            }
        });
    });

    // Channels
    app.get('/test_channel', function (req, res){
        app.pusher.trigger('test_channel', 'test_event', {
            message : "hello world",
        });
        res.send("received");
        console.log("test_event triggered");
    });

    // Test Redis
    app.get('/test_redis', function (req, res){
        app.redis_client.mset("a", 100, "b", 200, app.redis.print);
        app.redis_client.mget("a", "b", function(err, replies){
            if (err){
                console.log(err);
                res.send("error");
            }else{
                res.send(replies);
            }
        });
    });

    // Presentation Channel
    app.get('/presentations/:pid/show/moveto/:sindex', function (req, res){
        var pid = req.params.pid;
        var slideIndex = req.params.sindex;
        app.pusher.trigger('presentation_channel_'+pid, 'slide_event', {
            index : slideIndex,
            ctime : new Date(),
        });
        res.send("received");
        console.log("triggered");
    });

    app.get('/presentations/:pid/activate/:sindex', function (req, res){
        var pid = req.params.pid;
        var sindex = req.params.sindex;
        app.pusher.trigger('presentation_channel_'+pid, 'slide_status_event', {
            active : true,
            index : sindex,
            ctime : new Date(),
        });
        res.send("sent");
    });

    app.get('/presentations/:pid/deactivate/:sindex', function (req, res){
        var pid = req.params.pid;
        var sindex = req.params.sindex;
        app.pusher.trigger('presentation_channel_'+pid, 'slide_status_event', {
            active : false,
            index : sindex,
            ctime : new Date()}
        );
        res.send("sent");
    });

    app.get('/questions/:qid/show_stats', function (req, res){
        var qid = req.params.qid;
        models.AnswerModel.find({questionID: qid}, function(err, answers){
            if (!err){
                count = {};
                count[0] = 0;
                for (var i = 0; i < answers.length; i++){
                    var ans = answers[i];
                    if (ans.selection in count){
                        count[ans.selection] += 1;
                    }else{
                        count[ans.selection] = 1;
                    }
                    count[0] += 1;
                }
                var message = {
                    questionID : qid,
                    count: count,
                };
                app.pusher.trigger('presentation_channel_'+qid, 'question_stats_event', message);
                res.send(message);
            }else{
                console.log(err);
                res.send("error");
            }
        });
    });
}
