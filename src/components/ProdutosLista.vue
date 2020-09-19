<template>
  <section class="produtos-container">
    <div v-if="produtos && produtos.length > 0" class="produtos">
      <div class="produto" v-for="(produto, i) in produtos" :key="i">
        <router-link to="/">
          <img :src="produto.fotos[0].src" :alt="produto.fotos[0].titulo" v-if="produto.fotos" />
          <p class="preco">{{produto.preco}}</p>
          <h2 class="titulo">{{produto.nome}}</h2>
          <p>{{produto.descricao}}</p>
        </router-link>
      </div>
      <ProdutosPaginar :produtosPorPagina="produtosPorPagina" :produtosTotal="produtosTotal" />
    </div>
    <div v-else-if="produtos && produtos.length === 0">
      <p class="sem-resultado">Nenhum produto encontrado</p>
    </div>
    <div v-else>
      <p class="sem-resultado">Nenhum produto encontrado</p>
    </div>
  </section>
</template>

<script>
import ProdutosPaginar from "../components/ProdutosPaginar";
import api from "../services";
import { serialize } from "../utils";

export default {
  name: "ProdutosLista",
  components: {
    ProdutosPaginar,
  },
  created: function () {
    this.fetchProdutos();
  },
  data() {
    return {
      produtos: null,
      produtosPorPagina: 2,
      produtosTotal: 12,
    };
  },
  methods: {
    fetchProdutos() {
      api.get(this.url).then((response) => {
        this.produtos = response.data;
      });
    },
  },
  computed: {
    url() {
      let queryString = serialize(this.$route.query);
      return `/produto?_limit=${this.produtosPorPagina}${queryString}`;
    },
  },
  watch: {
    url() {
      this.fetchProdutos();
    },
  },
};
</script>

<style scoped>
.produtos-container {
  max-width: 1000px;
  margin: 0 auto;
}

.produtos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin: 30px;
}

.produto {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  transition: all 0.2s;
}

.produto:hover {
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  transform: scale(1.1);
  position: relative;
  z-index: 1;
}

.produto img {
  border-radius: 4px;
  margin-bottom: 20px;
}

.titulo {
  margin-bottom: 10px;
}

.preco {
  font-weight: bold;
  color: #e80;
}

.sem-resultado {
  text-align: center;
}
</style>