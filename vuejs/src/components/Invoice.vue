<template>

  <!-- Main modal -->

  <div class=" w-full mt-0  ">
    <div class="w-100 bg-white  min-w-full justify-center text-xs">
       
     
      <section class=" w-full p-[100px]  ">
      
               
        <div style="
                   text-align: center;
                   line-height: 1.5;
                   font-size: 14px;
                   color: #4a4a4a;
                 ">
                 <div class="flex justify-center " >
               <JustboilLogo/>
              </div>
                 <p style="font-weight: bold; color: #000; margin-top: 15px; font-size: 18px;">
                   Tax Invoice/Bill Of Supply  <br> 
                   <strong class="text-2xl font-sans ">{{ user.company }}</strong>
                 </p>
              
                <div class="mt-4">
                  <div class="text-left"></div>
                  <div class="text-md text-center">
                    <p class=" ">Invoice No: <b class="ml-2 justify-start">{{ cart.Reference }}</b></p>
                    <p class=" ">Date: <b class="ml-2 justify-start">{{ cart.created_at }}</b></p>
                  </div>
                </div>
                <div class=" ">
                  <div class="float-left md:mt-3 text-left">
                    <p  ><b class="text-md mb-2">Invoice To:</b></p>
                     <p>
                      
                     Name: <strong class="ml-2">{{ cart.name }}</strong> <br>
                     Phone:<strong class="ml-2"> {{cart.phone  }}</strong><br> 
                     Address:<strong class="ml-2"> {{cart.address }}</strong> <br> 
                     Email: <strong class="ml-2">{{ cart.email}}</strong><br> 
                    </p>
                    <p>
                      
                      Customer's TIN Reg.No: <strong class="ml-2">{{ cart.Tin }}</strong> <br>
                      Customer's VAT Reg.No:<strong class="ml-2"> {{cart.Vat  }}</strong><br> 
             
                     </p>
                            
                             <hr style="border: 1px dashed rgb(131, 131, 131); margin: 2px auto">

                  </div>
                 
                  <div class="sm:float-left  md:ml-10 ssm:float-left msm:float-left   float-right text-left sm:mt-3">
                    <p class="text-md"><b class="tm_primary_color">Pay To:</b></p>
                    <p>
                      Name: <strong class="ml-2">{{ user.name }}</strong> <br>
                      Phone:<strong class="ml-2"> {{ user.phone }}</strong><br> 
                      Address:<strong class="ml-2"> {{user.address }}</strong> <br> 
                      Email: <strong class="ml-2">{{ user.email}}</strong><br> 
                    </p>
                    <p>
                      
                      Supplier's TIN Reg.No: <strong class="ml-2">{{ user.tin }}</strong> <br>
                      Supplier's VAT Reg.No:<strong class="ml-2"> {{user.vat  }}</strong><br> 
             
                     </p>
                                <hr style="border: 1px dashed rgb(131, 131, 131); margin: 2px auto">


                  </div>
                </div>

               </div>

               <div  class=" w-full">
              
               <table class="mt-10" >
                 <thead>
                   <tr>
                      <th >Item</th>
                     <th>QTY</th>
                     <th >Price</th>
                     <th >Total</th>

                   </tr>
                 </thead>
                 <tbody>
                   <tr v-for="data in cart.questions" :key="data.id"  class="invoice-carts">
                      <td   data-label="Item">  <strong class="text-sm">{{data.productName  }}</strong> X </td>
                     <td data-label="QTY"><strong class="text-sm"> {{ data.quantity * -1}}</strong> </td>
                     <td data-label="Price"><strong class="text-sm"> {{$filters.currencyUSD(Math.abs(data.salesPrice)) }}</strong> </td>

                     <td  data-label="Total" ><strong>{{$filters.currencyUSD(Math.abs(   data.quantity * data.salesPrice * -1 ))}}</strong></td>

                   </tr>
                 
                
                 </tbody>

               </table>
               <hr style="border: 1px dashed rgb(131, 131, 131); margin: 2px auto">
  
               <div class="w-full" style=" 
               background: #fcbd024f;
               border-radius: 4px;">
                 <div>
                   <div class="grid grid-cols-3 sm:grid-cols-2 msm:grid-cols-2 ssm:grid-cols-2 gap-4 px-4 py-4">
 
                    <div  >Total Products ({{ cart.TotalProduct }})</div>

                    <div  >Total Quantity ({{ cart.TotalQuantity }})</div>


                     <div class="float-right" >Sub Total  <strong> {{$filters.currencyUSD(Math.abs( cart.amount ))}}</strong></div>

                   </div>
                 </div>
              
               </div>
 
               <table class="w-full border border-b-black" >
             
                <tbody>
                  <tr>
                    <td>{{ cart.tax }}% (Tax)</td>
 
                    <td style="text-align: right;"><strong>{{  $filters.currencyUSD(Math.abs( cart.amount * (cart.tax/100) )) }}</strong></td>

                    </tr>
                   <tr>
                     <td>Shipping </td>
                     <td style="text-align: right;"><strong> {{ $filters.currencyUSD(Math.abs(cart.shipping)) }}</strong></td>
                   </tr>
                
               
                </tbody>

              </table>
              
 
               <div class="w-full" >
                 <div>
                  <table class="w-full border border-b-black" >
             
                    <tbody>
                      <tr>
                        <td>                     <div class="m-3" >Grand Total <strong  > {{$filters.currencyUSD(Math.abs( parseInt(cart.amount) + parseInt(cart.shipping) + cart.amount * (cart.tax/100) ))}} </strong></div>
                        </td>
     
                        <td  >
                          <div class="m-3" >Paid Amount <strong  > {{$filters.currencyUSD(Math.abs( cart.PayedAmount ))}} </strong></div>

                        </td>

                        
                        </tr>
                       <tr>
                        <td  >
                          <div class="m-3" >Due  <strong  > {{$filters.currencyUSD(Math.abs(cart.Due ))}} </strong></div>

                      </td>
  
                      <td >

                        <div class="m-3"  :class="[
                          cart.Due == 0
                         ? 'text-green-800 border-green-500 '
                         :  'text-red-500 border-red-500 ',
                       
                     ]">Payment Status  <strong  > {{cart.Due == 0 ? "Paid" : "Partial" }} </strong></div>
                    </td>

                    
                       </tr>
                    <tr><td  >
                      <div class="m-3" >Payment Method <strong class="ml-2"> {{ cart.paymentMethod}} </strong></div>
                      
                                            </td></tr>
                   
                    </tbody>
    
                  </table>
                  
                   
                 </div>
              
               </div>
               <hr style="border: 1px dashed rgb(131, 131, 131); margin: 2px auto">

               <div style="
               text-align: center;
               
               
                
             " id="legalcopy" class="justify-center mt-3">
                <p class="legal"><strong>Thank You!! Come back again</strong>
                 </p>
              </div>
              </div>
                 <span class="mdi mdi-printer"></span>
                 <div  class="grid grid-cols-2 mb-6 m-5 gap-4  hide">

 
                   
                  <mdicon @click.prevent="print()" class="text-red cursor -pointer" name="printer" /> 
          
                 </div>
 

     </section>
     <OverlayLayer v-if="loading" />

    </div>
  </div>

 </template>


