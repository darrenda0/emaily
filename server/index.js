const express = require('express');
require('./services/passport');

const app = express();

require('./routes/authRoutes')(app);

//Dynamic Port Binding = process.env.PORT    
const PORT = process.env.PORT || 5000;
app.listen(PORT);