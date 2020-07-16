<template>
    <div id="wrapper">
        <img src="../assets/breaking-bad.svg" />
        <transition name="fadeInTop">
            <div id="modal" v-if="CharacterfName">
                <Quote :fname="CharacterfName" :lname="CharacterlName"
                @closeModal="CharacterfName = CharacterlName = ''" />
            </div>
        </transition>
        <input v-model="charName" @keyup.enter.space="GetcharbyName" placeholder="Search by name">
        <div class="detail-wrapper">
            <div class="charDetail"
            @mouseenter="showOccup(characters.char_id)"
            @mouseleave="closeOccup"
            v-for="(characters, index) in charactersDetail"
            :key="characters.char_id"
            @click="SetName(characters.name)">
                <img :src="characters.img" :alt="characters.name">
                <h2>{{characters.name}}</h2>
                <h3>{{characters.nickname}}</h3>
                <h5>{{characters.birthday}}</h5>
                <div v-if="showOcc && showId === characters.char_id">
                    <p class="fadeInTop" v-for="values in characters.occupation">{{values}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Quote from './Quote';

export default {
    components: {
        Quote
    },
    data() {
        return{
            baseUrl: 'https://www.breakingbadapi.com/api/',
            nameUrl: 'https://www.breakingbadapi.com/api/characters?name=',
            charactersDetail: {},
            filterText: '',
            charName: '',
            CharacterfName: '',
            CharacterlName: '',
            showOcc: false,
            showId: 0
        }
    },
    methods: {
        GetCharacters(){
            this.baseUrl+= 'characters';
            axios.get(this.baseUrl)
            .then(res => {
                console.log(res.data)
                this.charactersDetail = res.data;
            })
        },
        GetcharbyName(){
            axios.get(this.nameUrl+this.charName)
            .then(res => {
                
                this.charactersDetail = res.data;
            })
        },
        SetName(e){
            let name = e.split(' ')
            this.CharacterfName = name[0];
            this.CharacterlName = name[1];
            console.log(name)
        },
        showOccup(id){
           this.showOcc = true
           this.showId = id

        },
        closeOccup(){
            this.showOcc = false
            this.showId = 0
        }
    },

    created() {
        this.GetCharacters()
    }
}
</script>

<style lang="scss" scoped>
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'montserrat';
}
.fadeInTop{
    transition: all .4s;
}
.fadeInTop-enter-active, .fadeInTop-leave-active{
    transition: all .4s;
}
.fadeInTop-enter, .fadeInTop-leave-to{
    transform: translateY(-200px);
    opacity: 0;
}
#wrapper{
    width: 100%;
    position: relative;
    // margin: 0 auto;
    // height: 100vh;
    input{
        padding: .5em;
        float: right;
        width: 30%;
    }
    img{
            width: 10%;
    }
    #modal{
        padding: 0;
        margin: 0;
        position: fixed;
        margin: 0 auto;
        height: 100vh;
        width: 100%;
        background: cornflowerblue;
        display: flex;
        justify-content: center;
        align-items: center;
        // align-self: center;
        // justify-items: center;
        // justify-self: center;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99;
        
        
    }
    .detail-wrapper{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-column-gap: 2em;
        grid-row-gap: 1em;
        margin-top: 3em;
        text-align: center;
        
    
        .charDetail{
        background: cornsilk;
        padding: 1.5em;
        cursor: pointer;
        position: relative;
        img{
            width: 170px;
            height: 200px;
            border-bottom-left-radius: 50px;
            margin-bottom: .75em;
        }
        h3{
            margin-bottom: .5em;
            margin-top: .25em;
            text-transform: uppercase;
            font-size: .9rem;
            position: relative;
            &::before{
                content: '';
                position: absolute;
                left: 2em;
                top: 0;
                background: rgb(224, 81, 81);
                width: 8px;
                height: 15px;
            }
        }
        div{
            text-align: left;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba($color: #000000, $alpha: .7);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
            p{
                margin-bottom: .25em;
            }
        }
    }
    }
}
    
</style>