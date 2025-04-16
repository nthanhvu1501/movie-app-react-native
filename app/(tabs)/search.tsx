import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/hooks/useFetch";
import { fetchMovies } from "@/services/api";
import { useEffect, useState } from "react";
import {ActivityIndicator, FlatList, Image, StyleSheet, Text, View} from "react-native";
const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const {
		data: movies,
		loading,
        refetch: loadMovives,
		error,
        reset
	} = useFetch(() => fetchMovies({query: searchQuery}), false);

    useEffect(() => {
        const timeoutId = setTimeout(async()=> {
            if (searchQuery.trim()) {
                await loadMovives();
            }else{
                reset();
            }

        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [searchQuery])

    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full z-0" resizeMode="cover"/>
            <FlatList 
                data={movies}
                renderItem={({item}) => (
                    <MovieCard {...item}/>
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: "center",
                    gap: 16,
                    marginVertical: 16,
                }}
                contentContainerStyle={{
                    paddingBottom: 100
                }}
                ListHeaderComponent={
                    <>
                        <View className="w-full flex-row justify-center mt-20 items-center">
                            <Image source={icons.logo} className="w-12 h-10"/>
                        </View>
                        <View className="my-5">
                            <SearchBar 
                                placeholder="Search Movie..."
                                value={searchQuery}
                                onChangeText={(text: string) => setSearchQuery(text)}
                            />
                        </View>
                        {loading && (
                            <ActivityIndicator size="large" color="#0000ff" />
                        )}
                        {error && (
                            <Text className="text-red-500 px-5 my-3">Error: {error?.message}</Text>
                        )}
                        {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
                            <Text className="text-xl text-white font-bold mt-5 mb-3">
                                Search Results for {' '}
                                <Text className="text-accent">{searchQuery}</Text>
                            </Text>
                        )}
                    </>
                }
                ListEmptyComponent={
                    !loading && !error ? (
                        <View className="mt-5 px-5">
                            <Text className="text-center text-gray-300">{searchQuery.trim() ? 'No movie found' : 'Search for a movie'}</Text>
                        </View>
                    ): null
                }
            >
                </FlatList>
        </View>
    )
}
export default Search;