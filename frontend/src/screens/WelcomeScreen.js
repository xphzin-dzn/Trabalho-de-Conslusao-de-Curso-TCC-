import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

// Componente reutilizável para os itens do processo, agora com estado para controlar qual está aberto
const ProcessoItem = ({ numero, titulo, conteudo, aberto, onPress }) => {
    return (
        // O estilo muda se o item estiver aberto
        <View style={[styles.processoItem, aberto && styles.processoItemAberto]}>
            <TouchableOpacity onPress={onPress} style={styles.processoItemHeader}>
                <Text style={[styles.processoItemNumber, aberto && styles.processoItemNumeroAberto]}>{numero}</Text>
                <Text style={[styles.processoItemTitle, aberto && styles.processoItemTitleAberto]}>{titulo}</Text>
                <View style={[styles.processoItemToggle, aberto && styles.processoItemToggleAberto]}>
                    <Text style={[styles.processoItemToggleText, aberto && styles.processoItemToggleTextAberto]}>{aberto ? '−' : '+'}</Text>
                </View>
            </TouchableOpacity>
            {aberto && (
                <Text style={styles.processoItemContent}>{conteudo}</Text>
            )}
        </View>
    );
};


const WelcomeScreen = ({ navigation }) => {
    const [itemAberto, setItemAberto] = useState('01'); // Controla qual item está aberto
    const textoLoremIpsum = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";

    const toggleItem = (numero) => {
        // Se o item clicado já estiver aberto, fecha-o. Senão, abre-o.
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

            {/* Seção Principal (Hero) */}
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

            {/* --- SEÇÃO "NOSSO PROCESSO DE TRABALHO" --- */}
            <View style={styles.processoSection}>
                <View style={styles.processoHeader}>
                    <Text style={styles.processoTitle}>Nosso Processo de Trabalho</Text>
                    <Text style={styles.processoSubtitle}>Passo a Passo de como fazemos nosso protótipo</Text>
                </View>
                <ProcessoItem numero="01" titulo="Projeto" conteudo={textoLoremIpsum} aberto={itemAberto === '01'} onPress={() => toggleItem('01')} />
                <ProcessoItem numero="02" titulo="Coisa 2" conteudo={textoLoremIpsum} aberto={itemAberto === '02'} onPress={() => toggleItem('02')} />
                <ProcessoItem numero="03" titulo="Coisa 3" conteudo={textoLoremIpsum} aberto={itemAberto === '03'} onPress={() => toggleItem('03')} />
                <ProcessoItem numero="04" titulo="Coisa 4" conteudo={textoLoremIpsum} aberto={itemAberto === '04'} onPress={() => toggleItem('04')} />
                <ProcessoItem numero="05" titulo="Coisa 5" conteudo={textoLoremIpsum} aberto={itemAberto === '05'} onPress={() => toggleItem('05')} />
                <ProcessoItem numero="06" titulo="Coisa 6" conteudo={textoLoremIpsum} aberto={itemAberto === '06'} onPress={() => toggleItem('06')} />
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
    // --- NOVOS ESTILOS PARA "PROCESSO DE TRABALHO" ---
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
        fontWeight: 'bold',
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignSelf: 'flex-start', // Para o fundo não ocupar a linha toda
    },
    processoSubtitle: {
        fontSize: 16,
        color: 'gray',
        marginTop: 10,
    },
    processoItem: {
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 30,
        marginBottom: 15,
        paddingHorizontal: 20,
        paddingVertical: 15,
        overflow: 'hidden', // Garante que o conteúdo não saia das bordas arredondadas
    },
    processoItemAberto: {
        backgroundColor: '#28a745',
        borderColor: '#28a745',
    },
    processoItemHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    processoItemNumber: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#a0aec0',
        marginRight: 15,
    },
    processoItemNumeroAberto: {
        color: '#fff',
    },
    processoItemTitle: {
        flex: 1,
        fontSize: 20,
        fontWeight: '600',
        color: '#1A202C',
    },
    processoItemTitleAberto: {
        color: '#fff',
    },
    processoItemToggle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    processoItemToggleAberto: {
        backgroundColor: '#fff',
        borderColor: '#fff',
    },
    processoItemToggleText: {
        fontSize: 20,
        color: '#a0aec0',
    },
    processoItemToggleTextAberto: {
        color: '#28a745',
    },
    processoItemContent: {
        marginTop: 15,
        paddingLeft: 37, // Para alinhar com o título
        fontSize: 16,
        color: '#fff',
        lineHeight: 24,
    },
});

export default WelcomeScreen;