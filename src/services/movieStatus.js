export default {
    methods: {
        movieStatus(vote) {
            let str = 'p-1 rounded text-gray-100'
            if (vote >= 8.0) return str+' bg-green-600'
            if (vote >= 6.0 && vote < 8.0) return str+ ' bg-yellow-600'
            if (vote >= 5.0 && vote < 6.0) return str+' bg-gray-600'
            if (vote < 5.0) return str+' bg-red-600'
        }
    }
}
