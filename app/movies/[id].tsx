import {StyleSheet, Text, View} from 'react-native';
import {useLocalSearchParams} from "expo-router";
const MovieDetails = () => {
    const {id} = useLocalSearchParams();
    return (
        <View>
            <Text>Movie ID: {id}</Text>
        </View>
    )
}
export default MovieDetails;