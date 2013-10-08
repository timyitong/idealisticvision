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
    data: {title:"Lecture 1: SVM", content:"<h3>SVM = support vector machine</h3>", cid:"52536fcb4a27903253000001"},
    success: function(result) {
        console.log(result);
    }
});

// Test all presentations linked to a course
http://localhost:3000/courses/presentations/52536fcb4a27903253000001
