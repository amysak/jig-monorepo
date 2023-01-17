import {
    UserOutlined,
    TeamOutlined,
    AppstoreOutlined,
    ProfileOutlined,
    DeliveredProcedureOutlined,
    LayoutOutlined,
} from '@ant-design/icons'

const navLinks = [
    {
        text: 'Dashboard',
        path: '/dashboard',
        Icon: AppstoreOutlined,
    },
    {
        text: 'Clients',
        path: '/clients',
        Icon: TeamOutlined,
    },
    {
        text: 'Jobs',
        path: '/jobs',
        Icon: DeliveredProcedureOutlined,
    },
    {
        text: 'Rooms',
        path: '/rooms',
        Icon: LayoutOutlined,
    },
    {
        text: 'Reports',
        path: '/reports',
        Icon: ProfileOutlined,
    },
    {
        text: 'Account',
        path: '/account',
        useIcon: true,
        classes: 'icon account',
        Icon: UserOutlined,
        children: [
            { text: 'Company', path: 'company' },
            { text: 'Cabinets', path: 'cabinets' },
            { text: 'Security', path: 'security' },
            { text: 'Users', path: 'users' },
            { text: 'Billing', path: 'billing' },
            { text: 'Sign out', path: 'signout' },
        ],
    },
]

export default navLinks
