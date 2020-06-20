import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import Cross from '../../assets/close.png';

const styles = StyleSheet.create({
    mainBody: { width: '95%', height: 150, borderWidth: 1, borderColor: '#CCCCCC', marginBottom: 10, alignItems: 'center', justifyContent: 'space-evenly' }, 
    imageStyle: { width: 235, height: 105 },
    detailImageStyle:  { width: 95, height: 95 },
    detailsContainer: { flexDirection: 'row', width: '100%', justifyContent: 'space-around' },
    mainInfo: { justifyContent: 'center' },
    crossImage: { width : 18, height: 18, alignSelf: 'flex-end', marginRight: 5 },
});

const GetImageDetails = props => {
    const { item } = props;
    return(
        <View style={styles.detailsContainer}>
            <Image source={{ uri : item.largeImageURL }} style={styles.detailImageStyle} />
            <View style={styles.mainInfo}>
                <Text>Image ID : {item.id}</Text>
                <View style={{ flexDirection: 'row', marginVertical: 4, width: 100 }}>
                    <Text>Tags : </Text>
                    <Text>{item.tags}</Text>
                </View>
                <Text>Image ID : {item.type}</Text>
            </View>
        </View>
    );
};

class ProductCard extends React.Component{
    state = {
        showDetails : false,
    };

    render(){
        const { item, showDetails } = this.props;
        return(
            <TouchableOpacity style={styles.mainBody} onPress={() => showDetails(item)}>
                { item.selected ? <TouchableOpacity style={styles.crossImage} onPress={() => showDetails(null)}><Image source={Cross} style={styles.crossImage}/></TouchableOpacity> : null }
                { !item.selected ? (<View>
                    <Image source={{ uri : item.largeImageURL }} style={styles.imageStyle} />
                </View>) :
                (<GetImageDetails item={item}/>)}
            </TouchableOpacity>
        );
    };
}

export default ProductCard;
