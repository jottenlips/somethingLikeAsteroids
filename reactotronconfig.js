import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'

export const reactotron = Reactotron
    .configure({ name: 'Something Like Asteroids' }) // controls connection & communication settings
    .use(reactotronRedux())
        // {except: ['ASTEROID_CREATED', 'UPDATE_ASTEROID_Z', 'UPDATE_ASTEROID_X', 'UPDATE_ASTEROID_Y']}))

    .connect(); // let's connect!