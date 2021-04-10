const mysql = require('mysql');
const config = require('../config.json')
const util = require('util')

let state = {
	pool: null
};

exports.connect = done => {
	state.pool = mysql.createConnection(config.sqlConnectionDetails);
	state.pool.connect((err) => {
		done(err);
	});
};

exports.query = (sql, args) => {
	return util.promisify(state.pool.query)
		.call(state.pool, sql, args);
};

exports.beginTransaction = ()=> {
	return util.promisify( state.pool.beginTransaction )
		.call( state.pool );
},
exports.commit = ()=> {
	return util.promisify( state.pool.commit )
		.call( state.pool );
},
exports.rollback = ()=> {
	return util.promisify( state.pool.rollback )
		.call( state.pool );
}

exports.close = ()=> {
	return util.promisify( state.pool.end ).call( state.pool );
}