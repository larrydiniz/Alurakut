/* Backend For Frontend */
import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response){
    if(request.method === 'POST'){
        const TOKEN = '1cc174a6028ccbfae3ead5ceb66354'
        const client = new SiteClient(TOKEN);

        const novoRegistro = await client.items.create({
            itemType: '1005485', //model ID
            ...request.body,
        })

        response.json({
            dados: 'Algum dado',
            novoRegistro: novoRegistro,
        })
    }

    response.status(404).json({
        message: 'tem GET aqui não em'
    })
}