var util = require('./util.js');

function operation(req) {

    var statement = 'SELECT * FROM FINANCE.AUDIT_JOURNALIER_DISQUE_DETAIL ';
    var owners = util.hasQueries(req,["date", "division", "serveur"])
    switch (owners.predicates) {
        case 'date':
            statement +=
                'WHERE DATE_AUDIT_JOURNALIER= TO_DATE(\'' + req.query.date + '\',\'dd-mm-yyyy\')';
            break;
        case 'division':
            statement +=
                'WHERE DIVISION= \'' + req.query.division + '\'';
            break;
        case 'serveur':
            statement +=
                'WHERE SERVEUR= \'' + req.query.serveur + '\'';
            break;
        case 'date_division':
            statement +=
                'WHERE DATE_AUDIT_JOURNALIER= TO_DATE(\'' + req.query.date + '\',\'dd-mm-yyyy\') ' +
                'AND DIVISION =\'' + req.query.division + '\'';
            break;
        case 'date_serveur':
            statement +=
                'WHERE DATE_AUDIT_JOURNALIER= TO_DATE(\'' + req.query.date + '\',\'dd-mm-yyyy\') ' +
                'AND SERVEUR= \'' + req.query.serveur + '\'';
            break;
        case 'division_serveur':
            statement +=
                'WHERE DIVISION= \'' + req.query.division + '\'' +
                'AND SERVEUR= \'' + req.query.serveur + '\'';
            break;
        case 'date_division_serveur':
            statement +=
                'WHERE DATE_AUDIT_JOURNALIER= TO_DATE(\'' + req.query.date + '\',\'dd-mm-yyyy\') ' +
                'AND DIVISION= \'' + req.query.division + '\' ' +
                'AND SERVEUR= \'' + req.query.serveur + '\'';
            break;
    }
    return statement
}

module.exports.operation = operation