// eslint-disable-next-line
export default formatPrice => {
    const formatNumber = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumSignificantDigits: 1 })
    return formatNumber.format(formatPrice)
}