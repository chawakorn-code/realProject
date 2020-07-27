<template>
    <v-div>
        <v-main>
            <v-container id="list-table">
                <v-card>
                    <v-card-title>รายการวัสดุ-อุปกรณ์</v-card-title>
                    <v-data-table 
                    :headers="headers" 
                    :items="desserts" 
                    :items-per-page="5" 
                    class="elevation-1">
                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-toolbar-title>Test</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" dark class="mb-2">Button Test redirection</v-btn>
                            <v-spacer></v-spacer>
                            <v-dialog v-model ="dialog" max-width="820px">
                                <template v-slot:activator="{on,attrs}">
                                    <v-btn
                                    color="primary"
                                    dark
                                    class="mb-2"
                                    v-bind="attrs"
                                    v-on="on">New Item</v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="headline">{{formTitle}}</span>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12" md="6">
                                                    <v-text-field 
                                                    dense 
                                                    outlined  
                                                    label="Name"
                                                    placeholder=" "
                                                    v-model ="editedItem.name"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="6">
                                                    <v-text-field 
                                                    dense 
                                                    outlined 
                                                    label=" ยอดมา"
                                                    placeholder=" "
                                                    v-model ="editedItem.amount"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template>
                    <!-- <template v-slot:expanded-item="{item}">
                        <td :colspan="1"></td>
                        <td :colspan="1"> More infoabout {{item.name}} </td>
                    </template> -->

                    <template v-slot:item.actions="{item}">
                        <v-btn color="light-green darken-1" fab x-small dark @click="editItem(item)">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn> 
                        <v-btn color="red accent-3" fab x-small dark @click="deleteItem(item)">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </template>
                    </v-data-table>
                </v-card>
            </v-container>
        </v-main>
    </v-div>        
</template>
<script>
const axios = require('axios');
export default {
    name: 'Home',
    data () {
        return {
            dialog: false,
            headers: [
                {
                    text: 'รูปภาพ',
                    align: 'start',
                    sortable: false,
                    value: 'pic',
                },
                { text: 'รายการ', value: 'name', sortable: false },
                { text: 'ยอดมา', value: 'adding' },   
                { text: 'รับ', value: 'receive' },
                { text: 'จ่าย', value: 'paid' },
                { text: 'คงเหลือ', value: 'amount' },
                { text: 'หน่วยรับ', value: 'unit'},
                { text: 'Actions', value: 'actions', sortable: false},
                { text: 'status', value: 'status'}
            ],
            desserts: [],
            editedIndex: -1,
            editedItem: {
                name: '',
                amount: 0,
                unit: '',
                status: '',
            },
            defaultItem: {
                name: '',
                amount: 0,
                unit: '',
                status: '',
            },
        }
    },
    created() {
        this.getList()
    },
    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
    },
    watch: {
        dialog (val) {
            val || this.close()
        },
    },
    methods: {
        getList() {
            axios.get('http://localhost:3000/inventory').then(
                result => {
                    console.log(result)
                    this.desserts = result.data
                }
            ),
            error => {
                console.error(error)
            }
        },
        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({},item)
            this.dialog = true
        },
        close () {
            this.dialog = false
            this.$enxtTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        save () {
            if (this.editedIndex > -1){
                Object.assign(this.desserts[this.editedIndex], this.editedItem)
            }
            else {
                this.desserts.push(this.editedItem)
            }
            this.close()
        }
    }

}
</script>
<style lang="css" scoped>
.page-welcome {
  height: 2000px;
  /* background-color: yellow; */
}
.row-1{
    padding: 10px;
}
</style>
