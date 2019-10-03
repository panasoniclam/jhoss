const base = (fields) => (req, res, key) => {
    if (req[fields] && req[fields][key]) return false;
    res.status(500).send({
        status: 500,
        result: "Error: missing key '" + key + "'"
    });
    return true;
};

module.exports = {
    body: base("body"),
    query: base("query")
};