<template>
  <div class="container">
   <h1>
     Task Management
   </h1>
   <div class="create-post">
     <input type="text" class="rounded" id="create-Post" v-model="text" placeholder="Create a task..">
     <button class="button" v-on:click="createPost"> Insert </button>
  
 
   </div>

 <!-- Create Post here -->
   <p class="error" v-if="error"> {{error}} </p>
     <div class="posts-container">
      
       <div class="post"
       v-for="(post, index) in posts"
       v-bind:item="post"
       v-bind:index="index"
       v-bind:key="post._id"
       v-on:dblclick="deletePost(post._id)">
           {{`${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}`}}
            <p>{{post.text}}</p>
       </div>
 
     </div>
 </div>

</template>

<script>
import PostService from '../PostService';

export default {
  name: 'PostComponent',
 data(){
   return{
     posts:[],
     error: '',
     text: ''
   }
 },
 async created() {
   try{
     this.posts = await PostService.getPosts();
   }
   catch(err) {
     this.error = err.message;
   }
 },
 methods:{
   async createPost(){
     await PostService.insertPost(this.text);
     this.posts = await PostService.getPosts();
      },
  async deletePost(id){
     await PostService.deletePost(id);
     this.posts = await PostService.getPosts();
      }
 }

 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
 max-width: 700px;
 margin: 0 auto;
}
h1{
  margin-top: 10px;
  position: relative;
  border: 1px solid #000;
  border-radius: 25px;
  background-color:  #cfd9fb;
    border: 2px solid #609;
    padding: 20px;
}
.posts-container{
  margin-top: 20px;
}
p.error {
 border: 1px solid #ff5b5f;
 background-color: #6ff7f7;
 padding:  10px;
 margin-bottom: 15px;
}
 
div.post {
 position: relative;
 border: 1px solid #000;
 background-color:  #a6b8f5;
 padding: 10px 10px 30px 10px;
 margin-bottom: 15px;
 border-radius: 15px 50px;
 padding: 20px; 
  
}

 
div.created-at {
 position: absolute;
 top: 0;
 left: 0;
 padding: 5px 15px 5px 15px;
 background-color: rgb(96, 41, 247);
 color: white;
 font-size: 13px;
}
 
p.text {
 font-size: 32px;
 font-weight: 700;
 margin-bottom: 0;
 color: rgb(238, 236, 236);
}
.post{
  color: black;
}
input.rounded {
	border: 1px solid #ccc;
	-moz-border-radius: 10px;
	-webkit-border-radius: 10px;
	border-radius: 10px;
	-moz-box-shadow: 2px 2px 3px #666;
	-webkit-box-shadow: 2px 2px 3px #666;
	box-shadow: 2px 2px 3px #666;
	font-size: 20px;
	padding: 4px 7px;
	outline: 0;
	-webkit-appearance: none;
}
input.rounded:focus {
	border-color: #339933;
}
.button{
  padding: 7px;
  border: 2px solid black;
  border-radius: 20px;
}
</style>
