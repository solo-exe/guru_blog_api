import { ObjectLiteral } from 'typeorm';
import config from '../config'
const messages = config().messages;

const HttpStatusCode = {
    UNAUTHORIZED: 401,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
    CONFLICT: 409,
}

export class BaseError extends Error {
    public description
    public operational
    public code
    public data

    constructor(name: string, code = 400, description: string, operational = true, data?: ObjectLiteral) {
        super(name)
        this.code = code;
        this.description = description;
        this.operational = operational;
        this.data = data
    }
}

export class NotFound extends BaseError {
    constructor(name = '', description = messages[404]) {
        super(name, HttpStatusCode.NOT_FOUND, description);
    }
}
export class Unauthorized extends BaseError {
    constructor(name = '', description = messages[401]) {
        super(name, HttpStatusCode.UNAUTHORIZED, description);
    }
}

export class Conflict extends BaseError {
    constructor(name = '', description = messages[409]) {
        super(name, HttpStatusCode.CONFLICT, description);
    }
}

export class BadRequest extends BaseError {
    constructor(name = '', description = messages[400], data?: ObjectLiteral) {
        super(name, HttpStatusCode.BAD_REQUEST, description, true, data);
    }
}

export class Forbidden extends BaseError {
    constructor(name = '', description = messages[403], data?: ObjectLiteral) {
        super(name, HttpStatusCode.FORBIDDEN, description, true, data);
    }
}

export class ServiceUnvailable extends BaseError {
    constructor(name = '', description = messages[500]) {
        super(name, HttpStatusCode.SERVICE_UNAVAILABLE, description);
    }
}

export class ServerError extends BaseError {
    constructor(name = '', description = messages[500]) {
        super(name, HttpStatusCode.INTERNAL_SERVER_ERROR, description);
    }
}