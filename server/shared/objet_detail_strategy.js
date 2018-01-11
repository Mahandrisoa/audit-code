var util = require('./util.js');

function operation(req) {
    var statement = 'SELECT ' +
        'TYPE_OBJET,NOM_OBJET,TAILLE_OBJET,NB_EXTENT,TAILLE_UTILISE,DATE_AUDIT_JOURNALIER,DIVISION ' +
        'FROM FINANCE.AUDIT_JOURNALIER_OBJET_DETAIL ';
    var owners = util.hasQueries(req, ["date", "division", "objet"]);
    switch (owners.predicates) {
        case 'date':
            statement +=
                'WHERE DATE_AUDIT_JOURNALIER = TO_DATE(\'' + req.query.date + '\',\'dd-mm-yyyy\')';
            break;
        case 'division':
            statement +=
                'WHERE DIVISION= \'' + req.query.division + '\'';
            break;
        case 'objet':
            statement +=
                'WHERE TYPE_OBJET= \'' + req.query.objet + '\'';
            break;
        case 'date_division':
            statement +=
                'WHERE DATE_AUDIT_JOURNALIER= TO_DATE(\'' + req.query.date + '\',\'dd-mm-yyyy\') ' +
                'AND DIVISION =\'' + req.query.division + '\'';
            break;
        case 'date_objet':
            statement +=
                'WHERE DATE_AUDIT_JOURNALIER= TO_DATE(\'' + req.query.date + '\',\'dd-mm-yyyy\') ' +
                'AND TYPE_OBJET= \'' + req.query.objet + '\'';
            break;
        case 'division_objet':
            statement +=
                'WHERE DIVISION= \'' + req.query.division + '\'' +
                'AND TYPE_OBJET= \'' + req.query.objet + '\'';
            break;
        case 'date_division_objet':
            statement +=
                'WHERE DATE_AUDIT_JOURNALIER= TO_DATE(\'' + req.query.date + '\',\'dd-mm-yyyy\') ' +
                'AND DIVISION= \'' + req.query.division + '\' ' +
                'AND TYPE_OBJET= \'' + req.query.objet + '\'';
            break;
    }
    return statement;
}

module.exports.operation = operation