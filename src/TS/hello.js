var Student = /** @class */ (function() {
  function Student(firstName, middleInnetial, lastName) {
    this.firstName = firstName;
    this.middleInnetial = middleInnetial;
    this.lastName = lastName;
    this.fullName = firstName + ' ' + middleInnetial + ' ' + lastName;
  }
  return Student;
})();
function greeter(person) {
  return 'hello, ' + person.firstName + ' ' + person.lastName;
}
var user = new Student('wang', 'ming', 'xing');
console.log(greeter(user));
