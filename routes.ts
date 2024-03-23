/**
 * An array of routes that are accessible to the public
 * These routes requires authentication
 * @type {string[]}
 */

export const loggedOutRoutes = [
    "/settings",
    "/account/login",
    "/account/register"
]

/**
 * An array of routes that are used for authentication
 * These routes will redirect to /settings
 * @type {string[]}
 */
export const authRoutes = [
    "/settings",
    "/account",
    "/inventory/add-car",
    "/inventory/edit-car",
]

export const apiAuthPrefix = "/api/auth"

/**
 * The route where the user will be redirected after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/account"