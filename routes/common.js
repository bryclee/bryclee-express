function sendWhenRendered(res, rendering) {
    return rendering
        .then(res.send.bind(res))
        .catch((err) => respondError(err, res));
}

function respondError(err, res) {
    console.error('Responding due to error:', err);
    res.status(500);
    res.set('content-type', 'text/html; charset=utf-8');
    res.send(errorTemplate);
}

function respond404(res) {
    res.status(404);
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
    body {
        background-color: #fafaff;
    }

    h1 {
        position: fixed;
        left: 50%;
        top: 50%;
        margin: 0;
        font-size: 1vh;
        -webkit-transform: translate(-50%, -50%) rotate(0) scale(10);
                transform: translate(-50%, -50%) rotate(0) scale(10);
        -webkit-animation-name: wobble;
        -webkit-animation-duration: 4s;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-timing-function: ease;
                animation-name: wobble;
                animation-duration: 4s;
                animation-iteration-count: infinite;
                animation-timing-function: ease;
    }

    @-webkit-keyframes wobble {
        0% {
            -webkit-transform: translate(-50%, -50%) rotate(0) scale(10);
                    transform: translate(-50%, -50%) rotate(0) scale(10);
        }
        10% {
            -webkit-transform: translate(-50%, -50%) rotate(-15deg) scale(10);
                    transform: translate(-50%, -50%) rotate(-15deg) scale(10);
        }
        20% {
            -webkit-transform: translate(-50%, -50%) rotate(20deg) scale(11);
                    transform: translate(-50%, -50%) rotate(20deg) scale(11);
        }
        30% {
            -webkit-transform: translate(-50%, -50%) rotate(0) scale(10);
                    transform: translate(-50%, -50%) rotate(0) scale(10);
        }
    }
    @keyframes wobble {
        0% {
            -webkit-transform: translate(-50%, -50%) rotate(0) scale(10);
                    transform: translate(-50%, -50%) rotate(0) scale(10);
        }
        10% {
            -webkit-transform: translate(-50%, -50%) rotate(-15deg) scale(10);
                    transform: translate(-50%, -50%) rotate(-15deg) scale(10);
        }
        20% {
            -webkit-transform: translate(-50%, -50%) rotate(20deg) scale(11);
                    transform: translate(-50%, -50%) rotate(20deg) scale(11);
        }
        30% {
            -webkit-transform: translate(-50%, -50%) rotate(0) scale(10);
                    transform: translate(-50%, -50%) rotate(0) scale(10);
        }
    }
</style>
</body>
</html>`;

module.exports.sendWhenRendered = sendWhenRendered;
module.exports.respondError = respondError;
module.exports.respond404 = respond404;
