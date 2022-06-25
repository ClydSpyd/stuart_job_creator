export const normalize = input => input?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
