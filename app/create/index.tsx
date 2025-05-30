import { colors } from '@/app-example/constants/colors';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { z } from 'zod';
import { Header } from '../../app-example/components/header';
import { Select } from '../../app-example/components/input/select';



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
        placeholder="Selecione o seu sexo"
        error={errors.level?.message}
        options={levelOptions}
      />
      <Text style={styles.label}>Selecione seu objetivo:</Text>
      <Select
        control={control}
        name= "objective"
        placeholder="Selecione o seu sexo"
        error={errors.objective?.message}
        options={objectiveOptions}
      />

      

      

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
    }

})