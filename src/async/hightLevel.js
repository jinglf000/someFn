function a () {
  console.log('a zhixng l ')
  return {
    qq: 1,
    then() {
      console.log('then');
      return 12;
    }
  }
}

function b () {
  console.log('a zhixng l ')
  return () => {
    console.log('xxxxxx');
  }
}


var mm = a()();

mm = a())
