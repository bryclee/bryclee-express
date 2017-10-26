var ejs = require('ejs');
var path = require('path');
var extend = require('util')._extend;
var promisify = require(path.join(process.cwd(), 'lib/promisify'));

var renderFilePromise = promisify(ejs.renderFile);

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

const masterTemplatePath = path.join(__dirname, 'master.ejs');

function renderMaster(data, options) {
    return renderFilePromise(
        masterTemplatePath,
        data,
        options
    );
}

var errorTemplate = `

<!doctype html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>\u2639</title>
</head>
<body>
    <div class="center">
        <div class="emoji">\uD83D\uDE2D</div>
        <p>Sorry! There's nothing here.</p>
    </div>
<style>
    body {
        background-color: #fafaff;
    }

    .center {
        position: fixed;
        left: 50%;
        top: 50%;
        text-align: center;
        -webkit-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);
    }

    .emoji {
        /* Chrome doesn't render emoji above 54px in size */
        font-size: 48px;
        -webkit-transform: rotate(0) scale(1);
                transform: rotate(0) scale(1);
        -webkit-animation: 4s ease 0s infinite wobble;
                animation: 4s ease 0s infinite wobble;
    }

    @-webkit-keyframes wobble {
        0% {
            -webkit-transform: rotate(0) scale(1);
                    transform: rotate(0) scale(1);
        }
        10% {
            -webkit-transform: rotate(-15deg) scale(1);
                    transform: rotate(-15deg) scale(1);
        }
        20% {
            -webkit-transform: rotate(20deg) scale(1.1);
                    transform: rotate(20deg) scale(1.1);
        }
        30% {
            -webkit-transform: rotate(0) scale(1);
                    transform: rotate(0) scale(1);
        }
    }
    @keyframes wobble {
        0% {
            -webkit-transform: rotate(0) scale(1);
                    transform: rotate(0) scale(1);
        }
        10% {
            -webkit-transform: rotate(-15deg) scale(1);
                    transform: rotate(-15deg) scale(1);
        }
        20% {
            -webkit-transform: rotate(20deg) scale(1.1);
                    transform: rotate(20deg) scale(1.1);
        }
        30% {
            -webkit-transform: rotate(0) scale(1);
                    transform: rotate(0) scale(1);
        }
    }

    p {
        color: #333388;
        font-size: 1.5em;
        -webkit-animation: 1s ease-in 1.5s both slide-up;
                animation: 1s ease-in 1.5s both slide-up;
    }

    @-webkit-keyframes slide-up {
        from {
            -webkit-transform: translate(0, -50%); transform: translate(0, -50%);
            opacity: 0;
        }

        to {
            -webkit-transform: translate(0, 0); transform: translate(0, 0);
            opacity: 1;
        }
    }
    @keyframes slide-up {
        from {
            -webkit-transform: translate(0, -50%); transform: translate(0, -50%);
            opacity: 0;
        }

        to {
            -webkit-transform: translate(0, 0); transform: translate(0, 0);
            opacity: 1;
        }
    }

</style>
</body>
</html>
`;

module.exports = { sendWhenRendered, respondError, respond404, renderMaster };
