import Loadable from 'react-loadable';
import Loading from 'dan-components/Loading';

export const BlankPage = Loadable({
  loader: () => import('./Pages/BlankPage'),
  loading: Loading,
});
export const DashboardPage = Loadable({
  loader: () => import('./Pages/Dashboard'),
  loading: Loading,
});
export const Form = Loadable({
  loader: () => import('./Pages/Forms/ReduxForm'),
  loading: Loading,
});
export const Table = Loadable({
  loader: () => import('./Pages/Table/BasicTable'),
  loading: Loading,
});
export const Login = Loadable({
  loader: () => import('./Pages/Users/Login'),
  loading: Loading,
});
export const LoginDedicated = Loadable({
  loader: () => import('./Pages/Standalone/LoginDedicated'),
  loading: Loading,
});
export const Register = Loadable({
  loader: () => import('./Pages/Users/Register'),
  loading: Loading,
});
export const ResetPassword = Loadable({
  loader: () => import('./Pages/Users/ResetPassword'),
  loading: Loading,
});
export const NotFound = Loadable({
  loader: () => import('./NotFound/NotFound'),
  loading: Loading,
});
export const NotFoundDedicated = Loadable({
  loader: () => import('./Pages/Standalone/NotFoundDedicated'),
  loading: Loading,
});
export const Error = Loadable({
  loader: () => import('./Pages/Error'),
  loading: Loading,
});
export const Maintenance = Loadable({
  loader: () => import('./Pages/Maintenance'),
  loading: Loading,
});
export const ComingSoon = Loadable({
  loader: () => import('./Pages/ComingSoon'),
  loading: Loading,
});
export const Parent = Loadable({
  loader: () => import('./Parent'),
  loading: Loading,
});
export const LoginPage = Loadable({
  loader: () => import('./Login'),
  loading: Loading,
});
export const RegisterPoliceman = Loadable({
  loader: () => import('./RegisterPoliceman'),
  loading: Loading,
});
export const RegisterPoliceStation = Loadable({
  loader: () => import('./RegisterPoliceStation'),
  loading: Loading,
});
export const RegisterDrivers = Loadable({
  loader: () => import('./RegisterDrivers'),
  loading: Loading,
});
export const RegisterVehicles = Loadable({
  loader: () => import('./RegisterVehicles'),
  loading: Loading,
});
export const HandleComplaints = Loadable({
  loader: () => import('./HandleComplaints'),
  loading: Loading,
});
