const Flight = require('../models/flight')

module.exports = {
    new: newFlight,
    create,
    index
}


function newFlight(req, res) {
const newFlight = new Flight();
// Obtain the default date
const dt = newFlight.departs;
// Format the date for the value attribute of the input
let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
res.render('flights/new', { departsDate });
}

function create(req, res) {
    const flight = new Flight(req.body)
    flight.save(function(err) {
        if (err) return res.redirect('/flights/new')
        console.log(flight)
        res.redirect('/flights/new')
    })
}

function index(req, res) {
    Flight.find({}, function(err, flights) {
        console.log(flights)
        res.render('flights/index', {
            flights
        })
    })
}