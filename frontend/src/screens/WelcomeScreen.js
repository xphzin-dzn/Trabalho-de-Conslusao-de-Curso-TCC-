import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

// Importe os seus novos componentes
import ProcessoItem from '../components/ProcessoItem';
import EquipeCard from '../components/EquipeCard';

const WelcomeScreen = ({ navigation }) => {
    const [itemAberto, setItemAberto] = useState('01');
    const textoLoremIpsum = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...";
    const equipeDescricao = "10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy";

    const toggleItem = (numero) => {
        setItemAberto(itemAberto === numero ? null : numero);
    };

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

            {/* Seção Hero */}
            <View style={styles.heroSection}>
                <View style={styles.heroTextContainer}>
                    <Text style={styles.heroTitle}>Movendo Ideias</Text>
                    <Text style={styles.heroSubtitle}>{textoLoremIpsum}</Text>
                    <TouchableOpacity style={styles.contateNosButton}>
                        <Text style={styles.contateNosButtonText}>Contate-nos</Text>
                    </TouchableOpacity>
                </View>
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
                    <Image source={require('../../assets/icon.png')} style={styles.apoioImage} />
                </View>
            </View>

            {/* Seção Processo de Trabalho */}
            <View style={styles.processoSection}>
                <View style={styles.processoHeader}>
                    <Text style={styles.processoTitle}>Nosso Processo de Trabalho</Text>
                    <Text style={styles.processoSubtitle}>Passo a Passo de como fazemos nosso protótipo</Text>
                </View>
                <ProcessoItem numero="01" titulo="Projeto" conteudo={textoLoremIpsum} aberto={itemAberto === '01'} onPress={() => toggleItem('01')} />
                <ProcessoItem numero="02" titulo="Coisa 2" conteudo={textoLoremIpsum} aberto={itemAberto === '02'} onPress={() => toggleItem('02')} />
                <ProcessoItem numero="03" titulo="Coisa 3" conteudo={textoLoremIpsum} aberto={itemAberto === '03'} onPress={() => toggleItem('03')} />
            </View>

            {/* Seção Equipe */}
            <View style={styles.equipeSection}>
                <View style={styles.equipeHeader}>
                    <Text style={styles.equipeTitle}>Equipe</Text>
                    <Text style={styles.equipeSubtitle}>Conheça a equipe que faz o projeto ser realidade!!</Text>
                </View>
                <View style={styles.equipeGrid}>
                    <EquipeCard imagem={require('../../assets/icon.png')} nome="John Smith" cargo="CEO and Founder" descricao={equipeDescricao} />
                    <EquipeCard imagem={require('../../assets/icon.png')} nome="Jane Doe" cargo="Director of Operations" descricao={equipeDescricao} />
                    <EquipeCard imagem={require('../../assets/icon.png')} nome="Michael Brown" cargo="Senior SEO Specialist" descricao={equipeDescricao} />
                    <EquipeCard imagem={require('../../assets/icon.png')} nome="Emily Johnson" cargo="PPC Manager" descricao={equipeDescricao} />
                </View>
                <TouchableOpacity style={styles.verEquipeButton}>
                    <Text style={styles.verEquipeButtonText}>Ver toda equipe</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
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
        width: 150,
        height: 60,
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
    processoSection: {
        padding: 40,
        backgroundColor: '#fff',
    },
    processoHeader: {
        marginBottom: 30,
    },
    processoTitle: {
        backgroundColor: '#28a745',
        color: '#fff',
        fontSize: 24,
        borderRadius: 8,
        fontWeight: 'bold',
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignSelf: 'flex-start',
    },
    processoSubtitle: {
        fontSize: 16,
        color: 'gray',
        marginTop: 10,
    },
    equipeSection: {
        padding: 40,
        backgroundColor: '#fff',
    },
    equipeHeader: {
        marginBottom: 30,
    },
    equipeTitle: {
        backgroundColor: '#28a745',
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignSelf: 'flex-start',
    },
    equipeSubtitle: {
        fontSize: 16,
        color: 'gray',
        marginTop: 10,
    },
    equipeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    verEquipeButton: {
        backgroundColor: '#1A202C',
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 20,
    },
    verEquipeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default WelcomeScreen;