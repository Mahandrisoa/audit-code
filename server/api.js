var express = require('express');
var oracledb = require('oracledb');
var database = require('./database.js');

function getRouter() {
    var router = express.Router();

    router.route('/employees')
        .get(getEmployees)
        .post(postEmployees);

    router.route('/employees/:employee_id')
        .get(getEmployeesById)
        .put(putEmployeesById)
        .delete(delEmployeesById);

    router.route('/audits')
        .get(getAudits);

    router.route('/objet_details')
        .get(getObjetDetails);

    router.route('/disque_details')
        .get(getDisqueDetails);
    return router;
}

var odStrategy = require('./shared/objet_detail_strategy');

function getObjetDetails(req, res, next) {
    database.getPool().getConnection(function (err, connection) {
        if (err) return next(err);
        var statement = odStrategy.operation(req);
        console.log('Statement : ', statement);
        connection.execute(
            statement,
            {}, //no binds
            {
                outFormat: oracledb.OBJECT
            },
            function (err, results) {
                if (err) {
                    return connection.release(function () {
                        next(err);
                    });
                }

                connection.release(function (err) {
                    if (err) return next(err);
                    res.send(results['rows']);
                });
            }
        );
    });
}

var strategy = require('./shared/strategy.js');

function getDisqueDetails(req, res, next) {
    database.getPool().getConnection(function (err, connection) {
        if (err) return next(err);
        var statement = strategy.operation(req);
        console.log(statement);
        connection.execute(
            statement,
            {}, //no binds
            {
                outFormat: oracledb.OBJECT
            },
            function (err, results) {
                if (err) {
                    return connection.release(function () {
                        next(err);
                    });
                }

                connection.release(function (err) {
                    if (err) return next(err);
                    res.send(results['rows']);
                });
            }
        );
    });
}

function getAudits(req, res, next) {
    database.getPool().getConnection(function (err, connection) {
        if (err) return next(err);
        var statement = 'SELECT * FROM FINANCE.AUDIT_JOURNALIER';
        if (req.query.division === undefined && req.query.date !== undefined) {
            statement += ' WHERE DATE_AUDIT_JOURNALIER= TO_DATE(\'' + req.query.date + '\',\'dd-mm-yyyy\')';
        } else if (req.query.date === undefined && req.query.division !== undefined) {
            statement += ' WHERE DIVISION=\'' + req.query.division + '\'';
        } else if (req.query.date !== undefined && req.query.division !== undefined) {
            statement +=
                ' WHERE DIVISION=\'' + req.query.division + '\' ' +
                'AND DATE_AUDIT_JOURNALIER= TO_DATE(\'' + req.query.date + '\',\'dd-mm-yyyy\')';
        }
        connection.execute(
            statement,
            {}, //no binds
            {
                outFormat: oracledb.OBJECT
            },
            function (err, results) {
                if (err) {
                    return connection.release(function () {
                        next(err);
                    });
                }

                connection.release(function (err) {
                    if (err) return next(err);
                    res.send(results['rows']);
                });
            }
        );
    });
}

function getEmployees(req, res, next) {
    database.getPool().getConnection(function (err, connection) {
        if (err) return next(err);

        connection.execute(
            'SELECT employee_id, ' +
            '   first_name, ' +
            '   last_name, ' +
            '   phone_number, ' +
            '   hire_date ' +
            'FROM jsao_employees',
            {},//no binds
            {
                outFormat: oracledb.OBJECT
            },
            function (err, results) {
                if (err) {
                    return connection.release(function () {
                        next(err);
                    });
                }

                connection.release(function (err) {
                    if (err) return next(err);

                    res.send(results);
                });
            }
        );
    });
}

function postEmployees(req, res, next) {
    database.getPool().getConnection(function (err, connection) {
        if (err) return next(err);

        connection.execute(
            'INSERT INTO jsao_employees (' +
            '   first_name, ' +
            '   last_name, ' +
            '   phone_number, ' +
            '   hire_date ' +
            ') VALUES ( ' +
            '   :FIRST_NAME, ' +
            '   :LAST_NAME, ' +
            '   :PHONE_NUMBER, ' +
            '   :HIRE_DATE ' +
            ')',
            {
                FIRST_NAME: {
                    val: req.body.FIRST_NAME
                },
                LAST_NAME: {
                    val: req.body.LAST_NAME
                },
                PHONE_NUMBER: {
                    val: req.body.PHONE_NUMBER
                },
                HIRE_DATE: {
                    val: new Date(req.body.HIRE_DATE)
                }
            },
            {
                isAutoCommit: true
            },
            function (err, results) {
                if (err) {
                    return connection.release(function () {
                        next(err);
                    });
                }

                connection.release(function (err) {
                    if (err) return next(err);

                    res.send(results);
                });
            }
        );
    });
}

function getEmployeesById(req, res, next) {
    database.getPool().getConnection(function (err, connection) {
        if (err) return next(err);

        connection.execute(
            'SELECT employee_id, ' +
            '   first_name, ' +
            '   last_name, ' +
            '   phone_number, ' +
            '   hire_date ' +
            'FROM jsao_employees ' +
            'WHERE employee_id = :EMPLOYEE_ID',
            {
                EMPLOYEE_ID: req.params.employee_id
            },
            {
                outFormat: oracledb.OBJECT
            },
            function (err, results) {
                if (err) {
                    return connection.release(function () {
                        next(err);
                    });
                }

                connection.release(function (err) {
                    if (err) return next(err);

                    res.send(results);
                });
            }
        );
    });
}

function putEmployeesById(req, res, next) {
    database.getPool().getConnection(function (err, connection) {
        if (err) return next(err);

        connection.execute(
            'UPDATE jsao_employees ' +
            'SET first_name = :FIRST_NAME, ' +
            '   last_name = :LAST_NAME, ' +
            '   phone_number = :PHONE_NUMBER, ' +
            '   hire_date = :HIRE_DATE ' +
            'WHERE employee_id = :EMPLOYEE_ID',
            {
                EMPLOYEE_ID: {
                    val: req.body.EMPLOYEE_ID,
                    type: oracledb.NUMBER
                },
                FIRST_NAME: {
                    val: req.body.FIRST_NAME
                },
                LAST_NAME: {
                    val: req.body.LAST_NAME
                },
                PHONE_NUMBER: {
                    val: req.body.PHONE_NUMBER
                },
                HIRE_DATE: {
                    val: new Date(req.body.HIRE_DATE)
                }
            },
            {
                isAutoCommit: true
            },
            function (err, results) {
                if (err) {
                    return connection.release(function () {
                        next(err);
                    });
                }

                connection.release(function (err) {
                    if (err) return next(err);

                    res.send(results);
                });
            }
        );
    });
}

function delEmployeesById(req, res, next) {
    database.getPool().getConnection(function (err, connection) {
        if (err) return next(err);

        connection.execute(
            'DELETE FROM jsao_employees WHERE employee_id = :EMPLOYEE_ID',
            {
                EMPLOYEE_ID: req.params.employee_id
            },
            {
                isAutoCommit: true
            },
            function (err, results) {
                if (err) {
                    return connection.release(function () {
                        next(err);
                    });
                }

                connection.release(function (err) {
                    if (err) return next(err);

                    res.send(results);
                });
            }
        );
    });
}

module.exports.getRouter = getRouter;