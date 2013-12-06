// Test Login
$.ajax({
    url: 'http://localhost:3000/login',
    type: 'POST',
    data: {username:123, password:111},
    success: function(result) {
        console.log(result);
    }
});

// Test add course
$.ajax({
    url: 'http://localhost:3000/courses',
    type: 'POST',
    data: {name:"10-701 machine learning"},
    success: function(result) {
        console.log(result);
    }
});

// Test view courses:
http://localhost:3000/courses/123

// Test add presentation
$.ajax({
    url: 'http://localhost:3000/presentations',
    type: 'POST',
    data: {title:"Lecture 1: SVM", content:"<h3>SVM = support vector machine</h3>", cid:"52536fcb4a27903253000001", ptype:"quiz"},
    success: function(result) {
        console.log(result);
    }
});

// Test all presentations linked to a course
http://localhost:3000/courses/presentations/52536fcb4a27903253000001


// Test add question
$.ajax({
    url: 'http://localhost:9898/questions/52537105b7af553c53000001',
    type: 'POST',
    data: {number:"1", title:"what is the SVM short for?", selections:["support vector machine","suggestion visual machine","support visual machine","sequential vector machine"]},
    success: function(result) {
        console.log(result);
    }
});

// Test get questions
http://localhost:9898/questions/52537105b7af553c53000001

// Test Add Answer
$.ajax({
    url: 'http://localhost:9898/answers/',
    type: 'POST',
    data: {presentationID: "52537105b7af553c53000001", questionID: "526295181ac964280c000001", selectedNum: 2},
    success: function(result) {
        console.log(result);
    }
});
// Test Get Answers

db.presentations.find({type:{$exists:false}})

db.presentations.find({type:{$exists:false}}).forEach(function(item){
    db.presentation.update({_id: item._id}, {$set: { type: "presentation"}})
})
