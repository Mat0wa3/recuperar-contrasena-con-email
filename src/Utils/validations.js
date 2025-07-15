export class Validations {
    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) throw new Error("Email does not have the correct format (e.g. example@mail.com)")
    }

    static validatePassword(password) {
        if (password.length < 6) throw new Error("Password must be at least 6 characters long")
    }

    static validateName(name) {
        if (name.length <  3) throw new Error("Name must be at least 3 characters long")
    }
}