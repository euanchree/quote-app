// Imports
import { Outlet } from "react-router-dom";
import { useState, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getAuthBool } from '../reduxslice'
import QuotesMenu from "../quotes";

// Function to create the root component of the web app
export default function Root() {  
  let loginDisplay = <a href={'/login'}>Login</a>
  
  if (useSelector(getAuthBool)) {
    loginDisplay = <a href={'/logoff'}>Logoff</a>
  }

  // Returning the component
  return (
      <>
        <div class="hero is-primary is-small">
          <div class="hero-body">
          <h1 class="title">Quotzee</h1>
          <h2 class="title">Simple and easy to use quote management website</h2>
          </div>
        </div>

        <div class="columns is-one-quarter">
        <div class="column is-one-quarter login-menu">
            <p class="title is-3">Account Menu</p>
            <div>
                {loginDisplay}
            </div>
            <div>
              <a href={'/signup'}>Sign up</a>
            </div>
        
          <div class="column" id="detail">
              <Outlet />
          </div>
        </div>
        <div class="column quotes-menu">
          {QuotesMenu()}
        </div>
        </div>
        <footer class="footer">
          <div class="content has-text-centered">
            Euan Chree
            1912490
          </div>
        </footer>

      </>
    );
}

