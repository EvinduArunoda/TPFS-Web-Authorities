module.exports = [
  {
    key: 'Tickets',
    name: 'Tickets',
    icon: 'ios-paper-outline',
    child: [
      {
        key: 'handleTickets',
        name: 'Handle Tickets',
        link: '/app/HandleOpenTickets',
        icon: 'ios-navigate-outline',
      },
      {
        key: 'ViewTickets',
        name: 'View Tickets',
        link: '/app/ViewTickets',
        icon: 'ios-menu-outline',
      },
    ]
  },
  {
    key: 'Policemen Profiles',
    name: 'Policemen',
    icon: 'ios-person-outline',
    child: [
      {
        key: 'viewPolicemanProfile',
        name: 'Policemen Profiles',
        link: '/app/PoliceMan-Profiles',
        icon: 'ios-person-outline',
      },
    ]
  },
  {
    key: 'Drivers/Vehicles',
    name: 'Drivers/Vehicles',
    icon: 'ios-car-outline',
    child: [
      {
        key: 'Driver-Profile',
        name: 'Driver Profiles',
        link: '/app/Driver-Profile',
        icon: 'ios-person-outline',
      },
      {
        key: 'Vehicle-Profile',
        name: 'Vehicle Profiles',
        link: '/app/Vehicle-Profile',
        icon: 'ios-car-outline',
      },
    ]
  },
];
