const { response, request } = require('express');

const userGet = (req = request, res = response) => {

    const query = req.query;
    res.json({ msg: 'get API -controller', query })
};

const userPost = (req, res = response) => {
    const body = req.body;
    res.json({ msg: 'post API -controller', nombre: body.nombre })
};

const userPut = (req, res = response) => {
    const id = req.params.id;
    res.json({ msg: 'put API -controller', id })
};

const userPatch = (req, res = response) => {
    res.json('patch API -controller')
};

const userDelete = (req, res = response) => {
    res.json('delete API -controller')
};


module.exports = { userGet, userPost, userPut, userPatch, userDelete };