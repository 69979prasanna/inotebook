const {createClient} = require("@supabase/supabase-js")
require("dotenv").config()

const supabse = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY,
)

module.exports = supabse