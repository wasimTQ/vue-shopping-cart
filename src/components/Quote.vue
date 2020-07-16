<template>
    <div id="wrapper">
        <div class="modal">
            <h1 v-if="quote">{{authorQuote}} </h1>
            <h2 v-else>{{authorQuote}} </h2>
            <button @click="closeQuote">close</button>
            
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['fname', 'lname'],
    data() {
        return{
            quoteUrl: 'https://www.breakingbadapi.com/api/quote/random?author=',
            authorQuote: '',
            quote: true
        }
    },
    methods: {
        GetQuote(){
            this.quoteUrl+= this.fname+'+'+this.lname;
            axios.get(this.quoteUrl)
            .then(res => {
                console.log(res.data)
                this.authorQuote = res.data[0].quote;                
            })
            .catch(e => {
                console.log(e)
                this.authorQuote = "Sorry No quote found for this character"; 
                this.quote = false; 
            })
        },
        closeQuote(){
            this.$emit('closeModal')
        }
    },
    created() {
        this.GetQuote()
    }
}
</script>

<style lang="scss" scoped>
#wrapper{
    
    .modal{ 
        margin: 0 auto;
        width: 60%;
        h1{
            color: white;
            position: relative;
            &::before{
                content: '"';
                position: absolute;
                top: -.5em;
                left: 0;
                color: yellow;
                font-size: 3em;
                font-family: 'helvetica';
                opacity: .8;
            }
            
        }
        h2{
                color: red;
                font-size: 5.2rem;
        }
        button{
            color: white;
            background: black;
            padding: 1em 1.5em;
            border: 0;
            font-size: 1.2em;
            text-transform: uppercase;
            letter-spacing: 2px;
            cursor: pointer;
        }

    }
}

</style>