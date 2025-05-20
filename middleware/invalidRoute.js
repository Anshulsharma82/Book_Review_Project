export default function invalidRoute(req,res) {
    return res.status(400).json({error: 'Invalid Route'})
}