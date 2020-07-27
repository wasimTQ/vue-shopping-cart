<template>
    <div>
        <transition name="fade">
            <div v-if="!showCart && total>0" id="totalItems">
                <h4>{{total}}</h4>
            </div>
        </transition>
        <div class="toggleCart">
            <img id="show" v-if="!showCart" @click="showCart = true" src="../assets/cart.svg" alt="">
            <img id="hide" v-else @click="showCart = false" src="../assets/closebtn.svg" alt="">
        </div>
        <div @click="showCart = false" v-if="showCart" id="overlay"></div>
        <div class="product-wrapper">
            <div class="products" v-for="(product, index) in products" :key="product.id">
                <p class="price">$ <span>{{product.price}}</span></p>
                <div class="img">
                    
                    <!-- <img :src="'dist/'+product.img+'_P_PDP.jpg'" /> -->
                    <img :src="'../../public/img/'+product.img+'_P_PDP.jpg'" />
                    <!-- <img :src="'https://www.keenfootwear.com/dw/image/v2/BBCF_PRD/on/demandware.static/-/Sites-keen_catalog_master/default/'
                    +product.img+'_P_PDP.jpg?sw=350&sh=350&sm=fit'" /> -->
                    <!-- <img :src="'/img'+product.img+'.jpg'" /> -->
                    <!-- <img :src="getPic(index)" > -->
                    
                </div>
                <div class="details">
                    <h2>{{product.name}}</h2>
                    
                </div>
                <div class="interactions">
                    
                    <div class="changenum">
                        <button class="btn btnp" @click="product.quantity++">+</button>
                        <h5>{{product.quantity}}</h5>
                        <button class="btn btn-" @click="product.quantity--">-</button>
                    </div>

                    <button class="btncart" @click="addCart(product)">Add to cart</button>
                </div>
            </div>
        </div>
        
        <transition name="slideIn">
            <Cart id="cart" v-if="showCart" 
            :inCart="productCart" 
            @ItemRemoved="removefromArray"
            @closeCart="showCart = false"
            @ItemsTotaled="totalIncart" />
        </transition>
    </div>
</template>

<script>
import Cart from './Cart'

export default {
    components: {
        Cart
    },
    data(){
        return{
            productCart: [],
            total: 0,
            showCart: false
        }
    },
    computed: {
        products(){
            return this.$store.getters.products
        }

    },
    methods: {
        getPic(index) {
            return '../assets/' + this.productCart[index].img + '.jpg';
        },
        addCart(product){
            if(product.quantity <= 0){
                product.quantity = 1
                product.incart +=  product.quantity
            }
            this.productCart.forEach((item, index) => {
                if(item.id === product.id){
                    console.log(item.incart)
                    this.productCart.splice(index, 1)
                    console.log(item.incart)
                    item.incart += product.quantity 
                    console.log(item.incart)    
                    product.incart = item.incart                  
                }
                
            });
           
            this.productCart.push(product)
            console.log(this.productCart)
            localStorage.setItem('product', JSON.stringify(this.productCart))
            
            this.$store.dispatch('addItem', product)
            product.quantity = 1
            this.totalIncart()
            
        },
        removefromArray(id){
            this.productCart.forEach((item, index) => {
                if(item.id === id){
                    this.productCart.splice(index, 1)
                }
            });
            console.log(this.productCart)
        },
        setTotal(amt){
            this.total = amt
        },
        totalIncart(){
            let total = 0
            this.productCart.forEach((item, index) => {  
                total += item.incart
                
            });
            this.total = total
            this.$emit('ItemsTotaled', this.totalItems)
            console.log(this.totalItems)
        }, 
    },
    created(){
        console.log(this.$store.getters.productsinCart)
        this.$store.dispatch('getItem')
        this.$store.getters.productsinCart === null ? 
            this.productCart = [] :
            this.productCart = this.$store.getters.productsinCart
        this.totalIncart()
        
    }

}
</script>

<style lang="scss" scoped>
*{
    font-family: 'azo sans';
}

.slideIn-enter, .slideIn-leave-to{
    transform: translateX(800px);
}
.slideIn-enter-active, .slideIn-leave-active{
    transition: all .35s ease-out;
}
.fade-enter, .fade-leave-to{
    opacity: 0;
}
.fade-enter-active, .fade-leave-active{
    transition: all .05s;
}
#totalItems{
    position: fixed;
    top: 1.5em;
    right: 2.75em;
    background: white;
    padding: .5em .75em;
    border-radius: 100%;
    z-index: 11;
    font-size: .9em;
    font-weight: bold;
    text-align: center;
}
.toggleCart{
    position: fixed;
    top: 2em;
    right: 0;
    z-index: 10;
    background: transparent;
    img{
        display: flex;
        width: 50%;
        
        // margin: 1em;
        // margin-left: auto;
        // position: relative;
        
        cursor: pointer;
    }
}
#overlay{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.7);
    top: 0;
    left: 0;
    z-index: 1;
}
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
    .product-wrapper{
        width: 90%;
        margin: 3em auto;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-column-gap: 3.5em;
        grid-row-gap: 2.5em;
        .products{
            padding: 2em;
            border-radius: 50px;
            box-shadow: 2px 2px 12px rgba($color: #000000, $alpha: 0.4);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            &:hover img{
                        transform: scale(1.2);
                        box-shadow: 5px 5px 10px rgba($color: #000000, $alpha: 0.4);
            }
            .price{
                    position: absolute;
                    top: -1em;
                    background: rgb(26, 238, 61);
                    color: white;
                    padding: 1em 1.5em;
                    left: -1em;
                    border-top-right-radius: 20px;
                    border-bottom-left-radius: 20px;
                    span{
                        font-size: 1.1em;
                        font-weight: 500;
                    }
                }
            .img{
                width: 300px;
                height: 250px;                
                img{
                    width: 250px;
                    height: 215px;
                    border-radius: 50px;
                    display: block;
                    margin: 0 auto;
                    transition: all .2s ease;
                    
                }
            }
            .details{
                text-align: center;
                // width: 90%;
                h2{
                    font-weight: 500;
                    font-size: 1.75em;
                    margin-bottom: .5em;
                }
            }
            .interactions{
                margin-top: 1em;
                display: flex;
                width: 100%;
                justify-content: space-around;
                align-items: center;
                .changenum{
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    h5{
                        margin: .25em .5em;
                        font-size: 1em;
                    }
                    .btn{
                        padding: .1em .4em;
                        border: 0;
                        font-size: 1.25em;
                        font-weight: 500;
                        background: transparent;
                        cursor: pointer;
                    }
                }
                .btncart{
                    background: rgb(21, 79, 187);
                    border: 0;
                    font-size: 1.25em;
                    padding: .35em .75em;
                    color: white;
                    cursor: pointer;
                    outline: 1px solid rgb(21, 79, 187);
                    transition: all .3s ease;
                    &:hover{
                        color: rgb(21, 79, 187);
                        background: white;
                        
                    }
                }
            }
        }
    }
</style>