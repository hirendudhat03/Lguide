import Welcome from '../screens/Welcome/Welcome';
import Login from '../screens/Login/Login';
import Signup from '../screens/Signup/Signup';
import IntroScreen from '../screens/IntroScreen/IntroScreen';
import Home from '../screens/Home/Home';
import DrawerNavigation from './DrawerNavigation';
import AddNewReport from '../screens/Report/AddNewReport';
import Filters from '../screens/Filter/Filters';
import Notification from '../screens/Notification/Notification';
import LocationAutoComplete from '../screens/LocationAutoComplete/LocationAutoComplete';
import Direction from '../screens/Direction/Direction';

export const authRoute = [
  {
    name: 'Welcome',
    component: Welcome,
  },
  {
    name: 'Login',
    component: Login,
  },
  {
    name: 'Signup',
    component: Signup,
  },
  {
    name: 'IntroScreen',
    component: IntroScreen,
  },
  {
    name: 'DrawerNavigation',
    component: DrawerNavigation,
  },
];

export const AppRoute = [
  {
    name: 'Home',
    component: Home,
  },
  {
    name: 'AddReport',
    component: AddNewReport,
  },
  {
    name: 'Filter',
    component: Filters,
  },
  {
    name: 'Direction',
    component: Direction,
  },
  {
    name: 'Notification',
    component: Notification,
  },
  {
    name: 'LocationAutoComplete',
    component: LocationAutoComplete
  }
];
