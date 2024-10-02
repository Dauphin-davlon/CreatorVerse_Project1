import {pool} from './database.js';
import './dotenv.js';
import creatorData from '../data/creators.js'; 

const createCreatorsTable = async () => {
    const createTableQuery = `
    DROP TABLE IF EXISTS creators;

    CREATE TABLE IF NOT EXISTS creators (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        youtube_url VARCHAR(255) NOT NULL,
        instagram_url VARCHAR(255) ,
        image_url TEXT NOT NULL,
        description TEXT NOT NULL
    )
    `;

    try {
        const res = await pool.query(createTableQuery);
        console.log('🎉 creators table created successfully');
    } catch (err) {
        console.error('⚠️ error creating creators table', err)
    }
};

const seedCreatorsTable = async () => {
    await createCreatorsTable()

    creatorData.forEach((creator) => {
        const insertQuery = {
            text: 'INSERT INTO creators (name, youtube_url, instagram_url, image_url, description) VALUES ($1, $2, $3, $4, $5)'
        }
        const values = [
            creator.name,
            creator.youtube_url,
            creator.instagram_url,
            creator.image_url,
            creator.description
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting creator', err)
                return
            }
        
            console.log(`✅ ${creator.name} added successfully`)
        })

    })
  
  }

  seedCreatorsTable()
