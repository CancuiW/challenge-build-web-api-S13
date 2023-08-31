const Projects = require('./projects-model')

async function checkProjectId(req,res,next){
    try{
        const project=await Projects.get(req.params.id)
        if(project){
            req.project=project
            next()
        }else{
            next({status:404,message:'project not found'})
        }

    }catch(err){
        next(err)
    }

}

function checkProjectBody(req, res, next) {
    
    const {name,description}=req.body
   
    if(name==undefined||
        typeof name!=='string'||
        !name.trim().length){
        next({ status: 400, message: 'project needs a name' })
    } else if (description == undefined ||
        typeof description !== 'string' ||
        !description.trim().length){
        next({ status: 400, message: 'project needs a description' })
    }else{
            req.name = name.trim()
            req.description = description.trim()
        
            next()
        }
    
        

}








module.exports={
    checkProjectId,
    checkProjectBody
}

