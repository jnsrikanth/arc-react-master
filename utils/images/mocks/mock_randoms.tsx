export const random = (min, max) => {
    const rand = min + Math.random() * (max - min);
    return rand;
}