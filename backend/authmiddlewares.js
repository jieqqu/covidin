/*const authCase = (permissions) => {
    return (request, response, next) => {
        const office = request.body.office_code;
        if (permissions.includes(office)) {
            next();
        } else {
            return response.status(404).json("您沒有權限");
        }
    }
};*/

const auth = (permissions) => {
    return (request, response, next) => {
        const office = request.session.office_code;
        if (permissions.includes(office)) {
            next();
        } else {
            return response.status(401).json({ 'authCase': false });
        }
    }
}

const authPsychology = (permissions) => {
    return (request, response, next) => {
        const office = request.session.office_code;
        if (permissions.includes(office)) {
            next();
        } else {
            return response.status(401).json({ 'authPsychology': false });
        }
    }
}


module.exports = { auth,authPsychology };
