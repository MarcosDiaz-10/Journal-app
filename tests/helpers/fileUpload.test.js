import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from "../../src/helper/fileUpload"

cloudinary.config({
    cloud_name:'djnblsfrb',
    api_key: '642364685234823',
    api_secret: 'mH9eo_4Uhrtf_bh1RA_gixyhQ_g',
    secure: true
})

describe('Pruebas en fileUpload', () => { 
    jest.setTimeout(150000)
    test('debe de subir el archivo correctamente a cloudinary', async() => { 
        
        const imageUrl = 'https://res.cloudinary.com/djnblsfrb/image/upload/v1667200578/journal/dghsd8dxuo01rngxjsnm.png'

        const resp = await fetch( imageUrl );
        
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');

        const url = await fileUpload( file );
        
        expect( typeof url ).toBe('string');
        
        // console.log(url);
        
        const segments = url.split('/');

        const imageId = segments[segments.length - 1].replace('.png','');
        await cloudinary.api.delete_resources(['journal/' + imageId], {
            resource_type: 'image'
        });
        

    });

    test('debe de retornar null', async() => { 

        const file = new File([], 'foto.jpg');

        const url = await fileUpload( file );
 
        expect( url ).toBe(null);

     })
 })