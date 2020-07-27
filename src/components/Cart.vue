<template>
    <div id="cartwrapper">
        <div v-if="hasItems" class="wrapper">
            <div class="cartItem" v-for="(item, index) in inCart" :key="item.id+index">
                <h2>{{item.incart}} x </h2>
                <div class="img">
                    <!-- <img :src="'https://www.keenfootwear.com/dw/image/v2/BBCF_PRD/on/demandware.static/-/Sites-keen_catalog_master/default/'
                    +item.img+'_P_PDP.jpg?sw=150&sh=150&sm=fit'" /> -->
                    <!-- <img :src="'dist/'+item.img+'_P_PDP.jpg'" /> -->
                    <img :src="`../../public/img/${item.img}_P_PDP.jpg`" alt="">
                </div>
                <div class="details">
                    <h3>{{ item.name }}</h3>
                    <p><span>Price: </span> $ {{item.price * item.incart}} </p>
                    <div class="btns">
                        <button class="btnquan" @click="addQuantity(item)">+</button>
                        <button class="btnquan" @click="removeQuantity(item)">-</button>
                        <button class="remove" @click="removeItem(item.id)">Remove</button>
                    </div>
                    <hr>
                </div>
                
            </div>
            
        </div>
        <div id="hasno" v-if="!hasItems">
            <h1>Nothing is in the cart</h1>
            <button @click="closeCart">Add Something</button>
        </div>
        <div id="checkout" v-if="hasItems">
            <button id="payout">Proceed to payout</button>
            <div class="total">
                <p>Total:</p>
                <h4>$ {{totalPrice}}</h4>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Cart',
    props: [ 'inCart' ],
    data(){
        return{
            inCart: inCart,
            totalPrice: 0,
            hasItems: true
        }
    }, 
    computed: {
        totalPrice(){
            let total = 0
            this.inCart.forEach((item, index) => {  
                total += item.incart*item.price
                
            });
            return this.totalPrice = total
        }
    },
    methods: {
        removeItem(id){
            this.inCart.forEach((item, index) => {
                if(item.id === id){
                    this.inCart[index].incart = 1
                    this.inCart.splice(index, 1)
                    
                }
            });
            localStorage.setItem('product', JSON.stringify(this.inCart))
            this.$emit('ItemsTotaled')
            this.isItems()
            
        },
        removeQuantity(item){
            this.inCart.forEach((elem, index) => {
                if(elem.id === item.id){
                    let item = this.inCart[index]
                    item.incart--
                    if(item.incart === 0){
                        item.incart = 1
                        this.inCart.splice(index, 1)
                        this.removeItem(item.id)
                        
                    }
                }
            });
            localStorage.setItem('product', JSON.stringify(this.inCart))
            this.$emit('ItemsTotaled')
        },
        addQuantity(item){
            this.inCart.forEach((elem, index) => {
                if(elem.id === item.id){
                    let item = this.inCart[index]
                    item.incart++
                }
            });
            localStorage.setItem('product', JSON.stringify(this.inCart))
            // this.totalIncart()
            this.$emit('ItemsTotaled')
        },
        isItems(){
            if(this.inCart.length > 0){
                this.hasItems = true
            }
            else{
                this.hasItems = false
            }
        }, 
        closeCart(){
            this.$emit('closeCart')
        }

    },
    created(){
        this.isItems()
    }        
}
</script>

<style lang="scss" scoped>
::-webkit-scrollbar{
    width: 5px;
}
::-webkit-scrollbar-track{
    width: 15px;
    border: 1px solid white;
    border-radius: 30px;
    box-shadow: inset 0 0 1.5px 1px rgba($color: #000000, $alpha: 0.6);
}
::-webkit-scrollbar-thumb{
    border-radius: 30px;
    width: 20px;
    background: linear-gradient(45deg, white, black);
}
#hasno{
    h1{
        font-family: 'playfair display';
        font-size: 2.3em;
    }
    button{
        background: none;
        border: none;
        font-size: 1.5em;
        margin-top: .5em;
        cursor: pointer;
        position: relative;
        font-weight: 600;
        outline: none;
        text-transform: uppercase;
        letter-spacing: 2px;
        transition: all .5s ease;
        &:hover{
            &::after{
                left: .5em;
                width: 10em;
            }
        } 
        &::after{
            content: '';
            position: absolute;
            background: rgb(251, 55, 55);
            width: 8em;
            height: .6em;
            top: .65em;
            left: -.5em;
            z-index: -1;
            transition: all .5s ease;
        }
    }
}
    .wrapper{
        height: 70vh;
        width: 95%;
        overflow-y: scroll;
        .cartItem{
            display: flex;
            justify-content: space-between;
            margin-bottom: 1.5em;
            hr{
                width: 80%;
                margin-top: .75em;
                height: 1.5px;
                background: rgb(21, 79, 187);
                
            }
            h2{
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .img{
                width: 40%;
                img{
                    width: 80%;
                    height: 120px;
                }
            }
            .details{
                width: 45%;
                .btns{
                    margin-top: .5em;
                    .btnquan{
                        background: transparent;
                        border: none;
                        font-size: 1.2em;
                        margin-right: .25em;
                        cursor: pointer;
                        outline: none;
                    }
                    .remove{
                        background: rgb(251, 55, 55);
                        color: white;
                        border: none;
                        padding: .25em .5em;
                        margin-left: 2em;
                        outline: 1px solid rgb(251, 55, 55);
                        cursor: pointer;
                        &:hover{
                            color: rgb(251, 55, 55);
                            background: transparent;
                        }
                    }
                }
                h3{
                    font-size: 1.3em;
                    font-weight: 500;
                    margin-bottom: .25em;
                }
                p{
                    font-size: 1em;
                    span{
                        color:rgb(21, 79, 187);
                        font-size: .95em;
                        margin-right: .5em;
                    }
                }
            }
        }
        
    }
    #checkout{
        display: flex;
        justify-content: space-around;
        align-items: flex-end;
        .total{
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            justify-items: center;
            h4{
                color: rgb(251, 55, 55);
                font-size: 1.4em;
            }
        }
        #payout{
        background: black;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 1em 1.5em;
        text-transform: uppercase;
        letter-spacing: 2px;
        word-spacing: 4px;
        font-size: 1em;
        margin-top: 1em;
        cursor: pointer;
        outline: none;
        font-weight: 600;
        box-shadow: 0px 1px 3px 1.5px rgba($color: #000000, $alpha: 0.6);
        &:hover{
            box-shadow: inset 0px 0px 3px 2.5px rgba($color: #000000, $alpha: 0.6);
            background: none;
            color: black;
            transform: translateY(2px);
            
        }
    }
    }
    
</style>