/* eslint-disable */
<template>
  <div id="app-topbar">
    <nav>
      <v-toolbar> 
        <v-app-bar-nav-icon v-on:click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-navigation-drawer app absolute temporary v-model ="drawer" class="amber accent-3" id="nav-sidebar">
            <v-list dense>
                <v-list-item>
                    <!-- Icon of Sidebar -->
                    <v-list-item-icon>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-icon>
                    <!-- Title of sidebar -->
                    <v-list-item-title>Menu</v-list-item-title>
                </v-list-item>

                <v-list-group no-action>
                    <template v-slot:activator>                       
                        <v-list-item-title>รายการวัสดุ</v-list-item-title>
                    </template>
                    <v-list-item v-for="(FirstList, i) in FirstList" :key="i" link router :to="FirstList.route">
                        <v-list-item-title v-text="FirstList.title"></v-list-item-title>
                    </v-list-item>
                    <!-- <v-list-item v-for ="subItem in item.items" :key="subItem.titele" v-on:click="">
                        <v-list-item-content>
                            <v-list-item-title v-text="subItem.title"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item> -->
                </v-list-group>

                
                <v-list-item active-class>
                    <v-list-item-title>รายการขอเบิก</v-list-item-title>
                </v-list-item>

                 <!-- <v-list-group no-action value="true">        
                    <template v-slot:activator>
                        <v-list-item-title>รายงาน</v-list-item-title>
                    </template>
                    <v-list-item v-for="(ThirdList, i) in ThirdList" :key="i" link router :to="ThirdList.route">
                        <v-list-item-title v-text="ThirdList.title"></v-list-item-title>
                    </v-list-item>
                </v-list-group> -->

                <!-- <v-list-group no-action value="true">
                    <template v-slot:activator>
                        <v-list-item-title>ตั้งค่าระบบ</v-list-item-title>
                    </template>
                    <v-list-item v-for="(fouthList, i) in fouthList" :key="i" link router :to="fouthList.route">
                        <v-list-item-title v-text="fouthList.title"></v-list-item-title>
                    </v-list-item>
                </v-list-group> -->

                <!-- <v-list-group no-action value="true">
                    <template v-slot:activator>
                        <v-list-item-title>ข้อมูลส่วนตัว</v-list-item-title>
                    </template>
                    <v-list-item v-for="(fiveList, i) in fiveList" :key="i" link router :to="fiveList.route">
                        <v-list-item-title v-text="fiveList.title"></v-list-item-title>
                    </v-list-item>
                </v-list-group> -->

            </v-list>
        </v-navigation-drawer>

        <v-toolbar-title>
          <span class="font-weight-light">TPS</span>
          <span>STOCK</span>
        </v-toolbar-title>
        
        <v-spacer></v-spacer>

        <div id="app-toolbar-user">
          <v-btn text red>
            <span>USER</span>
          </v-btn>
        </div>
      </v-toolbar>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      items: [
          {
              title: ' Attractions',
              items: [
                  {title: ' List Item'}
              ],
          },
          {
              title: 'Dinning',
              active: true,
              items: [
                  {title: 'Breakfast & brunch'}
              ]
          }
      ],
      FirstList: [
          {title: 'รายการวัสดุ-อุปกรณ์', route:'/mangement'},
          {title:'รับเข้า/เพิ่มจำนวน', route:'/receive'},
          {title:'เบิก/จ่าย', route:'/disburse'},
          {title:'ยกเลิกรายการ อนุมัติ', route:'/cancel'}
      ],
      secondList: [
          {title: 'รายการขอเบิก', route: '/test'}
      ],
      ThirdList: [
          {title: 'รายงานยอดคงเหลือวัสดุ', route: '/test'},
          {title: 'รายงานรับเข้าวัสดุ', route: '/test'},
          {title: 'รายงานยกเลิก อนุมัติ/จ่าย', route: '/test'},
          {title: 'รายงานสรุปใบเบิก', route: '/test'},
          {title: 'รายงานสรุปจำนวนเบิก', route: '/test'},
          {title: 'รายงานจ่าย วัสดุ - อุปกรณ์', route: '/test'},
          {title: 'รายงานคงเหลือปริมาณมาก', route: '/test'},
          {title: 'รายงานวัสดุใกล้หมดจากคลัง', route: '/test'},
          {title: 'รายงานวัสดุหมดจากคลัง', route: '/test'},
          {title: 'รายงานสรุปมูลค่าเบิก', route: '/test'}
      ],
      fouthList: [
          {title: 'ตั้งค่าหมวดหมู่', route: '/test'},
          {title: 'ตั้งค่าหน่วยงาน/แผนก', route: '/test'},
          {title: 'ตั้งค่าสถานที่เก็บวัสดุ', route: '/test'},
          {title: 'ตั้งค่าผ้ใช้งานระบบ', route: '/test'},
          {title: 'นำเข้าข้อมูลจาก Excel', route: '/test'},
          {title: 'ตั้งค่าระบบเพิ่มติม', route: '/test'},
      ],
      fiveList: [
          {title: 'ข้อมูลส่วนตัว'}
      ]
    }
  }
}
</script>

<style lang="css" scoped>
/* #app-topbar {
    background-color: grey;
    width: 100%;
    height: 100%;
} */
</style>
/* eslint-disable */