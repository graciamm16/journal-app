import {v2 as cloudinary} from 'cloudinary';
import { fileUpload } from '../../src/helpers/fileUpload';


cloudinary.config({
    cloud_name: 'dr4i6skut',
    api_key: '349961965899548',
    api_secret: 'O-G9bpkhfYjYyH1uwgQ8JtlT9lQ',
    secure: true
});

describe('Pruebas en fileUpload', () => {
    test('Debe subir el archivo correctamente a cloudinary', async() => {
        const imageUrl = 'https://images.photowall.com/products/42556/summer-landscape-with-river.jpg?h=699&q=85';
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File ([blob], 'foto.jpg');

        const url = await fileUpload(file);
        expect(typeof url).toBe('string');  
        
        // console.log(url);
        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg', '');
        // console.log(imageId);

        const cloudResp = await cloudinary.api.delete_resources([imageId]);
        // console.log({cloudResp});
    });

    test('Debe retornar null', async() => {
        const file = new File ([], 'foto.jpg');

        const url = await fileUpload(file);
        expect(url).toBe(null);
    });
});