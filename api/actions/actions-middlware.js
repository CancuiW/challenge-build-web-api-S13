const Actions = require('./actions-model')

async function checkActionId(req, res, next) {
    try {
        const action = await Actions.get(req.params.id)
        if (action) {
            req.action = action
            next()
        } else {
            next({ status: 404, message: 'action not found' })
        }

    } catch (err) {
        next(err)
    }

}

function checkActionBody(req, res, next) {

    const { notes, description } = req.body

    if (notes == undefined ||
        typeof notes !== 'string' ||
        !notes.trim().length) {
        next({ status: 400, message: 'project needs  notes ' })
    } else if (description == undefined ||
        typeof description !== 'string' ||
        !description.trim().length) {
        next({ status: 400, message: 'project needs a description' })
    } else {
        req.name = notes.trim()
        req.description = description.trim()

        next()
    }



}








module.exports = {
    checkActionId,
    checkActionBody
}


