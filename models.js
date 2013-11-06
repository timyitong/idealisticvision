module.exports = function(mongoose){
    var Schema = mongoose.Schema;
    var ObjectId= Schema.ObjectId;

//Course:
    var Course = new Schema({
        uid: ObjectId,
        name: String,
        ctime: {type:Date, default:Date.now}
    });
    this.CourseModel = mongoose.model('Course', Course);

//Presentation:
    var Presentation = new Schema({
        cid: ObjectId,
        title:   String,
        type: String,
        content: String,
        ctime: {type: Date, default: Date.now}
    });
    this.PresentationModel = mongoose.model('Presentation', Presentation);

// Slide
    var Slide = new Schema({
        presentationID: ObjectId,
        index: Number,
        title: String,
        type: String,
        content: String,
        ctime: {type: Date, default: Date.now},
    });
    this.SlideModel = mongoose.model('Slide', Slide);

//Question:
    var Question = new Schema({
        number: Number,
        slideID: ObjectId,
        title: String,
        selections: [String],
        ctime: {type:Date, default:Date.now}
    });
    this.QuestionModel = mongoose.model('Question', Question);

// Answer:
    var Answer = new Schema({
        slideID: ObjectId,
        questionID: ObjectId,
        selection: Number,
        userID: ObjectId,
        ctime: {type:Date, default:Date.now}
    })
    this.AnswerModel = mongoose.model('Answer', Answer);

// End of this file
    return this;
}
