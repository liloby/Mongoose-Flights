const Flight = require("../models/flight");
const Ticket = require("../models/ticket");

module.exports = {
  new: newTicket,
  create,
  delete: deleteTicket,
};

function newTicket(req, res) {
  res.render("tickets/new", { id: req.params.id });
}

function create(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    console.log(req.body);
    req.body.flight = flight._id;
    let ticket = new Ticket(req.body);
    ticket.save(function (err) {
      res.redirect(`/flights/${req.params.id}`);
    });
  });
}

function deleteTicket(req, res) {
  Ticket.findById(req.params.id, function (err, ticket) {
    ticket.remove(req.params.id);
    ticket.save(function (err) {});
    res.redirect(`/flights`);
  });
}
