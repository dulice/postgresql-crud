const router = require('express').Router();
const pool = require('./queries');

router.get('/', async (req, res) => {
    try {
        const users = await pool.query('SELECT * FROM users ORDER BY id ASC');
        res.status(200).json(users.rows);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

router.get('/:id', (req, res) => {
    try {
        const { id } = req.params;
        pool.query('SELECT * FROM users WHERE id = $1', [id], (err, result) => {
            if(err) {
                throw err;
            }
            res.status(200).json(result.rows);
        })
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

router.post('/', (req, res) => {
    try {
        const { name, email } = req.body;
        pool.query(`INSERT INTO users (name, email) VALUES ('${name}', '${email}')`, (err) => {
            if(err) {
                throw err;
            }
            res.status(200).json({message: "post created successfully"});
        })
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

router.put('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        pool.query(`UPDATE users SET name=$1, email=$2 WHERE id=$3`, [name, email, id], (err) => {
            if(err) {
                throw err;
            }
            res.status(200).json({message: "user updated"});
        })
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

router.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;
        pool.query('DELETE FROM users WHERE id = $1', [id], (err) => {
            if(err) {
                throw err;
            }
            res.status(200).json({message: "user deleted."});
        })
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

module.exports = router;