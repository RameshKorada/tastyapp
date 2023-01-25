import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import HomeRoute from './components/HomeRoute'
import RestaurantDetails from './components/RestaurantDetails'
import Cart from './components/Cart'
import Payment from './components/Payment'
import NotFound from './components/NotFound'
import './App.css'

/* const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]
 */
const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={HomeRoute} />
      <Route exact path="/restaurant/:id" component={RestaurantDetails} />
      <Route exact path="/Cart" component={Cart} />
      <Route exact path="/paymentsuccessed" component={Payment} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)

export default App
