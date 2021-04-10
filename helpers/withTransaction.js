const {beginTransaction,commit,rollback,close} = require('../src/db')

async function withTransaction( callback ) {
  try {
    await beginTransaction();
    await callback();
    await commit();
  } catch ( err ) {
    await rollback();
    throw err;
  }
}

module.exports = withTransaction;
