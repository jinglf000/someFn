class Student {
  fullName: string;
  constructor(public firstName:string,public middleInnetial:string, public lastName:string) {
    this.fullName = firstName + ' ' + middleInnetial + ' ' + lastName;
  }
}

interface Person {
  firstName: string,
  lastName: string,
};

function greeter(person:Person) {
  return "hello, " + person.firstName + " " + person.lastName;
}

let user = new Student('wang', 'ming', 'xing');

console.log(greeter(user));
