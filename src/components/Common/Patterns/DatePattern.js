export const dateFormat = (data) => {
    const date = new Date(data);
    const rrrr = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const gg = String(date.getHours()).padStart(2, '0');
    const mi = String(date.getMinutes()).padStart(2, '0');
    return `${gg}:${mi} ${dd}-${mm}-${rrrr} `;
}