import server from '../src/server'
const PORT = process.env.PORT || 5000;

const handleListen = (err) =>
  err
    ? console.log(err)
    : console.log(`Listening on.. http://localhost:${PORT}`);
server.listen(PORT, handleListen);
