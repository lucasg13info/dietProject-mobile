import { View } from 'react-native';
import { Header } from '../../app-example/components/header/index';

export default function Step(){
    return(
        <View>
            <Header
                step='Step 1'
                title= 'Lets go'
            />

           
        </View>
    )
}