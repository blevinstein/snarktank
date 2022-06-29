const { mimcHash } = require('@darkforest_eth/hashing');

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

async function main() {
  let { input, key } = yargs(hideBin(process.argv)).argv;

  input = parseInt(input);
  key = parseInt(key);

  console.log(mimcHash(key)(input).value);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
