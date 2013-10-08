module.exports = function(app, models){
    // Lib:
    var ObjectId = app.mongoose.Types.ObjectId;
    
    //index:
    app.get('/', function (req,res){
        res.send("hello");
    });

    app.post('/login', function (req, res){
        if (req.body.password == '111')
            res.send("0");
        else
            res.send("1");
    });

    app.get('/courses/:uid', function (req, res){
        var uid = req.params.uid;
        models.CourseModel.findAll(function(err, courses){
            if (!err){
                res.send(courses);
            }else{
                res.send("error");
            }
        }); 
    });

    app.get('/courses/presentations/:cid', function (req, res){
        var cid = req.params.cid;
        models.PresentationModel.find({cid: ObjectId(cid)},\
        function (err, presentations){
            if (!err){
                res.send(presentations);
            }else{
                res.send("error");
            }
        });
    });
}
