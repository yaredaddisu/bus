<template>
  <div class="grid md:grid-cols-2 ssm:grid-cols-1 mt-4 ml-2  gap-4  ">
    <div >

      <select v-model="day" size="1" autofocus class="bg-gray-500 text-white">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
        <option value="21">21</option>
        <option value="22">22</option>
        <option value="23">23</option>
        <option value="24">24</option>
        <option value="25">25</option>
        <option value="26">26</option>
        <option value="27">27</option>
        <option value="28">28</option>
        <option value="29">29</option>
        <option value="30">30</option>
        <option value="31">31</option>
      </select>
   <select v-model="month" size="1" class="bg-gray-500  text-white" >
        <option value="0">January</option>
        <option value="1">February </option>
        <option value="2">March </option>
        <option value="3">April </option>
        <option value="4">May </option>
        <option value="5">June </option>
        <option value="6">July </option>
        <option value="7">August </option>
        <option value="8">September </option>
        <option value="9">October </option>
        <option value="10">November </option>
        <option value="11">December </option>
      </select>

      <input type="text"  class="bg-gray-500  text-white"  v-model="year" size="10" maxlength="10"  >

    </div>
    <div class=" ">   
      <input type="text" class="bg-gray-500  text-white" v-model="days" size="10">
     <input placeholder=" Calculated Date" type="text" class="text-black" v-model="result" size="20" readonly  />
      </div>
 
 
</div>

  <div align="left" class=" mb-4 mt-4 ml-2 " >
    <input
    type="button"
    @click="calculate"
    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
     value="Calculate "
    />
         
   </div>
  <div >
  </div>
 
  
</template>

<script>
 
export default { 
    
  
     
    data() {

      const current = new Date();

      const day = current.getDate();
      const month = current.getMonth();
      const year = current.getFullYear();
    return {
      day: day,
      month: month,
      year: year,
      date: "",
      days: " 30 ",
      result: ""
    };
  },
  
  methods: {
    currentDate() {
      const current = new Date();
      const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
      return date;
    },
    calculate(form) {
      var vm = this;
      var day = vm.day;
      var month = parseInt(vm.month) + 1;
      var year = vm.year;
      var date = Date.parse(year + "/" + month + "/" + day);
      var days = vm.days;
      date += days * 86400000;
      var date_result = new Date(date);
      var str = date_result.toString();
      var result = str.split(" ");
      vm.result =
        vm.getFullDay(result[0]) +
        ", " +
        vm.getFullMonth(result[1]) +
        " " +
        result[2] +
        ", " +
        result[3];
    },
    getFullDay(shortDay) {
      if (shortDay == "sun") return "Sunday";
      else if (shortDay == "Sun") return "Sunday";
      else if (shortDay == "Mon") return "Monday";
      else if (shortDay == "Tue") return "Tuesday";
      else if (shortDay == "Wed") return "Wednesday";
      else if (shortDay == "Thu") return "Thursday";
      else if (shortDay == "Fri") return "Friday";
      else if (shortDay == "Sat") return "Saturday";
    },
    getFullMonth(shortMonth) {
      if (shortMonth == "Jan") return "January";
      else if (shortMonth == "Feb") return "February";
      else if (shortMonth == "Mar") return "March";
      else if (shortMonth == "Apr") return "April";
      else if (shortMonth == "May") return "May";
      else if (shortMonth == "Jun") return "June";
      else if (shortMonth == "Jul") return "July";
      else if (shortMonth == "Aug") return "August";
      else if (shortMonth == "Sep") return "September";
      else if (shortMonth == "Oct") return "October";
      else if (shortMonth == "Nov") return "November";
      else if (shortMonth == "Dec") return "December";
    }
  }
     
}
</script>

<style>

</style>