import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import paths from '../constants/paths'

import { Home, Login, Products, Register, Cart, Admin } from '../containers'
import PrivateRoutes from './private-routes'

function Routes() {
    return (
        <Router>
            <Switch>
                <Route path='/login' component={Login} />
                <Route path='/cadastro' component={Register} />
                <PrivateRoutes path='/' exact component={Home} />
                <PrivateRoutes path='/produtos' component={Products} />
                <PrivateRoutes path='/carrinho' component={Cart} />

                <PrivateRoutes path={paths.Order} component={Admin} isAdmin />
                <PrivateRoutes path={paths.Products}  component={Admin} isAdmin />
                <PrivateRoutes path={paths.NewProduct}  component={Admin} isAdmin />
                <PrivateRoutes path={paths.EditProduct}  component={Admin} isAdmin />
            </Switch>        
        </Router>
    )
}

export default Routes