<template>
    <div id="wrapper">
        <!-- <Holo /> -->
        <!-- <transition name="slideUp" mode="out-in"> -->
            <div id="trans-bg"></div>
            <transition
            :css="false"
            @enter="enter"
            @leave="leave"
            appear>
                <router-view></router-view>
        </transition>

        <footer>
            <p>Developed By</p> <h1>Wasim thoufiq</h1>
        </footer>
        
    </div>
</template>

<script>
// import Holo from './components/Holo';
import { TimelineMax, TweenMax, Power4 } from 'gsap';
export default {
    name: 'App',
    methods: {
        leave(el, done) {
			const tl = new TimelineMax({
				onComplete: done
			})
			
			tl.set('#trans-bg', {
                x: '100%',
				transformOrigin: 'right'
			})
			.to('#trans-bg', 1, {
                x: 0,
                width: '100%',
				ease: Power4.easeOut
			})
			
		},
		enter(el, done) {
			TweenMax.to('#trans-bg', 1.2, {
                width: '0%',
                delay: 2,
				ease: Power4.easeOut
			})
		}		
    }
    // components: {
    //     Holo
    // }
}
</script>

<style lang="scss">
    #wrapper{
        width: 100%;
        margin: 0 auto;
        position: relative;
        #trans-bg{
            height: 100vh;
            width: 0%;
            padding: 0;
            margin: 0;
            position: fixed;
            top: 0;
            background: floralwhite;
            z-index: 99;
        }
        
    }
    .slide-enter-active, .slide-leave-active{
        transition: all .3s ease;
    }
    .slide-enter, .slide-leave-to{
        opacity: 0;
    }
    footer{
        font-family: 'playfair display';
        display: flex;
        text-align: center;
        flex-direction: column;
        background: rgb(228, 76, 16);
        color: white;
        padding: 2em;
        justify-content: center;
        align-items: center;
        position: relative;
        bottom: 0;
        width: 100%;
    }
</style>