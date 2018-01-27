import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'

export const reactotron = Reactotron
    .configure({ name: 'Something Like Asteroids' }) // controls connection & communication settings
    .use(reactotronRedux())
    // .useReactNative() // add all built-in react native plugins
    .connect(); // let's connect!