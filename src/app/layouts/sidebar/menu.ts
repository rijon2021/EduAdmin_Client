import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENU',
        isTitle: true
    },
    {
        id: 2,
        label: 'Dashboard',
        icon: 'bx-home-circle',
        link: '/feature/dashboard',
    },
    {
        id: 3,
        icon: 'bx-user',
        label: 'User',
        subItems: [
            {
                id: 331,
                label: 'User Create',
                link: '/settings/user/user-create/0',
                parentId: 31
            },
            {
                id: 332,
                label: 'User List',
                link: '/settings/user/user-list',
                parentId: 32
            }
        ]
    },
    {
        id: 3,
        icon: 'bx-cog',
        label: 'Setup',
        subItems: [
            {
                id: 441,
                label: 'Permission',
                link: '/settings/permission',
                parentId: 41
            },
            {
                id: 442,
                label: 'User Level',
                link: '/settings/user-Level',
                parentId: 41
            }
        ]
    },

];

