
export const guessFirstName = (email : string) : string => {
    try {
        if(!email) return ''
        const name = email.split('@')[0]?.split('.')[0]
        if (/^[a-zA-ZäöüÄÖÜß]{1,15}$/.test(name)) {
            const firstLetter = name.slice(0, 1)
            return firstLetter.toUpperCase() + name.slice(1).toLowerCase()
        }
    } catch (error) {
        return ''
    }
    return ''
}

export const guessLastName = (email : string) : string => {
    try {
        if(!email) return ''
        const name = email.split('@')[0]?.split('.')[1]
        if (/^[a-zA-ZäöüÄÖÜß]{1,15}$/.test(name)) {
            const firstLetter = name.slice(0, 1)
            return firstLetter.toUpperCase() + name.slice(1).toLowerCase()
        }
    } catch (error) {
        return ''
    }
    return ''
}