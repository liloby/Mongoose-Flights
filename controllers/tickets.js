const Flight = require('../models/flight')
const Ticket = require('../models/ticket')

module.exports = {
    new: newTicket,
    create,
    delete: deleteOne
}

function newTicket(req, res) {
    res.render('tickets/new', {id: req.params.id})
}

function create(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        req.body.flight = flight._id
        let ticket = new Ticket(req.body)
        ticket.save(function(err) {
            res.redirect(`/flights/${req.params.id}`)
        })
    })
}

function deleteOne() {
    Ticket.findById(req.params.id, function(err, ticket) {
        ticket.remove(req.body)
        res.redirect(`/flights/${req.params.flightId}`)
    })
}


