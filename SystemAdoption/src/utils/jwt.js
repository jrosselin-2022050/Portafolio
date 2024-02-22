'use strict'
 import jwt from 'jsonwebtoken'
 const secretKey = '@LlaveSuperSecrcetaDeIN6AV@'


 export const generateJwt = async (payload)=>{
    try{
        return jwt.sign(payload, secretKey, {
            expiresIn: '15s',
            algorithm: 'HS256'
        })
    }catch(err){
        console.error(err)
        return err
    }

 }
