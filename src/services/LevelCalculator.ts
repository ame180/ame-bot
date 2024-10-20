const levelOneXp = 100;

export function calculateLevel(xp: number): { level: number, xpLeft: number, xpNeeded: number } {
    let level = 0;
    let xpNeeded = levelOneXp;
    while (xp >= xpNeeded) {
        level++;
        xp -= xpNeeded;
        xpNeeded = 5 * Math.pow(level, 2) + (50 * level) + levelOneXp;
    }

    return { level, xpLeft: xp, xpNeeded };
}