import { colors } from '@/app-example/constants/colors';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { z } from 'zod';
import { Header } from '../../app-example/components/header';
import { Input } from '../../app-example/components/input/index';


export default function Create() {
 return (
   <View style={styles.container}>
    
    <Header
    step='Step 2'
    title='Finalizando dieta'
    />

   </View>


  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.background
    },

})