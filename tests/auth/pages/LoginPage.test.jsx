import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { fireEvent,  render, screen } from "@testing-library/react"

import { LoginPage } from "../../../src/auth/pages"
import { authSlice, startGoogleSignIn } from "../../../src/stroe/auth"
import { notAuthenticatedState } from "../../fixtures/authFixtures"

const mockStartGoogleSignIn = jest.fn()
const mockStartLoginWithEmailPassword = jest.fn()

jest.mock('../../../src/stroe/auth/thunks', () => (
        {
            ...jest.requireActual('../../../src/stroe/auth/thunks'),
            startGoogleSignIn: () =>  mockStartGoogleSignIn,
            startLoginWithEmailPassword: ({email, password}) => {
                return () => mockStartLoginWithEmailPassword({email, password})
            }
        }
    ))
jest.mock('react-redux', () => (
        {
            ...jest.requireActual('react-redux'),
            useDispatch: () => (fn) => fn()
        }
    ))

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState:{
        auth: notAuthenticatedState
    }
})


describe('Pruebas en LoginPage', () => { 

    beforeEach( () => jest.clearAllMocks())

    test('debe de mostrar el componente correctamente', () => { 

        render( 
            <Provider store={ store } >
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );

        expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1);

     });

     test('botón de google debe de llamar el startGoogleSignIn', () => { 

        render( 
            <Provider store={ store } >
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );

        const btnGoogle = screen.getByLabelText('btn-google');
        
        fireEvent.click( btnGoogle );

        expect( mockStartGoogleSignIn ).toHaveBeenCalled();


      });

     test('submit debe de llamar el startLoginWithEmailPassword', () => { 

        const email = 'pepe@gmail.com'
        const password = '123456'

        render( 
            <Provider store={ store } >
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );

        const emailField = screen.getByRole('textbox', { name: 'Correo'})
        fireEvent.change( emailField, { target: { name: 'email', value: email} })
        
        const passwordField = screen.getByLabelText('password')
        fireEvent.change( passwordField, { target: { name: 'password', value: password} })

        const loginForm = screen.getByLabelText('submit-form')
        fireEvent.submit( loginForm )

        expect( mockStartLoginWithEmailPassword ).toHaveBeenCalledWith({ email, password })

      });




 })