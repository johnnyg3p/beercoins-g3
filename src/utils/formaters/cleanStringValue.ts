const cleanStringValue = (stringValue: string) => {
    return stringValue.replace(/\D/g, '')
}

export default cleanStringValue;