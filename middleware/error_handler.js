const errorHandler = (err,req,res,next) => {
    if(err.name === ' notFound') {
        res.status(404).json({messegae: 'Not Found Brother'})
    }

}

module.exports = errorHandler;