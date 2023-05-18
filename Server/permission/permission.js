const createError = require('http-errors')

exports.permission = function (role) {
   
    return (req, res, next) => {
        try {
            if(req.payload.userRole != role) {
                next(createError.Unauthorized())
            } else {
                next();
            }
        } catch(e) {
            console.error(e);
            next(createError.InternalServerError())
        }
    }
}
exports.multipleRolePermission = (roles) => {
    return (req, res, next) => {
        try {
            if(!roles.includes(req.payload.userRole)) {
                next(createError.Unauthorized())
            } else {
                next();
            }
        } catch(e) {
            console.error(e);
            next(createError.InternalServerError())
        }
    }
}