module.exports = function(app, models){
    // Lib:
    var ObjectId = app.mongoose.Types.ObjectId;
    
    //index:
    app.get('/', function (req,res){
        res.render("index.jade", {});
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

    app.post('/questions/:presentationID', function(req, res){
        var pid = req.params.presentationID;
        var question = new models.QuestionModel({
            number: req.body.number,
            presentationID: ObjectId(pid),
            title: req.body.title,
            selections: req.body.selections,
        });
        question.save();
        res.send("success");
    });

    app.get('/questions/:presentationID', function(req, res){
        var pid = req.params.presentationID;
        models.QuestionModel.find({presentationID: ObjectId(pid)}).sort("number")
        .exec(function (err, questions){
            if (!err){
                res.send(questions);
            }else{
                res.send("error");
            }
        });
    });

    app.post('/answers', function (req, res){
        var ans = new models.AnswerModel({
            presentationID: ObjectId(req.body.presentationID),
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
}
