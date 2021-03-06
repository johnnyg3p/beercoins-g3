const formatPhoneNumber = (inputValue: string) => {
    if (inputValue) {
        return inputValue
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1')
    }

    return ''
}

export default formatPhoneNumber;