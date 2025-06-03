import { StyleSheet, Text, View } from 'react-native';
import { Header } from '../../app-example/components/header';
import { useDataStore } from '../../store/data';
import { api } from '../../services/api'
import { useQuery} from '@tanstack/react-query'
import { colors } from '@/app-example/constants/colors';



export default function Nutrition() {

    const user = useDataStore(state => state.user)
    //Chamando a api
    const {data, isFetching, error} = useQuery({
      queryKey:["nutrition"],
      queryFn: async () => {
        try{
          if(!user){
            throw new Error ("Filed load nutrition")
          }

          const response = await api.get("/test")

          // const response = await api.post("/teste",{
          //   name: user.name,
          //   weight: user.weight, 
          //   height: user.height,
          //   age: user.age,
          //   gender : user.gender,
          //   objective : user.objective,
          //   level: user.level
          
          // })

          console.log(response.data.data)
          return response.data.data


        }catch(err){
          console.log(err)
        }
      }
    })

    if(isFetching){
      return(
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Estamos gerando sua dieta</Text>
          <Text style={styles.loadingText}>Consultando IA</Text>
        </View>
      )
    }
 return (
   <View> 

    <Header
    step='Step 3'
    title='Minha dieta'
    />
    <Text>Teste page</Text>
    <Text>
        {user.name}
    </Text>





   </View>
  );
}

const styles = StyleSheet.create({
  loading:{
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingText:{
    fontSize: 18,
    color: colors.white,
    marginBottom: 4,
    justifyContent: 'center',
    alignItems: 'center'
  }
    
})