<script>
  import { useRouter,useRoute } from "vue-router";
  import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import { mdiEye, } from "@mdi/js";
import store from "@/store";
import JustboilLogo from "@/components/JustboilLogo.vue";
import { computed, ref } from "vue";
import OverlayLayer from "@/components/OverlayLayer.vue";

const router = useRouter();
const route = useRoute();

export default {

computed:{
  
  user(){
    return this.$store.state.user.data;
  },
  loading(){
    return this.$store.state.currentDetail.loading;
  },
  cart(){
    return this.$store.state.currentDetail.data;
  },
  loading(){
    return this.$store.state.currentDetail.loading;
  },
   
  cartTotalPrice(){
    return this.$store.getters.cartTotalPrice;
  },

   totalQuantity(){
    return this.$store.getters.totalQuantity;
  },
  Tax(){
    return this.$store.getters.Tax;
  },
   Shipping(){
    return this.$store.getters.Shipping;
  },
},



  components: { 
     store,
     route,
     JustboilLogo,
router,
BaseButtons,
BaseButton,
mdiEye,
OverlayLayer

 },
 


data: function () {

           return {
            showModel:true,
            Length:0,
          }

      },

      mounted(){
  let id = this.$route.params.id;
this.$store.dispatch('getDetail', id );
this.$store.dispatch('getUser' );
 },
      methods:{

  
        toggleModal(){
      this.showModel = !this.showModel;
    },

    
    clearCartcarts: function(cart){
    this.$store.dispatch("clearCartcarts", cart)
    .then(()=>{
  this.$store.commit('notify', {
    type: 'success',
    message: 'Cart was successfully deleted!'
  })
  this.$router.push('/stock-out')

this.$store.dispatch('getCartcarts');
});

 
          },

    print: function(){
window.print();
 

         
     
},


  
      }

  }

</script>

<style lang="postcss" scoped>
  @media print {
    .hide{
      display:none;
    }

  }
 
  
  
  </style>