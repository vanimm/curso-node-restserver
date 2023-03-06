const { Router } = require('express');
const { check } = require('express-validator');
const { userGet, userPost, userPut, userPatch, userDelete } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, usuarioExiste } = require('../helpers/db-validators');

const router = Router();

router.get('/', userGet);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(usuarioExiste),
    check('rol').custom(esRoleValido),
    validarCampos
], userPut);

router.post('/', [
    // validaciones
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('password', 'el password debe tener mas de 6 digitos').isLength({ min: 6 }),
    check('correo', 'el correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    check('rol').custom(esRoleValido),
    validarCampos
], userPost);

router.patch('/', userPatch);

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( usuarioExiste ),
    validarCampos
],userDelete );

module.exports = router;