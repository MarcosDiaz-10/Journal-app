
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../../src/firebase/providers";
import { chekingCredencials, login, logout } from "../../../src/stroe/auth/authSlices";
import { chekingAuthentication, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/stroe/auth/thunks"
import { clearNotesLogout } from "../../../src/stroe/journal";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../src/firebase/providers');


describe('Pruebas en authThunks', () => { 
    const loginDataTrue = { ok: true, ...demoUser };
    const loginDataFalse = { ok: false, errorMessage: 'Un Error ' };
    const dispatch = jest.fn();
    beforeEach(() => jest.clearAllMocks());

    test('debe de invocar el checkingCredentials',async() => { 
        
        await chekingAuthentication()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(chekingCredencials());
        

     });

    test('startGoogleSignIn debe de llamar checkingCredentials y login - éxito',async() => { 
        
        const loginData = { ...loginDataTrue }
        
        await singInWithGoogle.mockResolvedValue( loginData );

        await startGoogleSignIn()(dispatch)
        

        expect( dispatch ).toHaveBeenCalledWith( chekingCredencials() );
        delete loginData.ok
        expect( dispatch ).toHaveBeenCalledWith( login(loginData) )

     });

    test('startGoogleSignIn debe de llamar checkingCredentials y logout - Error',async() => { 
        
        const loginData = { ...loginDataFalse }
       
        await singInWithGoogle.mockResolvedValue( loginData );

        await startGoogleSignIn()(dispatch)
        

        expect( dispatch ).toHaveBeenCalledWith( chekingCredencials() );
        delete loginData.ok
        expect( dispatch ).toHaveBeenCalledWith( logout(loginData) )

     });

     test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - éxito', async() => { 

        const loginData = { ...loginDataTrue };

        const formData = { email: demoUser.email, password: '123456' }

        await loginWithEmailPassword.mockResolvedValue( loginData );

        await startLoginWithEmailPassword(formData)(dispatch);

        expect( dispatch ).toHaveBeenCalledWith( chekingCredencials() );
        delete loginData.ok
        expect( dispatch ).toHaveBeenCalledWith( login(loginData) )

      });
      
      test('startLoginWithEmailPassword debe de llamar checkingCredentials y  logout - Error', async() => { 
          
          const loginData = { ...loginDataFalse };
          
          const formData = { email: demoUser.email, password: '123456' }
          
          await loginWithEmailPassword.mockResolvedValue( loginData );
          
          await startLoginWithEmailPassword(formData)(dispatch);
          
          expect( dispatch ).toHaveBeenCalledWith( chekingCredencials() );
          delete loginData.ok
          expect( dispatch ).toHaveBeenCalledWith( logout(loginData) )
          
        })
        
        test('startCreatingUserWithEmailPassword debe de llamar checkingCredentials y login - éxito', async() => { 
            
            const loginData = { ...loginDataTrue };
            
            const formData = { email: demoUser.email, password: '123456', displayName: demoUser.displayName }
            
            await registerUserWithEmailPassword.mockResolvedValue( loginData );
            
            await startCreatingUserWithEmailPassword(formData)(dispatch);
            
            expect( dispatch ).toHaveBeenCalledWith( chekingCredencials() );
            delete loginData.ok
            expect( dispatch ).toHaveBeenCalledWith( login(loginData) )
            
        });
        
        test('startCreatingUserWithEmailPassword debe de llamar checkingCredentials y  logout - Error', async() => { 
            
            const loginData = { ...loginDataFalse };
            
            const formData = { email: demoUser.email, password: '123456', displayName: demoUser.displayName }
            
            await registerUserWithEmailPassword.mockResolvedValue( loginData );
            
            await startCreatingUserWithEmailPassword(formData)(dispatch);
            
            expect( dispatch ).toHaveBeenCalledWith( chekingCredencials() );
            delete loginData.ok
            expect( dispatch ).toHaveBeenCalledWith( logout(loginData) )
            
          })

        test('startLogout debe de llamar logoutFirebase, clearNotesLogout y logout', async() => { 
            
            await startLogout()(dispatch);
            expect(logoutFirebase).toHaveBeenCalled();
            expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
            expect( dispatch ).toHaveBeenCalledWith( logout() );


          })
        
    }) 