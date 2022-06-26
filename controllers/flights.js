const Flight = require('../models/flight')
const Ticket = require('../models/ticket')

module.exports = {
    new: newFlight,
    create,
    index,
    show
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
        res.redirect('/flights/new')
    })
}

function index(req, res) {
    Flight.find({}, function(err, flights) {
        flights = flights.sort(function(a, b) {
            return a.departs - b.departs
        })
        res.render('flights/index', {
            flights
        })
    })
}

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        const selectedAirports = []
        for (let i =0; i < flight.destinations.length; i++) {
            selectedAirports.push(flight.destinations[i].airport)
        }
        Ticket.find({flight: flight._id}, function(err, tickets) {
            tickets.forEach(function(ticket) {
            })
            res.render('flights/show', {title: 'Flight Details', flight, selectedAirports, tickets})
        })
    })
}