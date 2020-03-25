const connection = require('../database/connection')

module.exports = {
    async index(request, response){
        const {page = 1} = request.query;
        const isPage = request.query;
        const ong_id = request.headers.authorization;

        const [count] = await connection('incidents').where('ong_id',ong_id).count();
        console.log(count)
        const incidents = await connection('incidents').where('ong_id',ong_id).limit(5).offset((page -1) *5)
        .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);
        // if (request.query) {
        //     incidents = await connection('incidents').where('ong_id',ong_id).select('*');
        // }
        response.header('X-Total-Count',count['count(*)']);

        return response.json(incidents)
    }
}