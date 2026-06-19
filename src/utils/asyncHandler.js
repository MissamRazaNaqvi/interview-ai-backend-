const asyncHandler = (requestHandler) =>{
    return (req, res, next)=>{
        Promise.resolve(requestHandler(req, res, next))
        .catch((error)=>{
             next(error)
        })
    }
}

// const asyncHandler1 = () => {}
// const asyncHandler1 = (func) => {()=>{}}

// const asyncHandler1 = (func) => async (req, res, next)=>{
//     try {
//         await func(req,res,next)
//     } catch (error) {
//         res.status(error.code || 400).json({
//             success:false,
//             message:error.message
//         })
//     }
// }

export {asyncHandler}
