const express = require('express');

const app = express();

const port = 3000;

let theThing = null;

const replaceThing = function () {

  let originalThing = theThing;

  // let unused = function () {

  //   if (originalThing)

  //     console.log("hi");

  // };

  theThing = {

    longStr: new Array(1000000).join('*'),

    someMethod: function () {

      console.log(someMessage);

    }

  };

};

app.get('/leak', (req, res) => {

  replaceThing();

  // let memoryInfo = JSON.stringify(process.memoryUsage());
  let memory = process.memoryUsage();
  Object.keys(memory).forEach(element => {
    memory[element] = memory[element] / (1024 * 1024);
  });
  console.log(memory);

  res.send(memory);

})

app.listen(port, () => console.log(`Example app listening on port $!`));
