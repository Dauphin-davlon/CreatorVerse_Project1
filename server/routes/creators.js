import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import giftData from '../data/gifts.js'
import { supabase } from '../supabase.js'; 

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

// router.get('/', (req, res) => {
//     res.status(200).json(giftData)
//   })

router.get('/', async (req, res) => {
  try {
    const { data: authors, error }  = await supabase.from("Creators").select();
    if (error) throw error;
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

  router.get('/:giftId', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../public/gift.html'))
  })

  // router.get('/:creatorId', async (req, res) => {
  //   const { creatorId } = req.params;
  //   try {
  //     const { data: author, error } = await supabase
  //       .from('Creators')
  //       .select()
  //       .eq('id', creatorId)
  //       .single();
  //     if (error) throw error;
  //     res.status(200).json(author);
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // });

  export default router