const internalErr = require("../utils/InternalError");

exports.getproduct = async(req,res)=>{
    try {
        res.send("get product")
    } catch (error) {
        internalErr(res,error)
    }
}