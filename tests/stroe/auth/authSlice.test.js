import { authSlice, chekingCredencials, login, logout } from "../../../src/stroe/auth/authSlices"
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures";

describe('Pruebas en authSlices', () => { 

    test('Debe de regresar el estado inicial y llamarse auth', () => { 

        const state = authSlice.reducer( initialState, {});
        const {name} = authSlice;
        
        
        expect( state ).toEqual( initialState );
        expect( name ).toBe('auth');
        
     });

     test('Debe  de realizar la autenticación', () => { 

        const state = authSlice.reducer( initialState, login( demoUser ));
        
        expect( state ).toEqual({
            status: 'authenticated', // 'checking', 'not-authenticated', 'authenticated'.
            uid: expect.any(String),
            email: expect.any(String),
            displayName: expect.any(String),
            photoURL: expect.any(String),
            errorMessage: null,
        })

      });

      test('Debe de realizar el logout sin argumentos', () => { 

        const state = authSlice.reducer( authenticatedState, logout() );
        
        
        expect( state ).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: null,
        })
        

       });

      test('Debe de realizar el logout y mostrar un mensaje de error', () => { 

        const errorMessage = 'Credenciales no son correctas';

        const state = authSlice.reducer( authenticatedState, logout({errorMessage}) );
         
        
        expect( state ).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage,
        })
       });

       test('Debe de cambiar el estado a checking', () => {

        const state = authSlice.reducer( notAuthenticatedState, chekingCredencials() );

        
        expect( state ).toEqual({
            status: 'checking',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: null,
        })


       })

 })