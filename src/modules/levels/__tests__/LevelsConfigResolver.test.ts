import { resolveLevelRole } from '../LevelsConfigResolver';

describe('resolveLevelRole', () => {
    test('null config returns null role and empty list', () => {
        expect(resolveLevelRole(null, 5)).toEqual({ roleId: null, allRoleIds: [] });
    });

    test('missing roles key', () => {
        expect(resolveLevelRole({}, 5)).toEqual({ roleId: null, allRoleIds: [] });
    });

    test('role found for level (order agnostic allRoleIds)', () => {
        const config = { roles: { '2': 'role-two', '5': 'role-five' } };
        const res = resolveLevelRole(config, 5);
        expect(res.roleId).toBe('role-five');
        expect(new Set(res.allRoleIds)).toEqual(new Set(['role-two', 'role-five']));
    });

    test('role not found for requested level', () => {
        const config = { roles: { '1': 'role-one' } };
        expect(resolveLevelRole(config, 2)).toEqual({ roleId: null, allRoleIds: ['role-one'] });
    });

    test('filters falsy role ids', () => {
        const config: any = { roles: { '1': 'role-one', '2': '', '3': null } };
        expect(resolveLevelRole(config, 3)).toEqual({ roleId: null, allRoleIds: ['role-one'] });
    });
});
