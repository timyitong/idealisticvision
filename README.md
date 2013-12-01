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
| add slide     | POST   | /presentations/slides        | {{pid, index, type, title, content}|
| add answer    | POST   | /answers      | {presentationID, questionID, selectedNum}
| view course   | GET    | /courses/:userid             |              |
| view presenatation| GET    | /courses/presentations/:courseid             |              |
| view slides    | GET    |  /presentations/:presentationID/slides | |
| view questions | GET   | /questions/:presentationID | |
| view answers  |  GET   | /answers/:presentationID  |  |

<strong> Channels: </strong> <br>

| channel         | Event | Data           | Usage |
| ------------- |:------|:-------------| ------------|
| test\_channel          | test\_event    | {message}            |    test           |
| presentation\_channel\_[:pid] | slide_event| {index}  | Move slide to the given index

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
