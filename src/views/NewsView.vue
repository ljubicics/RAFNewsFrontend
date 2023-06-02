<template>
  <div class="news">
    <br>
    <h1>Latest news</h1><br>
    <!--
    <div class="newsInfoDiv" v-for="news in newsList" :key="news.id" @click="goToNews(news.id)">
        <h3><b>{{ news.title }}</b></h3>
        <p> ( {{ news.categoryName }} )</p>
        <p>{{ news.createdAt }}</p>
        <p>{{ news.content | shortText }}</p>
    </div> -->

    <ul id="itemList">
      <li v-for="news in newsList" :key="news.news_id">
        <div class="newsInfoDiv" @click="goToNews(news.id)">
          <h3><b>{{ news.news_title }}</b></h3>
          <p> ( {{ news.news_category }} )</p>
          <p>{{ categoriesList[] }}</p>
          <p>{{ news.content | shortText }}</p>
        </div>
      </li>
    </ul>
    <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="itemList" align="center">
    </b-pagination>

  </div>
</template>