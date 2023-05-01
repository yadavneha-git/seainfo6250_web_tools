export const SERVER = {
    AUTH_MISSING: 'auth-missing',
    AUTH_INSUFFICIENT: 'auth-insufficient',
    REQUIRED_USERNAME: 'required-username',
    REQUIRED_MESSAGE: 'required-message',
};

export const CLIENT = {
    NETWORK_ERROR: 'networkError',
    NO_SESSION: 'noSession',
    TIMEOUT_USERS: 5000,
    TIMEOUT_MESSAGES: 3000,
};

export const ERROR_MESSAGES = {
    [CLIENT.NETWORK_ERROR]: "Server unavailable, please try again",
    [SERVER.REQUIRED_USERNAME]: "Invalid Username. Valid username is non-empty and only contains letters and numbers",
    [SERVER.AUTH_INSUFFICIENT]: "Username cannot be dog",
    [SERVER.REQUIRED_MESSAGE]: "Chat message cannot be empty",
    default: "Something went wrong, please try again",
};
