//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here


router.get('/service', function (req, res) {
    req.session.data = {};

    res.render('service/index');
});



router.post('/service/q1', function (req, res) {

    const { tripNumber, pupilNumber } = req.body;
    var errors = [];

    if (tripNumber === '') {
        errors.push({
            field: 'tripNumber',
            message: 'Information is missing'
        });
    }

    if (pupilNumber === '') {
        errors.push({
            field: 'pupilNumber',
            message: 'Information is missing'
        });
    }

    if (pupilNumber !== '') {

        const pupilPattern = /^\d{4}[A-Za-z]{2}$/;

        if (!pupilPattern.test(pupilNumber)) {
            errors.push({
                field: 'pupilNumber',
                message: 'Pupil number must be a string of 4 numbers followed by 2 letters.'
            });
        }
    }


    if (errors.length > 0) {

        return res.render('service/q1', { errors, data: req.session.data });
    }



    return res.redirect('/service/q2');

});



router.post('/service/q2', function (req, res) {


    const { permission } = req.body;
    var errors = [];

    console.log(permission)

    if (permission === undefined) {
        errors.push({
            field: 'permission',
            message: 'Select an option'
        });
    }

    if (errors.length > 0) {
        return res.render('service/q2', { errors, data: req.session.data });
    }


    if (req.body['permission'] === 'Yes') {
        return res.redirect('/service/q3');
    } else {
        return res.redirect('/service/end');
    }
});

router.post('/service/q3', function (req, res) {

    const { contactName, phone } = req.body;
    var errors = [];

    if (contactName === '') {
        errors.push({
            field: 'contactName',
            message: 'Enter a name'
        });
    }

    if (phone === '') {
        errors.push({
            field: 'phone',
            message: 'Enter a phone number'
        });
    }

    if (errors.length > 0) {
        return res.render('service/q3', { errors, data: req.session.data });
    }

    return res.redirect('/service/q4');

});

router.post('/service/q4', function (req, res) {

    res.redirect('/service/q5');

});

router.post('/service/q5', function (req, res) {

    // Redirect to the next page in the service
    res.redirect('/service/q6');
});

router.post('/service/q6', function (req, res) {

    // Redirect to the next page in the service
    res.redirect('/service/submitted');
});

