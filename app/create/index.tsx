import { colors } from '@/app-example/constants/colors';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { z } from 'zod';
import { Header } from '../../app-example/components/header';
import { Select } from '../../app-example/components/input/select';
import { useDataStore } from '../../store/data'
import { router } from 'expo-router'



const schema = z.object({
    gender: z.string().min(1,{message: "O sexo e obrigatorio."}),
    objective: z.string().min(1,{message: "O objetivo e obrigatorio."}),
    level: z.string().min(1,{message: "O level e obrigatorio."}),
   
    
})

type FormData = z.infer<typeof schema>


export default function Create() {

  const {control, handleSubmit, formState: {errors, isValid}} = useForm<FormData>({
          resolver: zodResolver(schema)
      })

  const setPageTwo = useDataStore(state => state.setPageTwo)

  const genderOptions = [
        {label: "Masculino", value: "Masculino"},
        {label: "Feminino", value: "Feminino"}
  ]

  const levelOptions = [
    { label: 'Sedentário (pouco ou nenhuma atividade física)', value: 'Sedentário' },
    { label: 'Levemente ativo (exercícios 1 a 3 vezes na semana)', value: 'Levemente ativo (exercícios 1 a 3 vezes na semana)' },
    { label: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)', value: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)' },
    { label: 'Altamente ativo (exercícios 5 a 7 dia por semana)', value: 'Altamente ativo (exercícios 5 a 7 dia por semana)' },
  ]

  const objectiveOptions = [
    { label: 'Emagrecer', value: 'emagrecer' },
    { label: 'Hipertrofia', value: 'Hipertrofia' },
    { label: 'Hipertrofia + Definição', value: 'Hipertrofia e Definição' },
    { label: 'Definição', value: 'Definição' },
  ]



  //Function to get all informations from the form
  function handleCreate(data: FormData){
    setPageTwo({
      level: data.level,
      gender: data.gender,
      objective: data.objective
    })

    router.push("/nutrition")
  }


 return (
   <View style={styles.container}>
    
    <Header
    step='Step 2'
    title='Finalizando dieta'
    />

    <ScrollView style={styles.content}>
      <Text style={styles.label}>Sexo:</Text>
      <Select
        control={control}
        name= "gender"
        placeholder="Selecione o seu sexo"
        error={errors.gender?.message}
        options={genderOptions}
      />

      <Text style={styles.label}>Selecione seu nivel de atividade fisica:</Text>
      <Select
        control={control}
        name= "level"
        placeholder="Selecione seu nivel de atividade fisica"
        error={errors.level?.message}
        options={levelOptions}
      />
      <Text style={styles.label}>Selecione seu objetivo:</Text>
      <Select
        control={control}
        name= "objective"
        placeholder="Selecione seu objetivo"
        error={errors.objective?.message}
        options={objectiveOptions}
      />


      <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
        <Text style={styles.buttonText}>Avancar </Text>

      </Pressable>
      

      

    </ScrollView>

   </View>


  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.background
    },
    label:{
        fontSize:16,
        color:colors.white,
        fontWeight: 'bold',
        marginBottom: 8
    },
    content:{
      paddingLeft:16,
      paddingRight: 16
    },
    button:{
    backgroundColor: colors.blue,
    width: '100%',
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 34,
  },
  buttonText:{
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  }

})