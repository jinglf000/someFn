const wait = function(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(time);
    }, time);
  });
};

async function go() {
  return await wait(1000);
}

async function xx() {
  const val = await go();
  console.log(val);
}

// xx();

function ss({ name }) {
  console.log(name);
}

ss();
