import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image } from 'react-native';
import LogoFinal from './src/img/LogoFinalPeq.gif';

export default function Profile() {
  const noticias = [
    {
      title: 'AS MARCAS DE GIN MAIS VENDIDAS EM 2022',
      imageSource: 'https://mixologynews.com.br/wp-content/uploads/2023/07/gin-759x500.jpg',
      description: 'Apesar da forte concorrência dos outros setores emergentes como rum, vodka e bourbon, a categoria gin teve um ano positivo em 2022. Neste post, vamos te mostrar quais as marcas estiveram no topo, comandando o crescimento da categoria.'
    },
    {
      title: 'OS 7 DRINQUES DO BAÚ QUE VOCÊ PRECISA PROVAR',
      imageSource: 'https://mixologynews.com.br/wp-content/uploads/2016/01/vieux-carre-759x439.jpg',
      description: "Com dezenas de colaborações nos Drinques do Baú nos últimos anos, separamos 7 grandes receitas que merecem ser provadas e a gente tem certeza que você ainda não experimentou. Então, aproveite o conteúdo e no próximo bom bar que visitar, peça um desses 10 coquetéis incríveis abaixo."
    },
    {
      title: '07 CURIOSIDADES SOBRE O WHISKY',
      imageSource: 'https://mixologynews.com.br/wp-content/uploads/2011/12/whisky-759x500.jpg',
      description: "Poucas pessoas sabem que o Brasil é considerado um dos maiores consumidores de whisky do mundo. Aqui vão algumas curiosidades e erros comuns que todo profissional de bar e amantes da bebida deveriam saber!"
    },
    {
      title: 'QUENTÃO: APRENDA A RECEITA DO INVERNO BRASILEIRO',
      imageSource: 'https://mixologynews.com.br/wp-content/uploads/2020/06/quent%C3%A3o-759x500.jpg',
      description: 'Festa Junina é uma das mais saborosas demonstrações de cultura do nosso país, uma oportunidade para frequentar as quermesses com seus instrumentos culturais, sociais e gastronômicos típicos do nosso inverno.'
    },
    {
      title: 'AS DORES DE SER BARTENDER E AS MUITAS LESÕES NO BAR',
      imageSource: 'https://www.rbsdirect.com.br/imagesrc/35808612.jpg?w=700',
      description: "Quem não conhece algum bartender que precisou se afastar por alguns dias, às vezes semanas, por conta de um problema de saúde que foi gerado exatamente no ofício de bartender?"
    },
    {
      title: '07 CURIOSIDADES SOBRE O ABSINTO',
      imageSource: 'https://mixologynews.com.br/wp-content/uploads/2015/08/absinto-759x500.jpg',
      description: "Absinto é daquelas bebidas que quem já bebeu sabe da sua potência e também do seu estrago. Com uma história centenária, o Absinto foi protagonista e encantou gerações."
    },
  ];

 
  return (
    <View style={styles.container}>
      <Image
        source={LogoFinal} // Referencie a imagem importada diretamente
        style={styles.logo}
      />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          <View style={styles.newsContainer}>
            {noticias.map((noticia, index) => (
              <View key={index} style={styles.newsItem}>
                <Image source={{ uri: noticia.imageSource }} style={styles.newsImage} />
                <Text style={styles.newsTitle}>{noticia.title}</Text>
                <Text style={styles.newsDescription}>{noticia.description}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  logo: {
    position: 'absolute',
    top: 0,
    width: '100%', 
    height: 100, 
    zIndex: 1,
  },
  safeArea: {
    flex: 1,
    marginTop: 100, // Ajuste a margem superior para corresponder à altura do GIF
  },
  newsContainer: {
    backgroundColor: '#333',
  },
  newsItem: {
    backgroundColor: '#333',
    margin: 7,
    borderRadius: 5,
    padding: 10,
  },
  newsImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  newsTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  newsDescription: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
});