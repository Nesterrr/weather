import * as errorhandler from 'errorhandler';
import { app } from './app';

app.use(errorhandler());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server is up!');
});
