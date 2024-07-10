export const cleanPhoneNumber = (phone: any): string | null => {
    try {
        const ext = "234"
        if (phone.indexOf(ext) === 0 && phone.length > 11) {
            phone = phone.substr(ext.length);
        }
        if (phone.indexOf("0") === 0) phone = phone.substr(1);
        if (isNaN(Number(phone)) || phone.length !== 10) {
            return null;
        }
        return "234" + phone;
    } catch {
        return null
    }
}

export const isValidEmail = (email: string) => {
    // Regular expression pattern for basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email matches the pattern
    return emailPattern.test(email);
}
