import { colors } from '@/app-example/constants/colors';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { z } from 'zod';
import { Header } from '../../app-example/components/header/index';
import { Input } from '../../app-example/components/input/index';
import { router } from 'expo-router'



const schema = z.object({
    name: z.string().min(1,{message: "O nome e obrigatorio."}),
    weight: z.string().min(1,{message: "O peso e obrigatorio."}),
    age: z.string().min(1,{message: "A idade e obrigatorio."}),
    height: z.string().min(1,{message: "A altura e obrigatorio."}),
    
})

type FormData = z.infer<typeof schema>

export default function Step(){

    const {control, handleSubmit, formState: {errors, isValid}} = useForm<FormData>({
        resolver: zodResolver(schema)
    })


    function handleCreate(data:FormData){
        console.log(data)
        router.push("/create")
    }





    return(
        <View style={styles.container}>
            <Header
                step='Step 1'
                title= 'Lets go'
            />

        <ScrollView style={styles.content}>
            <Text style={styles.label}>Nome</Text>
            <Input 
                name= "name"
                control={control}
                placeholder="Digite seu nome..."
                error={errors.name?.message}
                KeyBoardType="default"
            />

            <Text style={styles.label}>Seu peso atual</Text>
            <Input 
                name= "weight"
                control={control}
                placeholder="Ex: 75"
                error={errors.weight?.message}
                KeyBoardType="numeric"
            />
            
              <Text style={styles.label}>Sua altura atual</Text>
            <Input 
                name= "height"
                control={control}
                placeholder="Ex: 1.80"
                error={errors.height?.message}
                KeyBoardType="numeric"
            />

              <Text style={styles.label}>Sua idade atual</Text>
            <Input 
                name= "age"
                control={control}
                placeholder="27"
                error={errors.age?.message}
                KeyBoardType="numeric"
            />


            <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
                <Text style={styles.buttonText}>Avancar</Text>
            </Pressable>
        </ScrollView>




        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.background
    },

    content:{
        paddingLeft: 16,
        paddingRight: 16
    },
    label:{
        fontSize:16,
        color:colors.white,
        fontWeight: 'bold',
        marginBottom: 8
    },
    button:{
        backgroundColor: colors.blue,
        height: 44,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4
    },
    buttonText:{
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold'
        
    }
})