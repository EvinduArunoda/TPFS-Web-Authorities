module.exports = [
  {
    key: 'PoliceMen',
    name: 'PoliceMen',
    icon: 'ios-star-outline',
    child: [
      {
        key: 'Register-Policeman',
        name: 'Register Policeman',
        link: '/app/RegisterPolicemen',
        icon: 'ios-star-outline',
      },
      {
        key: 'PoliceMen-Profiles',
        name: 'PoliceMen Profiles',
        link: '/app/Policeman-Profile',
        icon: 'ios-notifications-outline',
      },
    ]
  },
  {
    key: 'Police Stations',
    name: 'Police Stations',
    icon: 'ios-home-outline',
    child: [
      {
        key: 'Register-Police-Station',
        name: 'Register Police Stations',
        link: '/app/RegisterPoliceStation',
        icon: 'ios-home-outline',
      },
      {
        key: 'PoliceStation-Profiles',
        name: 'Police Station Profiles',
        link: '/app/PoliceStationProfile',
        icon: 'ios-notifications-outline',
      },
    ]
  },
  {
    key: 'Drivers',
    name: 'Drivers',
    icon: 'ios-person-outline',
    child: [
      {
        key: 'Register-Driver',
        name: 'Register Drivers',
        link: '/app/RegisterDrivers',
        icon: 'ios-person-outline',
      },
      {
        key: 'DriverProfiles',
        name: 'Driver Profiles',
        link: '/app/Driver-Profile',
        icon: 'ios-person-outline',
      },
    ]
  },
  {
    key: 'Vehicles',
    name: 'Vehicles',
    icon: 'ios-car-outline',
    child: [
      {
        key: 'Register-Vehicles',
        name: 'Register Vehicles',
        link: '/app/RegisterVehicles',
        icon: 'ios-car-outline',
      },
      {
        key: 'VehicleProfiles',
        name: 'Vehicle Profiles',
        link: '/app/Vehicle-Profile',
        icon: 'ios-notifications-outline',
      },
    ]
  },
  {
    key: 'Complaints',
    name: 'Complaints',
    icon: 'ios-notifications-outline',
    child: [
      {
        key: 'View-Complaints',
        name: 'View Complaints',
        link: '/app/HandleComplaints',
        icon: 'ios-notifications-outline',
      },
    ]
  }, {
    key: 'Regional Rules',
    name: 'Regional Rules',
    icon: 'ios-map-outline',
    child: [
      {
        key: 'Manage-Regional-Rules',
        name: 'Manage Regional Rules',
        link: '/app/Regional-Rules',
        icon: 'ios-notifications-outline',
      },
      {
        key: 'Regional-Rules',
        name: 'Regional Rules',
        link: '/app/Manage-Rules',
        icon: 'ios-notifications-outline',
      },
    ]
  },
  {
    key: 'Tickets',
    name: 'Tickets',
    icon: 'ios-paper-outline',
    child: [
      {
        key: 'ViewTickets',
        name: 'View Tickets',
        link: '/app/ViewTickets',
        icon: 'ios-menu-outline',
      },
    ]
  },
  {
    key: 'Account Settings',
    name: 'Account Settings',
    icon: 'ios-map-outline',
    child: [
      {
        key: 'Change-Password',
        name: 'Change Password',
        link: '/app/Change-Password',
        icon: 'ios-notifications-outline',
      },
    ]
  },
];
