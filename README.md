<h3> A Pseudo Backend for the CommEffPivot </h3>

<strong> Usage: </strong> <br>
The server is deloyed at <a ref="http://106.187.92.216:9898">http://106.187.92.216:9898</a> <br>

| USAGE         | METHOD | URL           | DATA FORMAT  |
| ------------- |:------|:-------------| ------------|
| home          | GET    | /             |               |
| login         | POST    | /login            | {username, password}           |
| add course    | POST    | /courses             | {name}              |
| add presentation| POST    | /presentations             | {title, content, courseid}             |
| add question  | POST   | /questions/:presentaionID    | {number, title, [selections]}|
| add answer    | POST   | /answers      | {presentationID, questionID, selectedNum}
| view course   | GET    | /courses/:userid             |              |
| view presenatation| GET    | /courses/presentations/:courseid             |              |
| view questions | GET   | /questions/:presentationID | |
| view answers  |  GET   | /answers/:presentationID  |  |

<strong> Deploy: </strong> <br>
<pre>
<code>
//clone project
  git clone https://github.com/timyitong/idealisticvision
//install package modules
  cd idealisticvision
  npm install
//start the server
  node app
</code>
</pre>
