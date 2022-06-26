const Flight = require('../models/flight')
const Ticket = require('../models/ticket')

module.exports = {
    new: newTicket,
    create,
}

function newTicket(req, res) {
    Ticket.find({}, function (err, tickets) {
        console.log(tickets)
        res.render('tickets/new', {id: req.params.id, tickets})
    })
}

function create(req, res) {
    Ticket.create(req.body, function(err, ticket) {
        res.redirect(`/flights/${req.params.id}`)
    })
}




