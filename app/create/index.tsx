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

 return (
   <View style={styles.container}>
    
    <Header
    step='Step 2'
    title='Finalizando dieta'
    />

    <ScrollView style={styles.content}>
      <Text style={styles.label}>Sexo</Text>
      <Select
        control={control}
        name= "gender"
        placeholder="Selecione o seu sexo"
        error={errors.gender?.message}
        options={genderOptions}
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