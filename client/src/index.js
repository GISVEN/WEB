import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserStore from "./store/UserStore";
import DeviceStore from './store/DeviceStore';
import Basket from "./pages/Basket";
import BasketStore from "./store/BasketStore";

export const Context = createContext(null)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <Context.Provider value={{
            user: new UserStore(),
            basket: new BasketStore(),
            device: new DeviceStore()
        }}>
            <App />
        </Context.Provider>,

);

reportWebVitals();
