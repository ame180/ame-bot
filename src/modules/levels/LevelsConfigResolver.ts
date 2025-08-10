export const LevelsConfigName = 'levels';

export type LevelsConfig = {
    roles?: { [level: string]: string }
}

export function resolveLevelRole(config: LevelsConfig | null, level: number): { roleId: string | null, allRoleIds: string[] } {
    if (!config || !config.roles) return { roleId: null, allRoleIds: [] };
    const map = config.roles;
    const roleId = map[String(level)] || null;
    const allRoleIds = Object.values(map).filter(Boolean);

    return { roleId, allRoleIds };
}
