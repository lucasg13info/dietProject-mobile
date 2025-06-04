import { colors } from '@/app-example/constants/colors';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Link, router } from 'expo-router';
import { Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { api } from '../../services/api';
import { useDataStore } from '../../store/data';
import { Data } from '../../types/data';


interface ResponseData{
  data: Data
}


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
          //Rota de test
          // const response = await api.get<ResponseData>("/test")

          const response = await api.post<ResponseData>("/create",{
            name: user.name,
            weight: user.weight, 
            height: user.height,
            age: user.age,
            gender : user.gender,
            objective : user.objective,
            level: user.level
          
          })

          return response.data.data


        }catch(err){
          console.log(err)
        }
      }
    })

    //Button share

    async function handleShare(){
    try{
      if(data && Object.keys(data).length === 0) return;

      const supplements = `${data?.suplementos.map( item => ` ${item}`)}`

      const foods = `${data?.refeicoes.map( item => `\n- Nome: ${item.nome}\n- Horário: ${item.horario}\n- Alimentos: ${item.alimentos.map( alimento => ` ${alimento}` )}`)}`

      const message = `Dieta: ${data?.nome} - Objetivo: ${data?.objetivo}\n\n${foods}\n\n- Dica Suplemento: ${supplements}`

      await Share.share({
        message: message
      })


    }catch(err){
      console.log(err);
    }
  }

    if(isFetching){
      return(
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Estamos gerando sua dieta</Text>
          <Text style={styles.loadingText}>Consultando IA</Text>
        </View>
      )
    }

    if(error){
      return(
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Falha ao gerar dieta!</Text>
          <Link href="/">
            <Text> Tente novamente</Text>
          </Link>
        </View>
      )
    }

 return (
   <View style={styles.container}> 
    <View style={styles.containerHeader}>
      <View style={styles.contentHeader}>
          <Text style={styles.title}> Minha dieta</Text>
          <Pressable style={styles.buttonShare} onPress={handleShare}>
            <Text style={styles.buttonShareText}>Compartilhar</Text>
          </Pressable>
      </View>
    </View>
    <View style= {{paddingLeft: 16, paddingRight: 16, flex:1}}>
      {data && Object.keys(data).length > 0 &&(
         <>
          <Text style={styles.name}>Nome: {data.nome} </Text>
          <Text style={styles.objective}>Foco: {data.objetivo}</Text>

          <Text style={styles.label}>Refeicoes: </Text>
          <ScrollView>
            <View style={styles.foods}>
              {/* {data.refeicoes.map( (refeicoao) =(
                <View style={styles.food}>
                  <View>
                    <Text style={styles.foodHeader}>{refeicoes.nome}</Text>
                    <Ionicons name= "restaurant" size={16} color="000" />
                    </View>

                    <View style={styles.foodContent}>
                      <Feather name="clock" size={14} color="000"/>
                      <Text>{refeicoes.horario</Text>
                    </View>
                </View>
              ))} */}



              {data.refeicoes.map((refeicao, index) => (
              <View key={index} style={styles.food}>
                <View style={styles.foodHeader}>
                  <Text style={styles.foodName}>{refeicao.nome}</Text>
                  <Ionicons name="restaurant" size={16} color="#000" />
                </View>

                
                <View style={styles.foodContent}>
                  <Feather name="clock" size={14} color="#000" />
                  <Text>{refeicao.horario}</Text>
                  <Text>{refeicao.nome}</Text>
                </View>
                {/* <Text style={styles.foodText}>{refeicao.alimentos}</Text> */}

                <Text style={styles.foodText}>Alimentos: </Text>

                {refeicao.alimentos.map(alimento => (
                  <Text key={alimento}>{alimento}</Text>
                ))}
              </View>
            ))}

            </View>


            <View style={styles.supplements}>
              <Text style={styles.foodName}>Dica de suplementos: </Text>
              {data.suplementos.map(item => (
                <Text key={item}>{item}</Text>
              ))}

            </View>
            <Pressable style={styles.button} onPress={() =>router.replace("/")}>
              <Text style={styles.buttonText}>Gerar nova dieta</Text>  
            </Pressable>
          </ScrollView>


        </>
      )
       
      }
    </View>

   </View>
  );
}

const styles = StyleSheet.create({
  loading:{
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText:{
    fontSize: 18,
    color: colors.white,
    marginBottom: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container:{
    backgroundColor: colors.background,
    flex:1 // tela toda,

  },
  containerHeader:{
    backgroundColor: colors.white,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    paddingTop: 70,
    paddingBottom: 20,
    marginBottom: 16 
  },
  contentHeader:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
  },
  title:{
    fontSize: 27,
    fontWeight: 'bold',
    color: colors.background,

  },
  buttonShare:{
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 4,
  },
  buttonShareText:{
    color: colors.white,
    fontWeight: '500'
  },
  name:{
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold'
  },
  objective:{
    color: colors.white,
    fontSize: 16,
    marginBottom: 24
  },
  label: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold'
  },
  foods:{
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 8,
    marginTop: 8,
    gap: 8,
  },
  food:{
    backgroundColor: 'rgba(208, 208, 208, 0.40)',
    padding: 8,
    borderRadius: 4,
  },
  foodHeader:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  foodName:{
    fontSize: 16,
    fontWeight: 'bold'
  },
  foodContent:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  foodText:{
    fontSize: 16,
    marginBottom: 4,
    marginTop: 14,
  },
  supplements:{
    backgroundColor: colors.white,
    marginTop: 14,
    marginBottom: 14, 
    padding: 14,
    borderRadius: 8
  },
  button:{
    backgroundColor: colors.blue,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 24,
  },
  buttonText:{
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold'
  }

    
})