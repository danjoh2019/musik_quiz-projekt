<template>
    <div>
        <div class="nav-footer">
            <RouterLink to="/">Start</RouterLink>
            <RouterLink to="/category"> Quiz</RouterLink>
            <RouterLink to="/About"> Om Oss</RouterLink>
        </div>
    </div>
</template>
<style scoped>
.nav-footer{
    display: flex;
    list-style-type: none;
    justify-content: center;
    width: 100%;
    padding: 1rem;
    background: #5775CD;
    font-family: "Montserrat", Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    text-transform: uppercase;
    text-decoration: none;
  }
  
  
  a {
    display: flex;
    text-decoration: none;
    color: #f6f6fa;
    font-size: .8rem;
    margin: .9rem;
    
  
  }
  
  a:hover {
    color: rgba(235, 66, 66, 0.9);
  }
  
 
  
  @media screen and (min-width: 560px) {
  
  }
  </style>