function hasQueries(req,attributes) {
    var results = [];
    if (Object.keys(req.query).length > 0) {
        for (var i = 0; i < attributes.length; i++) {
            if (attributes[i].toString() in req.query) {
                results.push(attributes[i]);
            }
        }
    }
    return {
        predicates: results.join('_'),
    };
}
module.exports.hasQueries = hasQueries