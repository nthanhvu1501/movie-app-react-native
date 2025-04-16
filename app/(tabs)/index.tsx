import {ScrollView, Image, Text, View, ActivityIndicator, FlatList} from "react-native";
import {Link} from "expo-router";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import {useRouter} from "expo-router";
import useFetch from "@/hooks/useFetch";
import {fetchMovies} from "@/services/api";
import MovieCard from "@/components/MovieCard";

export default function Index() {
	const router = useRouter();
	const {
		data: movies,
		loading: moviesLoading,
		error: moviesError,
	} = useFetch(() => fetchMovies({query: ""}));

	return (
		<View className="flex-1 bg-primary">
			<Image source={images.bg} className="absolute w-full z-0" />
			<ScrollView
				className="flex-1 px-5"
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					minHeight: "100%",
					paddingBottom: 10,
				}}>
				<Image
					source={icons.logo}
					className="w-12 h-10 mx-auto mt-20 mb-5"
				/>

				{moviesLoading ? (
					<ActivityIndicator
						size="large"
						color="#0000ff"
						className="mt-10 self-center"
					/>
				) : moviesError ? (
					<Text>Error: {moviesError?.message}</Text>
				) : (
					<View className="flex-1 mt-5">
						<SearchBar
							onPress={() => router.push("/search")}
							placeholder="Search"
						/>
						<>
							<Text className="text-lg text-white font-bold mt-5 mb-3">
								Lastest Movies
							</Text>
							<FlatList
								data={movies}
								renderItem={({item}) => (
									<MovieCard {...item}/>
								)}
								keyExtractor={(item) => item.id.toString()}
								numColumns={3}
								scrollEnabled={false}
								columnWrapperStyle={{
									justifyContent: "flex-start",
									gap: 20,
									paddingRight: 5,
									marginBottom: 10,
								}}
							/>
						</>
					</View>
				)}
			</ScrollView>
		</View>
	);
}
