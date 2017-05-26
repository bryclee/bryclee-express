function sendWhenRendered(res, rendering) {
    return rendering
        .then(res.send.bind(res))
        .catch((err) => respondError(err, res));
}

function respondError(err, res) {
    console.error('Error when rendering:', err);
    res.status(500);
    res.set('content-type', 'text/html; charset=utf-8');
    res.send(errorTemplate);
}

var errorTemplate = `
<!doctype html>
<html>
<head>
    <title>\u2639</title>
</head>
<body>
    <h1 class="title">\uD83D\uDE2D</h1>
<style>
    h1 {
        position: fixed;
        left: 50%;
        top: 50%;
        margin: 0;
        font-size: 20vh;
        transform: translate(-50%, -50%);
    }
</style>
</body>
</html>`;

module.exports.sendWhenRendered = sendWhenRendered;
module.exports.respondError = respondError;
