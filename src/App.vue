<template>
  <div id="app">
    <v-app>
      <div class="header">
        <HeaderComponent />
      </div>
      <div class="body">
        <router-view />
      </div>
      <FooterComponent />
    </v-app>
  </div>
</template>