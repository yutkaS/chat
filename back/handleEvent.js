const {userHandlers} = require('./handlers/userHandlers');
const {chatHandlers} = require('./handlers/chatHandlers');

const createHandlersObj = (...handlers) => {
    const obj = {};
    handlers.forEach((e)=>{
        const keys = Object.keys(e);
        keys.forEach((key)=>{
            const newObj = {};

            newObj[key] = e[key];
            Object.assign(obj, newObj);
        })
    })
    return obj;
}


const handlers = createHandlersObj(userHandlers, chatHandlers);

module.exports.handlers = handlers

