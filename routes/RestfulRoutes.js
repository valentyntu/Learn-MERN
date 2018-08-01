const express = require('express')

function RestfulRoutes(router, controller) {
    var self = {
        read,
        write,
        crud
    };

    function read(...middleware) {
        router.get('/', middleware, function (req, res) {
            controller.find()
                .then(models => res.json(models))
                .catch(err => res.status(500).json({error: err}))
        });

        router.get('/:id', middleware, function (req, res) {
            controller.findById(req.params.id)
                .then(m => res.json(m))
                .catch(err => res.status(500).json({error: err}))
        });

        return self
    }

    function write(...middleware) {
        router.post('/', middleware, function (req, res) {
            controller.create(req.body)
                .then(m => res.json(m))
                .catch(err => res.status(500).json({error: err}))
        });

        router.patch('/:id', middleware, function (req, res) {
            controller.updateById(req.params.id, req.body)
                .then(m => res.json(m))
                .catch(err => res.status(500).json({error: err}))
        });

        router.delete('/:id', middleware, function (req, res) {
            controller.removeById(req.params.id)
                .then(m => res.status(204).json('OK'))
                .catch(err => res.status(500).json({error: err}))
        });

        return self
    }

    function crud(...middleware) {
        return self
            .read(...middleware)
            .write(...middleware)
    }

    return self
}

module.exports = RestfulRoutes