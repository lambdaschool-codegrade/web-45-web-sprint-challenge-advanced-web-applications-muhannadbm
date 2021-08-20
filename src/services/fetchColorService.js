import axiosWithAuth from '../helpers/axiosWithAuth';

const fetchColorService = async() => {
    let result = []
    await axiosWithAuth().get('/colors')
    .then(res => {result = res.data })
    return result
}

export default fetchColorService;