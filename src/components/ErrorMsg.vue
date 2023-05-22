<template>
    <div class="wrapper">
        <div class="error-box">
            <p>{{ errorMessage }} </p>
        </div>
    </div>
</template>

<script>
 export default{
    name: 
    "ErrorMsg",

    props: {
        errorMessage: String
    }
 }
</script>