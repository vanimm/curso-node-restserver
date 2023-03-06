const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcrytjs = require('bcryptjs');

const userGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    // const usuarios = await Usuario.find(query).skip(desde).limit(Number(limite));
    // const total = await Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([Usuario.countDocuments(query),
    Usuario.find(query).skip(desde).limit(Number(limite))])
    res.json({ total, usuarios });
};

const userPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // encriptar la contraseña
    const salt = bcrytjs.genSaltSync();
    usuario.password = bcrytjs.hashSync(password, salt);
    // guardar en la bd

    await usuario.save();

    res.json({ usuario });
};

const userPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // validar id con la bd
    if (password) {
        // encriptar la contraseña
        const salt = bcrytjs.genSaltSync();
        resto.password = bcrytjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json(usuario)
};

const userPatch = (req, res = response) => {
    res.json('patch API -controller')
};

const userDelete = async (req, res = response) => {
    const { id } = req.params;
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json(usuario)
};


module.exports = { userGet, userPost, userPut, userPatch, userDelete };