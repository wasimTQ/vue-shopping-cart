<template>
    <div>
        <div id="wrapper">
            <div id="left">
                <div id="logo">
                    <h4>Walkaroo</h4>
                </div>
                <div class="hero">
                    <h4>walk towards the</h4>
                    <h2>future</h2>
                    <router-link class="link" to='/shop'>
                        <a>visit shop</a>
                    </router-link>
                </div>
            </div>
            <div id="right">
                <div class="img"></div>
            </div>
        </div>
        
    </div>
</template>



<style lang="scss" scoped>
#cart{
        position: fixed;
        background: floralwhite;
        top: 0;
        right: 0;
        padding: 5em;
        height: 100vh;
        width: 47.5%;
         z-index: 2;
    }
    #wrapper{
        background: floralwhite;
        display: grid;
        grid-template-columns: 40% 60%;
        #right{
            .img{
                width: 100%;
                height: 100vh;
                background: url('../assets/headershoe-bg.jpg') no-repeat;
                background-attachment: cover;
                background-position: 60% 30%;
                background-size: 800px;
            }
        }
        #left{
            #logo{
                font-family: 'frigtona';
                color: rgb(255, 69, 36);
                font-size: 2em;
                padding: 1em;
            }
            .hero{
                margin: 5em;
                h4{
                    font-family: 'playfair display';
                    font-size: 3.5em;
                    width: 120%;
                    color: rgb(139, 0, 139);
                    font-weight: 700;
                }
                h2{
                    font-family: 'azo sans';
                    font-size: 5.5em;
                    width: 140%;
                    color: black;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 35px;
                    position: relative;
                    z-index: 10;
                    margin-top: .25em;
                    margin-bottom: 1.25em;
                    &::after{
                        content: 'future';
                        position: absolute;
                        top: .1em;
                        left: .15em;
                        z-index: -1;
                        background-size: 100px 50px;
                        background-image: -webkit-linear-gradient(
                            45deg,
                             rgb(255, 69, 36) 25%, rgb(139, 0, 139) 25%,
                              rgb(139, 0, 139) 25%,rgb(255, 69, 36) 50%,
                              rgb(139, 0, 139) 50%,rgb(255, 69, 36) 75%,
                            );
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        
                    }
                }
                .link{
                    text-decoration: none;
                    background: black;
                    padding: 1em 1.5em;
                    color: white;
                    text-transform: uppercase;
                    margin-top: 1em;
                    font-size: 1.25em; 
                    a{
                        font-family: 'azo sans';   
                                                                
                    }
                    &:hover{
                        color: black;
                        background: white;
                        box-shadow: -1px -1px 3.5px rgba($color: #ffffff, $alpha: 1.0),
                                    1px 1px 3.5px rgba($color: #000000, $alpha: .6)
                        ;
                    }
                }
                
            }
        }
    }
</style>