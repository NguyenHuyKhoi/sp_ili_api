const {create, detail, edit, deletee } = require("./service")


const createController = async (req, res, next) => {
    const result = await create({
        userId: req.user._id,
        item: req.body
    })
    return res.status(result.error != undefined ? 500 : 200).json(result)
}

const editController = async (req, res, next) => {
    const result = await edit({
        userId: req.user._id,
        _id: req.params.id,
        item: req.body
    })
    return res.status(result.error != undefined ? 500 : 200).json(result)
}

const detailController = async (req, res, next) => {
    const result = await detail({
        userId: req.user._id,
        _id: req.params.id
    })
    return res.status(result.error != undefined ? 500 : 200).json(result)
}

const deleteController = async (req, res, next) => {
    const result = await deletee({
        userId: req.user._id,
        _id: req.params.id
    })
    return res.status(result.error != undefined ? 500 : 200).json(result)
}


module.exports = {
    createController,
    editController,
    detailController,
    deleteController
}