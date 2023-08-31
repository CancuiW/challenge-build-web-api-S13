const express = require('express')
const Actions = require('./actions-model')
const { checkActionId, checkActionBody } = require('./actions-middlware')
const router = express.Router()

router.get('/', (req, res, next) => {
    Actions.get()
        .then(action => {
            res.status(200).json(action)
        })
        .catch(next)


})

router.get('/:id', checkActionId, (req, res) => {
    res.status(200).json(req.action)


})
//const actionNew = { project_id: 2, description: 'm', notes: 'n', completed: false }
router.post('/', checkActionBody, async(req, res, next) => {
    try{
        const newAction = await Actions.insert(req.body)
        if (!newAction){
            res.status(404).json({message:'you need a related project id'})
        }else{
            res.status(201).json(newAction)
        }

    }catch(err){
        next(err)
    }

    


})

router.put('/:id', checkActionId, checkActionBody, async (req, res, next) => {
    try {
        const changes = req.body;
        if (!changes.completed) {
            if (!('completed' in changes)) {
                res.status(400).json({ message: 'Missing "completed" attribute' });
            }
            changes.completed = false; // Set completed to false if not provided in the request body
        }

        await Actions.update(req.params.id, changes);

        const updatedAction = await Actions.get(req.params.id);
        res.status(200).json(updatedAction);

    } catch (err) {
        next(err);
    }
});

router.delete('/:id', checkActionId, (req, res, next) => {
    Actions.remove(req.params.id)
        .then(() => {
            res.status(200).json({ message: 'The action has been nuked' })
        })
        .catch(next)


})


















router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message
    })
})


module.exports = router

