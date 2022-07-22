export const menuItems = [
    {
        id: 1,
        label: "menuitems.menu.text",
        isTitle: true
    },
    {
        id: 2,
        label: 'menuitems.dashboard.text',
        icon: 'ri-dashboard-line',
        link: '/'
    },
    {
        id: 3,
        label: 'menuitems.administrator.text',
        icon: 'ri-dashboard-line',
        link: '/administrator'
    },

    {
        id: 18,
        isLayout: true
    },
    {
        id: 37,
        label: 'menuitems.uielements.text',
        icon: 'ri-pencil-ruler-2-line',
        subItems: [
            {
                id: 38,
                label: 'menuitems.uielements.list.alerts',
                link: '/ui/alerts'
            },
            {
                id: 39,
                label: 'menuitems.uielements.list.buttons',
                link: '/ui/buttons'
            },
            {
                id: 40,
                label: 'menuitems.uielements.list.cards',
                link: '/ui/cards'
            },
            {
                id: 41,
                label: 'menuitems.uielements.list.carousel',
                link: '/ui/carousel'
            },
            {
                id: 42,
                label: 'menuitems.uielements.list.dropdowns',
                link: '/ui/dropdowns'
            },
            {
                id: 43,
                label: 'menuitems.uielements.list.grid',
                link: '/ui/grid'
            },
            {
                id: 44,
                label: 'menuitems.uielements.list.images',
                link: '/ui/images'
            },
            {
                id: 45,
                label: 'menuitems.uielements.list.lightbox',
                link: '/ui/lightbox'
            }, {
                id: 46,
                label: 'menuitems.uielements.list.modals',
                link: '/ui/modals'
            }, {
                id: 47,
                label: 'menuitems.uielements.list.rangeslider',
                link: '/ui/rangeslider'
            }, {
                id: 48,
                label: 'menuitems.uielements.list.sessiontimeout',
                link: '/ui/session-timeout'
            },
            {
                id: 49,
                label: 'menuitems.uielements.list.progressbar',
                link: '/ui/progressbar'
            }, {
                id: 50,
                label: 'menuitems.uielements.list.sweetalert',
                link: '/ui/sweet-alert'
            }, {
                id: 51,
                label: 'menuitems.uielements.list.tabs',
                link: '/ui/tabs-accordion'
            }, {
                id: 52,
                label: 'menuitems.uielements.list.typography',
                link: '/ui/typography'
            }, {
                id: 53,
                label: 'menuitems.uielements.list.video',
                link: '/ui/video'
            }, {
                id: 54,
                label: 'menuitems.uielements.list.general',
                link: '/ui/general'
            }, {
                id: 55,
                label: 'menuitems.uielements.list.rating',
                link: '/ui/rating'
            }, {
                id: 56,
                label: 'menuitems.uielements.list.notifications',
                link: '/ui/notification'
            }
        ]
    },
    {
        id: 57,
        label: 'menuitems.forms.text',
        icon: 'ri-eraser-fill',
        badge: {
            variant: 'danger',
            text: 'menuitems.forms.badge'
        },
        subItems: [
            {
                id: 58,
                label: 'menuitems.forms.list.elements',
                link: '/form/elements'
            },
            {
                id: 59,
                label: 'menuitems.forms.list.validation',
                link: '/form/validation'
            },
            {
                id: 60,
                label: 'menuitems.forms.list.advanced',
                link: '/form/advanced'
            },
            {
                id: 61,
                label: 'menuitems.forms.list.editor',
                link: '/form/editor'
            },
            {
                id: 62,
                label: 'menuitems.forms.list.fileupload',
                link: '/form/uploads'
            },
            {
                id: 63,
                label: 'menuitems.forms.list.wizard',
                link: '/form/wizard'
            },
            {
                id: 64,
                label: 'menuitems.forms.list.mask',
                link: '/form/mask'
            }
        ]
    },
    {
        id: 65,
        label: 'menuitems.tables.text',
        icon: 'ri-table-2',
        subItems: [
            {
                id: 66,
                label: 'menuitems.tables.list.basic',
                link: '/tables/basic'
            },
            {
                id: 67,
                label: 'menuitems.tables.list.advanced',
                link: '/tables/advanced'
            },
            // {
            //     id: 68,
            //     label: 'Responsive Table',
            //     link: ''
            // },
        ]
    },
    {
        id: 74,
        label: "menuitems.icons.text",
        icon: 'ri-brush-line',
        subItems: [
            {
                id: 75,
                label: 'menuitems.icons.list.remix',
                link: '/icons/remix'
            },
            {
                id: 76,
                label: "menuitems.icons.list.materialdesign",
                link: '/icons/material-design'
            },
            {
                id: 77,
                label: "menuitems.icons.list.dripicons",
                link: '/icons/dripicons'
            },
            {
                id: 78,
                label: "menuitems.icons.list.fontawesome",
                link: '/icons/font-awesome'
            }
        ]
    },
]