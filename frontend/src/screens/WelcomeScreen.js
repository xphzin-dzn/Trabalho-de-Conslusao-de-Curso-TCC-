import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
    const textoLoremIpsum = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";

    return (
        <ScrollView style={styles.container}>
            {/* Cabeçalho */}
            <View style={styles.header}>
                <Image source={require('../../assets/icon.png')} style={styles.logo} />
                <View style={styles.headerActions}>
                    <TouchableOpacity>
                        <Text style={styles.headerLink}>Sobre nós</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.entrarButton} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.entrarButtonText}>Entrar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Seção Principal (Hero) */}
            <View style={styles.heroSection}>
                <View style={styles.heroTextContainer}>
                    <Text style={styles.heroTitle}>Movendo Ideias</Text>
                    <Text style={styles.heroSubtitle}>{textoLoremIpsum}</Text>
                    <TouchableOpacity style={styles.contateNosButton}>
                        <Text style={styles.contateNosButtonText}>Contate-nos</Text>
                    </TouchableOpacity>
                </View>
                {/* ATENÇÃO: Substitua 'icon.png' pelo nome da sua imagem de ilustração principal */}
                <Image source={require('../../assets/icon.png')} style={styles.heroImage} />
            </View>

            {/* Seção de Apoio */}
            <View style={styles.apoioSectionWrapper}>
                <View style={styles.apoioSection}>
                    <View style={styles.apoioTextContainer}>
                        <Text style={styles.apoioTitle}>Quer nos apoiar?</Text>
                        <Text style={styles.apoioSubtitle}>Contact us today to learn more about how our digital marketing services can help your business grow and succeed online.</Text>
                        <TouchableOpacity style={styles.apoioButton}>
                            <Text style={styles.apoioButtonText}>Get your free proposal</Text>
                        </TouchableOpacity>
                    </View>
                    {/* ATENÇÃO: Substitua 'icon.png' pelo nome da sua imagem de apoio */}
                    <Image source={require('../../assets/icon.png')} style={styles.apoioImage} />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    // Cabeçalho
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 20,
        width: '100%',
    },
    logo: {
        width: 320, // Tamanho aumentado
        height: 190, // Tamanho aumentado
        resizeMode: 'contain',
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerLink: {
        marginRight: 25,
        fontSize: 16,
        color: '#333',
    },
    entrarButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    entrarButtonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: '500',
    },
    // Seção Hero
    heroSection: {
        flexDirection: 'row',
        paddingHorizontal: 40,
        paddingVertical: 60,
        alignItems: 'center',
    },
    heroTextContainer: {
        flex: 1,
        paddingRight: 20,
    },
    heroTitle: {
        fontSize: 42,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#111',
    },
    heroSubtitle: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 30,
        lineHeight: 24,
    },
    contateNosButton: {
        backgroundColor: '#1A202C',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    contateNosButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    heroImage: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    // Seção de Apoio
    apoioSectionWrapper: {
        padding: 20,
    },
    apoioSection: {
        flexDirection: 'row',
        padding: 30,
        alignItems: 'center',
        backgroundColor: '#f7fafc',
        borderRadius: 20,
    },
    apoioTextContainer: {
        flex: 1,
        paddingRight: 20,
    },
    apoioTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    apoioSubtitle: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 25,
        lineHeight: 24,
    },
    apoioButton: {
        backgroundColor: '#1A202C',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    apoioButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    apoioImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
});

export default WelcomeScreen;